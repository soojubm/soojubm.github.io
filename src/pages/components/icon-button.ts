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

const componentProps: ComponentPropItemData[] = [...componentPropsOf('mm-icon-button')]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - action',
    description:
      '누르면 바로 실행되는 보조 액션입니다. 좁은 공간에 반복되는 행동을 두고, 화면의 핵심 행동은 레이블이 보이는 버튼에 맡깁니다.',
  },
  {
    heading: 'Glanceable',
    description:
      '레이블 없이 아이콘 하나로 용도를 즉시 알아볼 수 있어야 하며, 용도는 툴팁으로도 알려 줍니다.',
  },
]

const variantCode = `<mm-button-group>
  <mm-icon-button variant="primary" icon="arrow-right" aria-label="Primary"></mm-icon-button>
  <mm-icon-button variant="secondary" icon="arrow-right" aria-label="Secondary"></mm-icon-button>
  <mm-icon-button variant="tertiary" icon="arrow-right" aria-label="Tertiary"></mm-icon-button>
  <mm-icon-button variant="ghost" icon="arrow-right" aria-label="Ghost"></mm-icon-button>
  <mm-icon-button variant="primary" destructive icon="trash" aria-label="Destructive"></mm-icon-button>
</mm-button-group>`

const sizeCode = `<mm-button-group>
  <mm-icon-button icon="xmark" size="medium" aria-label="medium"></mm-icon-button>
  <mm-icon-button icon="xmark" size="small" aria-label="small"></mm-icon-button>
</mm-button-group>`

