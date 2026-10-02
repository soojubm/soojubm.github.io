type ToggleHost = { disabled: boolean }

/**
 * 켜고 끄는 상태를 다루는 규칙. disabled면 값을 바꾸지 않고 실패를 알린다.
 * 계열마다 상태를 담는 프로퍼티 이름이 다르므로(checked·pressed) 그 이름만 받는다.
 * 그 프로퍼티는 호스트의 reactive property라 값을 바꾸면 호스트가 스스로 다시 그리므로, 갱신을 따로 요청하지 않는다.
 */
export class ToggleController<Key extends string> {
  constructor(private host: ToggleHost & Record<Key, boolean>, private key: Key) {}

  toggle() {
    return this.set(!this.value)
  }

  set(value: boolean) {
    if (this.host.disabled) return false
    ;(this.host as Record<Key, boolean>)[this.key] = value
    return true
  }

  get value(): boolean {
    return this.host[this.key]
  }
}
