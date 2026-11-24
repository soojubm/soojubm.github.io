import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { ICON_NAMES } from '@/components/common'

@customElement('mm-selected-indicator')
export class SelectedIndicator extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--size-24);
      height: var(--size-24);
    }

    mm-icon {
      visibility: hidden;
    }

    :host([selected]) mm-icon {
      visibility: visible;
    }
  `
  @property({ type: Boolean, reflect: true }) selected = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }

  render() {
    return html`
      <mm-icon name=${ICON_NAMES.CHECK}></mm-icon>
    `
  }
}
