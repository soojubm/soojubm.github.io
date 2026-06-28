import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

@customElement('mm-token-group')
export class TokenGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
    `,
  ]

  @queryAssignedElements({ selector: 'mm-token-item', flatten: true })
  private items!: HTMLElement[]

  private assignIndices = () => {
    this.items.forEach((item, index) => item.setAttribute('index', String(index + 1)))
  }

  render() {
    return html`
      <mm-flex direction="column" gap="2">
        <slot @slotchange=${this.assignIndices}></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-group': TokenGroup
  }
}
