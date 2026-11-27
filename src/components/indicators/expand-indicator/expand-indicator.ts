import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { ICON_NAMES } from '@/components/common'
import { indicatorBoxStyles } from '@/components/indicators/indicator.styles'

@customElement('mm-expand-indicator')
export class ExpandIndicator extends LitElement {
  static styles = css`
    :host {
      ${indicatorBoxStyles};
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
