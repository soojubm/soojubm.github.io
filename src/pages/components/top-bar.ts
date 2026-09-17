import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'bottom-bar.html', label: 'Bottom Bar' },
  { href: 'sheet.html', label: 'Sheet' },
  { href: 'tabs.html', label: 'Tabs' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'heading', type: 'string' },
  { name: 'nav', type: "'back' | 'close' = 'back'", optional: true },
  { name: "slot='action'", type: 'HTMLElement', optional: true },
  { name: 'nav-click', type: 'CustomEvent', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'top-bar-min-height' },
  { name: 'top-bar-gap' },
  { name: 'top-bar-background-color' },
]

const componentFeatures: ComponentFeatureItem[] = []

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Top Bar"
        description="화면 상단에 놓이는 제목과 내비게이션 영역입니다. 현재 화면의 제목과 함께 뒤로 가기·닫기, 주요 액션을 한 줄에 배치하므로, 사용자는 지금 어디에 있는지 확인하고 이전 단계로 돌아가거나 핵심 행동을 바로 실행할 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-example>
      <mm-top-bar nav="close" heading="상세 정보"></mm-top-bar>
      <mm-text>
        기존 흐름 위에 띄워 연 화면은 뒤로가기 대신 닫기 버튼으로 원래 흐름에 돌아갑니다.
      </mm-text>
      <mm-separator></mm-separator>
      <mm-top-bar heading="컬렉션에 추가">
        <mm-button slot="action" variant="ghost">완료</mm-button>
      </mm-top-bar>
      <mm-text>화면의 작업을 마치는 액션 하나는 텍스트 버튼으로 오른쪽 끝에 둡니다.</mm-text>
      <mm-separator></mm-separator>
      <mm-top-bar heading="수줍이님">
        <mm-button-group slot="action">
          <mm-button>저장</mm-button>
          <mm-more-button></mm-more-button>
        </mm-button-group>
      </mm-top-bar>
      <mm-text>
        액션이 여럿이면 주요 액션만 꺼내 두고 나머지는 더보기 메뉴로 모읍니다. md 화면에서도 꺼내
        두는 액션은 3개까지입니다.
      </mm-text>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          'sheet-header와의 구별 — top-bar는 화면 단위 상단 바라 높이·배경을 스스로 갖습니다. sheet 안에서는 패널이 간격을 소유하므로 mm-sheet-header를 씁니다. 지금 형태가 닮았어도 맥락이 달라 각자 따로 확장합니다.',
          '좌우 여백 — top-bar는 좌우 여백을 갖지 않습니다. 페이지 본문과 맞출지, 화면 끝까지 붙일지는 놓이는 맥락이 정하므로 사용처에서 지정합니다.',
          'fixed-top과의 구별 — fixed-top은 viewport 상단에 붙이는 위치만 맡고 높이·간격·배경을 갖지 않습니다. 스크롤해도 남아야 하는 top-bar는 fixed-top 안에 둡니다.',
          '제목 레벨 — heading은 상단 바 크기에 맞춘 레벨로 고정됩니다. mm-heading이 의미 단계와 타입 스케일을 함께 정하므로 레벨을 올리면 글자도 커지기 때문입니다. 페이지 최상위 제목은 본문의 page-header가 맡습니다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-top-bar nav="close" heading="컬렉션에 추가">
    <mm-button slot="action" variant="ghost">완료</mm-button>
</mm-top-bar>`}
    ></mm-component-anatomy>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
