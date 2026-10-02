import type { SelectionStore } from '@/controllers/selection-store'

type SelectionOption = {
  value: string
  selectAll?: boolean
}

interface MultipleSelectionControllerOptions {
  getValues: () => string[]
  /** 값은 호스트의 reactive property라 대입하면 호스트가 스스로 다시 그린다 */
  setValues: (values: string[]) => void
  getOptions: () => SelectionOption[]
}

export class MultipleSelectionController implements SelectionStore {
  constructor(private options: MultipleSelectionControllerOptions) {}

  select(option: SelectionOption) {
    this.setSelected(option, !this.isOptionSelected(option))
  }

  setSelected(option: SelectionOption, selected: boolean) {
    this.options.setValues(this.getValuesForState(option, selected))
  }

  isEmpty() {
    return this.options.getValues().length === 0
  }

  isSelected(value: string) {
    return this.options.getValues().includes(value)
  }

  isOptionSelected(option: SelectionOption) {
    if (!option.selectAll) return this.isSelected(option.value)

    return this.optionValues.length > 0 && this.optionValues.every(value => this.isSelected(value))
  }

  private getValuesForState(option: SelectionOption, selected: boolean) {
    if (option.selectAll) return selected ? this.optionValues : []

    const values = this.options.getValues()
    if (selected) return [...new Set([...values, option.value])]

    return values.filter(value => value !== option.value)
  }

  private get optionValues() {
    return this.options
      .getOptions()
      .filter(option => !option.selectAll)
      .map(option => option.value)
  }
}
