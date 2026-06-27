import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

interface PopupControllerOptions {
  event?: 'click' | 'pointerdown'
  getTrigger?: () => HTMLElement | undefined
  ariaHasPopup?: string
}

export class PopupController implements ReactiveController {
  open = false

  constructor(private host: Host, private options: PopupControllerOptions = {}) {
    host.addController(this)
  }

  private get event() {
    return this.options.event ?? 'pointerdown'
  }

  hostConnected() {
    document.addEventListener(this.event, this.handleDocumentEvent)
  }

  hostDisconnected() {
    document.removeEventListener(this.event, this.handleDocumentEvent)
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

  private handleDocumentEvent = (event: Event) => {
    if (!this.open) return
    if (!event.composedPath().includes(this.host)) this.close()
  }
}
