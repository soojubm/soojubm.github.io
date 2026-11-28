import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'button.html', label: 'Button' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-icon-button')]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - action',
    description:
      '누르면 바로 실행되는 보조 액션입니다. 좁은 공간에 반복되는 행동을 두고, 화면의 핵심 행동은 레이블이 보이는 버튼에 맡깁니다.',
  },
  {
    heading: 'Glanceable',
    description:
      '레이블 없이 아이콘 하나로 용도를 즉시 알아볼 수 있어야 하며, 용도는 툴팁으로도 보여 줍니다.',
  },
]

const variantCode = `<fff-button-group>
  <fff-icon-button variant="primary" icon="arrow-right" aria-label="Primary"></fff-icon-button>
  <fff-icon-button variant="secondary" icon="arrow-right" aria-label="Secondary"></fff-icon-button>
  <fff-icon-button variant="tertiary" icon="arrow-right" aria-label="Tertiary"></fff-icon-button>
  <fff-icon-button variant="ghost" icon="arrow-right" aria-label="Ghost"></fff-icon-button>
  <fff-icon-button variant="primary" destructive icon="trash" aria-label="Destructive"></fff-icon-button>
</fff-button-group>`

const sizeCode = `<fff-button-group>
  <fff-icon-button icon="xmark" size="medium" aria-label="medium"></fff-icon-button>
  <fff-icon-button icon="xmark" size="small" aria-label="small"></fff-icon-button>
</fff-button-group>`

