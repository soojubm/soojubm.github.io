import type { ReactiveControllerHost } from 'lit'

import { ScheduleController } from '@/controllers/schedule-controller'

interface TransientFlagControllerOptions {
  /** 활성 상태 지속 시간(ms) */
  duration: number
  /** 활성 상태가 바뀔 때 호출된다. */
  onChange: (active: boolean) => void
}

/**
 * 잠깐 켜졌다가 일정 시간 뒤 스스로 꺼지는 상태(복사 성공 표시 등)를 관리한다.
 * 끄는 시점은 ScheduleController가 예약하므로 host 분리 시 예약된 타이머가 정리된다.
 */
export class TransientFlagController {
  private expiry: ScheduleController

  constructor(host: ReactiveControllerHost, private options: TransientFlagControllerOptions) {
    this.expiry = new ScheduleController(host, () => this.options.onChange(false), {
      delay: options.duration,
    })
  }

  trigger() {
    this.options.onChange(true)
    this.expiry.request()
  }
}
