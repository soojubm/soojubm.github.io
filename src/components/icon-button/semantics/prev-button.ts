import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import '../icon-button'
import { emit } from '../../../utils/emit'

@customElement('mm-prev-button')
export class PrevButton extends LitElement {
  @property({ type: Boolean }) disabled = false

  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  private _handleClick = () => {
    if (this.disabled) return
    emit(this, 'prev')
  }

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.PREVIOUS}
        variant="secondary"
        aria-label="이전"
        ?disabled=${this.disabled}
        @click=${this._handleClick}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-prev-button': PrevButton
  }
}
