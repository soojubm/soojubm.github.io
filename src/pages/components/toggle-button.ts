import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { OptionItem } from '@/types'

import { ICON_NAMES, type FilterOption } from '@/components/common'
import { componentPropsOf, subComponentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'button.html', label: 'Button' },
  { href: 'switch.html', label: 'Switch' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://m3.material.io/components/button-groups/overview',
    label: 'MD3 - Button Groups',
  },
  {
    href: 'https://polaris-react.shopify.com/components/lists/resource-list',
    label: 'Shopify Polaris - Resource List',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('mm-toggle-button'),
  ...subComponentPropsOf('mm-toggle-button-group'),
  { name: 'change', type: 'CustomEvent detail: pressed, value', kind: 'event' },
  { name: 'mm-toggle-button-group change', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '누를 때마다 눌림 여부가 바뀌어 선택 여부를 드러냅니다. 그룹에서는 하나만 선택됩니다.',
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

const exampleCode = `<mm-button-group>
  <mm-toggle-button value="bookmark" icon="bookmark" pressed>북마크</mm-toggle-button>
  <mm-toggle-button value="like" icon="heart">좋아요</mm-toggle-button>
  <mm-toggle-button value="disabled" disabled>비활성</mm-toggle-button>
</mm-button-group>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="ToggleButton"
      description="누를 때마다 켜짐과 꺼짐이 바뀌는 버튼입니다. 눌린 상태가 버튼에 표시되고 여러 개를 묶으면 하나만 선택되므로, 사용자는 현재 적용된 설정을 한눈에 보고 한 번의 클릭으로 전환할 수 있습니다."
    ></mm-page-header>

    <mm-component-aka .items=${['Toggle', 'Switch button', 'Pressed button']}></mm-component-aka>

    <mm-component-example>
      <mm-button-group>
        <mm-toggle-button value="bookmark" icon=${ICON_NAMES.BOOKMARK} pressed>
          북마크
        </mm-toggle-button>
        <mm-toggle-button value="like" icon=${ICON_NAMES.LIKE}>좋아요</mm-toggle-button>
        <mm-toggle-button value="notification" icon=${ICON_NAMES.NOTIFICATION}>
          알림
        </mm-toggle-button>
        <mm-toggle-button value="disabled" disabled>비활성</mm-toggle-button>
      </mm-button-group>
    </mm-component-example>
    <mm-component-code .code=${exampleCode}></mm-component-code>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-toggle-button']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-content-section heading="접근성" heading-level="3">
        <mm-text-block
          level="4"
          heading="레이블이 보일 때"
          description="보이는 레이블이 곧 버튼의 이름입니다. 누른 상태는 보조기술이 따로 알려 주므로 레이블에 '켜짐'·'선택됨' 같은 상태를 덧붙이지 않습니다."
        ></mm-text-block>
        <mm-text-block
          level="4"
          heading="아이콘만 보일 때"
          description="화면에 글자가 없어도 보조기술 사용자는 버튼의 이름을 들을 수 있어야 합니다."
        ></mm-text-block>
        <mm-text-block
          level="4"
          heading="눌린 뒤 할 행동으로 레이블을 바꿀 때"
          description="연동처럼 같은 버튼이 누른 뒤에는 반대 행동을 맡으면, 눌린 뒤의 레이블을 그 행동으로 바꿉니다. 현재 상태를 말하는 '켜짐'·'선택됨'은 보조기술이 이미 전달하므로 적지 않습니다."
        ></mm-text-block>
        <mm-text-block
          level="4"
          heading="그룹 이름"
          description="옵션만으로 무엇을 고르는지 알기 어려우면 묶음 전체에 이름을 줍니다."
        ></mm-text-block>
      </mm-content-section>
    </mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨테이너 — 옵션들을 감싸고 단일 선택 그룹임을 나타냅니다.',
        '옵션 버튼 — 각 선택지. 아이콘과 레이블을 가질 수 있습니다.',
        '선택 인디케이터 — 현재 선택된 옵션을 배경·색상으로 표시합니다.',
        '구분선 — 옵션 사이의 시각적 경계(선택).',
      ]}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-start' },
        { placement: 'block-end', offset: '25%' },
        { placement: 'block-end' },
      ]}
    >
      <mm-toggle-button-group value="list" .options=${anatomyViewOptions}></mm-toggle-button-group>
    </mm-component-anatomy>

    <mm-component-section heading="ToggleButtonGroup">
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
      description="콘텐츠 필터링을 위한 옵션 버튼입니다. 그룹으로 묶어 단일 선택 또는 다중 선택을 지원합니다."
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
      heading="ColorChip"
      description="색 하나를 고르는 토글입니다. 면 전체가 색이라 보조기술 사용자를 위해 색 이름을 함께 전합니다."
    >
      <mm-button-group>
        <mm-color-chip
          value="black"
          color="var(--black800)"
          aria-label="블랙"
          pressed
        ></mm-color-chip>
        <mm-color-chip value="green" color="var(--green800)" aria-label="그린"></mm-color-chip>
      </mm-button-group>
    </mm-component-section>

    <mm-component-section heading="FollowButton">
      <mm-button-group>
        <mm-follow-button></mm-follow-button>
        <mm-follow-button pressed></mm-follow-button>
      </mm-button-group>
    </mm-component-section>

    <mm-component-section heading="BookmarkButton">
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

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
