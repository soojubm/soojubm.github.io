import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { ActionConfig } from '@/types'

import type { ButtonVariant } from '@/components/common/button/button'
import '@/components/common/text/semantics/text-block'

/**
 * <mm-hero-section>
 * 페이지 최상단에서 가장 먼저 읽히는 제목과 설명을 세우고, 그 아래에 행동 유도 영역을 둡니다.
 * 제목·설명은 level 1 텍스트 블록이 맡고, 행동 유도 버튼은 primaryAction·secondaryAction으로 받고, 목록 같은 그 밖의 후속 콘텐츠는 기본 슬롯으로 받습니다.
 */
@customElement('mm-hero-section')
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
      <mm-text-block
        level="1"
        heading=${this.heading}
        description=${this.description}
      ></mm-text-block>
      ${this.renderActions()}
      <slot></slot>
    `
  }

  // 히어로는 주 행동을 먼저, 보조 행동을 tertiary로 이어 둔다. dialog 계열의 버튼 쌍 규칙과 순서·variant가 달라 공유하지 않는다.
  private renderActions() {
    if (!this.primaryAction && !this.secondaryAction) return nothing

    return html`
      <mm-button-group>
        ${this.renderActionButton(this.primaryAction, 'primary')}
        ${this.renderActionButton(this.secondaryAction, 'tertiary')}
      </mm-button-group>
    `
  }

  private renderActionButton(action: ActionConfig | undefined, variant: ButtonVariant) {
    if (!action) return nothing

    return html`
      <mm-button
        variant=${variant}
        size="large"
        ?disabled=${action.disabled}
        @click=${() => action.onClick?.()}
      >
        ${action.label}
      </mm-button>
    `
  }
}
