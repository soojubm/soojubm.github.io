import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { SITEMAP } from '@/sitemap'
import { getCurrentPageId } from '@/utils'
import './navbar.css'

@customElement('mm-navbar')
export class Navbar extends LitElement {
  render() {
    return html`
      <nav class="navbar" role="navigation">
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

  /**
   * Light DOM을 유지한다. 햄버거 버튼이 `aria-controls="site-sidebar"`로 mm-sidebar를 가리키는데,
   * aria-controls는 shadow 경계를 넘지 못해 shadow root에 두면 사이드바가 트리거를 찾지 못한다.
   * 따라서 스타일도 shadow에 넣을 수 없어 navbar.css를 컴포넌트 폴더에서 함께 가져온다.
   */
  createRenderRoot() {
    return this
  }
}
