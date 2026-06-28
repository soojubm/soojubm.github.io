import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * viewport 하단 고정만 담당하는 레이아웃 primitive.
 * 높이, 간격, 배경과 내부 배치는 사용처에서 결정한다.
 */
@customElement('mm-fixed-bottom')
export class FixedBottom extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      padding-bottom: env(safe-area-inset-bottom);
      box-sizing: border-box;
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: var(--zindex-fixed-bottom);
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
    'mm-fixed-bottom': FixedBottom
  }
}

export default FixedBottom
