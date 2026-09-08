import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'notice.html', label: 'Notice' },
  { href: 'dialog.html', label: 'Dialog' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'open', type: 'boolean = false' },
  { name: 'role', type: "'status' = 'status'", optional: true },
  { name: 'show()', type: 'method' },
  { name: 'close()', type: 'method' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'toast-background-color', default: 'var(--background-strong-color)' },
  { name: 'toast-text-color', default: 'var(--background-color)' },
  { name: 'toast-border-radius', default: 'var(--radius-large)' },
  { name: 'toast-padding-block', default: 'var(--space-2)' },
  { name: 'toast-padding-inline', default: 'var(--space-4)' },
  { name: 'toast-offset', default: 'var(--space-4)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Transient',
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
  <mm-page>
    <mm-page-header
      heading="Toast"
      description="작업 결과를 확인 없이 알리고 스스로 사라지는 transient non-modal 레이어입니다."
    ></mm-page-header>

    <mm-component-aka items='["Snackbar"]'></mm-component-aka>

    <mm-component-example>
      <mm-button data-open-toast>토스트 띄우기</mm-button>
      <mm-toast class="js-demo-toast">저장되었습니다.</mm-toast>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      <mm-paragraph>
        놓쳐도 되는 정보에만 씁니다. 사용자의 확인이 필요하면 dialog, 화면에 계속 남아야 하면
        notice를 쓰고, role="status"로 두어 스크린리더가 흐름을 끊지 않고 읽게 합니다.
      </mm-paragraph>
    </mm-component-guide>

    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-page>
`

renderPage(main, { initialize: setupToastTrigger })
