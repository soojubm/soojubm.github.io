import { createIndex } from 'pagefind'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// pages/ 폴더에서 id → 페이지 소스 파일 경로 매핑
function findPageSource(id) {
  const candidates = [
    join(ROOT, 'pages', 'components', id, 'index.html'),
    join(ROOT, 'pages', 'components', id, `${id}.ts`),
    join(ROOT, 'pages', 'patterns', id, 'index.html'),
    join(ROOT, 'pages', 'patterns', id, `${id}.ts`),
    join(ROOT, 'pages', 'home', 'index.html'), // index
    join(ROOT, 'pages', 'home', 'home.ts'), // index
    join(ROOT, 'pages', id, 'index.html'),
    join(ROOT, 'pages', id, `${id}.ts`),
  ]
  return candidates.find(existsSync) ?? null
}

// mm-page-header 태그 전체를 추출한 뒤 title/description 파싱
function extractPageMeta(html) {
  // mm-page-header 여는 태그 전체 (여러 줄 포함)
  const tagMatch = html.match(/<mm-page-header([\s\S]*?)(?:\/>|>)/)
  if (!tagMatch) return { title: '', description: '' }

  const tag = tagMatch[1]
  const titleMatch = tag.match(/\b(?:title|heading)="([^"]*)"/)
  const descMatch = tag.match(/\bdescription="([^"]*)"/)
  return {
    title: (titleMatch?.[1] ?? '').trim(),
    description: (descMatch?.[1] ?? '').trim(),
  }
}

// sitemap에서 모든 page id 수집
async function collectPages() {
  // sitemap.ts를 직접 파싱 (import 대신 정규식)
  const sitemapSrc = readFileSync(join(ROOT, 'src', 'sitemap.ts'), 'utf-8')
  const ids = [...sitemapSrc.matchAll(/\bid:\s*'([^']+)'/g)].map(m => m[1])
  return [...new Set(ids)]
}

async function main() {
  const { index } = await createIndex({ logLevel: 'info' })

  const pageIds = await collectPages()
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
