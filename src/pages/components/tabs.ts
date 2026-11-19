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
  { href: 'https://material.io/components/tabs', label: 'Material Design - Tabs' },
  {
    href: 'https://m3.material.io/components/top-app-bar/overview',
    label: 'MD3 - Top App Bar',
  },
  {
    href: 'https://m2.material.io/components/bottom-navigation',
    label: 'MD2 - Bottom Navigation',
  },
  {
    href: 'https://m3.material.io/components/navigation-bar/overview',
    label: 'MD3 - Navigation Bar',
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
      <mm-content-section heading-level="3" heading="Count">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '탭은 6개 이내로 구성한다',
              '탭이 화면 폭을 넘치면 가로로 스크롤되지만, 가려진 탭은 눈에 잘 띄지 않는다',
            ),
            rule(
              '카테고리처럼 늘어나는 분류는 필터로 둔다',
              html`
                카테고리 탭은 뷰를 바꾸지 않고 목록을 좁히므로
                <mm-code>mm-filter-button-group</mm-code>
                을 쓴다
              `,
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Nesting">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '탭은 한 단계로만 둔다',
              '탭 줄이 두 겹이면 어느 줄이 상위인지, 지금 보는 뷰가 어디에 속하는지 알기 어렵다',
            ),
            rule(
              '패널 안의 하위 구분은 성격에 맞는 컴포넌트로 나눈다',
              html`
                목록을 좁히는 분류는
                <mm-code>mm-filter-button-group</mm-code>
                으로, 순서대로 거치는 단계는
                <mm-code>mm-step</mm-code>
                으로 둔다
              `,
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="URL">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '페이지를 대표하는 탭 리스트에 search-param으로 키를 준다',
              '새로고침하거나 링크를 공유해도 같은 탭이 열리고, 탭 전환은 뒤로 가기 기록에 쌓이지 않는다. 문서 예제나 시트 안의 탭에는 쓰지 않는다',
            ),
            rule(
              '한 페이지에 여럿이면 키를 다르게 정한다',
              '같은 키를 쓰면 한쪽의 선택이 다른 쪽을 덮는다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>
    </mm-component-guide>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
