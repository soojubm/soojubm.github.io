import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'
import type { ActionConfig } from '@/types'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'sheet.html', label: 'Sheet' },
  { href: 'popover.html', label: 'Popover' },
  { href: 'notice.html', label: 'Notice' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'open', type: 'boolean' },
  { name: 'heading', type: 'string' },
  { name: 'description', type: 'string' },
  { name: 'primaryAction', type: 'ActionConfig', optional: true },
  { name: 'secondaryAction', type: 'ActionConfig', optional: true },
  { name: 'slot: default', type: 'HTMLElement', optional: true },
  { name: 'dialog-close', type: 'CustomEvent', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'overlay-panel-min-width', default: '320px' },
  { name: 'overlay-panel-max-width', default: '320px' },
  { name: 'overlay-panel-height', default: 'auto' },
  { name: 'overlay-panel-max-height', default: '90vh' },
  { name: 'overlay-panel-padding-block', default: 'var(--space-4)' },
  { name: 'overlay-panel-padding-inline', default: 'var(--space-4)' },
  { name: 'overlay-panel-border-radius', default: 'var(--radius-large)' },
  { name: 'overlay-panel-backdrop-background-color', default: 'transparent' },
  { name: 'overlay-panel-backdrop-blur', default: '0px' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Feedback',
    description:
      '다이얼로그를 닫기 전에는 이전 콘텐츠로 포커스 불가능. 다이얼로그를 닫은 후 열기 버튼으로 포커스 복귀. 레이어를 2개 이상 쌓지 마세요.',
  },
  {
    heading: 'Interactive - action',
    description:
      '프라이머리 버튼의 레이블은 다이얼로그 제목의 동사와 페어링되어야 한다. 부정어로 묻지 말 것.',
  },
  {
    heading: 'Modality',
    description: '닫기 버튼과 ESC로 사용자가 언제든 흐름을 중단하고 빠져나갈 수 있어야 합니다.',
  },
]

const main = html`
  <main class="page" role="" aria-label="site">
    <mm-page-header
      heading="Dialog"
      description="사용자의 정보나 재산의 변경 또는 삭제 확인."
    ></mm-page-header>

    <mm-component-aka items='["Alert", "Modal", "Prompt"]'></mm-component-aka>

    <mm-component-example>
      <mm-button-group>
        <mm-button data-open-dialog="alert">Alert</mm-button>
        <mm-button data-open-dialog="confirm">Confirm</mm-button>
      </mm-button-group>

      <mm-dialog
        id="dialog-alert"
        heading="Alert Dialog"
        description="부끄러우니까 보지마요!"
      ></mm-dialog>

      <mm-dialog
        id="dialog-confirm"
        heading="페이지를 나가시겠어요?"
        description="저장되지 않은 변경 사항이 있습니다. 이 페이지에서 나가면 변경 사항이 취소됩니다."
      ></mm-dialog>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
    </mm-component-guide>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </main>
`

type DialogElement = HTMLElement & {
  open: boolean
  close: () => void
  primaryAction?: ActionConfig
  secondaryAction?: ActionConfig
}

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
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
