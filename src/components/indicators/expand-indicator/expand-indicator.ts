import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { ICON_NAMES } from '@/components/common'

@customElement('mm-expand-indicator')
export class ExpandIndicator extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--size-24);
      height: var(--size-24);
    }

    mm-icon {
      transition: transform var(--transition-duration) var(--transition-easing);
    }

    :host([expanded]) mm-icon {
      transform: rotate(180deg);
    }
  `
  @property({ type: Boolean, reflect: true }) expanded = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }

  render() {
    return html`
      <mm-icon name=${ICON_NAMES.EXPAND}></mm-icon>
    `
  }
}
