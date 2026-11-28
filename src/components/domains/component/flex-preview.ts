import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import type { FlexDirection } from '@/stylesheets/shared.types'
import type { OptionItem } from '@/types'

import { GAP_OPTIONS } from '@/components/domains/component/component.helpers'

import '@/components/common/code-block/code-block'
import '@/components/common/flex/flex'
import '@/components/common/button/button-group'
import '@/components/common/toggle-button/toggle-button-group'
import '@/components/domains/ui-placeholder/ui-placeholder'

const DIRECTION_OPTIONS: OptionItem[] = [
  { value: 'row', label: 'row' },
  { value: 'column', label: 'column' },
]

const ITEM_COUNT = 3

@customElement('fff-flex-preview')
export class FlexPreview extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `
  @state() private direction: FlexDirection = 'row'
  @state() private gap = '2'

  render() {
    return html`
      <fff-button-group>
        <fff-toggle-button-group
          aria-label="direction"
          .options=${DIRECTION_OPTIONS}
          .value=${this.direction}
          @change=${this.handleDirectionChange}
        ></fff-toggle-button-group>
        <fff-toggle-button-group
          aria-label="gap"
          .options=${GAP_OPTIONS}
          .value=${this.gap}
          @change=${this.handleGapChange}
        ></fff-toggle-button-group>
      </fff-button-group>

      <fff-flex direction=${this.direction} gap=${this.gap} stretch>
        ${Array.from(
          { length: ITEM_COUNT },
          () => html`
            <fff-ui-placeholder></fff-ui-placeholder>
          `,
        )}
      </fff-flex>

      <fff-code-block .code=${this.buildCode()}></fff-code-block>
    `
  }

  private handleDirectionChange(event: CustomEvent) {
    this.direction = event.detail.value as FlexDirection
  }

  private handleGapChange(event: CustomEvent) {
    this.gap = event.detail.value
  }

  /** row는 기본값이라 코드에 적지 않는다. */
  private buildCode() {
    const direction = this.direction === 'row' ? '' : ` direction="${this.direction}"`

    return `<fff-flex${direction} gap="${this.gap}">
  <!-- 항목 -->
</fff-flex>`
  }
}
