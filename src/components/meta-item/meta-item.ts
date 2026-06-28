import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { metaItemStyles } from '@/components/meta-item/meta-item.styles'

@customElement('mm-meta-item')
class MetaItem extends LitElement {
  static styles = [metaItemStyles]

  @property({ type: String, reflect: true }) layout: 'horizontal' | 'stacked' | 'inline' =
    'horizontal'
  @property({ type: String }) label = ''
  @property({ type: String }) value = ''
  @property({ type: String, attribute: 'value-size' }) valueSize: 'medium' | 'large' = 'medium'

  render() {
    return html`
      <mm-paragraph color="light">${this.label}</mm-paragraph>
      <mm-paragraph size=${this.valueSize}>${this.value}</mm-paragraph>
    `
  }
}

export default MetaItem
