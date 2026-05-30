import { customElement, property } from 'lit/decorators.js'
import Dropdown, { DropdownOption } from '../textfield/dropdown'

type SortOrder = 'latest' | 'oldest'

@customElement('mm-sort-dropdown')
export class SortDropdown extends Dropdown {
  @property({ type: String, reflect: true }) value: SortOrder = 'latest'

  protected get defaultOptions(): DropdownOption[] {
    return [
      {
        label: '최신순',
        value: 'latest',
        type: 'default',
        checked: false,
        selected: this.value === 'latest',
      },
      {
        label: '오래된순',
        value: 'oldest',
        type: 'default',
        checked: false,
        selected: this.value === 'oldest',
      },
    ]
  }

  protected emitSelectChange(option: DropdownOption) {
    super.emitSelectChange(option)

    this.dispatchEvent(
      new CustomEvent('sort-change', {
        detail: { order: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-sort-dropdown': SortDropdown
  }
}
