import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { MenuOptionItem } from '@/types'

import { ICON_NAMES } from '@/components/common'
import { code, sharedPropsOf, subComponentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'list-item.html', label: 'List Item' },
  { href: 'popover.html', label: 'Popover' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/',
    label: 'WAI-ARIA APG - Menubar Pattern',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/menus',
    label: 'Apple HIG - Menus',
  },
  {
    href: 'https://m3.material.io/components/menus/overview',
    label: 'Material Design 3 - Menus',
  },
  {
    href: 'https://seek-oss.github.io/braid-design-system/components/MenuItemCheckbox/',
    label: 'Braid Design System - MenuItemCheckbox',
  },
]

// 행 변형은 표시 prop을 함께 물려받으므로 공통 prop은 한 번만 적고, 변형마다 더하는 prop만 따로 적는다.
const menuItemTags = [
  'mm-menu-item-action',
  'mm-menu-item-link',
  'mm-menu-item-checkbox',
  'mm-menu-item-switch',
  'mm-menu-item-radio',
] as const
const sharedMenuItemProps = sharedPropsOf(...menuItemTags)

const componentProps: ComponentPropItemData[] = [
  ...sharedMenuItemProps,
  { name: "slot='trailing'", type: 'HTMLElement', optional: true },
  ...menuItemTags.flatMap(tag => subComponentPropsOf(tag, sharedMenuItemProps)),
  ...subComponentPropsOf('mm-menu-item-group'),
  ...subComponentPropsOf('mm-menu-item-radio-group'),
  ...subComponentPropsOf('mm-menu-item-checkbox-group'),
  { name: 'change', type: 'CustomEvent detail: checked, value', kind: 'event' },
  { name: 'toggle', type: 'CustomEvent detail: open', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - action',
    description:
      '행 전체를 눌러 명령을 실행합니다. 행 안의 버튼·스위치로 조작하는 행은 list-item을 사용하세요.',
  },
  {
    heading: 'Interactive - selection',
    description: '행을 눌러 선택 여부를 바꿉니다.',
  },
]

const notificationOptions: MenuOptionItem[] = [
  { value: 'push', label: '푸시 알림', icon: ICON_NAMES.NOTIFICATION },
  { value: 'email', label: '이메일 알림', icon: ICON_NAMES.MAIL },
  { value: 'sms', label: '문자 알림', icon: ICON_NAMES.COMMENT },
]

const themeOptions: MenuOptionItem[] = [
  { value: 'light', label: '라이트 모드', icon: ICON_NAMES.LIGHT_MODE },
  { value: 'dark', label: '다크 모드', icon: ICON_NAMES.DARK_MODE },
  { value: 'system', label: '시스템 설정 동기화', icon: ICON_NAMES.SETTINGS },
]

const accessOptions: MenuOptionItem[] = [
  { value: 'public', label: '전체공개', description: '모든 사용자', icon: ICON_NAMES.GROUP },
  { value: 'friends', label: '친구만', description: '회원님의 친구', icon: ICON_NAMES.GROUP },
  {
    value: 'private',
    label: '나만 보기',
    description: '부끄러우니까 보지마요',
    icon: ICON_NAMES.LOCK,
  },
]

const sizeCode = `<mm-menu-item-group aria-label="크기 메뉴" size="large">
  <mm-menu-item-action icon="user" label="Small"></mm-menu-item-action>
  <mm-menu-item-action size="medium" icon="group" label="Frontend Group" description="프론트엔드 개발자 모임"></mm-menu-item-action>
</mm-menu-item-group>`

const leadingCode = `<mm-menu-item-group aria-label="리딩 메뉴">
  <mm-menu-item-action icon="user" label="아이콘"></mm-menu-item-action>
  <mm-menu-item-action emoji="🦔" label="이모지"></mm-menu-item-action>
  <mm-menu-item-action avatar-src="/src/images/soojubm.png" avatar-shape="circle" label="아바타"></mm-menu-item-action>
</mm-menu-item-group>`

const destructiveCode = `<mm-menu-item-group aria-label="파괴적 명령 메뉴">
  <mm-menu-item-action icon="user" label="프로필"></mm-menu-item-action>
  <mm-menu-item-action icon="trash" label="삭제" destructive></mm-menu-item-action>
</mm-menu-item-group>`

