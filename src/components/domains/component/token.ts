import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/heading'
import '@/components/common/tag/semantics/keyword-tag'
import { tokenStyles } from '@/components/domains/component/component.styles'
import { categoryNameAt, tokenCategoryLabel } from '@/components/domains/component/token.utils'
import '@/components/common/meta-item'

/**
 * 개별 CSS 커스텀 프로퍼티(토큰) 행.
 * mm-component-tokens 안에서만 사용합니다.
 * 앞선 행과 카테고리가 같으면 mm-component-tokens가 showCategory=false를 넘겨 태그 반복을 생략한다.
 */
@customElement('mm-token')
export class Token extends LitElement {
  static styles = [tokenStyles]

  @property({ type: String }) name = ''
  @property({ type: Boolean }) showCategory = true

  render() {
    return html`
      <div class="token-row">
        <div class="token-category">${this.renderCategoryTag()}</div>
        <mm-meta-item layout="stacked" label=${this.formatName()}></mm-meta-item>
      </div>
    `
  }

  private renderCategoryTag() {
    const label = tokenCategoryLabel(this.name)
    if (!label || !this.showCategory) return nothing

    return html`
      <mm-keyword-tag>${label}</mm-keyword-tag>
    `
  }

  // state/surface/dimension 그룹이 바뀌는 경계에서만 '-'를 '.'으로 바꿔, 같은 그룹의 합성어(border-radius 등)는
  // 계속 '-'로 붙어 보이게 하면서 그룹 전환은 시각적으로 구분되게 한다.
  private formatName() {
    const parts = this.name.split('-')
    const categories = parts.map((_, index) => categoryNameAt(index, parts))

    return parts.reduce((result, word, index) => {
      if (index === 0) return word

      const sameCategory = categories[index] && categories[index] === categories[index - 1]
      return `${result}${sameCategory ? '-' : '.'}${word}`
    }, '')
  }
}
