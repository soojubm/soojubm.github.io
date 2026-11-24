import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import type { AriaCurrent } from '@/types'

import { stepItemStyles } from '@/components/indicators/step/step.styles'
import '@/components/common/text/text'

export type StepOrientation = 'horizontal' | 'vertical'

@customElement('mm-step-item')
export class StepItem extends LitElement {
  static styles = stepItemStyles
  /** @internal 순서를 소유한 mm-step이 채운다. */
  @property({ type: String, reflect: true }) orientation: StepOrientation = 'horizontal'
  /** @internal 순서를 소유한 mm-step이 채운다. */
  @property({ type: Number }) value = 1
  @property({ type: String }) label = ''
  @property({ type: Boolean, reflect: true }) active = false
  @property({ type: String, attribute: 'aria-current', reflect: true }) ariaCurrent: AriaCurrent =
    null
  @state() private hasContent = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'listitem')
  }

  render() {
    return html`
      ${this.renderMarker()} ${this.renderLabel()} ${this.renderContent()}
    `
  }

  /* 번호는 목록 안에서의 순서를 되풀이하므로 보조기술에는 라벨만 남긴다. */
  private renderMarker() {
    return html`
      <span class="marker" aria-hidden="true">${this.value}</span>
    `
  }

  private renderLabel() {
    return html`
      <mm-text class="label">${this.label}</mm-text>
    `
  }

  private renderContent() {
    return html`
      <div class="content" ?hidden=${!this.hasContent}>
        <slot @slotchange=${this.handleContentSlotChange}></slot>
      </div>
    `
  }

  private handleContentSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasContent = slot.assignedNodes({ flatten: true }).some(node => {
      if (node.nodeType === Node.TEXT_NODE) return !!node.textContent?.trim()

      return true
    })
  }
}
