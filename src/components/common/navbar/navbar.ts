import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { SITEMAP } from '@/sitemap'
import { getCurrentPageId } from '@/utils'
/* 프로필 메뉴 popover 초안. 되살릴 때 템플릿으로 되돌린다.
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import soojubmImage from '@/images/soojubm.png'

          <mm-popover placement="bottom-right" width="320px">
            <mm-icon-button
              slot="trigger"
              icon=${ICON_NAMES.PROFILE}
              aria-label="내 메뉴"
            ></mm-icon-button>
            <mm-flex gap="2" justify-content="space-between">
              <mm-user-snippet
                size="huge"
                name="수줍이"
                email="soojubm@gmail.com"
                phone="010 3121 7045"
                description="UI Designer"
                avatar-src=${soojubmImage}
                avatar-variant="secondary"
                tag-label="접속 중"
                tag-variant="primary"
              ></mm-user-snippet>
              <mm-button>내 프로필 관리</mm-button>
            </mm-flex>
            <mm-separator></mm-separator>
            <mm-menu-item-group>
              <mm-menu-item-action
                icon=${ICON_NAMES.ANNOUNCEMENT}
                label="고객센터 및 도움말"
              ></mm-menu-item-action>
              <mm-menu-item-action
                icon=${ICON_NAMES.LOG_OUT}
                label="로그아웃"
              ></mm-menu-item-action>
            </mm-menu-item-group>
            <mm-separator></mm-separator>
            <mm-flex gap="2">
              <mm-link variant="secondary" href="#">개인정보처리방침</mm-link>
              <mm-link variant="secondary" href="#">서비스 약관</mm-link>
            </mm-flex>
          </mm-popover>
          
*/

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
    return SITEMAP.filter(node => node.type === 'standalone' && node.id !== 'signifier').map(
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
