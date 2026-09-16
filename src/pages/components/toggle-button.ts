import { html } from 'lit'

import type { FilterOption } from '@/components/common'
import type { OptionItem } from '@/types'
import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'button.html', label: 'Button' },
  { href: 'switch.html', label: 'Switch' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/components/button-groups/overview',
    label: 'MD3 - Button Groups',
    external: true,
  },
  {
    href: 'https://polaris-react.shopify.com/components/lists/resource-list',
    label: 'Shopify Polaris - Resource List',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'pressed', type: 'boolean = false' },
  { name: 'value', type: 'string' },
  { name: 'icon', type: 'IconName', optional: true },
  { name: 'disabled', type: 'boolean = false' },
  { name: 'aria-label', type: 'string', optional: true },
  {
    name: 'mm-toggle-button-group options',
    type: '{ value: string; label: string; icon?: IconName; disabled?: boolean }[] = []',
    optional: true,
  },
  { name: 'mm-toggle-button-group value', type: 'string', optional: true },
  { name: 'mm-toggle-button-group hidden-label', type: 'boolean = false', optional: true },
  { name: 'mm-toggle-button-group stretch', type: 'boolean = false', optional: true },
  {
    name: 'mm-toggle-button-group orientation',
    type: "'horizontal' | 'vertical' = 'horizontal'",
    optional: true,
  },
  { name: 'change', type: 'CustomEvent detail: pressed, value', kind: 'event' },
  { name: 'mm-toggle-button-group change', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [{ name: 'toggle-button-border-radius' }]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '누를 때마다 누름(pressed) 상태가 토글되어 선택 여부를 드러내고, 그룹에서는 단일 선택으로 동작합니다.',
  },
]

const anatomyViewOptions: OptionItem[] = [
  { value: 'list', icon: 'table-rows', label: '목록' },
  { value: 'grid', icon: 'view-grid', label: '그리드' },
]

const iconOnlyViewOptions: OptionItem[] = [
  { value: 'grid', icon: 'view-grid', label: 'Grid view' },
  { value: 'list', icon: 'table-rows', label: 'List view' },
]

const labelOnlyViewOptions: OptionItem[] = [
  { label: 'Grid', value: 'grid' },
  { label: 'List', value: 'list' },
]

const labeledIconViewOptions: OptionItem[] = [
  { label: 'Grid', value: 'grid', icon: 'view-grid' },
  { label: 'List', value: 'list', icon: 'table-rows' },
]

const densityOptions: OptionItem[] = [
  { label: 'Compact', value: 'compact', icon: 'minus' },
  { label: 'Default', value: 'default', icon: 'circle' },
  { label: 'Comfortable', value: 'comfortable', icon: 'plus', disabled: true },
]

const orderStatusValues = ['all']
const orderStatusOptions: FilterOption[] = [
  { value: 'all', label: '전체' },
  { value: 'deposit', label: '입금확인' },
  { value: 'paid', label: '결제완료' },
  { value: 'shipping', label: '배송중' },
]

