import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import type { OptionItem } from '@/types'

import '@/components/common/code-block/code-block'
import '@/components/common/grid/grid'
import '@/components/common/input/semantics/form-field'
import '@/components/common/toggle-button/toggle-button-group'
import '@/components/domains/ui-placeholder/ui-placeholder'

type Columns = 1 | 2 | 3 | 4 | 6

const COLUMNS_OPTIONS: OptionItem[] = [
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '6', label: '6' },
]

const GAP_OPTIONS: OptionItem[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '4', label: '4' },
]

const ITEM_COUNT = 6

/** Container 문서에서 mm-grid의 columns·gap을 바꿔 가며 배치가 달라지는 모습을 보이는 예제. */
@customElement('mm-grid-preview')
export class GridPreview extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `
  @state() private columns: Columns = 3
  @state() private gap = '2'

  render() {
    return html`
      <mm-form-field label="columns">
        <mm-toggle-button-group
          .options=${COLUMNS_OPTIONS}
          .value=${String(this.columns)}
          @change=${this.handleColumnsChange}
        ></mm-toggle-button-group>
      </mm-form-field>

      <mm-form-field label="gap">
        <mm-toggle-button-group
          .options=${GAP_OPTIONS}
          .value=${this.gap}
          @change=${this.handleGapChange}
        ></mm-toggle-button-group>
      </mm-form-field>

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
    this.columns = Number(event.detail.value) as Columns
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
