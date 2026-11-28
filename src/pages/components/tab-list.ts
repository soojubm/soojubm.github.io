import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { componentPropsOf, subComponentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'pattern.html?tab=disclosure', label: 'Disclosure' },
  { href: 'top-bar.html', label: 'Top Bar' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.apple.com/documentation/swiftui/navigationstack',
    label: 'SwiftUI - NavigationStack',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/tab-views',
    label: 'Apple HIG - Tab Views',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/selection-and-input/segmented-controls/',
    label: 'Apple HIG - Segmented Controls',
  },
  { href: 'https://material.io/components/tabs', label: 'Material Design 2 - Tabs' },
  {
    href: 'https://m3.material.io/components/top-app-bar/overview',
    label: 'Material Design 3 - Top App Bar',
  },
  {
    href: 'https://m2.material.io/components/bottom-navigation',
    label: 'Material Design 2 - Bottom Navigation',
  },
  {
    href: 'https://m3.material.io/components/navigation-bar/overview',
    label: 'Material Design 3 - Navigation Bar',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/navigation-and-search/tab-bars',
    label: 'Apple HIG - Tab Bars',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-tab-list'),
  ...subComponentPropsOf('fff-tab-panel'),
  { name: 'change', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '여러 탭 중 현재 보고 있는 탭 하나를 드러냅니다. 페이지 링크, 콘텐츠 정렬, 콘텐츠 필터 또는 탭투스크롤로 사용하지 마세요. 키보드로는 좌우 방향키로 탭을 이동하고 Home·End로 처음·마지막 탭을 선택합니다.',
  },
  {
    heading: 'Glanceable',
    description:
      '최대 2단어를 넘지 않도록 작성하고 두 줄이 되지 않도록 작성합니다. TODO (그러나 폴더블과 워치 이후 말 줄임표나 두 줄 레이블을 허용해야 하는가)',
  },
]

const tabItemsOf = (prefix: string, labels: string[]) =>
  labels.map((label, index) => ({ value: `${prefix}-${index}`, label }))

const productTabs = [
  '상품 정보',
  '상세 설명',
  '구매 후기',
  '상품 문의',
  '배송·교환·반품 안내',
  '판매자 정보',
]

const manyTabs = [
  '상품 정보',
  '상세 설명',
  '구매 후기',
  '상품 문의',
  '배송 안내',
  '교환·반품',
  '판매자 정보',
]

const manyTabItems = tabItemsOf('many', manyTabs)

const productTabItems = tabItemsOf('product', productTabs)

const settingsTabs = ['프로필', '계정 보안', '알림 설정', '개인정보 보호', '결제 수단', '연결된 앱']

const settingsTabItems = tabItemsOf('settings', settingsTabs)

