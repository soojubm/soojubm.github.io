import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement
export type SelectionOption = { value: string }

interface SingleSelectionControllerOptions {
  getValue: () => string
  setValue: (value: string) => void
}

export class SingleSelectionController implements ReactiveController {
  constructor(private host: Host, private options: SingleSelectionControllerOptions) {
    host.addController(this)
  }

  hostConnected() {}

  select(option: SelectionOption) {
    this.setSelected(option, true)
  }

  setSelected(option: SelectionOption, selected: boolean) {
    this.options.setValue(selected ? option.value : '')
    this.host.requestUpdate()
  }

  isSelected(value: string) {
    return this.options.getValue() === value
  }

  isOptionSelected(option: SelectionOption) {
    return this.isSelected(option.value)
  }

  sync<T extends SelectionOption>(options: T[], apply: (option: T, selected: boolean) => void) {
    options.forEach(option => {
      apply(option, this.isSelected(option.value))
    })
  }
}
