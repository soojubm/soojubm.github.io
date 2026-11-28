import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { uniqueId } from '@/utils'
import '@/components/common'

@customElement('fff-search-group')
export class SearchGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
  `
  @property({ type: String }) heading?: string
  @property({ type: String }) gap: '0' | '2' = '0'
  private readonly headingId = uniqueId('search-group-heading')

  render() {
    return html`
      ${this.renderHeading()}
      <fff-list-item-group
        gap=${this.gap}
        aria-labelledby=${ifDefined(this.heading ? this.headingId : undefined)}
      >
        <slot></slot>
      </fff-list-item-group>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <fff-heading level="5" id=${this.headingId}>${this.heading}</fff-heading>
    `
  }
}