const exampleCode = `<fff-tab-list
  value="daily"
  variant="pill"
  .tabs=\${[
    { value: 'daily', label: '일간' },
    { value: 'weekly', label: '주간' },
    { value: 'monthly', label: '월간' },
  ]}
></fff-tab-list>
<fff-tab-panel value="daily">오늘 생성된 데이터...</fff-tab-panel>
<fff-tab-panel value="weekly">이번 주 누적 데이터...</fff-tab-panel>
<fff-tab-panel value="monthly">이번 달 정산 데이터...</fff-tab-panel>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Tab List"
      description="한 페이지 안에서 같은 맥락의 콘텐츠 뷰를 전환하는 내비게이션입니다. 탭을 누르면 해당 뷰 하나만 보이고 선택된 탭이 표시되므로, 사용자는 페이지를 떠나지 않고 관련 정보 사이를 오가며 지금 어느 뷰를 보고 있는지 알 수 있습니다."
    ></fff-page-header>

    <fff-flex direction="column" gap="4">
      <fff-tab-list
        value="variant"
        variant="pill"
        .tabs=${[
          { value: 'variant', label: 'Variant' },
          { value: 'overflow', label: 'Overflow' },
        ]}
      ></fff-tab-list>
      <fff-tab-panel value="variant">
        <fff-component-example>
          <fff-flex direction="column" gap="3">
            <fff-tab-list
              value="daily"
              variant="pill"
              .tabs=${[
                { value: 'daily', label: '일간' },
                { value: 'weekly', label: '주간' },
                { value: 'monthly', label: '월간' },
              ]}
            ></fff-tab-list>

            <fff-tab-panel value="daily">
              <span aria-hidden="true">📅</span>
              오늘 생성된 데이터...
            </fff-tab-panel>
            <fff-tab-panel value="weekly">
              <span aria-hidden="true">🗓️</span>
              이번 주 누적 데이터...
            </fff-tab-panel>
            <fff-tab-panel value="monthly">
              <span aria-hidden="true">📊</span>
              이번 달 정산 데이터...
            </fff-tab-panel>
          </fff-flex>
          <fff-separator level="section"></fff-separator>
          <fff-flex direction="column" gap="3">
            <fff-tab-list
              value="posts"
              variant="text"
              .tabs=${[
                { value: 'posts', label: '게시글' },
                { value: 'comments', label: '댓글' },
                { value: 'bookmarks', label: '북마크' },
              ]}
            ></fff-tab-list>
            <fff-tab-panel value="posts">
              <span aria-hidden="true">📝</span>
              작성한 게시글...
            </fff-tab-panel>
            <fff-tab-panel value="comments">
              <span aria-hidden="true">💬</span>
              작성한 댓글...
            </fff-tab-panel>
            <fff-tab-panel value="bookmarks">
              <span aria-hidden="true">🔖</span>
              저장한 북마크...
            </fff-tab-panel>
          </fff-flex>
          <fff-separator level="section"></fff-separator>
          <fff-flex direction="column" gap="3">
            <fff-code-tag tone="orange">Duplicated</fff-code-tag>
            <fff-tab-list
              value="menu1"
              variant="line"
              .tabs=${[
                { value: 'menu1', label: '첫 번째 메뉴' },
                { value: 'menu2', label: '두 번째 메뉴' },
                { value: 'menu3', label: '세 번째 메뉴' },
              ]}
            ></fff-tab-list>

            <fff-tab-panel value="menu1">
              <span aria-hidden="true">🍎</span>
              1번 콘텐츠 영역입니다.
            </fff-tab-panel>
            <fff-tab-panel value="menu2">
              <span aria-hidden="true">🍌</span>
              2번 콘텐츠 영역입니다.
            </fff-tab-panel>
            <fff-tab-panel value="menu3">
              <span aria-hidden="true">🍇</span>
              3번 콘텐츠 영역입니다.
            </fff-tab-panel>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${exampleCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="overflow">
        <fff-component-example>
          <fff-flex direction="column" gap="4">
            <fff-flex direction="column" gap="3">
              <fff-tab-list
                value="product-0"
                variant="line"
                .tabs=${productTabItems}
              ></fff-tab-list>

              ${productTabs.map(
                (label, index) => html`
                  <fff-tab-panel value="product-${index}">${label} 영역입니다.</fff-tab-panel>
                `,
              )}
            </fff-flex>

            <fff-flex direction="column" gap="3">
              <fff-tab-list
                value="settings-0"
                variant="pill"
                .tabs=${settingsTabItems}
              ></fff-tab-list>

              ${settingsTabs.map(
                (label, index) => html`
                  <fff-tab-panel value="settings-${index}">${label} 설정 영역입니다.</fff-tab-panel>
                `,
              )}
            </fff-flex>
          </fff-flex>
        </fff-component-example>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-tab-list', 'fff-tab']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-content-section-list size="small">
        <fff-content-section
          heading-level="3"
          heading="탭은 몇 개까지 둘 수 있나요?"
          description="탭은 6개 이내로 둡니다. 항목이 더 많으면 목록으로 나열하고, 항목을 눌러 다음 화면으로 넘어가게 합니다."
        >
          <fff-grid columns="2" gap="6">
            <fff-figure-card
              height="10rem"
              description="화면 폭을 넘어 가려진 탭이 있다는 걸 알아채기 어려워, 그 탭을 모른 채 지나칩니다."
            >
              <fff-flex slot="figure" direction="column" gap="3" style="width: 80%">
                <fff-tab-list value="many-0" variant="pill" .tabs=${manyTabItems}></fff-tab-list>
                ${manyTabs.map(
                  (label, index) => html`
                    <fff-tab-panel value="many-${index}">${label} 영역입니다.</fff-tab-panel>
                  `,
                )}
              </fff-flex>
              <fff-code-tag slot="tags" tone="red">Don't</fff-code-tag>
            </fff-figure-card>
            <fff-figure-card
              height="10rem"
              description="항목을 눌러 다음 화면으로 넘어가는 흐름으로 설계합니다."
            >
              <fff-flex slot="figure" gap="2" style="width: 80%">
                <fff-surface
                  variant="filled"
                  style="--surface-padding: var(--space-2); flex: 1; min-width: 0; aspect-ratio: 1"
                >
                  <fff-flex direction="column" justify-content="space-between" style="height: 100%">
                    <fff-flex direction="column" gap="1">
                      <fff-avatar size="40" icon=${ICON_NAMES.INFO}></fff-avatar>
                      <fff-text>상품 정보</fff-text>
                    </fff-flex>
                    <fff-icon name=${ICON_NAMES.NEXT} size="16"></fff-icon>
                  </fff-flex>
                </fff-surface>
                <fff-surface
                  variant="filled"
                  style="--surface-padding: var(--space-2); flex: 1; min-width: 0; aspect-ratio: 1"
                >
                  <fff-flex direction="column" justify-content="space-between" style="height: 100%">
                    <fff-flex direction="column" gap="1">
                      <fff-avatar size="40" icon=${ICON_NAMES.DOCUMENT}></fff-avatar>
                      <fff-text>상세 설명</fff-text>
                    </fff-flex>
                    <fff-icon name=${ICON_NAMES.NEXT} size="16"></fff-icon>
                  </fff-flex>
                </fff-surface>
                <fff-surface
                  variant="filled"
                  style="--surface-padding: var(--space-2); flex: 1; min-width: 0; aspect-ratio: 1"
                >
                  <fff-flex direction="column" justify-content="space-between" style="height: 100%">
                    <fff-flex direction="column" gap="1">
                      <fff-avatar size="40" icon=${ICON_NAMES.COMMENT}></fff-avatar>
                      <fff-text>구매 후기</fff-text>
                    </fff-flex>
                    <fff-icon name=${ICON_NAMES.NEXT} size="16"></fff-icon>
                  </fff-flex>
                </fff-surface>
              </fff-flex>
              <fff-code-tag slot="tags" tone="green">Do</fff-code-tag>
            </fff-figure-card>
          </fff-grid>
        </fff-content-section>
        <fff-content-section
          heading-level="3"
          heading="카테고리는 탭으로 두어도 되나요?"
          description="탭은 다른 뷰로 넘어가는 내비게이션입니다. 같은 목록을 거르는 카테고리는 필터로 둡니다."
        >
          <fff-grid columns="2" gap="6">
            <fff-figure-card
              height="8rem"
              description="다른 화면을 기대하지만 같은 목록이 걸러질 뿐입니다."
            >
              <fff-flex slot="figure" direction="column" gap="3" style="width: 80%">
                <fff-tab-list
                  value="category-all"
                  variant="line"
                  .tabs=${[
                    { value: 'category-all', label: '전체' },
                    { value: 'category-top', label: '상의' },
                    { value: 'category-bottom', label: '하의' },
                  ]}
                ></fff-tab-list>
                <fff-tab-panel value="category-all">상품 24개</fff-tab-panel>
                <fff-tab-panel value="category-top">상품 10개</fff-tab-panel>
                <fff-tab-panel value="category-bottom">상품 14개</fff-tab-panel>
              </fff-flex>
              <fff-code-tag slot="tags" tone="red">Don't</fff-code-tag>
            </fff-figure-card>
            <fff-figure-card height="8rem" description="같은 목록이 걸러진다는 걸 보여 줍니다.">
              <fff-flex slot="figure" direction="column" gap="3" style="width: 80%">
                <fff-filter-button-group
                  mode="single"
                  .values=${['all']}
                  .options=${[
                    { value: 'all', label: '전체' },
                    { value: 'top', label: '상의' },
                    { value: 'bottom', label: '하의' },
                  ]}
                ></fff-filter-button-group>
                <fff-paragraph>상품 24개</fff-paragraph>
              </fff-flex>
              <fff-code-tag slot="tags" tone="green">Do</fff-code-tag>
            </fff-figure-card>
          </fff-grid>
        </fff-content-section>
        <fff-content-section
          heading-level="3"
          heading="탭을 두 겹으로 쌓아도 되나요?"
          description="탭은 한 단계로만 둡니다. 패널 안의 하위 구분은 필터로 나눕니다."
        >
          <fff-grid columns="2" gap="6">
            <fff-figure-card
              height="10rem"
              description="어느 쪽이 상위인지, 지금 보는 뷰가 어디에 속하는지 알기 어렵습니다."
            >
              <fff-flex slot="figure" direction="column" gap="3" style="width: 80%">
                <fff-tab-list
                  value="nested-outer-1"
                  variant="line"
                  .tabs=${[
                    { value: 'nested-outer-1', label: '상품' },
                    { value: 'nested-outer-2', label: '후기' },
                  ]}
                ></fff-tab-list>
                <fff-tab-panel value="nested-outer-1">
                  <fff-tab-list
                    value="nested-inner-1"
                    variant="pill"
                    .tabs=${[
                      { value: 'nested-inner-1', label: '상의' },
                      { value: 'nested-inner-2', label: '하의' },
                    ]}
                  ></fff-tab-list>
                </fff-tab-panel>
                <fff-tab-panel value="nested-outer-2">후기 영역입니다.</fff-tab-panel>
              </fff-flex>
              <fff-code-tag slot="tags" tone="red">Don't</fff-code-tag>
            </fff-figure-card>
            <fff-figure-card
              height="10rem"
              description="상위는 탭 하나뿐이라 지금 보는 뷰가 분명합니다."
            >
              <fff-flex slot="figure" direction="column" gap="3" style="width: 80%">
                <fff-tab-list
                  value="flat-1"
                  variant="line"
                  .tabs=${[
                    { value: 'flat-1', label: '상품' },
                    { value: 'flat-2', label: '후기' },
                  ]}
                ></fff-tab-list>
                <fff-tab-panel value="flat-1">
                  <fff-filter-button-group
                    mode="single"
                    .values=${['top']}
                    .options=${[
                      { value: 'top', label: '상의' },
                      { value: 'bottom', label: '하의' },
                    ]}
                  ></fff-filter-button-group>
                </fff-tab-panel>
                <fff-tab-panel value="flat-2">후기 영역입니다.</fff-tab-panel>
              </fff-flex>
              <fff-code-tag slot="tags" tone="green">Do</fff-code-tag>
            </fff-figure-card>
          </fff-grid>
        </fff-content-section>
        <fff-content-section
          heading-level="3"
          heading="탭 히스토리 및 상태 관리"
          description="페이지를 대표하는 탭은 선택 상태를 URL에 남깁니다. 탭 리스트에 search-param을 지정하면 선택한 탭이 URL에 담기고, 그 값으로 탭이 열립니다."
          .texts=${[
            '페이지를 대표하는 탭은 선택 상태를 URL에 남긴다. 새로고침하거나 링크를 공유해도 사용자가 보던 탭이 그대로 열린다',
            '탭 전환은 뒤로 가기 기록에 쌓지 않는다. 쌓이면 뒤로 갈 때 탭을 하나씩 거슬러 가느라 이전 페이지로 돌아가지 못한다',
            '문서 예제나 시트 안의 탭에는 쓰지 않는다',
          ]}
        ></fff-content-section>
      </fff-content-section-list>
    </fff-component-guide>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
