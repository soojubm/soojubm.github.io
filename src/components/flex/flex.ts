import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

type Direction = 'row' | 'column'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around'
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline'

const justifyMap: Record<Justify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

const alignMap: Record<Align, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}

/**
 * 범용 flexbox 레이아웃 프리미티브.
 * 의미별 그룹핑(button/tag/avatar 등)은 각 시멘틱 컴포넌트가 담당하고,
 * mm-flex 는 순수 레이아웃만 책임진다.
 */
@customElement('mm-flex')
export class Flex extends LitElement {
  /** 배치 방향 */
  @property({ type: String }) direction: Direction = 'row'
  /** 주축 정렬 (justify-content) */
  @property({ type: String }) justify: Justify = 'start'
  /** 교차축 정렬 (align-items) */
  @property({ type: String }) align: Align = 'stretch'
  /** 간격. 숫자 토큰(0~6 → var(--space-N)) 또는 임의의 CSS 길이값 */
  @property({ type: String }) gap = '2'
  /** 줄바꿈 허용 여부 */
  @property({ type: Boolean }) wrap = false
  /** 자식 요소 flex: 1 (동일 너비/높이 분배) */
  @property({ type: Boolean, reflect: true }) stretch = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
      }

      .flex {
        display: flex;
        width: 100%;
      }

      :host([stretch]) .flex ::slotted(*) {
        flex: 1;
      }
    `,
  ]

  render() {
    const gap = /^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap
    const styles = [
      `flex-direction: ${this.direction}`,
      `justify-content: ${justifyMap[this.justify] ?? 'flex-start'}`,
      `align-items: ${alignMap[this.align] ?? 'stretch'}`,
      `gap: ${gap}`,
      `flex-wrap: ${this.wrap ? 'wrap' : 'nowrap'}`,
    ].join('; ')

    return html`
      <div class="flex" role="group" style=${styles}>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-flex': Flex
  }
}
