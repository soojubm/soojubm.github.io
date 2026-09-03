import type { ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost
type SelectionOption = {
  value: string
  selectAll?: boolean
}

interface MultipleSelectionControllerOptions {
  getValues: () => string[]
  setValues: (values: string[]) => void
  getOptions: () => SelectionOption[]
}

export class MultipleSelectionController {
  constructor(private host: Host, private options: MultipleSelectionControllerOptions) {}

  select(option: SelectionOption) {
    this.setSelected(option, !this.isOptionSelected(option))
  }

  setSelected(option: SelectionOption, selected: boolean) {
    this.options.setValues(this.getValuesForState(option, selected))
    this.host.requestUpdate()
  }

  isSelected(value: string) {
    return this.options.getValues().includes(value)
  }

  isOptionSelected(option: SelectionOption) {
    if (!option.selectAll) return this.isSelected(option.value)

    return this.optionValues.length > 0 && this.optionValues.every(value => this.isSelected(value))
  }

  sync<T extends SelectionOption>(options: T[], apply: (option: T, selected: boolean) => void) {
    options.forEach(option => {
      apply(option, this.isSelected(option.value))
    })
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
