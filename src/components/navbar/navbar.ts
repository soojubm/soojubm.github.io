import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ICON_NAMES } from '../icon-button/semantics/icon-names'

@customElement('mm-navbar')
export class Navbar extends LitElement {
  // 전역 CSS(.navbar, .navbar-user 등)를 그대로 상속받기 위해 Light DOM 사용
  createRenderRoot() {
    return this
  }

  render() {
    return html`
      <nav class="navbar js-navbar" role="navigation">
        <mm-flex gap="2">
          <mm-hamburger-button aria-label="전체메뉴"></mm-hamburger-button>
          <a class="navbar-logo" href="./index.html"></a>
        </mm-flex>

        <div class="navbar-user">
          <mm-theme-switcher></mm-theme-switcher>
          <div style="position: relative">
            <mm-icon-button
              icon=${ICON_NAMES.PROFILE}
              class="navbar-user-trigger js-navbar-user-trigger"
              aria-haspopup="menu"
              aria-expanded="false"
            ></mm-icon-button>
            <div class="navbar-user-menu" hidden>
              <mm-surface variant="elevated" size="medium">
                <mm-user-snippet
                  name="수줍이"
                  email="soojubm@gmail.com"
                  phone="010 3121 7045"
                  description="UI Designer"
                  avatar-src="/src/images/soojubm.png"
                  avatar-size="huge"
                  avatar-variant="secondary"
                  tag-label="접속 중"
                  tag-variant="primary"
                ></mm-user-snippet>
                <div style="margin: var(--space-2) 0 0">
                  <mm-button>내 프로필 관리</mm-button>
                </div>
                <div style="position: absolute; right: var(--space-4); top: var(--space-4)">
                  <mm-tag variant="primary" size="large">샘플 유아이</mm-tag>
                </div>
                <mm-separator></mm-separator>
                <mm-menu-item-group>
                  <mm-menu-item-action
                    icon=${ICON_NAMES.ANNOUNCEMENT}
                    label="고객센터 및 도움말"
                  ></mm-menu-item-action>
                </mm-menu-item-group>
                <mm-separator></mm-separator>
                <mm-menu-item-action icon=${ICON_NAMES.LOG_OUT} label="로그아웃"></mm-menu-item-action>
                <mm-separator></mm-separator>
                <mm-flex style="margin-top: -0.25rem">
                  <mm-link variant="secondary" href="#">개인정보처리방침</mm-link>
                  <mm-link variant="secondary" href="#">서비스 약관</mm-link>
                </mm-flex>
              </mm-surface>
            </div>
          </div>
        </div>
      </nav>
      <div class="navbar-backdrop"></div>

      <mm-sidebar></mm-sidebar>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-navbar': Navbar
  }
}
