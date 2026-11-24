import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

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
      z-index: var(--material-zindex-chrome);
    }

    :host([hidden]) {
      display: none;
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
