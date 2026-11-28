import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { subComponentPropsOf } from '@/components/domains/component'
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
  ...subComponentPropsOf('fff-tab-list'),
  ...subComponentPropsOf('fff-tab'),
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
  <fff-main>
    <fff-page-header
      heading="Tabs"
      description="한 페이지 안에서 같은 맥락의 콘텐츠 뷰를 전환하는 내비게이션입니다. 탭을 누르면 해당 뷰 하나만 보이고 선택된 탭이 표시되므로, 사용자는 페이지를 떠나지 않고 관련 정보 사이를 오가며 지금 어느 뷰를 보고 있는지 알 수 있습니다."
    ></fff-page-header>

    <fff-flex direction="column" gap="4">
      <fff-tab-list value="variant" variant="pill">
        <fff-tab value="variant">Variant</fff-tab>
        <fff-tab value="overflow">Overflow</fff-tab>
      </fff-tab-list>
      <fff-tab-panel value="variant">
        <fff-component-example>
          <fff-flex direction="column" gap="4">
            <fff-flex direction="column" gap="3">
              <fff-tab-list value="menu1" variant="line">
                <fff-tab value="menu1">첫 번째 메뉴</fff-tab>
                <fff-tab value="menu2">두 번째 메뉴</fff-tab>
                <fff-tab value="menu3">세 번째 메뉴</fff-tab>
              </fff-tab-list>

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

            <fff-flex direction="column" gap="3">
              <fff-tab-list value="daily" variant="pill">
                <fff-tab value="daily">일간</fff-tab>
                <fff-tab value="weekly">주간</fff-tab>
                <fff-tab value="monthly">월간</fff-tab>
              </fff-tab-list>

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

            <fff-flex direction="column" gap="3">
              <fff-tab-list value="posts" variant="text">
                <fff-tab value="posts">게시글</fff-tab>
                <fff-tab value="comments">댓글</fff-tab>
                <fff-tab value="bookmarks">북마크</fff-tab>
              </fff-tab-list>

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
          </fff-flex>
        </fff-component-example>
      </fff-tab-panel>
      <fff-tab-panel value="overflow">
        <fff-component-example>
          <fff-flex direction="column" gap="4">
            <fff-flex direction="column" gap="3">
              <fff-tab-list value="product-0" variant="line">
                ${productTabs.map(
                  (label, index) => html`
                    <fff-tab value="product-${index}">${label}</fff-tab>
                  `,
                )}
              </fff-tab-list>

              ${productTabs.map(
                (label, index) => html`
                  <fff-tab-panel value="product-${index}">${label} 영역입니다.</fff-tab-panel>
                `,
              )}
            </fff-flex>

            <fff-flex direction="column" gap="3">
              <fff-tab-list value="settings-0" variant="pill">
                ${settingsTabs.map(
                  (label, index) => html`
                    <fff-tab value="settings-${index}">${label}</fff-tab>
                  `,
                )}
              </fff-tab-list>

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

    <fff-component-guide .features=${componentFeatures}>
      <fff-text-list
        variant="check"
        .texts=${[
          '탭은 6개 이내로 구성한다. 탭이 화면 폭을 넘으면 가려진 탭이 있다는 걸 알아채기 어려워, 사용자가 그 탭을 모른 채 지나친다. 항목이 더 많다면 카드로 나열하고, 카드에서 다음 화면으로 넘어가는 흐름으로 설계한다',
          '카테고리는 탭이 아니라 필터로 둔다. 카테고리를 탭으로 두면 사용자는 다른 화면으로 넘어간다고 기대하지만 실제로는 같은 목록이 걸러질 뿐이라 혼란스럽다',
          '탭은 한 단계로만 둔다. 탭이 두 겹으로 쌓이면 어느 쪽이 상위인지, 지금 보는 뷰가 어디에 속하는지 알기 어렵다',
          '페이지를 대표하는 탭은 선택 상태를 URL에 남긴다. 새로고침하거나 링크를 공유해도 사용자가 보던 탭이 그대로 열린다. 탭 전환은 뒤로 가기 기록에 쌓이지 않아, 뒤로 가면 탭을 하나씩 거슬러 가지 않고 이전 페이지로 돌아간다. 문서 예제나 시트 안의 탭에는 쓰지 않는다',
        ]}
      ></fff-text-list>
    </fff-component-guide>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
