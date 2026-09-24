import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'button.html', label: 'Button' },
  { href: 'toggle-button.html', label: 'Toggle Button' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'icon', type: 'IconName' },
  {
    name: 'variant',
    type: "'primary' | 'secondary' | 'tertiary' | 'ghost' | 'destructive' = 'tertiary'",
  },
  { name: 'size', type: "'small' | 'medium' = 'medium'" },
  { name: 'aria-label', type: 'string' },
  { name: 'tooltip-placement', type: "'left' | 'center' | 'right'", optional: true },
  { name: 'aria-controls', type: 'string', optional: true },
  { name: 'aria-expanded', type: "'true' | 'false'", optional: true },
  { name: 'aria-haspopup', type: 'string', optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'icon-button-size' },
  { name: 'icon-button-text-color' },
  { name: 'icon-button-background-color' },
  { name: 'icon-button-border' },
  { name: 'icon-button-border-radius' },
  { name: 'icon-button-shadow' },
  { name: 'icon-button-backdrop-filter' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - action',
    description:
      '누르면 바로 실행되는 보조 액션입니다. 좁은 공간에 반복되는 행동을 담고, 화면의 핵심 행동은 레이블이 보이는 버튼에 맡깁니다.',
  },
  {
    heading: 'Glanceable',
    description:
      '레이블 없이 아이콘 하나로 용도를 즉시 알아볼 수 있어야 합니다. aria-label은 필수이며 툴팁으로 그대로 보입니다.',
  },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Icon Button"
      description="레이블 없이 메타포 아이콘 하나로 행동을 나타내는 간결한 버튼입니다. 좁은 공간에 반복되는 보조 액션을 담고 용도를 툴팁으로 알려 주므로, 사용자는 화면을 복잡하게 만들지 않고도 자주 쓰는 기능에 바로 닿을 수 있습니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="variant" variant="pill">
        <mm-tab value="variant">Variant</mm-tab>
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="state">State</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="variant">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-button-group>
              <mm-icon-button
                variant="primary"
                icon=${ICON_NAMES.FORWARD}
                aria-label="Primary"
                tooltip-placement="center"
              ></mm-icon-button>
              <mm-icon-button
                variant="secondary"
                icon=${ICON_NAMES.FORWARD}
                aria-label="Secondary"
                tooltip-placement="center"
              ></mm-icon-button>
              <mm-icon-button
                variant="tertiary"
                icon=${ICON_NAMES.FORWARD}
                aria-label="Tertiary"
                tooltip-placement="center"
              ></mm-icon-button>
              <mm-icon-button
                variant="ghost"
                icon=${ICON_NAMES.FORWARD}
                aria-label="Ghost"
                tooltip-placement="center"
              ></mm-icon-button>
              <mm-icon-button
                variant="destructive"
                icon=${ICON_NAMES.DELETE}
                aria-label="Destructive"
                tooltip-placement="center"
              ></mm-icon-button>
            </mm-button-group>
            <mm-paragraph>
              버튼과 같은 위계 체계를 따릅니다. destructive는 되돌리기 어려운 액션에 씁니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
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
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="state">
        <mm-component-example>
          <mm-button-group>
            <mm-icon-button
              variant="primary"
              icon=${ICON_NAMES.FORWARD}
              aria-label="다음"
              tooltip-placement="center"
              disabled
            ></mm-icon-button>
            <mm-icon-button
              icon=${ICON_NAMES.LIKE}
              aria-label="좋아요"
              tooltip-placement="center"
              disabled
            ></mm-icon-button>
            <mm-icon-button
              variant="secondary"
              icon=${ICON_NAMES.BACK}
              aria-label="이전"
              tooltip-placement="center"
              disabled
            ></mm-icon-button>
          </mm-button-group>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-paragraph>
        Toggled states. Buttons can swap icons based on data states.
        <br />
        There are several icons within our library that have a “Filled” counterpart to indicate
        whether a state is toggled on. The “Outlined” version indicates it is toggled off.
      </mm-paragraph>
    </mm-component-guide>

    <mm-component-anatomy
      style="--component-anatomy-stage-padding: 0 0 3rem"
      .parts=${[
        '컨테이너 — variant·size로 형태와 클릭 영역을 정의합니다.',
        '아이콘 — 액션을 나타내는 메타포(icon).',
        '접근성 레이블 — 화면에 보이지 않지만 액션을 설명하는 텍스트(aria-label).',
        '툴팁 — 접근성 레이블을 화면에 보여줍니다.',
      ]}
      .code=${'<mm-icon-button variant="primary" icon="heart" aria-label="좋아요"></mm-icon-button>'}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-end' },
        { placement: 'inline-end' },
        { placement: 'block-end', inset: true },
      ]}
    >
      <mm-tooltip content="좋아요" placement="center" open>
        <mm-icon-button
          slot="trigger"
          variant="primary"
          icon=${ICON_NAMES.LIKE}
          aria-label="좋아요"
        ></mm-icon-button>
      </mm-tooltip>
    </mm-component-anatomy>

    <mm-component-section
      heading="HamburgerButton"
      description="사이드바·내비게이션 메뉴를 여닫는 버튼."
    >
      <mm-hamburger-button aria-controls="hamburger-menu-example"></mm-hamburger-button>
      <div id="hamburger-menu-example" hidden></div>
    </mm-component-section>

    <mm-component-section heading="MoreButton" description="추가 액션 메뉴를 여는 버튼.">
      <mm-more-button aria-controls="more-menu-example" aria-haspopup="dialog"></mm-more-button>
      <mm-sheet id="more-menu-example">
        <mm-sheet-header heading="추가 액션"></mm-sheet-header>
        <mm-sheet-body>
          <mm-menu-item-group aria-label="추가 액션">
            <mm-menu-item-action label="공유"></mm-menu-item-action>
            <mm-menu-item-action label="수정"></mm-menu-item-action>
            <mm-menu-item-action label="삭제" tone="danger"></mm-menu-item-action>
          </mm-menu-item-group>
        </mm-sheet-body>
      </mm-sheet>
    </mm-component-section>

    <mm-component-section
      heading="PrevButton, NextButton"
      description="페이지·캐러셀·단계형 흐름에서 이전/다음 항목으로 이동합니다."
    >
      <mm-button-group>
        <mm-prev-button tooltip-placement="center"></mm-prev-button>
        <mm-next-button tooltip-placement="center"></mm-next-button>
      </mm-button-group>
    </mm-component-section>

    <mm-component-section
      heading="Close Button"
      description="모달, 패널, 시트 등 레이어를 닫는 보조 액션 버튼입니다."
    >
      <mm-close-button tooltip-placement="center"></mm-close-button>
    </mm-component-section>

    <mm-component-section
      heading="Dismiss Button"
      description="배너, 알림, 토스트 등에서 콘텐츠를 비파괴적으로 해제하는 보조 액션 버튼입니다."
    >
      <mm-dismiss-button tooltip-placement="center"></mm-dismiss-button>
    </mm-component-section>

    <mm-component-section
      heading="Delete Button / Remove Button"
      description="아이템·데이터를 영구 삭제하는 파괴적 액션 버튼. 다이얼로그로 확인하기 때문에 시각적 노이즈 최소화."
    >
      <mm-delete-button tooltip-placement="center"></mm-delete-button>
    </mm-component-section>

    <mm-component-section
      heading="Copy Button"
      description="텍스트를 클립보드에 복사하는 버튼. 복사 성공 시 일시적으로 체크 아이콘으로 전환됩니다."
    >
      <mm-copy-button tooltip-placement="center" value="copied text"></mm-copy-button>
    </mm-component-section>

    <mm-component-section heading="Clear Button" description="search field에서 사용.">
      <mm-clear-button aria-label="입력 지우기" tooltip-placement="center"></mm-clear-button>
    </mm-component-section>
    <mm-component-section
      heading="Expand Button"
      description="스스로 여닫는 토글 버튼. 클릭 상호작용과 aria-expanded를 직접 소유합니다."
    >
      <mm-icon-button
        variant="secondary"
        size="small"
        icon=${ICON_NAMES.EXPAND}
        aria-label="펼치기"
        tooltip-placement="center"
      ></mm-icon-button>
    </mm-component-section>
    <mm-component-section
      heading="Expand Indicator"
      description="트리거가 따로 있는 곳에서 펼침 상태만 방향으로 반영하는 장식 요소. 상호작용은 갖지 않습니다."
    >
      <mm-expand-indicator></mm-expand-indicator>
      <mm-expand-indicator expanded></mm-expand-indicator>
    </mm-component-section>
    <mm-component-section
      heading="Selected Indicator"
      description="행이 선택 상태를 소유하는 곳에서 선택 여부만 체크로 반영하는 장식 요소. 선택되지 않아도 자리를 유지합니다."
    >
      <mm-selected-indicator></mm-selected-indicator>
      <mm-selected-indicator selected></mm-selected-indicator>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
