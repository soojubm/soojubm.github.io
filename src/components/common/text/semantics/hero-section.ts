import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { ActionConfig } from '@/types'

import type { ButtonVariant } from '@/components/common/button/button'
import '@/components/common/text/semantics/text-block'

@customElement('fff-hero-section')
export class HeroSection extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: var(--space-8);
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ attribute: false }) primaryAction?: ActionConfig
  @property({ attribute: false }) secondaryAction?: ActionConfig

  render() {
    return html`
      <fff-text-block
        level="1"
        heading=${this.heading}
        description=${this.description}
      ></fff-text-block>
      ${this.renderActions()}
      <slot></slot>
    `
  }

  // 히어로는 주 행동을 먼저, 보조 행동을 tertiary로 이어 둔다. dialog 계열의 버튼 쌍 규칙과 순서·variant가 달라 공유하지 않는다.
  private renderActions() {
    if (!this.primaryAction && !this.secondaryAction) return nothing

    return html`
      <fff-button-group>
        ${this.renderActionButton(this.primaryAction, 'primary')}
        ${this.renderActionButton(this.secondaryAction, 'tertiary')}
      </fff-button-group>
    `
  }

  private renderActionButton(action: ActionConfig | undefined, variant: ButtonVariant) {
    if (!action) return nothing

    return html`
      <fff-button
        variant=${variant}
        size="large"
        ?disabled=${action.disabled}
        @click=${() => action.onClick?.()}
      >
        ${action.label}
      </fff-button>
    `
  }
}
