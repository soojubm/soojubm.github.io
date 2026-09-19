import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/common/icon/icon'
import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemContent,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'
import { resetStyles, visuallyHiddenStyles } from '@/stylesheets/shared.styles'

/**
 * 메뉴에서 다른 곳으로 이동하는 링크 항목. 기본은 새 창으로 여는 외부 링크다.
 * 지금 보고 있는 페이지를 가리키는 내비게이션 링크 목록은 menu가 아니라 list로 읽히게 두고, 링크가 aria-current를 갖는다.
 */
@customElement('mm-menu-item-link')
export class MenuItemLink extends withMenuItemPresentation(LitElement) {
  static styles = [
    resetStyles,
    menuItemStyles,
    css`
      a > span {
        ${visuallyHiddenStyles};
      }
    `,
  ]
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) href = ''
  @property({ type: String }) target = '_blank'

  render() {
    return html`
      <a
        href=${ifDefined(this.disabled ? undefined : this.href)}
        role="menuitem"
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        target=${this.target || nothing}
        rel=${this.target === '_blank' ? 'noopener noreferrer' : nothing}
      >
        ${renderMenuItemContent(this, this.renderTrailing())}${this.renderNewTabNote()}
      </a>
    `
  }

  /** 새 창으로 열린다는 사실이 아이콘(시각)으로만 전달되지 않도록 링크 이름에 덧붙인다. */
  private renderNewTabNote() {
    if (this.target !== '_blank') return nothing

    return html`
      <span>새 창에서 열림</span>
    `
  }

  private renderTrailing() {
    return html`
      <slot name="trailing" slot="trailing">${this.renderDefaultTrailing()}</slot>
    `
  }

  private renderDefaultTrailing() {
    const name = this.target === '_blank' ? ICON_NAMES.SHARE : ICON_NAMES.FORWARD

    return html`
      <mm-icon name=${name} size="small"></mm-icon>
    `
  }
}