const disabledCode = `<mm-menu-item-group aria-label="비활성 메뉴">
  <mm-menu-item-action icon="user" label="프로필"></mm-menu-item-action>
  <mm-menu-item-action icon="log-out" label="로그아웃" disabled></mm-menu-item-action>
</mm-menu-item-group>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="MenuItem"
      description="메뉴 안에서 실행하거나 선택할 수 있는 행동 하나입니다. 행 전체를 눌러 명령을 실행하거나 선택 여부를 바꾸므로, 사용자는 목록을 훑으며 원하는 명령을 바로 찾아 실행할 수 있습니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="size" variant="pill">
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="leading">Leading</mm-tab>
        <mm-tab value="destructive">Destructive</mm-tab>
        <mm-tab value="disabled">Disabled</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-menu-item-group aria-label="크기 메뉴" size="large">
            <mm-menu-item-action icon=${ICON_NAMES.USER} label="Small"></mm-menu-item-action>
            <mm-menu-item-action
              size="medium"
              icon=${ICON_NAMES.GROUP}
              label="Frontend Group"
              description="프론트엔드 개발자 모임"
            ></mm-menu-item-action>
          </mm-menu-item-group>
        </mm-component-example>
        <mm-component-code .code=${sizeCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="leading">
        <mm-component-example>
          <mm-menu-item-group aria-label="리딩 메뉴">
            <mm-menu-item-action icon=${ICON_NAMES.USER} label="아이콘"></mm-menu-item-action>
            <mm-menu-item-action emoji="🦔" label="이모지"></mm-menu-item-action>
            <mm-menu-item-action
              avatar-src="/src/images/soojubm.png"
              avatar-shape="circle"
              label="아바타"
            ></mm-menu-item-action>
          </mm-menu-item-group>
        </mm-component-example>
        <mm-component-code .code=${leadingCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="destructive">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-menu-item-group aria-label="파괴적 명령 메뉴">
              <mm-menu-item-action icon=${ICON_NAMES.USER} label="프로필"></mm-menu-item-action>
              <mm-menu-item-action
                icon=${ICON_NAMES.DELETE}
                label="삭제"
                destructive
              ></mm-menu-item-action>
            </mm-menu-item-group>
            <mm-paragraph>되돌리기 어려운 명령에 씁니다.</mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${destructiveCode}></mm-component-code>
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
            <mm-paragraph>지금 실행할 수 없는 명령도 목록 안의 위치를 유지합니다.</mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${disabledCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-menu-item-action']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-paragraph-group>
        <mm-heading level="3">언제 사용하나요</mm-heading>
        <mm-paragraph>
          더보기·컨텍스트 메뉴처럼 눌러서 실행하는 명령 목록에 사용합니다. 메뉴 안에서 값을 하나
          고르거나 여러 개 켜고 끌 때는 ${code('mm-menu-item-radio-group')}·
          ${code('mm-menu-item-checkbox-group')}으로 행을 묶습니다. 이 그룹은 ${code('options')}로
          받은 옵션을 메뉴 행으로 그립니다.
        </mm-paragraph>
      </mm-paragraph-group>
    </mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨테이너 — 눌러서 실행하는 행입니다.',
        '아이콘 — 액션을 보조하는 선택 요소입니다.',
        '레이블 — 실행 결과를 예측할 수 있는 텍스트.',
      ]}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-end', offset: '1rem' },
        { placement: 'block-end', offset: '3.75rem' },
      ]}
    >
      <mm-menu-item-action icon=${ICON_NAMES.USER} label="프로필"></mm-menu-item-action>
    </mm-component-anatomy>

    <mm-component-section
      heading="MenuItemGroup"
      description="값을 고르는 드롭다운은 mm-select를 사용하세요."
    >
      <mm-menu-item-group heading="공유">
        <mm-menu-item-action
          icon=${ICON_NAMES.EXTERNAL_LINK}
          label="링크 복사"
        ></mm-menu-item-action>
        <mm-menu-item-action
          icon=${ICON_NAMES.SHARE}
          label="다른 앱으로 공유"
        ></mm-menu-item-action>
      </mm-menu-item-group>
    </mm-component-section>

    <mm-component-section
      heading="More"
      description="자주 쓰는 명령만 먼저 보여 주고, 나머지는 더보기로 펼칩니다."
    >
      <mm-menu-item-group aria-label="더보기 메뉴">
        <mm-menu-item-action
          icon=${ICON_NAMES.EXTERNAL_LINK}
          label="링크 복사"
        ></mm-menu-item-action>
        <mm-menu-item-action icon=${ICON_NAMES.SHARE} label="공유"></mm-menu-item-action>
        <mm-menu-item-action icon=${ICON_NAMES.SHOW_MORE} label="더보기"></mm-menu-item-action>
      </mm-menu-item-group>
    </mm-component-section>

    <mm-component-section heading="MenuItemCheckboxGroup">
      <mm-menu-item-checkbox-group
        aria-label="알림 설정"
        .options=${notificationOptions}
        .values=${['push', 'email']}
      ></mm-menu-item-checkbox-group>
    </mm-component-section>

    <mm-component-section heading="MenuItemRadioGroup">
      <mm-menu-item-radio-group
        name="theme"
        value="dark"
        aria-label="테마 선택"
        .options=${themeOptions}
      ></mm-menu-item-radio-group>

      <mm-separator></mm-separator>

      <mm-menu-item-radio-group
        name="access"
        value="public"
        size="large"
        aria-label="공개 범위"
        .options=${accessOptions}
      ></mm-menu-item-radio-group>
    </mm-component-section>

    <mm-component-section heading="MenuItemRadioSwitch">
      <mm-menu-item-switch icon=${ICON_NAMES.WIFI} label="Wi-Fi" value="wifi"></mm-menu-item-switch>
    </mm-component-section>

    <mm-component-section
      heading="MenuItemLink"
      description="메뉴에서 다른 곳으로 나가는 링크라 현재 위치를 표시하지 않습니다. 현재 페이지를 가리키는 내비게이션은 list로 만듭니다. 새 창으로 열리는 링크는 그 사실을 이름에 덧붙입니다."
    >
      <mm-menu-item-group size="large">
        <mm-menu-item-link
          size="medium"
          icon=${ICON_NAMES.HOME_PAGE}
          label="수줍이 앱"
          target="_self"
          description="앱에서 게시물을 엽니다."
        >
          <mm-accent-tag slot="trailing">신규</mm-accent-tag>
        </mm-menu-item-link>
        <mm-menu-item-link
          size="medium"
          icon=${ICON_NAMES.EXTERNAL_LINK}
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
