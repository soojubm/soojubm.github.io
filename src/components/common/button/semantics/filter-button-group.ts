import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon-button/semantics/icon-names'
import type { Orientation } from '@/controllers/roving-focus-controller'

import { buttonBaseStyles, buttonSelectedStyles } from '@/components/common/button/button.styles'
import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { MultipleSelectionController } from '@/controllers/multiple-selection-controller'
import { RovingFocusController } from '@/controllers/roving-focus-controller'
import { SingleSelectionController } from '@/controllers/single-selection-controller'
import { emit } from '@/utils/emit'
import '@/components/common/icon/icon'

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

  // single/multiple 모드가 런타임에 바뀔 수 있어 두 컨트롤러를 모두 들고 mode로 분기한다.
  private singleSelection = new SingleSelectionController(this, {
    getValue: () => this.values[0] ?? '',
    setValue: value => {
      this.values = value ? [value] : []
    },
  })

  private multipleSelection = new MultipleSelectionController(this, {
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
    getActiveIndex: () => this.options.findIndex(option => this.isOptionSelected(option)),
  })

  render() {
    return html`
      ${this.options.map(option => this.renderOption(option))}
    `
  }

  private isOptionSelected(option: FilterOption) {
    return this.mode === 'multiple'
      ? this.multipleSelection.isOptionSelected(option)
      : this.singleSelection.isOptionSelected(option)
  }

  private select(option: FilterOption) {
    if (this.mode === 'multiple') this.multipleSelection.select(option)
    else this.singleSelection.select(option)
  }

  private renderOption(option: FilterOption) {
    const selected = this.isOptionSelected(option)
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

    this.select(option)
    emit(this, 'change', { values: this.values })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-filter-button-group': FilterButtonGroup
  }
}
