import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-page')
export class Page extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: calc(100vh - var(--navbar-height));
      padding: var(--space-4) var(--layout-padding-inline) calc(var(--space-4) * 6);
      position: relative;
    }

    :host([background='subtle']) {
      background-color: var(--color-background-subtle);
      box-shadow: 0 0 0 100vmax var(--color-background-subtle);
      clip-path: inset(0 -100vmax);
    }

    :host([full-width]) {
      padding-right: 0;
      padding-left: 0;
    }

    :host([width='small']) {
      max-width: var(--layout-width-small);
      margin: 0 auto;
      box-sizing: content-box;
    }

    :host([width='medium']) {
      max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
      margin: 0 auto;
      box-sizing: content-box;
    }

    :host([layout='chat']) {
      display: flex;
      flex-direction: column;
      max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
      margin: 0 auto;
      height: calc(100vh - var(--navbar-height));
      padding: 0;
      overflow: hidden;
    }

    :host([layout='chat'][full-width]) {
      max-width: none;
    }

    :host([layout='chat']) ::slotted(mm-chat-room) {
      flex: 1;
      min-height: 0;
    }
  `

  @property({ type: String, reflect: true }) width: 'small' | 'medium' | '' = ''
  @property({ type: String, reflect: true }) layout: 'chat' | '' = ''
  @property({ type: String, reflect: true }) background: 'subtle' | '' = ''
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-page': Page
  }
}
