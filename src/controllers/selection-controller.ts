import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement
export type SelectionMode = 'single' | 'multiple'
export type SelectionOption = {
  value: string
  selectAll?: boolean
}

interface SelectionControllerOptions {
  getMode: () => SelectionMode
  getValues: () => string[]
  setValues: (values: string[]) => void
  getOptions: () => SelectionOption[]
}

export class SelectionController implements ReactiveController {
  constructor(private host: Host, private options: SelectionControllerOptions) {
    host.addController(this)
  }

  select(option: SelectionOption) {
    this.options.setValues(this.getNextValues(option))
    this.host.requestUpdate()
  }

  setSelected(option: SelectionOption, selected: boolean) {
    this.options.setValues(this.getValuesForState(option, selected))
    this.host.requestUpdate()
  }

  isSelected(value: string) {
    return this.selectedValues.includes(value)
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

  get selectedValues() {
    const values = this.options.getValues()
    return this.isMultiple ? values : values.slice(0, 1)
  }

  private getNextValues(option: SelectionOption) {
    return this.getValuesForState(option, !this.isOptionSelected(option))
  }

  private getValuesForState(option: SelectionOption, selected: boolean) {
    if (option.selectAll) return selected ? this.optionValues : []

    if (this.isMultiple) {
      if (selected) return [...new Set([...this.selectedValues, option.value])]

      return this.selectedValues.filter(value => value !== option.value)
    }

    return selected ? [option.value] : []
  }

  private get isMultiple() {
    return this.options.getMode() === 'multiple'
  }

  private get optionValues() {
    return this.options
      .getOptions()
      .filter(option => !option.selectAll)
      .map(option => option.value)
  }
}
