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
  'fff-menu-item-action',
  'fff-menu-item-link',
  'fff-menu-item-checkbox',
  'fff-menu-item-switch',
  'fff-menu-item-radio',
] as const
const sharedMenuItemProps = sharedPropsOf(...menuItemTags)

const componentProps: ComponentPropItemData[] = [
  ...sharedMenuItemProps,
  { name: "slot='trailing'", type: 'HTMLElement', optional: true },
  ...menuItemTags.flatMap(tag => subComponentPropsOf(tag, sharedMenuItemProps)),
  ...subComponentPropsOf('fff-menu-item-group'),
  ...subComponentPropsOf('fff-menu-item-radio-group'),
  ...subComponentPropsOf('fff-menu-item-checkbox-group'),
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

const sizeCode = `<fff-menu-item-group aria-label="크기 메뉴" size="large">
  <fff-menu-item-action icon="user" label="Small"></fff-menu-item-action>
  <fff-menu-item-action size="medium" icon="group" label="Frontend Group" description="프론트엔드 개발자 모임"></fff-menu-item-action>
</fff-menu-item-group>`

const leadingCode = `<fff-menu-item-group aria-label="리딩 메뉴">
  <fff-menu-item-action icon="user" label="아이콘"></fff-menu-item-action>
  <fff-menu-item-action emoji="🦔" label="이모지"></fff-menu-item-action>
  <fff-menu-item-action avatar-src="/src/images/soojubm.png" avatar-shape="circle" label="아바타"></fff-menu-item-action>
</fff-menu-item-group>`

const destructiveCode = `<fff-menu-item-group aria-label="파괴적 명령 메뉴">
  <fff-menu-item-action icon="user" label="프로필"></fff-menu-item-action>
  <fff-menu-item-action icon="trash" label="삭제" destructive></fff-menu-item-action>
</fff-menu-item-group>`

const disabledCode = `<fff-menu-item-group aria-label="비활성 메뉴">
  <fff-menu-item-action icon="user" label="프로필"></fff-menu-item-action>
  <fff-menu-item-action icon="log-out" label="로그아웃" disabled></fff-menu-item-action>
</fff-menu-item-group>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="MenuItem"
      description="메뉴 안에서 실행하거나 선택할 수 있는 행동 하나입니다. 행 전체를 눌러 명령을 실행하거나 선택 여부를 바꾸므로, 사용자는 목록을 훑으며 원하는 명령을 바로 찾아 실행할 수 있습니다."
    ></fff-page-header>

    <fff-flex direction="column" gap="4">
      <fff-tab-list
        value="size"
        variant="pill"
        .tabs=${[
          { value: 'size', label: 'Size' },
          { value: 'leading', label: 'Leading' },
          { value: 'destructive', label: 'Destructive' },
          { value: 'disabled', label: 'Disabled' },
        ]}
      ></fff-tab-list>
      <fff-tab-panel value="size">
        <fff-component-example>
          <fff-menu-item-group aria-label="크기 메뉴" size="large">
            <fff-menu-item-action icon=${ICON_NAMES.USER} label="Small"></fff-menu-item-action>
            <fff-menu-item-action
              size="medium"
              icon=${ICON_NAMES.GROUP}
              label="Frontend Group"
              description="프론트엔드 개발자 모임"
            ></fff-menu-item-action>
          </fff-menu-item-group>
        </fff-component-example>
        <fff-component-code .code=${sizeCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="leading">
        <fff-component-example>
          <fff-menu-item-group aria-label="리딩 메뉴">
            <fff-menu-item-action icon=${ICON_NAMES.USER} label="아이콘"></fff-menu-item-action>
            <fff-menu-item-action emoji="🦔" label="이모지"></fff-menu-item-action>
            <fff-menu-item-action
              avatar-src="/src/images/soojubm.png"
              avatar-shape="circle"
              label="아바타"
            ></fff-menu-item-action>
          </fff-menu-item-group>
        </fff-component-example>
        <fff-component-code .code=${leadingCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="destructive">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-menu-item-group aria-label="파괴적 명령 메뉴">
              <fff-menu-item-action icon=${ICON_NAMES.USER} label="프로필"></fff-menu-item-action>
              <fff-menu-item-action
                icon=${ICON_NAMES.DELETE}
                label="삭제"
                destructive
              ></fff-menu-item-action>
            </fff-menu-item-group>
            <fff-paragraph>되돌리기 어려운 명령에 씁니다.</fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${destructiveCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="disabled">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-menu-item-group aria-label="비활성 메뉴">
              <fff-menu-item-action icon=${ICON_NAMES.USER} label="프로필"></fff-menu-item-action>
              <fff-menu-item-action
                icon=${ICON_NAMES.LOG_OUT}
                label="로그아웃"
                disabled
              ></fff-menu-item-action>
            </fff-menu-item-group>
            <fff-paragraph>지금 실행할 수 없는 명령도 목록 안의 위치를 유지합니다.</fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${disabledCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-menu-item-action']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-guide>
      <fff-content-section
        heading-level="3"
        heading="언제 사용하나요"
        description="더보기·컨텍스트 메뉴처럼 눌러서 실행하는 명령 목록에 사용합니다."
        .texts=${[
          html`
            메뉴 안에서 값을 하나 고르거나 여러 개 켜고 끌 때는
            ${code('fff-menu-item-radio-group')}·${code('fff-menu-item-checkbox-group')}으로 행을
            묶는다
          `,
          html`
            이 그룹은 ${code('options')}로 받은 옵션을 메뉴 행으로 그린다
          `,
        ]}
      ></fff-content-section>
    </fff-component-guide>

    <fff-component-anatomy
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
      <fff-menu-item-action icon=${ICON_NAMES.USER} label="프로필"></fff-menu-item-action>
    </fff-component-anatomy>

    <fff-component-section
      heading="MenuItemGroup"
      description="값을 고르는 드롭다운은 fff-select를 사용하세요."
    >
      <fff-menu-item-group heading="공유">
        <fff-menu-item-action
          icon=${ICON_NAMES.EXTERNAL_LINK}
          label="링크 복사"
        ></fff-menu-item-action>
        <fff-menu-item-action
          icon=${ICON_NAMES.SHARE}
          label="다른 앱으로 공유"
        ></fff-menu-item-action>
      </fff-menu-item-group>
    </fff-component-section>

    <fff-component-section
      heading="More"
      description="자주 쓰는 명령만 먼저 보여 주고, 나머지는 더보기로 펼칩니다."
    >
      <fff-menu-item-group aria-label="더보기 메뉴">
        <fff-menu-item-action
          icon=${ICON_NAMES.EXTERNAL_LINK}
          label="링크 복사"
        ></fff-menu-item-action>
        <fff-menu-item-action icon=${ICON_NAMES.SHARE} label="공유"></fff-menu-item-action>
        <fff-menu-item-action icon=${ICON_NAMES.SHOW_MORE} label="더보기"></fff-menu-item-action>
      </fff-menu-item-group>
    </fff-component-section>

    <fff-component-section heading="MenuItemCheckboxGroup">
      <fff-menu-item-checkbox-group
        aria-label="알림 설정"
        .options=${notificationOptions}
        .values=${['push', 'email']}
      ></fff-menu-item-checkbox-group>
    </fff-component-section>

    <fff-component-section heading="MenuItemRadioGroup">
      <fff-menu-item-radio-group
        name="theme"
        value="dark"
        aria-label="테마 선택"
        .options=${themeOptions}
      ></fff-menu-item-radio-group>

      <fff-separator></fff-separator>

      <fff-menu-item-radio-group
        name="access"
        value="public"
        size="large"
        aria-label="공개 범위"
        .options=${accessOptions}
      ></fff-menu-item-radio-group>
    </fff-component-section>

    <fff-component-section heading="MenuItemRadioSwitch">
      <fff-menu-item-switch
        icon=${ICON_NAMES.WIFI}
        label="Wi-Fi"
        value="wifi"
      ></fff-menu-item-switch>
    </fff-component-section>

    <fff-component-section
      heading="MenuItemLink"
      description="메뉴에서 다른 곳으로 나가는 링크라 현재 위치를 표시하지 않습니다. 현재 페이지를 가리키는 내비게이션은 list로 만듭니다. 새 창으로 열리는 링크는 그 사실을 이름에 덧붙입니다."
    >
      <fff-menu-item-group size="large">
        <fff-menu-item-link
          size="medium"
          icon=${ICON_NAMES.HOME_PAGE}
          label="수줍이 앱"
          target="_self"
          description="앱에서 게시물을 엽니다."
        >
          <fff-accent-tag slot="trailing">신규</fff-accent-tag>
        </fff-menu-item-link>
        <fff-menu-item-link
          size="medium"
          icon=${ICON_NAMES.EXTERNAL_LINK}
          label="MDN Web Docs"
          href="https://developer.mozilla.org"
          description="외부 링크"
        ></fff-menu-item-link>
        <fff-menu-item-link
          size="medium"
          icon=${ICON_NAMES.GITHUB}
          label="GitHub"
          href="https://github.com"
          description="외부 링크"
        ></fff-menu-item-link>
      </fff-menu-item-group>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
