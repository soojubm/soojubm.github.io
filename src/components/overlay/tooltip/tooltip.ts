import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { OverlayPlacement } from '@/components/overlay/overlay.styles'

import { TooltipBubble } from '@/components/overlay/tooltip/tooltip-bubble'
import { tooltipTriggerStyles } from '@/components/overlay/tooltip/tooltip.styles'

/** 말풍선은 트리거 아래에 뜨고, 정렬만 고른다. */
export type TooltipPlacement = Extract<OverlayPlacement, 'bottom' | 'bottom-start' | 'bottom-end'>

/**
 * 트리거를 감싸 hover·포커스를 듣고, 말풍선(mm-tooltip-bubble)을 띄우고 거두는 일을 소유합니다.
 * 말풍선은 portal 컨테이너로 옮겨지므로 처음 열릴 때 만들고, 연결이 끊기면 함께 지웁니다.
 * 트리거는 대개 다른 shadow root 안에 있어 id 참조(aria-describedby)가 닿지 않으므로, 내용은 대상 요소의 aria-description으로 직접 싣습니다.
 */
@customElement('mm-tooltip')
export class Tooltip extends LitElement {
  static styles = [tooltipTriggerStyles]
  @property({ type: String }) content = ''
  @property({ type: String, reflect: true }) placement: TooltipPlacement = 'bottom-start'
  @property({ type: Boolean, reflect: true }) open = false
  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private triggerElements!: Element[]
  private bubble?: TooltipBubble
  private descriptionTargets = new Set<HTMLElement>()
  private handleTriggerShow = () => {
    this.syncDescription()
    this.open = true
  }
  private handleTriggerHide = () => {
    this.open = false
  }
  private handleTriggerSlotChange = () => {
    this.syncDescription()
  }

  render() {
    return html`
      <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('mouseover', this.handleTriggerShow)
    this.addEventListener('mouseout', this.handleTriggerHide)
    this.addEventListener('focusin', this.handleTriggerShow)
    this.addEventListener('focusout', this.handleTriggerHide)
  }

  protected updated() {
    this.syncBubble()
  }

  disconnectedCallback() {
    this.removeEventListener('mouseover', this.handleTriggerShow)
    this.removeEventListener('mouseout', this.handleTriggerHide)
    this.removeEventListener('focusin', this.handleTriggerShow)
    this.removeEventListener('focusout', this.handleTriggerHide)
    this.clearDescriptionTargets()
    this.removeBubble()
    super.disconnectedCallback()
  }

  // 말풍선은 처음 열릴 때 만들어, 한 번도 보이지 않은 트리거는 문서에 아무것도 더하지 않는다.
  private syncBubble() {
    if (!this.bubble && !this.open) return

    this.bubble ??= this.createBubble()
    this.bubble.content = this.content
    this.bubble.placement = this.placement
    this.bubble.anchor = this
    this.bubble.open = this.open
  }

  // 연결되는 순간 말풍선이 스스로 portal 컨테이너로 옮겨간다.
  private createBubble() {
    const bubble = new TooltipBubble()
    this.renderRoot.append(bubble)
    return bubble
  }

  private removeBubble() {
    this.bubble?.remove()
    this.bubble = undefined
  }

  private findDescriptionTarget(element: Element): HTMLElement | null {
    const focusableSelector =
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    if (element instanceof HTMLElement && element.matches(focusableSelector)) return element

    const roots = [element.shadowRoot, element].filter(Boolean) as (ShadowRoot | Element)[]
    for (const root of roots) {
      for (const child of root.children) {
        const target = this.findDescriptionTarget(child)
        if (target) return target
      }
    }

    return null
  }

  private clearDescriptionTargets() {
    this.descriptionTargets.forEach(target => target.removeAttribute('aria-description'))
    this.descriptionTargets.clear()
  }

  // 트리거는 대개 다른 shadow root 안에 있어 id 참조(aria-describedby)가 닿지 않으므로 내용을 직접 싣는다.
  private syncDescription = () => {
    this.clearDescriptionTargets()

    this.triggerElements.forEach(element => {
      const target = this.findDescriptionTarget(element)
      // 이름과 같은 내용을 설명으로 다시 읽히지 않게 한다.
      if (!target || target.getAttribute('aria-label') === this.content) return

      target.setAttribute('aria-description', this.content)
      this.descriptionTargets.add(target)
    })
  }
}
