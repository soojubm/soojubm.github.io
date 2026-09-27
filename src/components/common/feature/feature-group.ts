import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { GridColumns } from '@/components/common/grid/grid'

import '@/components/common/grid/grid'

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
  @property({ type: Number }) columns: Exclude<GridColumns, 6> = 2

  render() {
    return html`
      <mm-grid columns=${this.columns} gap="8" role="group">
        <slot></slot>
      </mm-grid>
    `
  }
}