const stateCode = `<fff-button-group>
  <fff-icon-button variant="primary" icon="arrow-right" aria-label="다음" disabled></fff-icon-button>
  <fff-icon-button icon="heart" aria-label="좋아요" disabled></fff-icon-button>
  <fff-icon-button variant="secondary" icon="arrow-left" aria-label="이전" disabled></fff-icon-button>
</fff-button-group>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Icon Button"
      description="레이블 없이 메타포 아이콘 하나로 행동을 나타내는 간결한 버튼입니다. 좁은 공간에 반복되는 보조 액션을 두고 용도는 툴팁으로 알려 주므로, 사용자는 화면을 복잡하게 만들지 않고도 자주 쓰는 기능에 바로 닿을 수 있습니다."
    ></fff-page-header>

    <fff-flex direction="column" gap="4">
      <fff-tab-list
        value="variant"
        variant="pill"
        .tabs=${[
          { value: 'variant', label: 'Variant' },
          { value: 'size', label: 'Size' },
          { value: 'state', label: 'State' },
        ]}
      ></fff-tab-list>
      <fff-tab-panel value="variant">
        <fff-component-example>
          <fff-button-group>
            <fff-icon-button
              variant="primary"
              icon=${ICON_NAMES.FORWARD}
              aria-label="Primary"
              tooltip-placement="bottom"
            ></fff-icon-button>
            <fff-icon-button
              variant="secondary"
              icon=${ICON_NAMES.FORWARD}
              aria-label="Secondary"
              tooltip-placement="bottom"
            ></fff-icon-button>
            <fff-icon-button
              variant="tertiary"
              icon=${ICON_NAMES.FORWARD}
              aria-label="Tertiary"
              tooltip-placement="bottom"
            ></fff-icon-button>
            <fff-icon-button
              variant="ghost"
              icon=${ICON_NAMES.FORWARD}
              aria-label="Ghost"
              tooltip-placement="bottom"
            ></fff-icon-button>
            <fff-icon-button
              variant="primary"
              destructive
              icon=${ICON_NAMES.DELETE}
              aria-label="Destructive"
              tooltip-placement="bottom"
            ></fff-icon-button>
          </fff-button-group>
        </fff-component-example>
        <fff-component-code .code=${variantCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="size">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-button-group>
              <fff-icon-button
                icon=${ICON_NAMES.CLOSE}
                size="medium"
                aria-label="medium"
              ></fff-icon-button>
              <fff-icon-button
                icon=${ICON_NAMES.CLOSE}
                size="small"
                aria-label="small"
              ></fff-icon-button>
            </fff-button-group>
            <fff-paragraph>small은 콘텐츠 사이에 촘촘히 놓이는 보조 액션에 씁니다.</fff-paragraph>
            <fff-component-notice heading="아이콘은 크기 단계에 없는 tiny를 쓴다">
              컴포넌트 크기 단계는 small·medium·large지만,
              <fff-code>fff-icon</fff-code>
              은 표 머리의 정렬 표시처럼 글자보다 작게 놓이는 자리를 위해 tiny(12)를 더 갖는다. 쓰는
              곳이 표 정렬 아이콘 하나뿐이라 단계로 올리지 않는다
            </fff-component-notice>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${sizeCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="state">
        <fff-component-example>
          <fff-button-group>
            <fff-icon-button
              variant="primary"
              icon=${ICON_NAMES.FORWARD}
              aria-label="다음"
              tooltip-placement="bottom"
              disabled
            ></fff-icon-button>
            <fff-icon-button
              icon=${ICON_NAMES.LIKE}
              aria-label="좋아요"
              tooltip-placement="bottom"
              disabled
            ></fff-icon-button>
            <fff-icon-button
              variant="secondary"
              icon=${ICON_NAMES.BACK}
              aria-label="이전"
              tooltip-placement="bottom"
              disabled
            ></fff-icon-button>
          </fff-button-group>
        </fff-component-example>
        <fff-component-code .code=${stateCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-icon-button']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-paragraph-group>
        <fff-paragraph>
          Toggled states. Buttons can swap icons based on data states.
          <br />
          There are several icons within our library that have a “Filled” counterpart to indicate
          whether a state is toggled on. The “Outlined” version indicates it is toggled off.
        </fff-paragraph>
      </fff-paragraph-group>
    </fff-component-guide>

    <fff-component-anatomy
      style="--component-anatomy-padding: 0 0 3rem"
      .parts=${[
        '컨테이너 — variant·size로 형태와 클릭 영역을 정의합니다.',
        '아이콘 — 액션을 나타내는 메타포(icon).',
        '접근성 레이블 — 화면에 보이지 않지만 액션을 설명하는 텍스트(aria-label).',
        '툴팁 — 접근성 레이블을 화면에 보여줍니다.',
      ]}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-end' },
        { placement: 'inline-end' },
        { placement: 'block-end', inset: true },
      ]}
    >
      <fff-tooltip content="좋아요" placement="bottom" open>
        <fff-icon-button
          slot="trigger"
          variant="primary"
          icon=${ICON_NAMES.LIKE}
          aria-label="좋아요"
        ></fff-icon-button>
      </fff-tooltip>
    </fff-component-anatomy>

    <fff-component-section heading="HamburgerButton" description="내비게이션 메뉴를 여닫습니다.">
      <fff-hamburger-button aria-controls="hamburger-menu-example"></fff-hamburger-button>
      <div id="hamburger-menu-example" hidden></div>
    </fff-component-section>

    <fff-component-section heading="MoreButton" description="추가 액션 메뉴를 엽니다.">
      <fff-more-button></fff-more-button>
    </fff-component-section>

    <fff-component-section
      heading="PrevButton, NextButton"
      description="이전·다음 항목으로 이동합니다."
    >
      <fff-button-group>
        <fff-prev-button tooltip-placement="bottom"></fff-prev-button>
        <fff-next-button tooltip-placement="bottom"></fff-next-button>
      </fff-button-group>
    </fff-component-section>

    <fff-component-section heading="Close Button" description="레이어를 닫습니다.">
      <fff-close-button tooltip-placement="bottom"></fff-close-button>
    </fff-component-section>

    <fff-component-section
      heading="Dismiss Button"
      description="배너·알림·토스트를 화면에서 치웁니다. 콘텐츠 자체는 지우지 않습니다."
    >
      <fff-dismiss-button tooltip-placement="bottom"></fff-dismiss-button>
    </fff-component-section>

    <fff-component-section
      heading="Delete Button / Remove Button"
      description="항목을 영구 삭제합니다. 다이얼로그로 확인하므로 버튼은 눈에 띄지 않게 둡니다."
    >
      <fff-delete-button tooltip-placement="bottom"></fff-delete-button>
    </fff-component-section>

    <fff-component-section
      heading="Copy Button"
      description="텍스트를 클립보드에 복사합니다. 복사되면 잠시 체크 아이콘으로 바뀝니다."
    >
      <fff-copy-button tooltip-placement="bottom" value="copied text"></fff-copy-button>
    </fff-component-section>

    <fff-component-section heading="Clear Button" description="검색 입력값을 지웁니다.">
      <fff-flex direction="column" gap="4">
        <fff-clear-button aria-label="입력 지우기" tooltip-placement="bottom"></fff-clear-button>
        <fff-component-notice heading="크기 단계에 없는 16을 쓴다">
          아이콘 버튼의 크기 단계는 32·24지만,
          <fff-code>fff-clear-button</fff-code>
          은 입력 필드 높이 안에 놓여야 해서 16을 쓴다. 쓰는 곳이 이 컴포넌트 하나뿐이라 단계로
          올리지 않는다
        </fff-component-notice>
      </fff-flex>
    </fff-component-section>
    <fff-component-section heading="Expand Button" description="누르면 펼침 여부가 바뀝니다.">
      <fff-icon-button
        variant="secondary"
        size="small"
        icon=${ICON_NAMES.EXPAND}
        aria-label="펼치기"
        tooltip-placement="bottom"
      ></fff-icon-button>
    </fff-component-section>
    <fff-component-section
      heading="Expand Indicator"
      description="펼침 여부를 방향으로 보여 주는 장식 요소입니다. 상호작용은 갖지 않습니다."
    >
      <fff-expand-indicator></fff-expand-indicator>
      <fff-expand-indicator expanded></fff-expand-indicator>
    </fff-component-section>
    <fff-component-section
      heading="Selected Indicator"
      description="선택 여부를 체크로 보여 주는 장식 요소입니다. 선택되지 않아도 자리를 유지합니다."
    >
      <fff-selected-indicator></fff-selected-indicator>
      <fff-selected-indicator selected></fff-selected-indicator>
    </fff-component-section>
    <fff-component-section heading="ToTopButton" description="페이지의 최상단으로 스크롤합니다.">
      <fff-to-top-button></fff-to-top-button>
    </fff-component-section>
    <fff-component-section
      heading="Share Button"
      description="콘텐츠를 공유합니다. 무엇을 어떻게 공유할지는 쓰는 곳이 정하므로 누르면 share 이벤트만 발행합니다."
    >
      <fff-share-button tooltip-placement="bottom"></fff-share-button>
    </fff-component-section>
    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
