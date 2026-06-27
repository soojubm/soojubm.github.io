import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ICON_NAMES, type IconName } from '@/components/icon-button/semantics/icon-names'
import { avatarStyles } from '@/components/avatar/avatar.styles'

@customElement('mm-avatar')
export class Avatar extends LitElement {
  static styles = [avatarStyles]

  @property({ type: String, reflect: true }) variant = 'primary'
  @property({ type: String, reflect: true }) size = 'medium'
  @property({ type: String, reflect: true }) shape: 'circle' | 'square' = 'square'
  @property({ type: String }) src?: string
  @property({ type: String }) icon?: IconName

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

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
      <figure role="img" aria-label=${this.ariaLabel || 'avatar'}>
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
