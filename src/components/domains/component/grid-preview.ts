import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import type { GridColumns } from '@/components/common/grid/grid'
import type { OptionItem } from '@/types'

import { GAP_OPTIONS } from '@/components/domains/component/component.helpers'

import '@/components/common/code-block/code-block'
import '@/components/common/grid/grid'
import '@/components/common/button/button-group'
import '@/components/common/toggle-button/toggle-button-group'
import '@/components/domains/ui-placeholder/ui-placeholder'

const COLUMNS_OPTIONS: OptionItem[] = [
  { value: '2', label: 'columns 2' },
  { value: '3', label: 'columns 3' },
  { value: '4', label: 'columns 4' },
  { value: '6', label: 'columns 6' },
]

const ITEM_COUNT = 6

@customElement('mm-grid-preview')
export class GridPreview extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `
  @state() private columns: GridColumns = 3
  @state() private gap = '2'

  render() {
    return html`
      <mm-button-group>
        <mm-toggle-button-group
          aria-label="columns"
          .options=${COLUMNS_OPTIONS}
          .value=${String(this.columns)}
          @change=${this.handleColumnsChange}
        ></mm-toggle-button-group>
        <mm-toggle-button-group
          aria-label="gap"
          .options=${GAP_OPTIONS}
          .value=${this.gap}
          @change=${this.handleGapChange}
        ></mm-toggle-button-group>
      </mm-button-group>

      <mm-grid .columns=${this.columns} gap=${this.gap}>
        ${Array.from(
          { length: ITEM_COUNT },
          () => html`
            <mm-ui-placeholder></mm-ui-placeholder>
          `,
        )}
      </mm-grid>

      <mm-code-block .code=${this.buildCode()}></mm-code-block>
    `
  }

  private handleColumnsChange(event: CustomEvent) {
    this.columns = Number(event.detail.value) as GridColumns
  }

  private handleGapChange(event: CustomEvent) {
    this.gap = event.detail.value
  }

  private buildCode() {
    return `<mm-grid columns="${this.columns}" gap="${this.gap}">
  <!-- 반복 항목 -->
</mm-grid>`
  }
}
