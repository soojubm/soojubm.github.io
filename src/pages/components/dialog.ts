import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'
import type { ActionConfig } from '@/types'

import { renderPage } from '@/components/layouts/base-layouts'

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
  { name: 'overlay-panel-min-width' },
  { name: 'overlay-panel-max-width' },
  { name: 'overlay-panel-height' },
  { name: 'overlay-panel-max-height' },
  { name: 'overlay-panel-padding-block' },
  { name: 'overlay-panel-padding-inline' },
  { name: 'overlay-panel-border-radius' },
  { name: 'overlay-panel-backdrop-background-color' },
  { name: 'overlay-panel-backdrop-blur' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Feedback',
    description:
      '다이얼로그를 닫기 전에는 이전 콘텐츠로 포커스 불가능. 다이얼로그를 닫은 후 열기 버튼으로 포커스 복귀. 레이어를 2개 이상 쌓지 마세요.',
  },
  {
    heading: 'Modality',
    description: '닫기 버튼과 ESC로 사용자가 언제든 흐름을 중단하고 빠져나갈 수 있어야 합니다.',
  },
]

const main = html`
  <mm-page>
    <mm-page-header
      heading="Dialog"
      description="사용자의 정보나 재산의 변경 또는 삭제 확인."
    ></mm-page-header>

    <mm-component-aka .items=${['Alert', 'Modal', 'Prompt']}></mm-component-aka>

    <mm-component-example>
      <mm-button-group>
        <mm-button aria-controls="dialog-alert">Alert</mm-button>
        <mm-button aria-controls="dialog-confirm">Confirm</mm-button>
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

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          '프라이머리 버튼 레이블은 다이얼로그 제목의 동사와 페어링합니다.',
          '질문은 부정어로 만들지 않습니다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-button aria-controls="confirm-dialog">나가기</mm-button>

<mm-dialog
    id="confirm-dialog"
    heading="페이지를 나가시겠어요?"
    description="저장되지 않은 변경 사항이 있습니다."
    .primaryAction=\${primaryAction}
    .secondaryAction=\${secondaryAction}
></mm-dialog>`}
    ></mm-component-anatomy>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-page>
`

type DialogElement = HTMLElement & {
  open: boolean
  close: () => void
  primaryAction?: ActionConfig
  secondaryAction?: ActionConfig
}

renderPage(main, { initialize: setupDialogActions })

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
