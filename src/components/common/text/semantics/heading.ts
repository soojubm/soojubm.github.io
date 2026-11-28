import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/text'
import type { TextSize } from '@/components/common/text/text.styles'

export type HeadingLevel = 1 | 2 | 3 | 4 | 5

/** level(1–5)별 의미 단계(h1–h5)와 페어링하는 타입 스케일 크기 */
const LEVEL_SIZE: Record<HeadingLevel, TextSize> = {
  1: '32',
  2: '24',
  3: '18',
  4: '14',
  5: '12',
}

@customElement('fff-heading')
export class Heading extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    /* 가장 낮은 단계는 그룹 라벨로 쓰여 본문보다 한 단계 물러난다. */
    :host([level='5']) {
      color: var(--foreground-subtle-color);
    }
  `
  @property({ type: Number, reflect: true }) level: HeadingLevel = 2

  render() {
    const size = LEVEL_SIZE[this.level] ?? '24'
    return html`
      <fff-text as="h${this.level}" size=${size} weight="bold">
        <slot></slot>
      </fff-text>
    `
  }
}
