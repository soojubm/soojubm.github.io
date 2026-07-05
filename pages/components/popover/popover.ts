import main from './index.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

type PopoverElement = HTMLElement & {
  open: boolean
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
  setupPopoverDemo()
})

function setupPopoverDemo() {
  const trigger = document.querySelector<HTMLElement>('#popover-trigger')
  const popover = document.querySelector<PopoverElement>('#demo-popover')
  if (!trigger || !popover) return

  const setOpen = (open: boolean) => {
    popover.open = open
    trigger.setAttribute('aria-expanded', String(open))
  }

  trigger.addEventListener('click', () => {
    setOpen(!popover.open)
  })

  document.addEventListener('click', e => {
    if (!popover.open) return
    if (e.composedPath().includes(trigger)) return
    if (e.composedPath().includes(popover)) return
    setOpen(false)
  })

  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape' || !popover.open) return
    setOpen(false)
  })
}
