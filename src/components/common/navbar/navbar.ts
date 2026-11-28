import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import './navbar.css'

@customElement('fff-navbar')
export class Navbar extends LitElement {
  render() {
    return html`
      <nav class="navbar">
        <fff-flex gap="2">
          <fff-hamburger-button
            aria-label="전체메뉴"
            aria-controls="site-sidebar"
          ></fff-hamburger-button>
          <a class="navbar-logo" href="./index.html" aria-label="홈"></a>
        </fff-flex>

        <div class="navbar-user">
          <fff-theme-selector></fff-theme-selector>
          <fff-navbar-search></fff-navbar-search>
        </div>
      </nav>
      <div class="navbar-backdrop"></div>
    `
  }

  /**
   * Light DOM을 유지한다. 햄버거 버튼이 `aria-controls="site-sidebar"`로 fff-sidebar를 가리키는데,
   * aria-controls는 shadow 경계를 넘지 못해 shadow root에 두면 사이드바가 트리거를 찾지 못한다.
   * 따라서 스타일도 shadow에 넣을 수 없어 navbar.css를 컴포넌트 폴더에서 함께 가져온다.
   */
  createRenderRoot() {
    return this
  }
}
