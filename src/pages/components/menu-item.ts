import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'list-item.html', label: 'List Item' },
  { href: 'popover.html', label: 'Popover' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/menubar/',
    label: 'WAI-ARIA Menubar Pattern',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/menus',
    label: 'HIG Menus',
    external: true,
  },
  { href: 'https://m3.material.io/components/menus/overview', label: 'MD3 Menus', external: true },
  {
    href: 'https://seek-oss.github.io/braid-design-system/components/MenuItemCheckbox/',
    label: 'Braid - MenuItemCheckbox',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'size', type: '', optional: true },
  { name: 'label', type: 'string' },
  { name: 'description', type: 'string', optional: true },
  { name: 'icon', type: 'IconName', optional: true },
  { name: 'trailing-icon', type: 'IconName', optional: true },
  { name: "slot='trailing'", type: 'HTMLElement', optional: true },
  { name: 'emoji', type: 'string', optional: true },
  { name: 'avatar-src', type: 'string', optional: true },
  { name: 'avatar-shape', type: '', optional: true },
  { name: 'tone', type: "'danger' | string", optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
  { name: 'mm-menu-item-group role', type: "'menu' | 'listbox' = 'menu'", optional: true },
  { name: 'mm-menu-item-group size', type: "'large'", optional: true },
  { name: 'mm-menu-item-disclosure open', type: 'boolean = false', optional: true },
  {
    name: 'mm-menu-item-disclosure event: toggle',
    type: 'CustomEvent { open: boolean }',
    optional: true,
  },
  { name: 'mm-menu-list heading', type: 'string', optional: true },
  { name: 'mm-menu-list size', type: "'large'", optional: true },
  { name: 'mm-menu-item-radio-group size', type: "'large'", optional: true },
  { name: 'mm-menu-item-checkbox-group size', type: "'large'", optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'menu-item-background-color', default: 'transparent' },
  { name: 'menu-item-padding-inline', default: '0' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - action',
    description:
      'hover·포커스·키보드 탐색과 명령 실행 상호작용을 항목이 소유합니다. 표현만 필요하면 list-item을 사용하세요.',
  },
  {
    heading: 'Interactive - selection',
    description: 'menuitemcheckbox·menuitemradio 항목이 체크 상태를 소유해 선택 여부를 드러냅니다.',
  },
]

