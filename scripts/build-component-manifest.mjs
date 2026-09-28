/**
 * 컴포넌트의 공개 prop(@property)을 코드에서 읽어 문서가 쓰는 manifest를 만든다.
 *
 * 문서 prop 표를 손으로 적으면 구현이 바뀌어도 조용히 남는다. prop 이름·타입·기본값의 원천을
 * 컴포넌트 선언 하나로 두고, 문서는 이 manifest에서 표를 가져온다. 이벤트·slot은 선언에서
 * 읽을 수 없어 문서 페이지가 계속 손으로 덧붙인다. 부모가 채우는 prop은 선언에 @internal을 달아 뺀다.
 *
 * 결과(src/generated/component-manifest.ts)는 커밋하지 않고 install·dev·start·build 전에 npm run manifest로 만든다.
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

import prettier from 'prettier'
import ts from 'typescript'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const COMPONENTS = path.join(ROOT, 'src/components')
const MANIFEST_PATH = path.join(ROOT, 'src/generated/component-manifest.ts')

// 이보다 큰 문자열 union(아이콘 이름 등)은 값을 펼치지 않고 타입 이름으로 둔다.
const MAX_EXPANDED_UNION = 16

const walk = dir =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return full.endsWith('.ts') ? [full] : []
  })

const decoratorsOf = node => (ts.canHaveDecorators(node) ? ts.getDecorators(node) ?? [] : [])

// @name(...) 데코레이터의 첫 인자를 돌려준다.
const decoratorArgument = (node, name) => {
  for (const decorator of decoratorsOf(node)) {
    const call = decorator.expression
    if (!ts.isCallExpression(call)) continue
    if (!ts.isIdentifier(call.expression) || call.expression.text !== name) continue

    return call.arguments[0] ?? null
  }
  return undefined
}

// Lit은 attribute 옵션이 없으면 프로퍼티 이름을 소문자로 바꾼 것을 attribute로 쓴다.
const publicName = (propertyName, options) => {
  if (!options || !ts.isObjectLiteralExpression(options)) return propertyName.toLowerCase()

  const attribute = options.properties.find(
    option => option.name && option.name.getText() === 'attribute',
  )
  if (!attribute || !ts.isPropertyAssignment(attribute)) return propertyName.toLowerCase()
  if (ts.isStringLiteral(attribute.initializer)) return attribute.initializer.text

  return propertyName
}

// 타입 표기에 나오는 문자열 리터럴을 별칭을 따라가며 적힌 순서대로 모은다. union 값의 나열 순서가 된다.
const literalOrder = (checker, typeNode, seen = new Set(), order = []) => {
  const visit = node => {
    if (ts.isLiteralTypeNode(node) && ts.isStringLiteral(node.literal)) {
      if (!order.includes(node.literal.text)) order.push(node.literal.text)
      return
    }
    if (ts.isTypeReferenceNode(node)) {
      let symbol = checker.getSymbolAtLocation(node.typeName)
      if (symbol && symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol)
      const declaration = symbol?.declarations?.find(ts.isTypeAliasDeclaration)
      if (declaration && !seen.has(declaration)) {
        seen.add(declaration)
        visit(declaration.type)
      }
    }
    ts.forEachChild(node, visit)
  }
  if (typeNode) visit(typeNode)
  return order
}

const defaultLabel = initializer => {
  if (!initializer) return ''
  if (ts.isStringLiteral(initializer)) return initializer.text ? ` = '${initializer.text}'` : ''
  if (initializer.kind === ts.SyntaxKind.TrueKeyword) return ' = true'
  if (initializer.kind === ts.SyntaxKind.FalseKeyword) return ' = false'
  if (ts.isNumericLiteral(initializer)) return ` = ${initializer.text}`
  if (ts.isArrayLiteralExpression(initializer) && !initializer.elements.length) return ' = []'
  return ''
}

const typeLabel = (checker, declaration, type) => {
  const defined = type.isUnion()
    ? type.types.filter(part => !(part.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Null)))
    : [type]
  const isStringUnion =
    defined.length > 1 && defined.every(part => part.flags & ts.TypeFlags.StringLiteral)

  if (isStringUnion && defined.length <= MAX_EXPANDED_UNION) {
    const order = literalOrder(checker, declaration.type)
    const values = defined
      .map(part => part.value)
      .sort((a, b) => {
        const indexA = order.indexOf(a)
        const indexB = order.indexOf(b)
        return (indexA < 0 ? Infinity : indexA) - (indexB < 0 ? Infinity : indexB)
      })
    return values.map(value => `'${value}'`).join(' | ')
  }

  if (defined.every(part => part.flags & ts.TypeFlags.BooleanLiteral)) return 'boolean'
  if (declaration.type) {
    return declaration.type
      .getText()
      .replace(/\s*\|\s*(undefined|null)\b/g, '')
      .replace(/\s+/g, ' ')
  }
  return checker.typeToString(checker.getBaseTypeOfLiteralType(type))
}

const isEmptyDefault = initializer =>
  (ts.isStringLiteral(initializer) && !initializer.text) ||
  initializer.kind === ts.SyntaxKind.NullKeyword

// 부모가 채우는 값처럼 소비자가 넘기지 않는 prop은 선언에 @internal을 달아 문서에서 뺀다.
const isInternal = declaration => ts.getJSDocTags(declaration).some(tag => tag.tagName.text === 'internal')

const propOf = (checker, declaration) => {
  const options = decoratorArgument(declaration, 'property')
  if (options === undefined || isInternal(declaration)) return null

  const symbol = checker.getSymbolAtLocation(declaration.name)
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration)
  const name = publicName(symbol.name, options)
  const label = typeLabel(checker, declaration, type) + defaultLabel(declaration.initializer)
  // 빈 문자열·null 기본값은 "주지 않음"을 뜻하므로 값이 없는 prop과 같이 optional로 둔다.
  const optional =
    Boolean(declaration.questionToken) ||
    !declaration.initializer ||
    isEmptyDefault(declaration.initializer)

  return optional ? { name, type: label, optional: true } : { name, type: label }
}

const resolveDeclaration = (checker, expression) => {
  let symbol = checker.getSymbolAtLocation(expression)
  if (symbol && symbol.flags & ts.SymbolFlags.Alias) symbol = checker.getAliasedSymbol(symbol)
  return symbol?.declarations?.[0]
}

const firstClassIn = node => {
  if (ts.isClassLike(node)) return node
  return ts.forEachChild(node, firstClassIn)
}

/**
 * 클래스가 extends로 물려받는 prop까지 모은다. mixin은 반환 타입을 interface로 선언해 타입으로는
 * 데코레이터가 붙은 선언에 닿지 않으므로, extends 식을 코드 구조대로 따라가 mixin 안의 클래스에서 모은다.
 */
