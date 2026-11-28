import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { MEDIA } from '@/constants'

@customElement('fff-main')
export class Main extends LitElement {
  static styles = css`
    :host {
      --main-padding-left: var(--sidebar-content-shift);

      display: block;
      min-height: calc(100vh - var(--navbar-height));
      max-width: var(--layout-width-full);
      padding: var(--layout-main-space-top) var(--layout-padding-inline) calc(var(--space-4) * 6);
      padding-left: var(--main-padding-left);
      box-sizing: border-box;
      background-color: var(--background-color);
      position: relative;
      transition: padding-left var(--sidebar-transition-duration) var(--sidebar-transition-easing);
    }

    :host([background='subtle']) {
      background-color: var(--background-subtle-color);
      box-shadow: 0 0 0 100vmax var(--background-subtle-color);
      clip-path: inset(0 -100vmax);
    }

    :host([full-width]) {
      --main-padding-left: 0;

      padding-right: 0;
    }

    :host([width='large']),
    :host([width='small']),
    :host([width='narrow']) {
      --main-padding-left: var(--layout-padding-inline);

      max-width: var(--layout-width-small);
      margin: 0 auto;
      box-sizing: content-box;
    }

    :host([width='large']) {
      max-width: var(--layout-width-large);
    }

    :host([width='narrow']) {
      max-width: var(--layout-width-narrow);
    }

    :host([layout='chat']) {
      display: flex;
      flex-direction: column;
      height: calc(100vh - var(--navbar-height));
      padding: 0;
      overflow: hidden;
    }

    :host([layout='chat']) ::slotted(fff-chat-room) {
      flex: 1;
      min-height: 0;
    }

    :host([layout='split']) {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
      gap: var(--layout-padding-inline);
    }

    :host([layout='split']) ::slotted(:first-child) {
      align-self: start;
      position: sticky;
      top: calc(var(--navbar-height) + var(--layout-main-space-top));
    }

    @media ${MEDIA.narrow} {
      :host([layout='split']) {
        grid-template-columns: minmax(0, 1fr);
      }

      :host([layout='split']) ::slotted(:first-child) {
        position: static;
      }
    }
  `
  @property({ type: String, reflect: true }) width: 'large' | 'small' | 'narrow' | '' = ''
  @property({ type: String, reflect: true }) layout: 'chat' | 'split' | '' = ''
  @property({ type: String, reflect: true }) background: 'subtle' | '' = ''
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'main')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
