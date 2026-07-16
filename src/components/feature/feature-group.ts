import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import '@/components/grid/grid'

type Columns = 1 | 2 | 3 | 4

/**
 * mm-feature 들을 열 단위로 묶는 그룹.
 * 레이아웃은 mm-grid에 위임하고, gap은 8로 내부에서 엄격하게 고정한다.
 */
@customElement('mm-feature-group')
export class FeatureGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ type: Number }) columns: Columns = 2

  @property({ attribute: 'column-max-width' }) columnMaxWidth?: string

  render() {
    return html`
      <mm-grid
        columns=${this.columns}
        column-max-width=${ifDefined(this.columnMaxWidth)}
        gap="8"
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
