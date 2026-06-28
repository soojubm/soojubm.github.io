import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/text/text'
import type { TextSize } from '@/components/text/text.styles'

export type HeadingLevel = 1 | 2 | 3 | 4

/** level(1–4)별 의미 단계(h1–h4)와 페어링하는 타입 스케일 크기 */
const LEVEL_SIZE: Record<HeadingLevel, TextSize> = {
  1: '32',
  2: '18',
  3: '14',
  4: '12',
}

/**
 * <mm-heading>
 * 화면 안에서 주요 콘텐츠 묶음을 구분하는 제목입니다.
 * level(1–4)로 의미 단계(h1–h4)와 크기를 함께 지정하며, 기본값은 2입니다.
 */
@customElement('mm-heading')
export class Heading extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ type: Number, reflect: true }) level: HeadingLevel = 2

  render() {
    const size = LEVEL_SIZE[this.level] ?? '18'
    return html`
      <mm-text as="h${this.level}" size="${size}" weight="bold">
        <slot></slot>
      </mm-text>
    `
  }
}
