import type { ReactiveControllerHost } from 'lit'

type ToggleHost = ReactiveControllerHost & { disabled: boolean }

/**
 * 켜고 끄는 상태를 다루는 규칙. disabled면 값을 바꾸지 않고 실패를 알린다.
 * 계열마다 상태를 담는 프로퍼티 이름이 다르므로(checked·pressed) 그 이름만 받는다.
 */
export class ToggleController<Key extends string> {
  constructor(private host: ToggleHost & Record<Key, boolean>, private key: Key) {}

  toggle() {
    return this.set(!this.value)
  }

  set(value: boolean) {
    if (this.host.disabled) return false
    ;(this.host as Record<Key, boolean>)[this.key] = value
    this.host.requestUpdate()
    return true
  }

  get value(): boolean {
    return this.host[this.key]
  }
}
