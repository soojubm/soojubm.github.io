import { renderDocumentLayout } from '../../../layouts/document-layout'
import main from './index.html'

type DialogElement = HTMLElement & { open: boolean }

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
  setupDialogTriggers()
})

function setupDialogTriggers() {
  document.addEventListener('click', e => {
    const trigger = (e.composedPath() as Element[]).find(
      el => el instanceof HTMLElement && el.dataset?.openDialog,
    ) as HTMLElement | undefined
    if (!trigger) return
    const key = trigger.dataset.openDialog ?? ''
    const dialog = document.querySelector<DialogElement>(`#dialog-${key}`)
    if (dialog) dialog.open = true
  })
}
