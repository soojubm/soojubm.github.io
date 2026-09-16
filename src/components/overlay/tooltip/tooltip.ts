import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { tooltipStyles } from '@/components/overlay/overlay.styles'
import '@/components/common'

@customElement('mm-tooltip')
export class Tooltip extends LitElement {
  static styles = [tooltipStyles]
  @property({ type: String }) content = ''
  @property({ type: String, reflect: true }) placement = ''
  @property({ type: Boolean, reflect: true }) open = false
  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private triggerElements!: Element[]
  private descriptionTargets = new Set<HTMLElement>()
  private handleTriggerShow = () => {
    this.syncDescription()
    this.open = true
  }
  private handleTriggerHide = () => {
    this.open = false
  }

  render() {
    return html`
      <slot name="trigger" @slotchange=${this.syncDescription}></slot>
      <div role="tooltip">
        <mm-text size="12">${this.content}</mm-text>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('mouseover', this.handleTriggerShow)
    this.addEventListener('mouseout', this.handleTriggerHide)
    this.addEventListener('focusin', this.handleTriggerShow)
    this.addEventListener('focusout', this.handleTriggerHide)
  }

  disconnectedCallback() {
    this.removeEventListener('mouseover', this.handleTriggerShow)
    this.removeEventListener('mouseout', this.handleTriggerHide)
    this.removeEventListener('focusin', this.handleTriggerShow)
    this.removeEventListener('focusout', this.handleTriggerHide)
    this.clearDescriptionTargets()
    super.disconnectedCallback()
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