const classProps = (checker, classNode, seen = new Set()) => {
  if (seen.has(classNode)) return []
  seen.add(classNode)

  const heritage = classNode.heritageClauses?.find(
    clause => clause.token === ts.SyntaxKind.ExtendsKeyword,
  )
  const inherited = heritage ? expressionProps(checker, heritage.types[0].expression, seen) : []
  const own = classNode.members
    .filter(ts.isPropertyDeclaration)
    .map(member => propOf(checker, member))
    .filter(Boolean)

  return [...inherited, ...own]
}

const expressionProps = (checker, expression, seen) => {
  if (ts.isCallExpression(expression)) {
    const callee = resolveDeclaration(checker, expression.expression)
    const body = callee && (callee.body ?? callee.initializer)
    const mixinClass = body && firstClassIn(body)
    const fromMixin = mixinClass ? classProps(checker, mixinClass, seen) : []
    const fromArguments = expression.arguments.flatMap(argument =>
      expressionProps(checker, argument, seen),
    )
    return [...fromArguments, ...fromMixin]
  }

  const declaration = resolveDeclaration(checker, expression)
  if (declaration && ts.isClassLike(declaration)) return classProps(checker, declaration, seen)
  return []
}

// 같은 이름을 다시 선언하면 가까운 선언(하위 클래스)이 이긴다.
const uniqueByName = props =>
  [...new Map(props.map(prop => [prop.name, prop])).values()]

function buildManifest() {
  const configPath = path.join(ROOT, 'tsconfig.json')
  const config = ts.readConfigFile(configPath, ts.sys.readFile).config
  const { options } = ts.parseJsonConfigFileContent(config, ts.sys, ROOT)
  const files = walk(COMPONENTS).sort()
  const program = ts.createProgram(files, options)
  const checker = program.getTypeChecker()
  const manifest = {}

  for (const file of files) {
    const source = program.getSourceFile(file)
    const visit = node => {
      if (ts.isClassDeclaration(node) && node.name) {
        const tag = decoratorArgument(node, 'customElement')
        if (tag && ts.isStringLiteral(tag)) manifest[tag.text] = uniqueByName(classProps(checker, node))
      }
      ts.forEachChild(node, visit)
    }
    visit(source)
  }

  return Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)))
}

async function buildManifestSource() {
  const manifest = buildManifest()
  const source = `// 이 파일은 scripts/build-component-manifest.mjs가 만든다. 커밋하지 않고 직접 고치지 않는다.
import type { ComponentPropItemData } from '@/components/domains/component/component-props'

const manifest = ${JSON.stringify(manifest, null, 2)}

export type ComponentTag = keyof typeof manifest

export const componentManifest: Record<ComponentTag, ComponentPropItemData[]> = manifest
`
  const prettierConfig = await prettier.resolveConfig(MANIFEST_PATH)
  return prettier.format(source, { ...prettierConfig, filepath: MANIFEST_PATH })
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  fs.mkdirSync(path.dirname(MANIFEST_PATH), { recursive: true })
  fs.writeFileSync(MANIFEST_PATH, await buildManifestSource())
  console.log(`${path.relative(ROOT, MANIFEST_PATH)}를 만들었습니다.`)
}
