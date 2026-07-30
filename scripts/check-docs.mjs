/**
 * 컴포넌트 문서 페이지가 광고하는 토큰이 실제로 선언되어 있는지 대조한다.
 *
 * 문서는 손으로 쓰는 배열이라 구현이 바뀌어도 조용히 남는다. 존재하지 않는 토큰을
 * 문서가 소개하면 소비자가 먹히지 않는 이름을 쓰게 되므로, 이름 존재 여부만 기계로 막는다.
 * prop 드리프트는 sub-component를 함께 전시하는 페이지가 많아 자동 판정이 어려워 다루지 않는다.
 */
import fs from 'fs'
import path from 'path'

const SRC = 'src'
const PAGES = path.join(SRC, 'pages')

const walk = (dir, match) => {
  const found = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) found.push(...walk(full, match))
    else if (match(full)) found.push(full)
  }
  return found
}

const declaredTokens = new Set()
for (const file of walk(SRC, name => /\.(ts|css)$/.test(name))) {
  const source = fs.readFileSync(file, 'utf8')
  for (const [, token] of source.matchAll(/(--[a-z0-9-]+)\s*:/g)) declaredTokens.add(token)
}

const problems = []
for (const file of walk(PAGES, name => name.endsWith('.ts'))) {
  const source = fs.readFileSync(file, 'utf8')
  const block = source.match(/componentTokens[^=]*=\s*\[([\s\S]*?)\n\]/)
  if (!block) continue

  for (const [, name] of block[1].matchAll(/name:\s*'([^']+)'/g)) {
    const token = name.startsWith('--') ? name : `--${name}`
    if (declaredTokens.has(token)) continue

    problems.push(`${file}: 문서에만 있는 토큰 ${token}`)
  }
}

if (problems.length) {
  console.error(problems.join('\n'))
  console.error(`\n${problems.length}건. 문서를 구현에 맞추거나, 토큰을 실제로 선언한다.`)
  process.exit(1)
}

console.log('문서에 소개된 토큰이 모두 선언되어 있습니다.')
