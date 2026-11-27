import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { uniqueId } from '@/utils'
import '@/components/common'

@customElement('mm-search-group')
export class SearchGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
  `
  @property({ type: String }) heading?: string
  private readonly headingId = uniqueId('search-group-heading')

  render() {
    return html`
      ${this.renderHeading()}
      <mm-list-item-group
        gap="0"
        aria-labelledby=${ifDefined(this.heading ? this.headingId : undefined)}
      >
        <slot></slot>
      </mm-list-item-group>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <mm-heading level="5" id=${this.headingId}>${this.heading}</mm-heading>
    `
  }
}