const stateCode = `<mm-button-group>
  <mm-icon-button variant="primary" icon="arrow-right" aria-label="다음" disabled></mm-icon-button>
  <mm-icon-button icon="heart" aria-label="좋아요" disabled></mm-icon-button>
  <mm-icon-button variant="secondary" icon="arrow-left" aria-label="이전" disabled></mm-icon-button>
</mm-button-group>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Icon Button"
      description="레이블 없이 메타포 아이콘 하나로 행동을 나타내는 간결한 버튼입니다. 좁은 공간에 반복되는 보조 액션을 두고 용도는 툴팁으로 알려 주므로, 사용자는 화면을 복잡하게 만들지 않고도 자주 쓰는 기능에 바로 닿을 수 있습니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="variant" variant="pill">
        <mm-tab value="variant">Variant</mm-tab>
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="state">State</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="variant">
        <mm-component-example>
          <mm-button-group>
            <mm-icon-button
              variant="primary"
              icon=${ICON_NAMES.FORWARD}
              aria-label="Primary"
              tooltip-placement="bottom"
            ></mm-icon-button>
            <mm-icon-button
              variant="secondary"
              icon=${ICON_NAMES.FORWARD}
              aria-label="Secondary"
              tooltip-placement="bottom"
            ></mm-icon-button>
            <mm-icon-button
              variant="tertiary"
              icon=${ICON_NAMES.FORWARD}
              aria-label="Tertiary"
              tooltip-placement="bottom"
            ></mm-icon-button>
            <mm-icon-button
              variant="ghost"
              icon=${ICON_NAMES.FORWARD}
              aria-label="Ghost"
              tooltip-placement="bottom"
            ></mm-icon-button>
            <mm-icon-button
              variant="primary"
              destructive
              icon=${ICON_NAMES.DELETE}
              aria-label="Destructive"
              tooltip-placement="bottom"
            ></mm-icon-button>
          </mm-button-group>
        </mm-component-example>
        <mm-component-code .code=${variantCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-button-group>
              <mm-icon-button
                icon=${ICON_NAMES.CLOSE}
                size="medium"
                aria-label="medium"
              ></mm-icon-button>
              <mm-icon-button
                icon=${ICON_NAMES.CLOSE}
                size="small"
                aria-label="small"
              ></mm-icon-button>
            </mm-button-group>
            <mm-paragraph>small은 콘텐츠 사이에 촘촘히 놓이는 보조 액션에 씁니다.</mm-paragraph>
            <mm-component-notice heading="아이콘은 크기 단계에 없는 tiny를 쓴다">
              컴포넌트 크기 단계는 small·medium·large지만,
              <mm-code>mm-icon</mm-code>
              은 표 머리의 정렬 표시처럼 글자보다 작게 놓이는 자리를 위해 tiny(12)를 더 갖는다. 쓰는
              곳이 표 정렬 아이콘 하나뿐이라 단계로 올리지 않는다
            </mm-component-notice>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${sizeCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="state">
        <mm-component-example>
          <mm-button-group>
            <mm-icon-button
              variant="primary"
              icon=${ICON_NAMES.FORWARD}
              aria-label="다음"
              tooltip-placement="bottom"
              disabled
            ></mm-icon-button>
            <mm-icon-button
              icon=${ICON_NAMES.LIKE}
              aria-label="좋아요"
              tooltip-placement="bottom"
              disabled
            ></mm-icon-button>
            <mm-icon-button
              variant="secondary"
              icon=${ICON_NAMES.BACK}
              aria-label="이전"
              tooltip-placement="bottom"
              disabled
            ></mm-icon-button>
          </mm-button-group>
        </mm-component-example>
        <mm-component-code .code=${stateCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-icon-button']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-paragraph-group>
        <mm-paragraph>
          Toggled states. Buttons can swap icons based on data states.
          <br />
          There are several icons within our library that have a “Filled” counterpart to indicate
          whether a state is toggled on. The “Outlined” version indicates it is toggled off.
        </mm-paragraph>
      </mm-paragraph-group>
    </mm-component-guide>

    <mm-component-anatomy
      style="--component-anatomy-stage-padding: 0 0 3rem"
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
      <mm-tooltip content="좋아요" placement="bottom" open>
        <mm-icon-button
          slot="trigger"
          variant="primary"
          icon=${ICON_NAMES.LIKE}
          aria-label="좋아요"
        ></mm-icon-button>
      </mm-tooltip>
    </mm-component-anatomy>

    <mm-component-section heading="HamburgerButton" description="내비게이션 메뉴를 여닫습니다.">
      <mm-hamburger-button aria-controls="hamburger-menu-example"></mm-hamburger-button>
      <div id="hamburger-menu-example" hidden></div>
    </mm-component-section>

    <mm-component-section heading="MoreButton" description="추가 액션 메뉴를 엽니다.">
      <mm-more-button></mm-more-button>
    </mm-component-section>

    <mm-component-section
      heading="PrevButton, NextButton"
      description="이전·다음 항목으로 이동합니다."
    >
      <mm-button-group>
        <mm-prev-button tooltip-placement="bottom"></mm-prev-button>
        <mm-next-button tooltip-placement="bottom"></mm-next-button>
      </mm-button-group>
    </mm-component-section>

    <mm-component-section heading="Close Button" description="레이어를 닫습니다.">
      <mm-close-button tooltip-placement="bottom"></mm-close-button>
    </mm-component-section>

    <mm-component-section
      heading="Dismiss Button"
      description="배너·알림·토스트를 화면에서 치웁니다. 콘텐츠 자체는 지우지 않습니다."
    >
      <mm-dismiss-button tooltip-placement="bottom"></mm-dismiss-button>
    </mm-component-section>

    <mm-component-section
      heading="Delete Button / Remove Button"
      description="항목을 영구 삭제합니다. 다이얼로그로 확인하므로 버튼은 눈에 띄지 않게 둡니다."
    >
      <mm-delete-button tooltip-placement="bottom"></mm-delete-button>
    </mm-component-section>

    <mm-component-section
      heading="Copy Button"
      description="텍스트를 클립보드에 복사합니다. 복사되면 잠시 체크 아이콘으로 바뀝니다."
    >
      <mm-copy-button tooltip-placement="bottom" value="copied text"></mm-copy-button>
    </mm-component-section>

    <mm-component-section heading="Clear Button" description="검색 입력값을 지웁니다.">
      <mm-flex direction="column" gap="4">
        <mm-clear-button aria-label="입력 지우기" tooltip-placement="bottom"></mm-clear-button>
        <mm-component-notice heading="크기 단계에 없는 16을 쓴다">
          아이콘 버튼의 크기 단계는 32·24지만,
          <mm-code>mm-clear-button</mm-code>
          은 입력 필드 높이 안에 놓여야 해서 16을 쓴다. 쓰는 곳이 이 컴포넌트 하나뿐이라 단계로
          올리지 않는다
        </mm-component-notice>
      </mm-flex>
    </mm-component-section>
    <mm-component-section heading="Expand Button" description="누르면 펼침 여부가 바뀝니다.">
      <mm-icon-button
        variant="secondary"
        size="small"
        icon=${ICON_NAMES.EXPAND}
        aria-label="펼치기"
        tooltip-placement="bottom"
      ></mm-icon-button>
    </mm-component-section>
    <mm-component-section
      heading="Expand Indicator"
      description="펼침 여부를 방향으로 보여 주는 장식 요소입니다. 상호작용은 갖지 않습니다."
    >
      <mm-expand-indicator></mm-expand-indicator>
      <mm-expand-indicator expanded></mm-expand-indicator>
    </mm-component-section>
    <mm-component-section
      heading="Selected Indicator"
      description="선택 여부를 체크로 보여 주는 장식 요소입니다. 선택되지 않아도 자리를 유지합니다."
    >
      <mm-selected-indicator></mm-selected-indicator>
      <mm-selected-indicator selected></mm-selected-indicator>
    </mm-component-section>
    <mm-component-section heading="ToTopButton" description="페이지의 최상단으로 스크롤합니다.">
      <mm-to-top-button></mm-to-top-button>
    </mm-component-section>
    <mm-component-section
      heading="Share Button"
      description="콘텐츠를 공유합니다. 무엇을 어떻게 공유할지는 쓰는 곳이 정하므로 누르면 share 이벤트만 알립니다."
    >
      <mm-share-button tooltip-placement="bottom"></mm-share-button>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
