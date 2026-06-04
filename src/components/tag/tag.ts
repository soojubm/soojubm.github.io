import { LitElement, html, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tagStyles, type TagTone } from './tag.styles'

@customElement('mm-tag')
export class Tag extends LitElement {
  @property({ type: String, reflect: true }) tone: TagTone = 'default'

  static styles = [tagStyles]

  /**
   * 서브클래스가 "특정 prop → tone 자동 매핑"을 선언하는 훅.
   * { watchProp: 감시할 prop 키, toneMap: 값→TagTone 매핑 객체 } 를 반환하면
   * 해당 prop이 바뀔 때마다 tone이 자동으로 갱신됩니다.
   */
  protected get toneMapping(): { watchProp: string; toneMap: Record<string, TagTone> } | null {
    return null
  }

  override willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)
    const mapping = this.toneMapping
    if (mapping && (changedProperties as Map<string, unknown>).has(mapping.watchProp)) {
      const val = (this as Record<string, unknown>)[mapping.watchProp] as string
      if (val in mapping.toneMap) this.tone = mapping.toneMap[val]
    }
  }

  // 하위 클래스에서 기본 슬롯을 오버라이드할 수 있도록 분리
  protected renderDefaultSlot() {
    return html`<slot></slot>`
  }

  render() {
    return html`
      <span>
        <slot name="icon"></slot>
        ${this.renderDefaultSlot()}
      </span>
    `
  }
}

export default Tag
