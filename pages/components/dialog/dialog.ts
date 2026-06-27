import { renderDocumentLayout } from '../../../layouts/document-layout'
import main from './index.html'
import type { ActionConfig } from '@/components/action-config'

type DialogElement = HTMLElement & {
  open: boolean
  close: () => void
  primaryAction?: ActionConfig
  secondaryAction?: ActionConfig
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
  setupDialogActions()
  setupDialogTriggers()
})

function setupDialogActions() {
  const alertDialog = document.querySelector<DialogElement>('#dialog-alert')
  if (alertDialog) {
    alertDialog.primaryAction = {
      label: '확인',
      onClick: () => alertDialog.close(),
    }
  }

  const confirmDialog = document.querySelector<DialogElement>('#dialog-confirm')
  if (confirmDialog) {
    confirmDialog.primaryAction = {
      label: '계속 수정하기',
      onClick: () => confirmDialog.close(),
    }
    confirmDialog.secondaryAction = {
      label: '나가기',
      onClick: () => confirmDialog.close(),
    }
  }

  const cookieDialog = document.querySelector<DialogElement>('#dialog-cookie')
  if (cookieDialog) {
    cookieDialog.primaryAction = {
      label: 'Cookie Settings',
      onClick: () => cookieDialog.close(),
    }
    cookieDialog.secondaryAction = {
      label: 'Accept Cookie',
      onClick: () => cookieDialog.close(),
    }
  }
}

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
