import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const BUILD = join(ROOT, 'build')

// 템플릿 문자열로 쓴 `/src/…` 자산 경로는 webpack이 따라가지 못한다. 개발 서버는 저장소 루트를 서빙해서 이 경로가 열리지만
// 배포본은 build만 올라가므로, 코드가 가리키는 파일만 같은 경로로 복사한다. 가리키지 않는 파일은 보내지 않는다.
const ASSET_PATH = /\/src\/[\w\-./]+\.(?:png|jpe?g|gif|svg|webp|json)/g

// 사이트 루트에서 그대로 서빙해야 하는 파일
const ROOT_FILES = ['favicon.ico']

function collectSources(dir, sources = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name !== 'generated') collectSources(path, sources)
    } else if (entry.name.endsWith('.ts')) {
      sources.push(path)
    }
  }
  return sources
}

function collectAssetPaths() {
  const files = [...collectSources(join(ROOT, 'src')), join(ROOT, 'index.html')]
  const matches = files.flatMap(file => [...readFileSync(file, 'utf-8').matchAll(ASSET_PATH)])
  const paths = new Set(matches.map(([path]) => path.slice(1)))

  return [...paths].sort()
}

function copyToBuild(relativePath) {
  const source = join(ROOT, relativePath)
  if (!existsSync(source)) {
    console.warn(`  missing: ${relativePath}`)
    return false
  }

  const target = join(BUILD, relativePath)
  mkdirSync(dirname(target), { recursive: true })
  copyFileSync(source, target)
  return true
}

const copied = [...collectAssetPaths(), ...ROOT_FILES].filter(copyToBuild)
console.log(`Copied ${copied.length} static files → ${BUILD}`)
