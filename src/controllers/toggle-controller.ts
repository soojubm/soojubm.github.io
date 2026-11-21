import { emit } from '@/utils'

type ToggleHost = HTMLElement & { disabled: boolean; value?: string }

/**
 * 켜고 끄는 상태를 바꾸고 계열 공통 모양의 change로 알린다. disabled면 바꾸지도 알리지도 않는다.
 * 상태 프로퍼티 이름(checked·pressed)을 받아 change detail의 key로도 쓰며, value는 늘 string으로 싣는다.
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
