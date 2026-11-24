import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

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

    /* slot이 사이에 끼면 배경 상속이 끊겨, 자식이 부모 배경을 따르지 못한다. */
    slot {
      background: inherit;
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
