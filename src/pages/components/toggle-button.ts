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
    label: 'Material Design 3 - Button Groups',
  },
  {
    href: 'https://polaris-react.shopify.com/components/lists/resource-list',
    label: 'Shopify Polaris - Resource List',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-toggle-button'),
  ...subComponentPropsOf('fff-toggle-button-group'),
  { name: 'change', type: 'CustomEvent detail: pressed, value', kind: 'event' },
  { name: 'fff-toggle-button-group change', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '누를 때마다 눌림 여부가 바뀌어 선택 여부를 드러냅니다. 그룹에서는 하나만 선택됩니다.',
  },
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

const exampleCode = `<fff-button-group>
  <fff-toggle-button value="bookmark" icon="bookmark" pressed>북마크</fff-toggle-button>
  <fff-toggle-button value="like" icon="heart">좋아요</fff-toggle-button>
  <fff-toggle-button value="disabled" disabled>비활성</fff-toggle-button>
</fff-button-group>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="ToggleButton"
      description="누를 때마다 켜짐과 꺼짐이 바뀌는 버튼입니다. 눌린 상태가 버튼에 표시되고 여러 개를 묶으면 하나만 선택되므로, 사용자는 현재 적용된 설정을 한눈에 보고 한 번의 클릭으로 전환할 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['Toggle', 'Switch button', 'Pressed button']}></fff-component-aka>

    <fff-component-example>
      <fff-button-group>
        <fff-toggle-button value="bookmark" icon=${ICON_NAMES.BOOKMARK} pressed>
          북마크
        </fff-toggle-button>
        <fff-toggle-button value="like" icon=${ICON_NAMES.LIKE}>좋아요</fff-toggle-button>
        <fff-toggle-button value="notification" icon=${ICON_NAMES.NOTIFICATION}>
          알림
        </fff-toggle-button>
        <fff-toggle-button value="disabled" disabled>비활성</fff-toggle-button>
      </fff-button-group>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-toggle-button']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-text-list
        .texts=${[
          '맥락이 다른 액션을 묶어 제공할 때는 단일선택·다중선택·삭제·펼침메뉴 같은 성격을 기표로 충분히 드러낸다.',
        ]}
      ></fff-text-list>
    </fff-component-guide>

    <fff-component-section heading="ToggleButtonGroup">
      <fff-flex direction="column" gap="4">
        <fff-toggle-button-group
          hidden-label
          value="grid"
          .options=${iconOnlyViewOptions}
        ></fff-toggle-button-group>

        <fff-toggle-button-group
          value="grid"
          .options=${labelOnlyViewOptions}
        ></fff-toggle-button-group>

        <fff-toggle-button-group
          value="grid"
          .options=${labeledIconViewOptions}
        ></fff-toggle-button-group>

        <fff-toggle-button-group
          value="compact"
          .options=${densityOptions}
        ></fff-toggle-button-group>
      </fff-flex>
    </fff-component-section>

    <fff-component-section
      heading="FilterButtonGroup"
      description="콘텐츠 필터링을 위한 옵션 버튼입니다. 그룹으로 묶어 단일 선택 또는 다중 선택을 지원합니다."
    >
      <fff-flex direction="column" gap="4">
        <fff-text>Single selection (라디오형)</fff-text>
        <fff-filter-button-group
          mode="single"
          .values=${orderStatusValues}
          .options=${orderStatusOptions}
        ></fff-filter-button-group>

        <fff-text>Multiple selection (체크박스형)</fff-text>
        <fff-filter-button-group
          mode="multiple"
          .values=${genreValues}
          .options=${genreOptions}
        ></fff-filter-button-group>
      </fff-flex>
    </fff-component-section>

    <fff-component-section
      heading="ViewModeSwitcher"
      description="그리드/목록 보기처럼 화면 표시 방식을 전환하는 아이콘 전용 세그먼트 컨트롤입니다."
    >
      <fff-view-mode-switcher></fff-view-mode-switcher>
    </fff-component-section>

    <fff-component-section
      heading="ColorChip"
      description="색 하나를 고르는 토글입니다. 면 전체가 색이라 보조기술 사용자를 위해 색 이름을 함께 전합니다."
    >
      <fff-button-group>
        <fff-color-chip
          value="black"
          color="var(--gray800)"
          aria-label="블랙"
          pressed
        ></fff-color-chip>
        <fff-color-chip value="green" color="var(--green800)" aria-label="그린"></fff-color-chip>
      </fff-button-group>
    </fff-component-section>

    <fff-component-section heading="FollowButton">
      <fff-button-group>
        <fff-follow-button></fff-follow-button>
        <fff-follow-button pressed></fff-follow-button>
      </fff-button-group>
    </fff-component-section>

    <fff-component-section heading="BookmarkButton">
      <fff-button-group>
        <fff-bookmark-button shape="star"></fff-bookmark-button>
        <fff-bookmark-button shape="star" pressed></fff-bookmark-button>
        <fff-bookmark-button shape="bookmark"></fff-bookmark-button>
        <fff-bookmark-button shape="bookmark" pressed></fff-bookmark-button>
        <fff-bookmark-button shape="heart"></fff-bookmark-button>
        <fff-bookmark-button shape="heart" pressed></fff-bookmark-button>
      </fff-button-group>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
