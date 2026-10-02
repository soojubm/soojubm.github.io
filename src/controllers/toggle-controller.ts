import { emit } from '@/utils'

type ToggleHost = HTMLElement & { disabled: boolean; value?: string }

/**
 * 켜고 끄는 상태를 다루는 규칙. 값을 바꾸면 계열 공통 모양의 change로 알리고, disabled면 바꾸지도 알리지도 않는다.
 * 계열마다 상태를 담는 프로퍼티 이름이 다르므로(checked·pressed) 그 이름만 받고, change detail도 그 이름을 key로 쓴다.
 * value는 부모 그룹이 항목을 가려낼 수 있게 늘 string으로 싣는다.
 * 그 프로퍼티는 호스트의 reactive property라 값을 바꾸면 호스트가 스스로 다시 그리므로, 갱신을 따로 요청하지 않는다.
 */
export class ToggleController<Key extends string> {
  constructor(private host: ToggleHost & Record<Key, boolean>, private key: Key) {}

  toggle() {
    this.set(!this.host[this.key])
  }

  set(value: boolean) {
    if (this.host.disabled) return
    ;(this.host as Record<Key, boolean>)[this.key] = value
    emit(this.host, 'change', { [this.key]: value, value: this.host.value ?? '' })
  }
}
