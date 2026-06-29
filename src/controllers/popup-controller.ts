import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { OutsideClickController } from '@/controllers/outside-click-controller'

type Host = ReactiveControllerHost & HTMLElement

interface PopupControllerOptions {
  event?: 'click' | 'pointerdown'
  getTrigger?: () => HTMLElement | undefined
  ariaHasPopup?: string
}

export class PopupController implements ReactiveController {
  open = false

  constructor(private host: Host, private options: PopupControllerOptions = {}) {
    new OutsideClickController(host, () => this.close(), {
      event: this.event,
      isActive: () => this.open,
    })
    host.addController(this)
  }

  private get event() {
    return this.options.event ?? 'pointerdown'
  }

  hostUpdated() {
    this.syncTrigger()
  }

  toggle() {
    this.setOpen(!this.open)
  }

  close() {
    this.setOpen(false)
  }

  setOpen(open: boolean) {
    if (this.open === open) return

    this.open = open
    this.host.requestUpdate()
  }

  syncTrigger = () => {
    const trigger = this.options.getTrigger?.()
    if (!trigger) return

    trigger.setAttribute('aria-haspopup', this.options.ariaHasPopup ?? 'menu')
    trigger.setAttribute('aria-expanded', String(this.open))
  }
}
