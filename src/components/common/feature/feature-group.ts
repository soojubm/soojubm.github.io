import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { GridColumns } from '@/components/common/grid/grid'

import '@/components/common/grid/grid'

@customElement('fff-feature-group')
export class FeatureGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: Number }) columns: Exclude<GridColumns, 6> = 2

  render() {
    return html`
      <fff-grid columns=${this.columns} gap="8" role="group">
        <slot></slot>
      </fff-grid>
    `
  }
}
