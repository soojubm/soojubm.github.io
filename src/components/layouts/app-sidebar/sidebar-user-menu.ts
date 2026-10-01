import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Popover } from '@/components/overlay/popover/popover'

import '@/components/common/icon/icon'
import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/list-item/domain/user-item'
import { interactiveRowStyles } from '@/components/common/list-item/list-item.styles'
import '@/components/common/menu-item'
import '@/components/overlay/popover/popover'
import { resetStyles } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'

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

      mm-user-item {
        flex: 1;
      }
    `,
  ]
  @property({ type: String }) name = ''
  @property({ type: String }) description = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  // popover는 portal로 옮겨져 한 트리에 모이므로, 인스턴스가 여럿이어도 id가 겹치지 않게 한다.
  private readonly menuId = uniqueId('account-menu')

  render() {
    return html`
      <button type="button" aria-haspopup="menu" aria-controls=${this.menuId}>
        <mm-user-item
          size="medium"
          label=${this.name}
          description=${this.description}
          avatar-src=${this.avatarSrc}
        >
          <mm-icon slot="trailing" name=${ICON_NAMES.MORE_ACTIONS} size="small"></mm-icon>
        </mm-user-item>
      </button>
      <mm-popover id=${this.menuId} placement="top-start">
        <mm-menu-item-group aria-label="계정" @click=${this.handleMenuClick}>
          <mm-menu-item-action icon=${ICON_NAMES.PROFILE} label="프로필"></mm-menu-item-action>
          <mm-menu-item-action icon=${ICON_NAMES.SETTINGS} label="설정"></mm-menu-item-action>
          <mm-menu-item-action icon=${ICON_NAMES.LOG_OUT} label="로그아웃"></mm-menu-item-action>
        </mm-menu-item-group>
      </mm-popover>
    `
  }

  // 명령을 고르면 메뉴를 닫는다. popover는 portal로 옮겨져 이 shadow에서 찾을 수 없어 이벤트가 닿은 자리에서 찾는다.
  private handleMenuClick(event: Event) {
    ;(event.currentTarget as HTMLElement).closest<Popover>('mm-popover')?.close()
  }
}
