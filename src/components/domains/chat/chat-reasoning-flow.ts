import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import '@/components/common'

export type ChatReasoningFlowStatus = 'complete' | 'current' | 'pending'
/**
 * reasoning 단계 하나. status(완료·진행 중·진행 전)는 mm-chat-reasoning이 채웁니다.
 *
 * <mm-chat-reasoning-flow label="관련 자료 탐색 중"></mm-chat-reasoning-flow>
 */
@customElement('mm-chat-reasoning-flow')
export class ChatReasoningFlow extends LitElement {
  static styles = css`
    :host {
      --marker-size: var(--size-16);

      display: grid;
      grid-template-columns: var(--marker-size) 1fr;
      column-gap: var(--space-1);
      padding-bottom: var(--space-2);
    }

    :host([hidden]) {
      display: none;
    }

    :host(:last-child) {
      padding-bottom: 0;
    }

    .marker {
      display: flex;
      align-items: center;
      justify-content: center;
      width: var(--marker-size);
      height: var(--marker-size);
      border-radius: 50%;
      color: var(--foreground-color);
      /* 진행 중은 실선 링. 점선·실선 링은 separator에 없어 outline으로 그린다. */
      outline: var(--border-width) solid var(--foreground-color);
      outline-offset: calc(var(--border-width) * -1);
    }

    :host([status='complete']) .marker {
      outline: none;
    }

    .content {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    /* 진행 전: 점선 마커. 점선 선택지가 separator에 없어 outline으로 그린다. */
    :host([status='pending']) .marker {
      outline-style: dashed;
      outline-color: var(--border-color);
    }

    :host([status='pending']) .label {
      color: var(--foreground-subtle-color);
    }
  `
  /** @internal 순서를 소유한 mm-chat-reasoning이 채운다. */
  @property({ type: String, reflect: true }) status: ChatReasoningFlowStatus = 'pending'
  @property({ type: String }) label = ''

  render() {
    return html`
      <span class="marker" aria-hidden="true">${this.renderCompleteIndicator()}</span>
      <div class="content" aria-current=${this.status === 'current' ? 'step' : nothing}>
        ${this.renderLabel()}
      </div>
    `
  }

  private renderCompleteIndicator() {
    if (this.status !== 'complete') return nothing

    return html`
      <mm-icon name=${ICON_NAMES.CHECK} size="12"></mm-icon>
    `
  }

  private renderLabel() {
    if (!this.label) return nothing

    return html`
      <mm-text class="label" size="14">${this.label}</mm-text>
    `
  }
}
