import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { subComponentPropsOf, rule } from '@/components/domains/component'
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
  ...subComponentPropsOf('mm-tab-list'),
  ...subComponentPropsOf('mm-tab'),
  ...subComponentPropsOf('mm-tab-panel'),
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

            <mm-flex direction="column" gap="3">
              <mm-tab-list value="posts" variant="text">
                <mm-tab value="posts">게시글</mm-tab>
                <mm-tab value="comments">댓글</mm-tab>
                <mm-tab value="bookmarks">북마크</mm-tab>
              </mm-tab-list>

              <mm-tab-panel value="posts">
                <span aria-hidden="true">📝</span>
                작성한 게시글...
              </mm-tab-panel>
              <mm-tab-panel value="comments">
                <span aria-hidden="true">💬</span>
                작성한 댓글...
              </mm-tab-panel>
              <mm-tab-panel value="bookmarks">
                <span aria-hidden="true">🔖</span>
                저장한 북마크...
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

    <mm-component-tokens .elements=${['mm-tab-list', 'mm-tab']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        variant="check"
        .texts=${[
          rule(
            '탭은 6개 이내로 구성한다',
            '탭이 화면 폭을 넘으면 가려진 탭이 있다는 걸 알아채기 어려워, 사용자가 그 탭을 모른 채 지나친다. 항목이 더 많다면 카드로 나열하고, 카드에서 다음 화면으로 넘어가는 흐름으로 설계한다',
          ),
          rule(
            '카테고리는 탭이 아니라 필터로 둔다',
            '카테고리를 탭으로 두면 사용자는 다른 화면으로 넘어간다고 기대하지만 실제로는 같은 목록이 걸러질 뿐이라 혼란스럽다',
          ),
          rule(
            '탭은 한 단계로만 둔다',
            '탭이 두 겹으로 쌓이면 어느 쪽이 상위인지, 지금 보는 뷰가 어디에 속하는지 알기 어렵다',
          ),
          rule(
            '페이지를 대표하는 탭은 선택 상태를 URL에 남긴다',
            '새로고침하거나 링크를 공유해도 사용자가 보던 탭이 그대로 열린다. 탭 전환은 뒤로 가기 기록에 쌓이지 않아, 뒤로 가면 탭을 하나씩 거슬러 가지 않고 이전 페이지로 돌아간다. 문서 예제나 시트 안의 탭에는 쓰지 않는다',
          ),
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
