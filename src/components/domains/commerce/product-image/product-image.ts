import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { surfaceBaseStyles, surfaceFilledStyles } from '@/components/common/surface/surface.styles'
import '@/components/common/thumbnail'

/**
 * mm-product-image
 * 상품 상세 첫 화면의 대표 이미지. 이미지를 면 한가운데 여백을 두고 올려 상품이 떠 보이게 한다.
 * 면은 surface와 같은 선언을 공유하되, 여백은 폭에 비례해 이미지와 면의 비율을 유지한다.
 */
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
