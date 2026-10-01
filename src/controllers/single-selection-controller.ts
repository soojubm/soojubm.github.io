import type { SelectionStore } from '@/controllers/selection-store'
import type { ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost
type SelectionOption = { value: string }

interface SingleSelectionControllerOptions {
  getValue: () => string
  setValue: (value: string) => void
}

export class SingleSelectionController implements SelectionStore {
  constructor(private host: Host, private options: SingleSelectionControllerOptions) {}

  select(option: SelectionOption) {
    this.setSelected(option, true)
  }

  setSelected(option: SelectionOption, selected: boolean) {
    this.options.setValue(selected ? option.value : '')
    this.host.requestUpdate()
  }

  isEmpty() {
    return !this.options.getValue()
  }

  isSelected(value: string) {
    return this.options.getValue() === value
  }

  isOptionSelected(option: SelectionOption) {
    return this.isSelected(option.value)
  }
}
