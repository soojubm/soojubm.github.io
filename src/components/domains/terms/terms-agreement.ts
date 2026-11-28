import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { OptionItem } from '@/types'

import { MultipleSelection } from '@/controllers/multiple-selection'
import { emit } from '@/utils'
import '@/components/common/checkbox'
import '@/components/common/surface'

@customElement('fff-terms-agreement')
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
  private selection = new MultipleSelection({
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.options,
  })

  render() {
    return html`
      <fff-surface variant="elevated">
        <fff-checkbox
          size="large"
          .checked=${this.selection.isAllSelected()}
          .indeterminate=${this.selection.isPartiallySelected()}
          @change=${this.handleAllChange}
        >
          <slot>모두 동의합니다.</slot>
        </fff-checkbox>
      </fff-surface>

      <fff-checkbox-group
        name=${ifDefined(this.name)}
        size="large"
        .options=${this.options}
        .values=${this.values}
        @change=${this.handleGroupChange}
      ></fff-checkbox-group>
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
