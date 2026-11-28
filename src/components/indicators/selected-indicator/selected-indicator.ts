import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { ICON_NAMES } from '@/components/common'
import { indicatorBoxStyles } from '@/components/indicators/indicator.styles'

@customElement('fff-selected-indicator')
export class SelectedIndicator extends LitElement {
  static styles = css`
    :host {
      ${indicatorBoxStyles};
    }

    fff-icon {
      visibility: hidden;
    }

    :host([selected]) fff-icon {
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
      <fff-icon name=${ICON_NAMES.CHECK}></fff-icon>
    `
  }
}
