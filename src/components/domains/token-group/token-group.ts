import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-token-group')
export class TokenGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: grid;
        gap: var(--space-2);
      }
    `,
  ]

  @queryAssignedElements({ selector: 'mm-token-item', flatten: true })
  private _items!: HTMLElement[]

  private _assignIndices = () => {
    this._items.forEach((item, index) => item.setAttribute('index', String(index + 1)))
  }

  render() {
    return html`
      <slot @slotchange=${this._assignIndices}></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token-group': TokenGroup
  }
}
