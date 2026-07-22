import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * viewport 상단 고정만 담당하는 레이아웃 primitive.
 * 높이, 간격, 배경과 내부 배치는 사용처에서 결정한다.
 */
@customElement('mm-fixed-top')
export class FixedTop extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      padding-top: env(safe-area-inset-top);
      box-sizing: border-box;
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      z-index: var(--material-zindex-chrome);
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-fixed-top': FixedTop
  }
}

export default FixedTop
