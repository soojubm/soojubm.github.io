import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/common/icon/icon-names'

import '@/components/common/dot/semantics/current-indicator'
import '@/components/common/list-item/list-item'
import { listItemInteractiveStyles } from '@/components/common/list-item/list-item.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import { isCurrentPage } from '@/utils'

@customElement('mm-sidebar-page-link')
export class SidebarPageLink extends LitElement {
  static styles = [
    resetStyles,
    css`
      a {
        ${listItemInteractiveStyles}
      }
    `,
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

  render() {
    const isCurrent = isCurrentPage(this.href)

    return html`
      <a href=${this.href} aria-current=${ifDefined(isCurrent ? 'page' : undefined)}>
        <mm-list-item
          avatar-variant="tertiary"
          label=${this.label}
          icon=${ifDefined(this.icon)}
          emoji=${ifDefined(this.emoji || undefined)}
        >
          ${this.renderCurrentIndicator(isCurrent)}
          <slot name="trailing" slot="trailing"></slot>
        </mm-list-item>
      </a>
    `
  }

  private renderCurrentIndicator(isCurrent: boolean) {
    if (!isCurrent) return nothing

    return html`
      <mm-current-indicator slot="trailing"></mm-current-indicator>
    `
  }
}
