import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { layerBodyStyles } from '@/components/overlay/layer/layer.styles'
import '@/components/common/scroll/scroll'

@customElement('mm-layer-body')
class LayerBody extends LitElement {
  static styles = layerBodyStyles

  render() {
    return html`
      <mm-scroll direction="column">
        <slot></slot>
      </mm-scroll>
    `
  }
}

export default LayerBody
