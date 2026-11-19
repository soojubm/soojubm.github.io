import { html } from 'lit'

import type {
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { MoreMenuAction } from '@/components/overlay/popover/semantics/more-menu'

import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/components/app-bars/overview',
    label: 'MD3 - App Bars',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/toolbars',
    label: 'Apple HIG - Toolbars',
  },
]

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'bottom-bar.html', label: 'Bottom Bar' },
  { href: 'sheet.html', label: 'Sheet' },
  { href: 'tabs.html', label: 'Tabs' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-top-bar'),
  { name: "slot='action'", type: 'HTMLElement', optional: true },
  { name: 'nav-click', type: 'CustomEvent', kind: 'event' },
]

const moreMenuActions: MoreMenuAction[] = [
  { value: 'share', label: '공유', onClick: () => alert('clicked') },
  { value: 'edit', label: '프로필 수정', onClick: () => alert('clicked') },
  { value: 'block', label: '차단', destructive: true, onClick: () => alert('clicked') },
]

const exampleCode = `<mm-top-bar nav="close" heading="상세 정보"></mm-top-bar>
<mm-top-bar heading="컬렉션에 추가">
  <mm-button slot="action" variant="tertiary">완료</mm-button>
</mm-top-bar>
<mm-top-bar heading="수줍이님">
  <mm-button-group slot="action">
    <mm-button>저장</mm-button>
    <mm-more-menu .actions=\${moreMenuActions}></mm-more-menu>
  </mm-button-group>
</mm-top-bar>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Top Bar"
      description="화면 상단에 놓이는 제목과 내비게이션 영역입니다. 현재 화면의 제목과 함께 뒤로 가기·닫기, 주요 액션을 한 줄에 배치하므로, 사용자는 지금 어디에 있는지 확인하고 이전 단계로 돌아가거나 핵심 행동을 바로 실행할 수 있습니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-top-bar nav="close" heading="상세 정보"></mm-top-bar>
      <mm-text>
        기존 흐름 위에 띄워 연 화면은 뒤로가기 대신 닫기 버튼으로 원래 흐름에 돌아갑니다.
      </mm-text>
      <mm-separator></mm-separator>
      <mm-top-bar heading="컬렉션에 추가">
        <mm-button slot="action" variant="tertiary">완료</mm-button>
      </mm-top-bar>
      <mm-text>화면의 작업을 마치는 액션 하나는 텍스트 버튼으로 오른쪽 끝에 둡니다.</mm-text>
      <mm-separator></mm-separator>
      <mm-top-bar heading="수줍이님">
        <mm-button-group slot="action">
          <mm-button>저장</mm-button>
          <mm-more-menu .actions=${moreMenuActions}></mm-more-menu>
        </mm-button-group>
      </mm-top-bar>
      <mm-text>
        액션이 여럿이면 주요 액션만 꺼내 두고 나머지는 더보기 메뉴로 모읍니다. md 화면에서도 꺼내
        두는 액션은 3개까지입니다.
      </mm-text>
    </mm-component-example>
    <mm-component-code .code=${exampleCode}></mm-component-code>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-top-bar']}></mm-component-tokens>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
