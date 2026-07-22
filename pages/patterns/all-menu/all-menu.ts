import { html } from 'lit'
import { renderLayout } from '../../../layouts/base-layouts'
// webpack.config.js가 sitemap을 ts-node로 로드하는 것과 같은 이유로 상대경로를 유지한다.
import { SITEMAP, type SitemapNode } from '../../../src/sitemap'

const main = html`
  <main class="page">
    <nav class="js-all-menu" aria-label="전체메뉴"></nav>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main, { closeSidebar: true })
  renderMenu()
})

function renderMenu() {
  const container = document.querySelector('.js-all-menu')
  if (!container) return

  container.innerHTML = `
    <mm-flex direction="column" gap="8">
      ${renderStandaloneGroup()}
      ${SITEMAP.map(renderGroup).join('')}
    </mm-flex>
  `
}

function renderStandaloneGroup() {
  const links = SITEMAP.filter(
    (node): node is Extract<SitemapNode, { type: 'standalone' }> =>
      node.type === 'standalone' && !node.hidden,
  )
    .map(
      node => `
        <mm-menu-item-link
          icon="${node.icon}"
          href="${node.id}.html"
          label="${node.title}"
          badge="${node.badge ?? ''}"
          target="_self"
          hidden-trailing
        ></mm-menu-item-link>
      `,
    )
    .join('')

  return `<mm-menu-item-group aria-label="바로가기">${links}</mm-menu-item-group>`
}

function renderGroup(node: SitemapNode) {
  if (node.type !== 'group') return ''

  const links = node.items
    .filter(item => !item.hidden)
    .map(
      item => `
        <mm-menu-item-link
          emoji="#"
          href="${item.id}.html"
          label="${item.name}"
          badge="${item.badge ?? ''}"
          target="_self"
          hidden-trailing
        ></mm-menu-item-link>
      `,
    )
    .join('')

  return `
    <mm-menu-item-group aria-label="${node.title}">
      <mm-paragraph color="light">${node.title}</mm-paragraph>
      ${links}
    </mm-menu-item-group>
  `
}
