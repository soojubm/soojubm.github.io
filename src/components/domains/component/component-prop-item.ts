import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/meta-item'

/**
 * mm-meta-item으로 name/type을 표시합니다.
 * mm-component-props 안에서만 사용합니다.
 */
@customElement('mm-component-prop-item')
export class ComponentPropItem extends LitElement {
  @property({ type: String }) name = ''
  @property({ type: String }) type = ''
  @property({ type: String }) kind?: 'event'
  @property({ type: Boolean }) optional = false

  render() {
    return html`
      <mm-meta-item layout="stacked" label=${this.formatLabel()} value=${this.type}></mm-meta-item>
    `
  }

  private formatLabel() {
    if (this.kind === 'event') return `@${this.name}`

    return `${this.name}${this.optional ? '?' : ''}`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-component-prop-item': ComponentPropItem
  }
}
