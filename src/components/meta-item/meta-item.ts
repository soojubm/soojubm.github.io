import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { metaItemStyles } from './meta-item.styles'

@customElement('mm-meta-item')
class MetaItem extends LitElement {
  @property({ type: String, reflect: true }) layout: 'horizontal' | 'stacked' | 'inline' =
    'horizontal'
  @property({ type: String }) label = ''
  @property({ type: String }) value = ''

  static styles = [metaItemStyles]

  render() {
    return html`
      <div class="meta-item">
        <mm-paragraph color="light">${this.label}</mm-paragraph>
        <mm-paragraph weight="bold">${this.value}</mm-paragraph>
      </div>
    `
  }
}

export default MetaItem
