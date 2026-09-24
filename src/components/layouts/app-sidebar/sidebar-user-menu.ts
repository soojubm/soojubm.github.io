import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import type { Popover } from '@/components/overlay/popover/popover'

import '@/components/common/icon/icon'
import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/list-item/domain/user-item'
import { interactiveRowStyles } from '@/components/common/list-item/list-item.styles'
import '@/components/common/menu-item'
import '@/components/overlay/popover/popover'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * 사이드바 하단에 고정되는 현재 사용자 영역.
 * 행을 누르면 계정 명령 메뉴가 위로 열린다. 열기·닫기·aria는 mm-popover가 소유한다.
 */
@customElement('mm-sidebar-user-menu')
export class SidebarUserMenu extends LitElement {
  static styles = [
    resetStyles,
    interactiveRowStyles,
    css`
      :host {
        display: block;
      }

      mm-popover > button,
      mm-user-item {
        flex: 1;
      }
    `,
  ]
  @property({ type: String }) name = ''
  @property({ type: String }) description = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @query('mm-popover') private popoverEl?: Popover

  render() {
    return html`
      <mm-popover placement="top-left">
        <button slot="trigger" type="button" aria-haspopup="menu">
          <mm-user-item
            size="medium"
            label=${this.name}
            description=${this.description}
            avatar-src=${this.avatarSrc}
          >
            <mm-icon slot="trailing" name=${ICON_NAMES.MORE_ACTIONS} size="small"></mm-icon>
          </mm-user-item>
        </button>
        <mm-menu-item-group aria-label="계정" @click=${this.handleMenuClick}>
          <mm-menu-item-action icon=${ICON_NAMES.PROFILE} label="프로필"></mm-menu-item-action>
          <mm-menu-item-action icon=${ICON_NAMES.SETTINGS} label="설정"></mm-menu-item-action>
          <mm-menu-item-action icon=${ICON_NAMES.LOG_OUT} label="로그아웃"></mm-menu-item-action>
        </mm-menu-item-group>
      </mm-popover>
    `
  }

  // 명령을 고르면 메뉴를 닫는다.
  private handleMenuClick() {
    this.popoverEl?.close()
  }
}
