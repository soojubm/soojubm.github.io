import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { CheckboxGroup } from '@/components/common/checkbox/checkbox-group'
import type { OptionItem } from '@/types'

import { emit } from '@/utils'
import '@/components/common/checkbox'
import '@/components/common/surface'

/**
 * 약관 동의. 전체 동의 체크박스와 약관 목록을 함께 렌더하고, 선택 값은 약관 목록이 소유한다.
 * 전체 동의는 별도 컴포넌트 없이 mm-checkbox로 두고, 목록의 checked·indeterminate를 따라 표시한다.
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
  @query('mm-checkbox-group') private group?: CheckboxGroup

  render() {
    return html`
      <mm-surface variant="elevated">
        <mm-checkbox
          size="large"
          .checked=${this.group?.checked ?? false}
          .indeterminate=${this.group?.indeterminate ?? false}
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

  firstUpdated() {
    // 첫 렌더에서는 목록이 아직 없어 전체 동의 상태를 읽지 못하므로 한 번 더 그린다.
    this.requestUpdate()
  }

  private handleAllChange = (event: Event) => {
    event.stopPropagation()
    this.group?.toggleAll()
  }

  private handleGroupChange = (event: CustomEvent<{ values: string[] }>) => {
    event.stopPropagation()
    this.values = event.detail.values
    emit(this, 'change', { values: this.values })
  }
}
