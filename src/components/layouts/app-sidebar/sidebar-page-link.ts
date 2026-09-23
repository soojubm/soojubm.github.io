import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/common/icon/icon-names'

import '@/components/common/list-item/list-item'
import { interactiveRowStyles } from '@/components/common/list-item/list-item.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import { isCurrentPage } from '@/utils'

/**
 * 사이드바에서 사이트 안의 한 페이지로 이동하는 링크 행.
 * 명령이 아니라 탐색이므로 menu가 아닌 list로 읽히고, 링크마다 자기 Tab 순서를 갖는다.
 * 지금 보고 있는 페이지인지는 주소로 알 수 있어 aria-current="page"를 스스로 판단한다.
 */
@customElement('mm-sidebar-page-link')
export class SidebarPageLink extends LitElement {
  static styles = [
    resetStyles,
    interactiveRowStyles,
    css`
      :host {
        display: block;
      }
    `,
  ]
  @property({ type: String }) href = ''
  @property({ type: String }) label = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'listitem')
  }

  render() {
    return html`
      <a href=${this.href} aria-current=${ifDefined(isCurrentPage(this.href) ? 'page' : undefined)}>
        <mm-list-item
          avatar-variant="tertiary"
          label=${this.label}
          icon=${ifDefined(this.icon)}
          emoji=${ifDefined(this.emoji || undefined)}
        >
          <slot name="trailing" slot="trailing"></slot>
        </mm-list-item>
      </a>
    `
  }
}
