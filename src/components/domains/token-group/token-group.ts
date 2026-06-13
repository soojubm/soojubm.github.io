import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
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

  private _assignIndices = () => {
    const slot = this.shadowRoot!.querySelector('slot')!
    slot
      .assignedElements({ flatten: true })
      .filter(el => el.tagName === 'MM-TOKEN-ITEM')
      .forEach((el, i) => el.setAttribute('index', String(i + 1)))
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
