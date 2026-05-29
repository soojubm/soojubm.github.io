import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tagStyles, type TagTone } from './tag.styles'

@customElement('mm-tag')
export class Tag extends LitElement {
  @property({ type: String }) tone: TagTone = 'gray'

  static styles = [tagStyles]

  // 하위 클래스에서 기본 슬롯을 오버라이드할 수 있도록 분리
  protected renderDefaultSlot() {
    return html`<slot></slot>`
  }

  render() {
    return html`
      <span data-tone=${this.tone}>
        <slot name="icon"></slot>
        ${this.renderDefaultSlot()}
      </span>
    `
  }
}

export default Tag
