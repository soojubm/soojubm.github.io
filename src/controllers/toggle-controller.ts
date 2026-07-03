import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

interface ToggleControllerOptions {
  getValue: () => boolean
  setValue: (value: boolean) => void
  isDisabled?: () => boolean
}

export class ToggleController implements ReactiveController {
  constructor(private host: Host, private options: ToggleControllerOptions) {
    host.addController(this)
  }

  hostConnected() {}

  toggle() {
    return this.set(!this.value)
  }

  set(value: boolean) {
    if (this.options.isDisabled?.()) return false

    this.options.setValue(value)
    this.host.requestUpdate()
    return true
  }

  get value() {
    return this.options.getValue()
  }
}