const main = html`
  <main class="page">
    <mm-page-header
      heading="MenuItem"
      description="사용자가 수행할 수 있는 행동 목록입니다. 단일 액션 또는 선택 액션을 포함할 수 있습니다"
    ></mm-page-header>

    <mm-component-example>
      <mm-flex direction="column">
        <mm-menu-item-group aria-label="기본 메뉴">
          <mm-menu-item-action icon="user" label="프로필"></mm-menu-item-action>
          <mm-menu-item-action icon="trash" label="삭제" tone="danger"></mm-menu-item-action>
          <mm-menu-item-action
            icon="log-out"
            label="로그아웃 (비활성)"
            disabled
          ></mm-menu-item-action>
        </mm-menu-item-group>
        <mm-separator></mm-separator>
        <mm-menu-item-group aria-label="액션 메뉴" size="large">
          <mm-menu-item-action
            size="48"
            label="Personal License"
            description="1 user"
          ></mm-menu-item-action>
          <mm-menu-item-action
            size="48"
            icon="group"
            label="Frontend Group"
            description="프론트엔드 개발자 모임"
          ></mm-menu-item-action>
        </mm-menu-item-group>
      </mm-flex>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      <mm-text-list
        texts='[
        "role=menu 는 명령 실행 목록. role=listbox 는 폼 내 선택 목록. 컨텍스트에 따라 구분합니다."
      ]'
      ></mm-text-list>
    </mm-component-guide>

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
          icon="bell"
          label="푸시 알림"
          value="push"
          checked
        ></mm-menu-item-checkbox>
        <mm-menu-item-checkbox
          icon="mail"
          label="이메일 알림"
          value="email"
          checked
        ></mm-menu-item-checkbox>
        <mm-menu-item-checkbox icon="message" label="문자 알림" value="sms"></mm-menu-item-checkbox>
      </mm-menu-item-checkbox-group>
    </mm-component-section>

    <mm-component-section heading="MenuItemRadioGroup">
      <mm-menu-item-radio-group name="theme" value="dark" aria-label="테마 선택">
        <mm-menu-item-radio value="light" icon="sun-light" label="라이트 모드"></mm-menu-item-radio>
        <mm-menu-item-radio value="dark" icon="half-moon" label="다크 모드"></mm-menu-item-radio>
        <mm-menu-item-radio
          value="system"
          icon="settings"
          label="시스템 설정 동기화"
        ></mm-menu-item-radio>
      </mm-menu-item-radio-group>

      <mm-separator></mm-separator>

      <mm-menu-item-radio-group name="access" value="public" size="large" aria-label="공개 범위">
        <mm-menu-item-radio
          size="small"
          value="public"
          icon="group"
          label="전체공개"
          description="모든 사용자"
        ></mm-menu-item-radio>
        <mm-menu-item-radio
          size="small"
          value="friends"
          icon="group"
          label="친구만"
          description="회원님의 친구"
        ></mm-menu-item-radio>
        <mm-menu-item-radio
          size="small"
          icon="lock"
          label="나만 보기"
          description="부끄러우니까 보지마요"
          value="private"
        ></mm-menu-item-radio>
      </mm-menu-item-radio-group>
    </mm-component-section>

    <mm-component-section heading="MenuItemRadioSwitch">
      <mm-menu-item-switch icon="wifi" label="Wi-Fi" value="wifi"></mm-menu-item-switch>
    </mm-component-section>

    <mm-component-section heading="MenuItemLink">
      <mm-menu-item-group size="large">
        <mm-menu-item-link
          size="small"
          icon="app-window"
          label="수줍이 앱"
          target="_self"
          description="앱에서 게시물을 엽니다."
        >
          <mm-accent-tag slot="trailing">신규</mm-accent-tag>
        </mm-menu-item-link>
        <mm-menu-item-link
          size="small"
          icon="open-in-browser"
          label="MDN Web Docs"
          href="https://developer.mozilla.org"
          description="외부 링크"
        ></mm-menu-item-link>
        <mm-menu-item-link
          size="small"
          icon="github"
          label="GitHub"
          href="https://github.com"
          description="외부 링크"
        ></mm-menu-item-link>
      </mm-menu-item-group>
    </mm-component-section>

    <mm-component-section
      heading="MenuItemDisclosure"
      description="하위 항목을 접었다 펴는 부모 메뉴 항목입니다. 트리거는 role=menuitem, 펼쳐지는 패널은 role=menu이며 열림 상태를 스스로 소유합니다."
    >
      <mm-menu-item-group size="large">
        <mm-menu-item-disclosure icon="palette" label="Foundations" open>
          <mm-menu-item-link
            emoji="#"
            label="Elevation"
            href="elevation.html"
            target="_self"
            hidden-trailing
          ></mm-menu-item-link>
          <mm-menu-item-link
            emoji="#"
            label="Layout"
            href="layout.html"
            target="_self"
            hidden-trailing
          ></mm-menu-item-link>
        </mm-menu-item-disclosure>
      </mm-menu-item-group>
    </mm-component-section>

    <mm-component-section
      heading="Setting Item"
      description="설정 메뉴에 적합한 레이아웃과 상호작용을 가진 MenuItemRow입니다."
    >
      <mm-menu-item-group size="large" aria-label="설정 메뉴">
        <mm-setting-item
          icon="code"
          label="철저한 코드 리뷰"
          description="추가 발견 사항을 계속 찾도록 합니다."
        >
          <mm-switch slot="action" checked></mm-switch>
        </mm-setting-item>
        <mm-setting-item
          icon="half-moon"
          label="다크 모드"
          description="어두운 배경 테마를 사용합니다."
        >
          <mm-switch slot="action"></mm-switch>
        </mm-setting-item>
      </mm-menu-item-group>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
