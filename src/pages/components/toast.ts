import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { componentPropsOf, openStateMethods } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'notice.html', label: 'Notice' },
  { href: 'dialog.html', label: 'Dialog' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-toast'),
  ...openStateMethods,
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Transient',
    description:
      '배경 상호작용을 막지 않고 화면 하단 중앙에 잠깐 떠올랐다 표시 시간이 지나면 자동으로 닫힙니다. 포인터나 포커스가 올라와 있는 동안은 시간이 멈추고 벗어나면 처음부터 다시 흐르며, 열려 있을 때 다시 부르면 시간이 처음부터 다시 흐릅니다.',
  },
  {
    heading: 'Feedback',
    description:
      '복사·저장·삭제처럼 사용자가 한 행동의 결과를 짧은 문구로 전합니다. 사용자는 하던 일을 멈추지 않고도 행동이 제대로 처리됐는지 확인할 수 있습니다.',
  },
]

type ToastElement = HTMLElement & {
  show(): void
}

function setupToastTrigger() {
  const trigger = document.querySelector<HTMLElement>('[data-open-toast]')
  const toast = document.querySelector<ToastElement>('fff-toast')
  if (!trigger || !toast) return

  trigger.addEventListener('click', () => toast.show())
}

const exampleCode = `<fff-button data-open-toast>토스트 띄우기</fff-button>
<fff-toast>저장되었습니다.</fff-toast>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Toast"
      description="사용자 행동의 결과를 짧게 알리는 일시적인 피드백입니다. 화면 가장자리에 잠시 나타났다가 자동으로 사라지므로, 사용자는 하던 일을 멈추거나 따로 닫지 않고도 작업이 반영되었음을 확인하고 흐름을 이어갈 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['Snackbar']}></fff-component-aka>

    <fff-component-example>
      <fff-button data-open-toast>토스트 띄우기</fff-button>
      <fff-toast>저장되었습니다.</fff-toast>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-toast']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-content-section
        heading-level="3"
        heading="언제 사용하나요"
        description="복사·저장·삭제처럼 사용자가 한 행동의 결과를 짧게 알릴 때 사용합니다."
        .texts=${['놓쳐도 흐름에 지장이 없는 피드백이어야 한다']}
      ></fff-content-section>

      <fff-text-block
        level="3"
        heading="접근성"
        description="스크린리더는 사용자의 흐름을 끊지 않고 읽습니다."
      ></fff-text-block>
    </fff-component-guide>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main, { initialize: setupToastTrigger })
