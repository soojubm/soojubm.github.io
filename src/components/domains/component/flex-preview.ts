import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import type { OptionItem } from '@/types'

import '@/components/common/code-block/code-block'
import '@/components/common/flex/flex'
import '@/components/common/input/semantics/form-field'
import '@/components/common/toggle-button/toggle-button-group'
import '@/components/domains/ui-placeholder/ui-placeholder'

type Direction = 'row' | 'column'

const DIRECTION_OPTIONS: OptionItem[] = [
  { value: 'row', label: 'row' },
  { value: 'column', label: 'column' },
]

const GAP_OPTIONS: OptionItem[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '4', label: '4' },
]

const ITEM_COUNT = 3

/** Container 문서에서 mm-flex의 direction·gap을 바꿔 가며 배치가 달라지는 모습을 보이는 예제. */
@customElement('mm-flex-preview')
export class FlexPreview extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `
  @state() private direction: Direction = 'row'
  @state() private gap = '2'

  render() {
    return html`
      <mm-form-field label="direction">
        <mm-toggle-button-group
          .options=${DIRECTION_OPTIONS}
          .value=${this.direction}
          @change=${this.handleDirectionChange}
        ></mm-toggle-button-group>
      </mm-form-field>

      <mm-form-field label="gap">
        <mm-toggle-button-group
          .options=${GAP_OPTIONS}
          .value=${this.gap}
          @change=${this.handleGapChange}
        ></mm-toggle-button-group>
      </mm-form-field>

      <mm-flex direction=${this.direction} gap=${this.gap} stretch>
        ${Array.from(
          { length: ITEM_COUNT },
          () => html`
            <mm-ui-placeholder></mm-ui-placeholder>
          `,
        )}
      </mm-flex>

      <mm-code-block .code=${this.buildCode()}></mm-code-block>
    `
  }

  private handleDirectionChange(event: CustomEvent) {
    this.direction = event.detail.value as Direction
  }

  private handleGapChange(event: CustomEvent) {
    this.gap = event.detail.value
  }

  /** row는 기본값이라 코드에 적지 않는다. */
  private buildCode() {
    const direction = this.direction === 'row' ? '' : ` direction="${this.direction}"`

    return `<mm-flex${direction} gap="${this.gap}">
  <!-- 항목 -->
</mm-flex>`
  }
}
