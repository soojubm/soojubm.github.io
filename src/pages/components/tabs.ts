import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderLayout } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'accordion.html', label: 'Accordion' },
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
  { name: 'mm-tab value', type: 'string' },
  { name: 'mm-tab active', type: 'boolean = false', optional: true },
  { name: 'mm-tab-panel value', type: 'string' },
  { name: 'mm-tab-panel active', type: 'boolean = false', optional: true },
  { name: 'tab-select', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'tab-height', default: 'var(--size-32)' },
  { name: 'tab-padding-inline', default: 'var(--space-3)' },
  { name: 'tab-text-size', default: 'var(--font-size-14)' },
  { name: 'tab-text-color', default: 'var(--foreground-subtle-color)' },
  {
    name: 'tabs-indicator-background-color',
    default: 'var(--interaction-selected-background-color)',
  },
  { name: 'tabs-line-color', default: 'var(--border-color)' },
  { name: 'tabs-line-width', default: 'var(--border-width)' },
  { name: 'tabs-pill-border', default: 'var(--border-transparent)' },
  { name: 'tabs-pill-indicator-background-color', default: 'var(--background-color)' },
  { name: 'tabs-pill-indicator-border', default: 'var(--border-transparent)' },
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

const main = html`
  <mm-page>
    <mm-page-header
      heading="Tabs"
      description="페이지 내에서 같은 맥락으로 분류된 콘텐츠 뷰를 전환합니다."
    ></mm-page-header>

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

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
    </mm-component-guide>

    <mm-text>
      Make sure the controls within a pane affect content only in the same pane. Panes are mutually
      exclusive, so ensure they're fully self-contained. Use a segmented control to provide closely
      related choices that affect an object, state, or view. For example, a segmented control can
      help people switch between views in a toolbar. Avoid using a segmented control to offer
      actions, such as adding, removing, or editing content.
    </mm-text>

    <mm-text-list
      texts='[
          "SearchParams과 브라우저 히스토리를 활용할 것인가? (?tab=projects) / url변경 ",
          "글로벌 네비게이션 패턴인 햄버거 메뉴와 탭(바텀네비게이션, 탭바)을 함께 사용할 수 있는가?",
          "탭의 가로 스크롤(+ MDI). 탭의 최대 갯수 제한.",
          "탭의 중첩. 페이지에서 수행하는 과업 중심 플로우 설계. 중첩을 허용한다면 탭의 중첩 패턴을 정의해야 함. Material 3의 primary tabs / secondary tabs 분류 등 참고. 또는 네이버 쇼핑의 4단계 5단계 탭.",
          "flutter. Scaffold - AppBar - bottom: TabBar - tabs - Tab / Scaffold - body - TabBarView"
        ]'
    ></mm-text-list>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </mm-page>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
})
