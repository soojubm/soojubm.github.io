import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { metaItemStyles } from './meta-item.styles'

@customElement('mm-meta-item')
class MetaItem extends LitElement {
  @property({ type: String, reflect: true }) layout: 'horizontal' | 'stacked' | 'inline' = 'horizontal'
  @property({ type: String }) label = ''
  @property({ type: String }) value = ''

  static styles = [metaItemStyles]

  render() {
    return html`
      <div class="meta-item">
        <mm-text size="14" color="var(--color-foreground-light)">${this.label}</mm-text>
        <mm-text size="14" weight="bold">${this.value}</mm-text>
      </div>
    `
  }
}

export default MetaItem
