import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * viewport 상단 고정만 담당하는 레이아웃 primitive.
 * sticky로 흐름에 남아 자기 높이만큼 공간을 차지하므로, 뒤따르는 형제가 그 아래에서 시작한다.
 * 높이, 간격, 배경과 내부 배치는 사용처에서 결정한다.
 */
@customElement('mm-fixed-top')
export class FixedTop extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding-top: env(safe-area-inset-top);
      box-sizing: border-box;
      position: sticky;
      top: 0;
      z-index: var(--material-zindex-chrome);
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
