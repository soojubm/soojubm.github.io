import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

type Direction = 'row' | 'column'
type Justify   = 'start' | 'center' | 'end' | 'between' | 'around'
type Align     = 'start' | 'center' | 'end'

const justifyMap: Record<Justify, string> = {
  start:   'flex-start',
  center:  'center',
  end:     'flex-end',
  between: 'space-between',
  around:  'space-around',
}

const alignMap: Record<Align, string> = {
  start:  'flex-start',
  center: 'center',
  end:    'flex-end',
}

@customElement('mm-button-group')
export class ButtonGroup extends LitElement {
  /** 배치 방향 */
  @property({ type: String }) direction: Direction = 'row'
  /** 주축 정렬 (justify-content) */
  @property({ type: String }) justify: Justify = 'start'
  /** 교차축 정렬 (align-items) */
  @property({ type: String }) align: Align = 'center'
  /** 간격 토큰 번호 (1~6 → var(--space-N)) */
  @property({ type: String }) gap = '2'
  /** 자식 요소 flex: 1 (동일 너비/높이 분배) */
  @property({ type: Boolean, reflect: true }) stretch = false
  /** flex-wrap 허용 */
  @property({ type: Boolean }) wrap = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
      }

      .group {
        display: flex;
        width: 100%;
      }

      /* stretch: 자식 flex: 1 */
      :host([stretch]) .group ::slotted(*) {
        flex: 1;
      }
    `,
  ]

  render() {
    const styles = [
      `flex-direction: ${this.direction}`,
      `justify-content: ${justifyMap[this.justify] ?? 'flex-start'}`,
      `align-items: ${alignMap[this.align] ?? 'center'}`,
      `gap: var(--space-${this.gap})`,
      `flex-wrap: ${this.wrap ? 'wrap' : 'nowrap'}`,
    ].join('; ')

    return html`
      <div class="group" role="group" style=${styles}>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-button-group': ButtonGroup
  }
}
