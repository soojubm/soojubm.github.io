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
  @property({ type: String, attribute: 'aria-expanded', reflect: true }) override ariaExpanded =
    'false'
  @property({ type: String, attribute: 'aria-controls' }) override ariaControls: string | null =
    null
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
        .ariaLabel=${this.ariaLabel}
        aria-haspopup="menu"
        .ariaExpanded=${this.ariaExpanded}
        .ariaControls=${this.ariaControls}
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
