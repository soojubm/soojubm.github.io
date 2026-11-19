import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { OptionItem } from '@/types'

import { MultipleSelectionController } from '@/controllers/multiple-selection-controller'
import { emit } from '@/utils'
import '@/components/common/checkbox'
import '@/components/common/surface'

/**
 * 약관 동의. 전체 동의 체크박스와 약관 목록을 함께 렌더한다.
 * 두 표면이 하나의 선택 값을 공유하므로 선택 값은 이 컴포넌트의 컨트롤러가 소유한다.
 * 전체 동의는 별도 컴포넌트 없이 mm-checkbox로 두고, 컨트롤러의 상태를 따라 표시한다.
 */
@customElement('mm-terms-agreement')
export class TermsAgreement extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `
  @property({ attribute: false }) options: OptionItem[] = []
  @property({ attribute: false }) values: string[] = []
  @property({ type: String }) name?: string
  private selection = new MultipleSelectionController({
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.options,
  })

  render() {
    return html`
      <mm-surface variant="elevated">
        <mm-checkbox
          size="large"
          .checked=${this.selection.isAllSelected()}
          .indeterminate=${this.selection.isPartiallySelected()}
          @change=${this.handleAllChange}
        >
          <slot>모두 동의합니다.</slot>
        </mm-checkbox>
      </mm-surface>

      <mm-checkbox-group
        name=${ifDefined(this.name)}
        size="large"
        .options=${this.options}
        .values=${this.values}
        @change=${this.handleGroupChange}
      ></mm-checkbox-group>
    `
  }

  private handleAllChange = (event: Event) => {
    event.stopPropagation()
    this.selection.toggleAll()
    emit(this, 'change', { values: this.values })
  }
  private handleGroupChange = (event: CustomEvent<{ values: string[] }>) => {
    event.stopPropagation()
    this.values = event.detail.values
    emit(this, 'change', { values: this.values })
  }
}
