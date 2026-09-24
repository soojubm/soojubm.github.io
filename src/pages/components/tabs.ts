import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'disclosure.html', label: 'Disclosure' },
  { href: 'top-bar.html', label: 'Top Bar' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.apple.com/documentation/swiftui/navigationstack',
    label: 'SwiftUI - NavigationStack',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/tab-views',
    label: 'Apple HIG - Tab Views',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/selection-and-input/segmented-controls/',
    label: 'Apple HIG - Segmented Controls',
    external: true,
  },
  { href: 'https://material.io/components/tabs', label: 'Material Design - Tabs', external: true },
  {
    href: 'https://m3.material.io/components/top-app-bar/overview',
    label: 'MD3 - Top App Bar',
    external: true,
  },
  {
    href: 'https://m2.material.io/components/bottom-navigation',
    label: 'MD2 - Bottom Navigation',
    external: true,
  },
  {
    href: 'https://m3.material.io/components/navigation-bar/overview',
    label: 'MD3 - Navigation Bar',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/navigation-and-search/tab-bars',
    label: 'Apple HIG - Tab Bars',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'mm-tab-list value', type: 'string' },
  { name: 'mm-tab-list variant', type: "'line' | 'pill' = 'line'" },
  { name: 'mm-tab-list search-param', type: 'string', optional: true },
  { name: 'mm-tab value', type: 'string' },
  { name: 'mm-tab-panel value', type: 'string' },
  { name: 'change', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'tab-height' },
  { name: 'tab-padding-inline' },
  { name: 'tab-text-size' },
  { name: 'tab-text-color' },
  { name: 'tabs-indicator-background-color' },
  { name: 'tabs-line-color' },
  { name: 'tabs-line-width' },
  { name: 'tabs-pill-border' },
  { name: 'tabs-pill-indicator-background-color' },
  { name: 'tabs-pill-indicator-border' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '여러 탭 중 현재 보고 있는 탭 하나를 aria-selected 상태로 드러냅니다. 페이지 링크, 콘텐츠 정렬, 콘텐츠 필터 또는 탭투스크롤로 사용하지 마세요. 좌우 방향키로 탭을 이동하고 Home·End로 처음·마지막 탭을 선택합니다.',
  },
  {
    heading: 'Glanceable',
    description:
      '최대 2단어를 넘지 않도록 작성하고 두 줄이 되지 않도록 작성합니다. (그러나 폴더블과 워치 이후 말 줄임표나 두 줄 레이블을 허용해야 하는가)',
  },
]

const productTabs = [
  '상품 정보',
  '상세 설명',
  '구매 후기',
  '상품 문의',
  '배송·교환·반품 안내',
  '판매자 정보',
]

const settingsTabs = ['프로필', '계정 보안', '알림 설정', '개인정보 보호', '결제 수단', '연결된 앱']

