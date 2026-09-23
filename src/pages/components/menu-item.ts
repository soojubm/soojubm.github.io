import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import {
  AVATAR_VARIANT_TYPE_UNION,
  ICON_NAMES,
  MENU_ITEM_SIZE_TYPE_LABEL,
} from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'list-item.html', label: 'List Item' },
  { href: 'popover.html', label: 'Popover' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/',
    label: 'WAI-ARIA APG - Menubar Pattern',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/menus',
    label: 'Apple HIG - Menus',
    external: true,
  },
  {
    href: 'https://m3.material.io/components/menus/overview',
    label: 'MD3 - Menus',
    external: true,
  },
  {
    href: 'https://seek-oss.github.io/braid-design-system/components/MenuItemCheckbox/',
    label: 'Braid Design System - MenuItemCheckbox',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'size', type: MENU_ITEM_SIZE_TYPE_LABEL, optional: true },
  { name: 'label', type: 'string' },
  { name: 'description', type: 'string', optional: true },
  { name: 'icon', type: 'IconName', optional: true },
  { name: 'emoji', type: 'string', optional: true },
  { name: 'avatar-src', type: 'string', optional: true },
  { name: 'avatar-variant', type: `${AVATAR_VARIANT_TYPE_UNION} = 'tertiary'`, optional: true },
  { name: 'avatar-shape', type: "'circle' | 'square' = 'square'", optional: true },
  { name: 'tone', type: "'danger'", optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
  { name: "slot='trailing'", type: 'HTMLElement', optional: true },
  { name: 'mm-menu-item-action trailing-icon', type: 'IconName', optional: true },
  { name: 'mm-menu-item-link href', type: 'string', optional: true },
  { name: 'mm-menu-item-link target', type: "string = '_blank'", optional: true },
  { name: 'mm-menu-item-checkbox checked', type: 'boolean = false', optional: true },
  { name: 'mm-menu-item-checkbox value', type: 'string', optional: true },
  { name: 'mm-menu-item-switch checked', type: 'boolean = false', optional: true },
  { name: 'mm-menu-item-radio checked', type: 'boolean = false', optional: true },
  { name: 'mm-menu-item-radio value', type: 'string', optional: true },
  { name: 'mm-menu-item-radio name', type: 'string', optional: true },
  { name: 'mm-menu-item-group role', type: "'menu' | 'listbox' = 'menu'", optional: true },
  { name: 'mm-menu-item-group size', type: "'large'", optional: true },
  { name: 'mm-menu-list heading', type: 'string', optional: true },
  { name: 'mm-menu-list size', type: "'large'", optional: true },
  { name: 'mm-menu-item-radio-group name', type: 'string', optional: true },
  { name: 'mm-menu-item-radio-group value', type: 'string', optional: true },
  { name: 'mm-menu-item-radio-group size', type: "'large'", optional: true },
  { name: 'mm-menu-item-checkbox-group values', type: 'string[] = []', optional: true },
  { name: 'mm-menu-item-checkbox-group size', type: "'large'", optional: true },
  { name: 'change', type: 'CustomEvent detail: checked, value', kind: 'event' },
  { name: 'toggle', type: 'CustomEvent detail: open', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'interactive-row-background-color' },
  { name: 'interactive-row-padding-inline' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - action',
    description:
      '행 전체가 하나의 클릭 영역이 되어 hover·포커스·키보드 탐색과 명령 실행을 항목이 소유합니다. 조작을 행 안의 컨트롤이 받는 행은 list-item을 사용하세요.',
  },
  {
    heading: 'Interactive - selection',
    description:
      '선택 항목이 체크 상태를 소유해 선택 여부를 드러냅니다. role은 놓이는 부모를 따라 radiogroup 안에서는 radio, 체크 그룹 안에서는 checkbox입니다.',
  },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="MenuItem"
        description="메뉴 안에서 실행하거나 선택할 수 있는 행동 하나입니다. hover·포커스·키보드 탐색을 항목이 직접 처리하고 체크 상태로 선택 여부를 표시하므로, 사용자는 목록을 훑으며 원하는 명령을 빠르게 찾아 실행할 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="size" variant="pill">
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="leading">Leading</mm-tab>
        <mm-tab value="tone">Tone</mm-tab>
        <mm-tab value="disabled">Disabled</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-menu-item-group aria-label="크기 메뉴" size="large">
              <mm-menu-item-action icon=${ICON_NAMES.USER} label="Small"></mm-menu-item-action>
              <mm-menu-item-action
                size="medium"
                icon=${ICON_NAMES.GROUP}
                label="Frontend Group"
                description="프론트엔드 개발자 모임"
              ></mm-menu-item-action>
            </mm-menu-item-group>
            <mm-paragraph>
              설명이 함께 놓이거나 시트처럼 손가락으로 누르는 메뉴에서는 medium으로 행을 키웁니다.
              항목 사이 간격은 그룹 자체의
              <mm-code>size="large"</mm-code>
              가 넓힙니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="leading">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-menu-item-group aria-label="리딩 메뉴">
              <mm-menu-item-action icon=${ICON_NAMES.USER} label="아이콘"></mm-menu-item-action>
              <mm-menu-item-action emoji="🦔" label="이모지"></mm-menu-item-action>
              <mm-menu-item-action
                avatar-src="/src/images/soojubm.png"
                avatar-shape="circle"
                label="아바타"
              ></mm-menu-item-action>
            </mm-menu-item-group>
            <mm-paragraph>
              icon·emoji·avatar-src 중 하나로 항목 앞에 시각 단서를 둡니다. 사람을 나타내면 아바타를
              circle로 둡니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="tone">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-menu-item-group aria-label="톤 메뉴">
              <mm-menu-item-action icon=${ICON_NAMES.USER} label="프로필"></mm-menu-item-action>
              <mm-menu-item-action
                icon=${ICON_NAMES.DELETE}
                label="삭제"
                tone="danger"
              ></mm-menu-item-action>
            </mm-menu-item-group>
            <mm-paragraph>되돌릴 수 없는 명령에는 tone="danger"를 줍니다.</mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="disabled">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-menu-item-group aria-label="비활성 메뉴">
              <mm-menu-item-action icon=${ICON_NAMES.USER} label="프로필"></mm-menu-item-action>
              <mm-menu-item-action
                icon=${ICON_NAMES.LOG_OUT}
                label="로그아웃"
                disabled
              ></mm-menu-item-action>
            </mm-menu-item-group>
            <mm-paragraph>
              지금 실행할 수 없는 명령은 disabled로 두어 목록 안의 위치를 유지합니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        .texts=${[
          'role=menu 는 명령 실행 목록. role=listbox 는 폼 내 선택 목록. 컨텍스트에 따라 구분합니다.',
          'mm-menu-item-link는 메뉴에서 다른 곳으로 나가는 링크라 현재 위치를 표시하지 않습니다. 지금 보고 있는 페이지를 가리키는 내비게이션 링크 목록은 menu가 아닌 list로 읽히게 두고 aria-current="page"를 링크가 갖습니다.',
          'target="_blank"인 링크는 새 창에서 열린다는 사실을 이름에 덧붙여, 아이콘으로만 전달되지 않게 합니다.',
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨테이너 — role=menuitem을 갖는 클릭 가능한 행입니다.',
        '아이콘 — 액션을 보조하는 선택적 메타포(icon).',
        '레이블 — 실행 결과를 예측할 수 있는 텍스트.',
      ]}
      .code=${'<mm-menu-item-action icon="user" label="프로필"></mm-menu-item-action>'}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-end', offset: '1rem' },
        { placement: 'block-end', offset: '3.75rem' },
      ]}
    >
      <mm-menu-item-action icon=${ICON_NAMES.USER} label="프로필"></mm-menu-item-action>
    </mm-component-anatomy>

    <mm-component-section
      heading="MenuList"
      description="소제목과 메뉴 항목 목록을 한 묶음으로 전시합니다. heading을 제목 요소로 렌더해 목록에 aria-labelledby로 연결합니다."
    >
      <mm-menu-list heading="최근 검색">
        <mm-menu-item-action label="고슴이" emoji="🦔"></mm-menu-item-action>
        <mm-menu-item-action label="개구리" emoji="🐸"></mm-menu-item-action>
      </mm-menu-list>
    </mm-component-section>

    <mm-component-section heading="MenuItemCheckboxGroup">
      <mm-menu-item-checkbox-group aria-label="알림 설정">
        <mm-menu-item-checkbox
          icon=${ICON_NAMES.NOTIFICATION}
          label="푸시 알림"
          value="push"
          checked
        ></mm-menu-item-checkbox>
        <mm-menu-item-checkbox
          icon=${ICON_NAMES.MAIL}
          label="이메일 알림"
          value="email"
          checked
        ></mm-menu-item-checkbox>
        <mm-menu-item-checkbox
          icon=${ICON_NAMES.COMMENT}
          label="문자 알림"
          value="sms"
        ></mm-menu-item-checkbox>
      </mm-menu-item-checkbox-group>
    </mm-component-section>

    <mm-component-section heading="MenuItemRadioGroup">
      <mm-menu-item-radio-group name="theme" value="dark" aria-label="테마 선택">
        <mm-menu-item-radio
          value="light"
          icon=${ICON_NAMES.LIGHT_MODE}
          label="라이트 모드"
        ></mm-menu-item-radio>
        <mm-menu-item-radio
          value="dark"
          icon=${ICON_NAMES.DARK_MODE}
          label="다크 모드"
        ></mm-menu-item-radio>
        <mm-menu-item-radio
          value="system"
          icon=${ICON_NAMES.SETTINGS}
          label="시스템 설정 동기화"
        ></mm-menu-item-radio>
      </mm-menu-item-radio-group>

      <mm-separator></mm-separator>

      <mm-menu-item-radio-group name="access" value="public" size="large" aria-label="공개 범위">
        <mm-menu-item-radio
          size="medium"
          value="public"
          icon=${ICON_NAMES.GROUP}
          label="전체공개"
          description="모든 사용자"
        ></mm-menu-item-radio>
        <mm-menu-item-radio
          size="medium"
          value="friends"
          icon=${ICON_NAMES.GROUP}
          label="친구만"
          description="회원님의 친구"
        ></mm-menu-item-radio>
        <mm-menu-item-radio
          size="medium"
          icon=${ICON_NAMES.LOCK}
          label="나만 보기"
          description="부끄러우니까 보지마요"
          value="private"
        ></mm-menu-item-radio>
      </mm-menu-item-radio-group>
    </mm-component-section>

    <mm-component-section
      heading="MenuItemRadioSwitch"
      description="role은 놓이는 부모를 따릅니다. mm-menu-item-group(role=menu) 안이면 menuitemcheckbox, 이 예시처럼 독립적으로 쓰이면 switch로 읽힙니다."
    >
      <mm-menu-item-switch icon=${ICON_NAMES.WIFI} label="Wi-Fi" value="wifi"></mm-menu-item-switch>
    </mm-component-section>

    <mm-component-section heading="MenuItemLink">
      <mm-menu-item-group size="large">
        <mm-menu-item-link
          size="medium"
          icon=${ICON_NAMES.APP_WINDOW}
          label="수줍이 앱"
          target="_self"
          description="앱에서 게시물을 엽니다."
        >
          <mm-accent-tag slot="trailing">신규</mm-accent-tag>
        </mm-menu-item-link>
        <mm-menu-item-link
          size="medium"
          icon=${ICON_NAMES.OPEN_EXTERNAL}
          label="MDN Web Docs"
          href="https://developer.mozilla.org"
          description="외부 링크"
        ></mm-menu-item-link>
        <mm-menu-item-link
          size="medium"
          icon=${ICON_NAMES.GITHUB}
          label="GitHub"
          href="https://github.com"
          description="외부 링크"
        ></mm-menu-item-link>
      </mm-menu-item-group>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