const genreValues = ['novel', 'movie']
const genreOptions: FilterOption[] = [
  { value: 'novel', label: '소설' },
  { value: 'movie', label: '영화' },
  { value: 'typo', label: '타이포그래피' },
  { value: 'music', label: '음악' },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="ToggleButton"
      description="클릭하면 선택/비선택 상태가 전환되는 버튼입니다. 독립적인 on/off 토글과, 단일 선택 세그먼트(ToggleButtonGroup)로 확장됩니다."
    ></mm-page-header>

    <mm-component-aka .items=${['Toggle', 'Switch button', 'Pressed button']}></mm-component-aka>

    <mm-component-example>
      <mm-button-group>
        <mm-toggle-button value="bold" icon=${ICON_NAMES.BOLD} pressed>굵게</mm-toggle-button>
        <mm-toggle-button value="italic" icon=${ICON_NAMES.ITALIC}>기울임</mm-toggle-button>
        <mm-toggle-button value="underline" icon=${ICON_NAMES.UNDERLINE}>밑줄</mm-toggle-button>
        <mm-toggle-button value="disabled" disabled>비활성</mm-toggle-button>
      </mm-button-group>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-heading level="3">접근성</mm-heading>
      <mm-text-block
        level="4"
        heading="레이블이 보일 때"
        description="보이는 레이블이 곧 버튼의 이름이므로 aria-label을 따로 주지 않습니다. 누름 여부는 aria-pressed가 전달하므로 레이블에 '켜짐'·'선택됨' 같은 상태를 덧붙이지 않습니다."
      ></mm-text-block>
      <mm-text-block
        level="4"
        heading="아이콘만 보일 때"
        description="단독 토글은 aria-label로 이름을 줍니다. 그룹은 옵션의 label을 그대로 두고 hidden-label을 켜서, label이 화면 대신 버튼의 이름으로 쓰이게 합니다."
      ></mm-text-block>
      <mm-text-block
        level="4"
        heading="그룹 이름"
        description="옵션만으로 무엇을 고르는지 알기 어려우면 그룹에 aria-label을 주어 묶음 전체의 이름을 전달합니다."
      ></mm-text-block>
    </mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨테이너 — 옵션들을 감싸고 단일 선택 그룹임을 나타냅니다.',
        '옵션 버튼 — 각 선택지. 아이콘과 레이블을 가질 수 있습니다.',
        '선택 인디케이터 — 현재 선택된 옵션을 배경·색상으로 표시합니다.',
        '구분선 — 옵션 사이의 시각적 경계(선택).',
      ]}
      .code=${`<mm-toggle-button-group
    value="list"
    .options=\${[
        { value: 'list', icon: 'table-rows', label: '목록' },
        { value: 'grid', icon: 'view-grid', label: '그리드' },
    ]}
></mm-toggle-button-group>`}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-start' },
        { placement: 'block-end', offset: '25%' },
        { placement: 'block-end' },
      ]}
    >
      <mm-toggle-button-group value="list" .options=${anatomyViewOptions}></mm-toggle-button-group>
    </mm-component-anatomy>

    <mm-component-section
      heading="ToggleButtonGroup"
      description="여러 ToggleButton을 묶어 단일 선택(세그먼트 컨트롤)으로 동작합니다. 레이블·아이콘·아이콘 전용·disabled 옵션을 지원합니다."
    >
      <mm-flex direction="column" gap="4">
        <mm-toggle-button-group
          hidden-label
          value="grid"
          .options=${iconOnlyViewOptions}
        ></mm-toggle-button-group>

        <mm-toggle-button-group
          value="grid"
          .options=${labelOnlyViewOptions}
        ></mm-toggle-button-group>

        <mm-toggle-button-group
          value="grid"
          .options=${labeledIconViewOptions}
        ></mm-toggle-button-group>

        <mm-toggle-button-group value="compact" .options=${densityOptions}></mm-toggle-button-group>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="FilterButtonGroup"
      description="콘텐츠 필터링을 위한 옵션 버튼. ToggleButton 계열로 선택 상태를 표현하며 그룹으로 묶어 단일 선택 또는 다중 선택을 지원합니다."
    >
      <mm-flex direction="column" gap="4">
        <mm-text>Single selection (라디오형)</mm-text>
        <mm-filter-button-group
          mode="single"
          .values=${orderStatusValues}
          .options=${orderStatusOptions}
        ></mm-filter-button-group>

        <mm-text>Multiple selection (체크박스형)</mm-text>
        <mm-filter-button-group
          mode="multiple"
          .values=${genreValues}
          .options=${genreOptions}
        ></mm-filter-button-group>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="ViewModeSwitcher"
      description="그리드/목록 보기처럼 화면 표시 방식을 전환하는 아이콘 전용 세그먼트 컨트롤입니다."
    >
      <mm-view-mode-switcher></mm-view-mode-switcher>
    </mm-component-section>

    <mm-component-section
      heading="FollowButton"
      description="ToggleButton을 확장한 도메인 버튼. 선택(팔로잉) 상태에 따라 레이블과 아이콘이 전환됩니다."
    >
      <mm-button-group>
        <mm-follow-button></mm-follow-button>
        <mm-follow-button pressed></mm-follow-button>
      </mm-button-group>
    </mm-component-section>

    <mm-component-section
      heading="BookmarkButton"
      description="ToggleButton을 확장한 아이콘 전용 토글. shape으로 별·북마크·하트를 선택하며 selection foreground 토큰을 사용합니다."
    >
      <mm-button-group>
        <mm-bookmark-button shape="star"></mm-bookmark-button>
        <mm-bookmark-button shape="star" pressed></mm-bookmark-button>
        <mm-bookmark-button shape="bookmark"></mm-bookmark-button>
        <mm-bookmark-button shape="bookmark" pressed></mm-bookmark-button>
        <mm-bookmark-button shape="heart"></mm-bookmark-button>
        <mm-bookmark-button shape="heart" pressed></mm-bookmark-button>
      </mm-button-group>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </mm-main>
`

renderPage(main)
