import { readFileSync, readdirSync } from 'fs'
import { createRequire } from 'module'
import { join, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

import { createIndex } from 'pagefind'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const PAGES_DIR = join(ROOT, 'src', 'pages')

// webpack.config.js와 같은 방식으로 sitemap.ts를 직접 불러온다.
const require = createRequire(import.meta.url)
require('ts-node').register({ transpileOnly: true })
const { SITEMAP } = require('../src/sitemap.ts')

// 페이지 id는 webpack entry 이름이라 pages 아래 파일명으로 유일하다. 폴더로 감싼 페이지와 평평한 페이지를 구분하지 않는다.
function collectPageSources(dir = PAGES_DIR, sources = new Map()) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) collectPageSources(path, sources)
    else if (entry.name.endsWith('.ts')) sources.set(basename(entry.name, '.ts'), path)
  }
  return sources
}

const pageSources = collectPageSources()

// id → 페이지 소스 파일 경로. 홈은 id와 파일명이 다르다.
function findPageSource(id) {
  return pageSources.get(id === 'index' ? 'home' : id) ?? null
}

// mm-page-header 태그 전체를 추출한 뒤 title/description 파싱
function extractPageMeta(html) {
  // 코드 샘플 문자열에 든 mm-page-header를 지나치도록 페이지 본문(mm-main)부터 찾는다
  const body = html.slice(Math.max(html.indexOf('<mm-main'), 0))
  // mm-page-header 여는 태그 전체 (여러 줄 포함)
  const tagMatch = body.match(/<mm-page-header([\s\S]*?)(?:\/>|>)/)
  if (!tagMatch) return { title: '', description: '' }

  const tag = tagMatch[1]
  const titleMatch = tag.match(/\b(?:title|heading)="([^"]*)"/)
  const descMatch = tag.match(/\bdescription="([^"]*)"/)
  return {
    title: (titleMatch?.[1] ?? '').trim(),
    description: (descMatch?.[1] ?? '').trim(),
  }
}

// sitemap에서 모든 page id 수집. group 노드의 id는 페이지가 아니라 묶음 이름이다.
function collectPageIds() {
  const ids = SITEMAP.flatMap(node => {
    if (node.type === 'group') return node.items.map(item => item.id)
    return node.children ? node.children.map(item => item.id) : [node.id]
  })
  return [...new Set(ids)]
}

async function main() {
  const { index } = await createIndex({ logLevel: 'info' })

  const pageIds = collectPageIds()
  let indexed = 0

  for (const id of pageIds) {
    const sourcePath = findPageSource(id)
    if (!sourcePath) {
      console.warn(`  skip: ${id} (page source not found)`)
      continue
    }

    const html = readFileSync(sourcePath, 'utf-8')
    const { title, description } = extractPageMeta(html)

    if (!title && !description) {
      console.warn(`  skip: ${id} (no title/description)`)
      continue
    }

    const url = id === 'index' ? '/index.html' : `/${id}.html`
    const content = [title, description].filter(Boolean).join(' ')

    await index.addCustomRecord({
      url,
      content,
      meta: { title: title || id },
      language: 'ko',
    })

    console.log(`  ✓ ${id}: "${title}"`)
    indexed++
  }

  const outputPath = join(ROOT, 'build', 'pagefind')
  await index.writeFiles({ outputPath })
  console.log(`\nIndexed ${indexed} pages → ${outputPath}`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
