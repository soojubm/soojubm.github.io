import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../grid/grid'

type Columns = 1 | 2 | 3 | 4

/**
 * mm-feature 들을 열 단위로 묶는 그룹.
 * 레이아웃은 mm-grid에 위임하고, gap 기본값은 8이다.
 */
@customElement('mm-feature-group')
export class FeatureGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  /** 칼럼 수. 1 | 2 | 3 | 4 */
  @property({ type: Number }) columns: Columns = 2

  /** 간격. 숫자면 --space-{n}, 그 외엔 그대로. e.g. '8', '1rem' */
  @property({ type: String }) gap = '8'

  /** 칼럼 최대 너비. e.g. '400px' */
  @property({ attribute: 'column-max-width' }) columnMaxWidth?: string

  render() {
    return html`
      <mm-grid
        columns=${this.columns}
        column-max-width=${this.columnMaxWidth ?? ''}
        gap=${this.gap}
        role="group"
      >
        <slot></slot>
      </mm-grid>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-feature-group': FeatureGroup
  }
}
