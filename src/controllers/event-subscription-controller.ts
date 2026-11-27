import type { ReactiveControllerHost } from 'lit'

/**
 * 소비자가 이벤트를 구독했는지 알려 준다.
 * 구독이 생기거나 모두 사라지면 컴포넌트를 다시 렌더해, 이벤트를 받는 쪽이 있을 때만 컨트롤을 그리게 한다.
 */
export class EventSubscriptionController {
  private listenerCount = 0

  constructor(private host: ReactiveControllerHost & HTMLElement, private type: string) {
    this.watchListeners()
  }

  get subscribed() {
    return this.listenerCount > 0
  }

  private watchListeners() {
    const addEventListener = this.host.addEventListener.bind(this.host)
    const removeEventListener = this.host.removeEventListener.bind(this.host)

    this.host.addEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions,
    ) => {
      addEventListener(type, listener, options)
      if (type !== this.type) return

      this.listenerCount += 1
      this.host.requestUpdate()
    }

    this.host.removeEventListener = (
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions,
    ) => {
      removeEventListener(type, listener, options)
      if (type !== this.type) return

      this.listenerCount = Math.max(0, this.listenerCount - 1)
      this.host.requestUpdate()
    }
  }
}
