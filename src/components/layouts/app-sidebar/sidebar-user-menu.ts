import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { Popover } from '@/components/overlay/popover/popover'

import '@/components/common/icon/icon'
import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/list-item/domain/user-item'
import { listItemInteractiveStyles } from '@/components/common/list-item/list-item.styles'
import '@/components/common/menu-item'
import '@/components/overlay/popover/popover'
import { resetStyles } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'

@customElement('fff-sidebar-user-menu')
export class SidebarUserMenu extends LitElement {
  static styles = [
    resetStyles,
    css`
      button {
        ${listItemInteractiveStyles}
      }
    `,
    css`
      :host {
        display: block;
      }

      fff-user-item {
        flex: 1;
      }
    `,
  ]
  @property({ type: String }) name = ''
  @property({ type: String }) description = ''
  @property({ attribute: false }) avatar?: { src?: string }
  // popover는 portal로 옮겨져 한 트리에 모이므로, 인스턴스가 여럿이어도 id가 겹치지 않게 한다.
  private readonly menuId = uniqueId('account-menu')

  render() {
    return html`
      <button type="button" aria-haspopup="menu" aria-controls=${this.menuId}>
        <fff-user-item
          size="medium"
          label=${this.name}
          description=${this.description}
          .avatar=${this.avatar}
        >
          <fff-icon slot="trailing" name=${ICON_NAMES.MORE_ACTIONS} size="small"></fff-icon>
        </fff-user-item>
      </button>
      <fff-popover id=${this.menuId} placement="top-start">
        <fff-menu-item-group aria-label="계정" @click=${this.handleMenuClick}>
          <fff-menu-item-action icon=${ICON_NAMES.PROFILE} label="프로필"></fff-menu-item-action>
          <fff-menu-item-action icon=${ICON_NAMES.SETTINGS} label="설정"></fff-menu-item-action>
          <fff-menu-item-action icon=${ICON_NAMES.LOG_OUT} label="로그아웃"></fff-menu-item-action>
        </fff-menu-item-group>
      </fff-popover>
    `
  }

  // 명령을 고르면 메뉴를 닫는다. popover는 portal로 옮겨져 이 shadow에서 찾을 수 없어 이벤트가 닿은 자리에서 찾는다.
  private handleMenuClick(event: Event) {
    ;(event.currentTarget as HTMLElement).closest<Popover>('fff-popover')?.close()
  }
}
