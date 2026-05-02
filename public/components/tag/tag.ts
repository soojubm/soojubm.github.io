import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tagStyles } from './tag.styles'

@customElement('mm-tag')
export class Tag extends LitElement {
  // 속성이 비어있을 수 있으므로 선택적 속성(?)으로 정의하여 타입 안정성을 높입니다.
  @property({ type: String }) variant?: string
  @property({ type: String }) datetime?: string

  static styles = [tagStyles]

  render() {
    // 공통으로 사용되는 내부 콘텐츠를 변수로 추출하여 중복(DRY)을 제거합니다.
    const innerContent = html`
      <slot name="icon"></slot>
      <slot></slot>
    `

    // datetime 유무에 따라 시맨틱 태그를 다르게 렌더링합니다.
    if (this.datetime) {
      return html`
        <time data-variant=${this.variant || nothing} datetime=${this.datetime}>
          ${innerContent}
        </time>
      `
    }

    return html`
      <span data-variant=${this.variant || nothing}> ${innerContent} </span>
    `
  }
}

export default Tag