const main = html`
  <mm-main>
    <mm-page-header
      heading="Tabs"
      description="한 페이지 안에서 같은 맥락의 콘텐츠 뷰를 전환하는 내비게이션입니다. 탭을 누르면 해당 뷰 하나만 보이고 선택된 탭이 표시되므로, 사용자는 페이지를 떠나지 않고 관련 정보 사이를 오가며 지금 어느 뷰를 보고 있는지 알 수 있습니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="variant" variant="pill">
        <mm-tab value="variant">Variant</mm-tab>
        <mm-tab value="overflow">Overflow</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="variant">
        <mm-component-example>
          <mm-flex direction="column" gap="4">
            <mm-flex direction="column" gap="3">
              <mm-tab-list value="menu1" variant="line">
                <mm-tab value="menu1">첫 번째 메뉴</mm-tab>
                <mm-tab value="menu2">두 번째 메뉴</mm-tab>
                <mm-tab value="menu3">세 번째 메뉴</mm-tab>
              </mm-tab-list>

              <mm-tab-panel value="menu1">
                <span aria-hidden="true">🍎</span>
                1번 콘텐츠 영역입니다.
              </mm-tab-panel>
              <mm-tab-panel value="menu2">
                <span aria-hidden="true">🍌</span>
                2번 콘텐츠 영역입니다.
              </mm-tab-panel>
              <mm-tab-panel value="menu3">
                <span aria-hidden="true">🍇</span>
                3번 콘텐츠 영역입니다.
              </mm-tab-panel>
            </mm-flex>

            <mm-flex direction="column" gap="3">
              <mm-tab-list value="daily" variant="pill">
                <mm-tab value="daily">일간</mm-tab>
                <mm-tab value="weekly">주간</mm-tab>
                <mm-tab value="monthly">월간</mm-tab>
              </mm-tab-list>

              <mm-tab-panel value="daily">
                <span aria-hidden="true">📅</span>
                오늘 생성된 데이터...
              </mm-tab-panel>
              <mm-tab-panel value="weekly">
                <span aria-hidden="true">🗓️</span>
                이번 주 누적 데이터...
              </mm-tab-panel>
              <mm-tab-panel value="monthly">
                <span aria-hidden="true">📊</span>
                이번 달 정산 데이터...
              </mm-tab-panel>
            </mm-flex>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="overflow">
        <mm-component-example>
          <mm-flex direction="column" gap="4">
            <mm-flex direction="column" gap="3">
              <mm-tab-list value="product-0" variant="line">
                ${productTabs.map(
                  (label, index) => html`
                    <mm-tab value="product-${index}">${label}</mm-tab>
                  `,
                )}
              </mm-tab-list>

              ${productTabs.map(
                (label, index) => html`
                  <mm-tab-panel value="product-${index}">${label} 영역입니다.</mm-tab-panel>
                `,
              )}
            </mm-flex>

            <mm-flex direction="column" gap="3">
              <mm-tab-list value="settings-0" variant="pill">
                ${settingsTabs.map(
                  (label, index) => html`
                    <mm-tab value="settings-${index}">${label}</mm-tab>
                  `,
                )}
              </mm-tab-list>

              ${settingsTabs.map(
                (label, index) => html`
                  <mm-tab-panel value="settings-${index}">${label} 설정 영역입니다.</mm-tab-panel>
                `,
              )}
            </mm-flex>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-paragraph>
        Make sure the controls within a pane affect content only in the same pane. Panes are
        mutually exclusive, so ensure they're fully self-contained. Use a segmented control to
        provide closely related choices that affect an object, state, or view. For example, a
        segmented control can help people switch between views in a toolbar. Avoid using a segmented
        control to offer actions, such as adding, removing, or editing content.
      </mm-paragraph>

      <mm-content-section heading-level="3" heading="Count">
        <mm-text-list
          variant="check"
          .texts=${[
            html`
              <span>
                <mm-text weight="bold">탭은 6개 이내로 구성한다</mm-text>
                개수를 강제로 제한하지는 않는다. 탭이 화면 폭을 넘치면 가로로 스크롤되고 양 끝에
                넘김 버튼이 나타나지만, 가려진 탭은 눈에 잘 띄지 않는다
              </span>
            `,
            html`
              <span>
                <mm-text weight="bold">카테고리처럼 항목이 늘어나는 분류는 필터로 둔다</mm-text>
                카테고리 탭은 뷰를 바꾸는 것이 아니라 한 목록을 좁히는 필터의 역할이므로
                <mm-code>mm-filter-button-group</mm-code>
                을 쓴다
              </span>
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Nesting">
        <mm-text-list
          variant="check"
          .texts=${[
            html`
              <span>
                <mm-text weight="bold">탭은 페이지에 한 단계로만 둔다</mm-text>
                탭 줄이 두 겹 쌓이면 어느 줄이 상위인지, 지금 보는 뷰가 어디에 속하는지 탭만으로
                되짚기 어렵다. Material 3의 primary·secondary tabs나 네이버 쇼핑의 다단계 탭 같은
                중첩 구조는 쓰지 않는다
              </span>
            `,
            html`
              <span>
                <mm-text weight="bold">탭 하나에는 과업 하나의 뷰를 담는다</mm-text>
                탭은 페이지에서 하는 과업 하나를 같은 대상의 여러 뷰로 나눈다. 패널 안을 다시 탭으로
                나눠야 할 만큼 콘텐츠가 크다면 그 패널이 별도 과업이라는 신호이므로 페이지를 나눈다
              </span>
            `,
            html`
              <span>
                <mm-text weight="bold">패널 안의 하위 구분은 성격에 맞는 컴포넌트로 나눈다</mm-text>
                한 목록을 좁히는 분류는
                <mm-code>mm-filter-button-group</mm-code>
                으로, 순서대로 거치는 단계는
                <mm-code>mm-step</mm-code>
                으로 둔다
              </span>
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="URL">
        <mm-text-list
          variant="check"
          .texts=${[
            html`
              <span>
                <mm-text weight="bold">
                  페이지를 대표하는 탭 리스트에 search-param으로 키를 준다
                </mm-text>
                <mm-code>search-param</mm-code>
                을 준 탭 리스트는 진입 시 그 키의 값으로 탭을 열고, 탭을 바꾸면 URL을 replaceState로
                바꾼다. 새로고침하거나 링크를 공유해도 같은 탭이 열리고, 탭 전환은 히스토리에 쌓이지
                않아 뒤로 가기는 이전 페이지로 나간다. 문서 예제나 시트 안의 탭은 URL 없이 둔다
              </span>
            `,
            html`
              <span>
                <mm-text weight="bold">
                  한 페이지에 여럿이면 탭 리스트마다 키를 다르게 정한다
                </mm-text>
                같은 키를 쓰면 한쪽의 선택이 다른 쪽 URL 값을 덮는다
              </span>
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Flutter">
        <mm-flex direction="column" gap="3">
          <mm-paragraph>
            탭 줄(TabBar)은 AppBar 아래에, 뷰(TabBarView)는 body에 떨어져 있고
            DefaultTabController가 둘의 선택 상태를 잇는다.
            <mm-code>mm-tab-list</mm-code>
            가 형제
            <mm-code>mm-tab-panel</mm-code>
            을 찾아 연결하는 것과 같은 구조다.
          </mm-paragraph>
          <mm-code-block
            language="text"
            .copyable=${false}
            .code=${`DefaultTabController
└─ Scaffold
   ├─ appBar: AppBar
   │  └─ bottom: TabBar (mm-tab-list)
   │     └─ tabs: [Tab, …] (mm-tab)
   └─ body: TabBarView
      └─ children: [Widget, …] (mm-tab-panel)`}
          ></mm-code-block>
        </mm-flex>
      </mm-content-section>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-tab-list value="menu1" variant="line">
    <mm-tab value="menu1">첫 번째 메뉴</mm-tab>
    <mm-tab value="menu2">두 번째 메뉴</mm-tab>
</mm-tab-list>

<mm-tab-panel value="menu1">1번 콘텐츠 영역입니다.</mm-tab-panel>
<mm-tab-panel value="menu2">2번 콘텐츠 영역입니다.</mm-tab-panel>`}
    ></mm-component-anatomy>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
