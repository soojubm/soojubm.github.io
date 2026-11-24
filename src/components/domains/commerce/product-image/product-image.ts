import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { surfaceBaseStyles, surfaceFilledStyles } from '@/components/common/surface/surface.styles'
import '@/components/common/thumbnail'

@customElement('mm-product-image')
export class ProductImage extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      ${surfaceFilledStyles};
      --surface-padding: 10%;
    }
  `
  @property({ type: String }) src = ''
  @property({ type: String }) alt = ''

  render() {
    return html`
      <mm-thumbnail src=${this.src} alt=${this.alt} ratio="1:1"></mm-thumbnail>
    `
  }
}
