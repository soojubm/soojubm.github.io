import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { Orientation } from '@/controllers/roving-focus-controller'

import { buttonBaseStyles, buttonSelectedStyles } from '@/components/button/button.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { RovingFocusController } from '@/controllers/roving-focus-controller'
import { SelectionController } from '@/controllers/selection-controller'
import { emit } from '@/utils/emit'
import '@/components/icon/icon'

type FilterMode = 'single' | 'multiple'
export type FilterOption = {
  value: string
  label: string
  icon?: IconName
  disabled?: boolean
  selectAll?: boolean
}

@customElement('mm-filter-button-group')
export class FilterButtonGroup extends LitElement {
  static styles = [
    buttonBaseStyles,
    buttonSelectedStyles,
    css`
      :host {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
      }
    `,
  ]

  @property({ type: String }) mode: FilterMode = 'single'
  @property({ type: Array }) values: string[] = []
  @property({ type: Array }) options: FilterOption[] = []
  @property({ type: String, reflect: true }) role = 'group'
  @property({ type: String }) orientation: Orientation = 'horizontal'

  private selection = new SelectionController(this, {
    getMode: () => this.mode,
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.options,
  })

  // 포커스 이동은 컨트롤러가, 선택은 네이티브 버튼 클릭이 담당한다.
  private rovingFocus = new RovingFocusController(this, {
    getItems: () => Array.from(this.renderRoot.querySelectorAll('button')),
    orientation: () => this.orientation,
    getActiveIndex: () => this.options.findIndex(option => this.selection.isOptionSelected(option)),
  })

  render() {
    return html`
      ${this.options.map(option => this.renderOption(option))}
    `
  }

  private renderOption(option: FilterOption) {
    const selected = this.selection.isOptionSelected(option)
    const iconName = option.icon ?? (selected ? ICON_NAMES.CHECK : undefined)

    return html`
      <button
        type="button"
        ?disabled=${option.disabled}
        aria-pressed=${selected ? 'true' : 'false'}
        @click=${() => this.updateValues(option)}
      >
        ${iconName
          ? html`
              <mm-icon name=${iconName}></mm-icon>
            `
          : nothing}
        ${option.label}
      </button>
    `
  }

  private updateValues(option: FilterOption) {
    if (option.disabled) return

    this.selection.select(option)
    emit(this, 'change', { values: this.values })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-filter-button-group': FilterButtonGroup
  }
}
