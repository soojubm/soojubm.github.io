import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from './icon-names'
import '../icon-button'

/**
 * 추가 액션 메뉴를 여는 버튼.
 */
@customElement('mm-more-button')
export class MoreButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel = '더보기'
  @property({ type: Boolean, reflect: true }) expanded = false
  @property({ type: String, attribute: 'aria-controls' }) controls = ''
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  render() {
    return html`
      <mm-icon-button
        variant="secondary"
        icon=${ICON_NAMES.MORE_ACTIONS}
        tooltip="더보기"
        tooltip-placement="center"
        aria-label=${this.ariaLabel}
        aria-haspopup="menu"
        aria-expanded=${this.expanded ? 'true' : 'false'}
        aria-controls=${this.controls || nothing}
        ?disabled=${this.disabled}
      ></mm-icon-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-more-button': MoreButton
  }
}
