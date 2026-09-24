import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'notice.html', label: 'Notice' },
  { href: 'dialog.html', label: 'Dialog' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'open', type: 'boolean = false' },
  { name: 'show()', type: 'method' },
  { name: 'close()', type: 'method' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'toast-min-width' },
  { name: 'toast-min-height' },
  { name: 'toast-gap' },
  { name: 'toast-background-color' },
  { name: 'toast-text-color' },
  { name: 'toast-border-radius' },
  { name: 'toast-padding-block' },
  { name: 'toast-padding-inline' },
  { name: 'toast-offset' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Transient',
    icon: ICON_NAMES.TIMER,
    description:
      '배경 상호작용을 막지 않고 화면 하단 중앙에 잠깐 떠올랐다 표시 시간이 지나면 스스로 닫힙니다. 열려 있을 때 다시 부르면 남은 시간이 초기화됩니다.',
  },
]

type ToastElement = HTMLElement & {
  show(): void
}

function setupToastTrigger() {
  const trigger = document.querySelector<HTMLElement>('[data-open-toast]')
  const toast = document.querySelector<ToastElement>('.js-demo-toast')
  if (!trigger || !toast) return

  trigger.addEventListener('click', () => toast.show())
}

const main = html`
  <mm-main>
    <mm-page-header
      heading="Toast"
      description="사용자 행동의 결과를 짧게 알리는 일시적인 피드백입니다. 화면 가장자리에 잠시 나타났다가 스스로 사라지므로, 사용자는 하던 일을 멈추거나 따로 닫지 않고도 작업이 반영되었음을 확인하고 흐름을 이어갈 수 있습니다."
    ></mm-page-header>

    <mm-component-aka .items=${['Snackbar']}></mm-component-aka>

    <mm-component-example>
      <mm-button data-open-toast>토스트 띄우기</mm-button>
      <mm-toast class="js-demo-toast">저장되었습니다.</mm-toast>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-paragraph-group>
        <mm-heading level="3">언제 사용하나요</mm-heading>
        <mm-paragraph>
          놓쳐도 되는 정보에만 씁니다. 사용자의 확인이 필요하면
          <mm-code>mm-dialog</mm-code>
          , 화면에 계속 남아야 하면
          <mm-code>mm-notice</mm-code>
          를 씁니다.
        </mm-paragraph>
      </mm-paragraph-group>

      <mm-paragraph-group>
        <mm-heading level="3">접근성</mm-heading>
        <mm-paragraph>
          기본
          <mm-code>role="status"</mm-code>
          로 두어 스크린리더가 사용자의 흐름을 끊지 않고 읽게 합니다.
        </mm-paragraph>
      </mm-paragraph-group>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${'<mm-toast open>저장되었습니다.</mm-toast>'}
    ></mm-component-anatomy>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main, { initialize: setupToastTrigger })
