import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ICON_NAMES } from '../icon-button/semantics/icon-names'
import { avatarStyles } from './avatar.styles'

@customElement('mm-avatar')
export class Avatar extends LitElement {
  @property({ type: String }) variant = 'primary'
  @property({ type: String }) size = 'medium'
  @property({ type: String }) shape: 'circle' | 'square' = 'square'
  @property({ type: String }) src?: string
  @property({ type: String }) icon?: string

  // aria-label을 컴포넌트 템플릿 내부에서 안전하게 사용하기 위해 명시
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel: string | null = null

  static styles = [avatarStyles]

  // Slot 콘텐츠 존재 여부를 추적하기 위한 내부 상태
  @state() private hasSlottedContent = false

  // Slot 내용이 변경될 때마다 호출되어 상태를 업데이트합니다.
  private handleSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement
    const nodes = slot.assignedNodes({ flatten: true })

    // 유효한 텍스트 노드나 엘리먼트 노드가 있는지 확인
    this.hasSlottedContent = nodes.some(
      node =>
        (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') ||
        node.nodeType === Node.ELEMENT_NODE,
    )
  }

  render() {
    const isLargeIcon = this.size === 'large' || this.size === 'huge'
    const iconSize = isLargeIcon ? 'large' : 'medium'

    return html`
      <figure
        part="avatar"
        role="img"
        data-size=${this.size}
        data-variant=${this.variant}
        data-shape=${this.shape}
        aria-label=${this.ariaLabel || 'avatar'}
      >
        ${this.renderAvatarContent(iconSize)}
      </figure>
    `
  }

  // 복잡한 조건부 렌더링을 별도의 헬퍼 메서드로 분리하여 가독성 향상
  private renderAvatarContent(iconSize: string) {
    // 1. 이미지가 최우선 순위
    if (this.src) {
      return html`
        <img src=${this.src} alt=${this.ariaLabel || 'avatar'} />
      `
    }

    // 2. 이미지가 없으면 아이콘
    if (this.icon) {
      return html`
        <mm-icon name=${this.icon} size=${iconSize}></mm-icon>
      `
    }

    // 3. 둘 다 없으면 Slot(이니셜 텍스트 등) 렌더링. Slot 내용도 없으면 기본 아이콘 렌더링
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      ${!this.hasSlottedContent
        ? html`
            <mm-icon name=${ICON_NAMES.PEOPLE_TAG} size=${iconSize}></mm-icon>
          `
        : nothing}
    `
  }
}

export default Avatar
