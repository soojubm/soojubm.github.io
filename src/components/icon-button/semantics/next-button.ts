import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import '../icon-button'
import { emit } from '../../../utils/emit'

@customElement('mm-next-button')
export class NextButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property({ type: Boolean }) disabled = false

  private _handleClick = () => {
    if (this.disabled) return
    emit(this, 'next')
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.NEXT}
        variant="secondary"
        aria-label="다음"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-next-button': NextButton
  }
}
