import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-page')
export class Page extends LitElement {
  /** 콘텐츠 최대 너비. 'small' = var(--layout-width-small) */
  @property({ type: String, reflect: true }) width: 'small' | 'medium' | '' = ''
  /** 페이지 레이아웃 변형. 'chat' = full-height flex column */
  @property({ type: String, reflect: true }) layout: 'chat' | '' = ''

  static styles = css`
    :host {
      display: block;
      min-height: calc(100vh - var(--navbar-height) - var(--width-small));
      padding: var(--space-4) var(--grid-margin) calc(var(--space-4) * 6);
      position: relative;
    }

    :host([width='small']) {
      max-width: var(--layout-width-small);
      box-sizing: content-box;
    }

    :host([width='medium']) {
      max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
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

    :host([layout='chat']) ::slotted(mm-chat-room) {
      flex: 1;
      min-height: 0;
    }
  `

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-page': Page
  }
}
