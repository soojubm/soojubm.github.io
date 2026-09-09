import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/common/menu-item/menu-item-group'
import '@/components/common/text/semantics/heading'
import type { MenuItemGroupSize } from '@/components/common/menu-item/menu-item-group'

import { resetStyles } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'

/**
 * 소제목과 메뉴 항목 목록을 한 묶음으로 전시하는 컴포넌트.
 * heading을 실제 제목 요소로 렌더하고 내부 mm-menu-item-group에 aria-labelledby로 연결한다.
 * 항목 배치·역할(role=menu)은 mm-menu-item-group이 그대로 소유하고, 이 컴포넌트는 제목과의 조립만 맡는다.
 */
@customElement('mm-menu-list')
export class MenuList extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      mm-heading {
        color: var(--foreground-subtle-color);
      }
    `,
  ]

  @property({ type: String }) heading = ''
  @property({ type: String }) size: MenuItemGroupSize = ''

  private readonly headingId = uniqueId('menu-list-heading')

  render() {
    return html`
      ${this.renderHeading()}
      <mm-menu-item-group
        size=${this.size}
        aria-labelledby=${ifDefined(this.heading ? this.headingId : undefined)}
      >
        <slot></slot>
      </mm-menu-item-group>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <mm-heading level="4" id=${this.headingId}>${this.heading}</mm-heading>
    `
  }
}
