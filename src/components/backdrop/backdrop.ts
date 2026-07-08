import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-backdrop')
export class Backdrop extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      inset: 0;
      background: var(--color-backdrop);
      z-index: var(--zindex-backdrop);

      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 180ms ease, visibility 0s linear 180ms;
    }

    :host([open]) {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transition: opacity 180ms ease, visibility 0s;
    }
  `

  @property({ type: Boolean, reflect: true }) open = false

  render() {
    return html`
      <slot></slot>
    `
  }
}

export default Backdrop
