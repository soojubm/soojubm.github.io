import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { layerHeaderStyles } from '@/components/overlay/overlay.styles'
import { emit } from '@/utils'

@customElement('mm-layer-header')
class LayerHeader extends LitElement {
  static styles = layerHeaderStyles

  @property({ type: String, reflect: true }) role = 'navigation'
  @property({ type: String }) heading = ''

  render() {
    return html`
      <mm-heading level="2">${this.heading}</mm-heading>
      <mm-close-button @close=${this.handleClose}></mm-close-button>
    `
  }

  private handleClose = () => {
    emit(this, 'layerclose')
  }
}

export default LayerHeader
