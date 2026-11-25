import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { buildAttributeRules, type AttributeTokens } from '@/utils'

const gapTokens: AttributeTokens<'3' | '6'> = {
  '3': { gap: 'var(--space-3)' },
  '6': { gap: 'var(--space-6)' },
}

@customElement('mm-form-fieldset')
export class FormFieldset extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }

    ${unsafeCSS(buildAttributeRules('gap', gapTokens))}
  `
  @property({ type: String, reflect: true }) gap: '3' | '6' = '3'

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
