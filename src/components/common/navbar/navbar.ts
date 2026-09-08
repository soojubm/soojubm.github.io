import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { SITEMAP } from '@/sitemap'
import { getCurrentPageId } from '@/utils'

@customElement('mm-navbar')
export class Navbar extends LitElement {
  render() {
    return html`
      <nav class="navbar js-navbar" role="navigation">
        <mm-flex gap="2">
          <mm-hamburger-button
            aria-label="전체메뉴"
            aria-controls="site-sidebar"
          ></mm-hamburger-button>
          <a class="navbar-logo" href="./index.html" aria-label="홈"></a>
        </mm-flex>

        <div class="navbar-user">
          <mm-theme-selector></mm-theme-selector>
          <mm-navbar-search></mm-navbar-search>
        </div>
      </nav>
      <div class="navbar-backdrop"></div>

      <mm-fixed-bottom class="site-bottom-bar">
        <mm-bottom-bar .items=${this.bottomBarItems}></mm-bottom-bar>
      </mm-fixed-bottom>
    `
  }

  private get bottomBarItems() {
    return SITEMAP.filter(node => node.type === 'standalone' && node.id !== 'foundations').map(
      node => ({
        label: node.title,
        href: `${node.id}.html`,
        icon: node.icon,
        active: node.id === getCurrentPageId(),
      }),
    )
  }

  // 전역 navbar.css가 .navbar-user 등 내부 구조에 접근해야 하므로 Light DOM을 유지한다.
  createRenderRoot() {
    return this
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-navbar': Navbar
  }
}
