import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { NoticeVariant } from '@/components/common/notice/notice'

import '@/components/common'

type ComponentNoticeVariant = 'todo' | 'exception'

const VARIANTS = {
  todo: { tone: 'info', label: 'TODO' },
  exception: { tone: 'info', label: '예외' },
} as const satisfies Record<ComponentNoticeVariant, { tone: NoticeVariant; label: string }>

/**
 * 가이드 문서에서 규칙 목록과 떼어 보여 주는 notice.
 * todo는 아직 정하지 않았거나 만들지 않은 것을, exception은 규칙을 벗어나는 사례를 알린다.
 * heading에 그 내용을, 기본 slot에 사례와 이유를 둔다.
 */
@customElement('mm-component-notice')
export class ComponentNotice extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) variant: ComponentNoticeVariant = 'todo'
  @property({ type: String }) heading = ''

  render() {
    const { tone, label } = VARIANTS[this.variant]

    return html`
      <mm-notice variant=${tone} heading="${label}: ${this.heading}">
        <mm-text size="14"><slot></slot></mm-text>
      </mm-notice>
    `
  }
}
