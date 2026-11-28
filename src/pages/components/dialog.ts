import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { ActionConfig } from '@/types'

import { componentPropsOf, openStateMethods } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'sheet.html', label: 'Sheet' },
  { href: 'popover.html', label: 'Popover' },
  { href: 'notice.html', label: 'Notice' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-dialog'),
  { name: 'slot: default', type: 'HTMLElement', optional: true },
  ...openStateMethods,
  { name: 'toggle', type: 'CustomEvent<{ open: boolean }>', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Feedback',
    description:
      '되돌리기 어려운 작업을 실행하기 전에 그 결과를 알리고 확인을 받습니다. 확인 없이 끝나는 결과는 토스트나 인라인 메시지가 알립니다.',
  },
  {
    heading: 'Modality',
    description:
      '다이얼로그는 modal이라 열린 동안 뒤 화면을 조작할 수 없고, 확인이 필요한 작업이므로 배경 클릭으로는 닫히지 않습니다. ESC는 어느 액션도 실행하지 않고 닫아, 키보드 사용자가 언제든 흐름을 중단하고 빠져나갈 수 있습니다. 포커스는 다이얼로그 안에 머물고, 닫으면 연 버튼으로 돌아갑니다. 다른 다이얼로그 위에 겹쳐 열지 않습니다.',
  },
]

const exampleCode = `<fff-button aria-controls="dialog-confirm" aria-haspopup="dialog">Confirm</fff-button>
<fff-dialog id="dialog-confirm" heading="페이지를 나가시겠어요?" description="저장되지 않은 변경 사항이 있습니다. 이 페이지에서 나가면 변경 사항이 취소됩니다."></fff-dialog>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Dialog"
      description="되돌리기 어려운 작업 앞에서 확인을 받는 modal 창입니다. 제목과 설명, 확인·취소 액션만 넣어 배경 클릭으로는 닫히지 않으므로, 사용자는 정보나 재산을 바꾸거나 지우기 전에 결과를 한 번 더 확인할 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['Alert', 'Modal', 'Prompt']}></fff-component-aka>

    <fff-component-example>
      <fff-button-group>
        <fff-button aria-controls="dialog-alert" aria-haspopup="dialog">Alert</fff-button>
        <fff-button aria-controls="dialog-confirm" aria-haspopup="dialog">Confirm</fff-button>
      </fff-button-group>

      <fff-dialog
        id="dialog-alert"
        heading="Alert Dialog"
        description="부끄러우니까 보지마요!"
      ></fff-dialog>

      <fff-dialog
        id="dialog-confirm"
        heading="페이지를 나가시겠어요?"
        description="저장되지 않은 변경 사항이 있습니다. 이 페이지에서 나가면 변경 사항이 취소됩니다."
      ></fff-dialog>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-dialog']}></fff-component-tokens>

    <fff-component-guide .features=${componentFeatures}></fff-component-guide>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
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
