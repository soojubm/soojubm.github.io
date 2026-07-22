import { html } from 'lit'
import { renderDocumentLayout } from '../../../layouts/document-layout'

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
        <mm-menu-item-group aria-label="액션 메뉴">
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

    <mm-component-props>
      <mm-prop name="size" type="'small' | '48' | '80' = 'small'" optional></mm-prop>
      <mm-prop name="label" type="string"></mm-prop>
      <mm-prop name="description" type="string" optional></mm-prop>
      <mm-prop name="icon" type="IconName" optional></mm-prop>
      <mm-prop name="trailing-icon" type="IconName" optional></mm-prop>
      <mm-prop name="slot='trailing'" type="HTMLElement" optional></mm-prop>
      <mm-prop name="emoji" type="string" optional></mm-prop>
      <mm-prop name="avatar-src" type="string" optional></mm-prop>
      <mm-prop name="avatar-variant" type="string = 'tertiary'" optional></mm-prop>
      <mm-prop name="avatar-shape" type="'circle' | 'square' = 'square'" optional></mm-prop>
      <mm-prop name="tone" type="'danger' | string" optional></mm-prop>
      <mm-prop name="disabled" type="boolean" optional></mm-prop>
    </mm-component-props>

    <mm-component-tokens>
      <mm-token
        name="menuitem-background-color-hover"
        default="var(--interaction-hover-background-color)"
      ></mm-token>
    </mm-component-tokens>

    <!-- "flutter. ListView. 스크롤 가능한 뷰 컨테이너. 동적으로 데이터를 랜더링하는 책임까지 포함되어
  있다. itemBuilder: (context, index) {} / controller: ScrollController(). ListView - SwitchListTile
  / RadioListTile / 클릭 영역을 타일 전체로 지정하고 있다. 2가지 이상의 액션이 포함되어야 할 때는?",
  "role=listbox/menu는 항목 선택과 명령 실행 차이. 자식으로 option, menuitemcheckbox 등을 가지는
  것이 차이. 사용 맥락 또한 listbox는 폼이나 입력. aria-orientation값을 갖습니다 vertical.드롭다운은
  패턴. 사용자 인터렉션 방식에 가까움. listbox는 기본적으로 드롭다운 목록을 제공하지않는다.", -->

    <mm-component-guide>
      <mm-component-feature-list>
        <mm-feature
          heading="Interactive - action"
          description="hover·포커스·키보드 탐색과 명령 실행 상호작용을 항목이 소유합니다. 표현만 필요하면 list-item을 사용하세요."
        ></mm-feature>
        <mm-feature
          heading="Interactive - selection"
          description="menuitemcheckbox·menuitemradio 항목이 체크 상태를 소유해 선택 여부를 드러냅니다."
        ></mm-feature>
        <mm-feature
          heading="Groupable"
          description="항목은 단독이 아니라 메뉴 그룹 안에서 역할(menu·listbox)을 얻습니다. 체크 계열 항목은 항상 그룹으로 묶습니다."
        ></mm-feature>
      </mm-component-feature-list>
      <mm-text-list
        texts='[
        "role=menu 는 명령 실행 목록. role=listbox 는 폼 내 선택 목록. 컨텍스트에 따라 구분합니다.",
        "아이콘은 icon prop, 이미지는 avatar-src prop, 이모지는 emoji prop으로 전달합니다."
      ]'
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-section
      heading="MenuItemCheckboxGroup"
      description="mm-menu-item-checkbox는 항상 그룹 안에서 사용합니다."
    >
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

      <mm-menu-item-radio-group name="access" value="public" aria-label="공개 범위">
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
      <mm-menu-item-group>
        <mm-menu-item-link
          size="small"
          icon="app-window"
          label="수줍이 앱"
          target="_self"
          description="앱에서 게시물을 엽니다."
        ></mm-menu-item-link>
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
      heading="Setting Item"
      description="설정 메뉴에 적합한 레이아웃과 상호작용을 가진 MenuItemRow입니다. 토글 스위치와 함께 사용됩니다."
    >
      <mm-menu-item-group>
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

    <mm-component-related>
      <mm-button-group>
        <mm-hashtag-link href="list-item.html">List Item</mm-hashtag-link>
        <mm-hashtag-link href="popover.html">Popover</mm-hashtag-link>
      </mm-button-group>
    </mm-component-related>

    <mm-component-references>
      <mm-link external href="https://www.w3.org/WAI/ARIA/apg/patterns/menubar/">
        WAI-ARIA Menubar Pattern
      </mm-link>
      <mm-link external href="https://developer.apple.com/design/human-interface-guidelines/menus">
        HIG Menus
      </mm-link>
      <mm-link external href="https://m3.material.io/components/menus/overview">MD3 Menus</mm-link>
    </mm-component-references>
  </main>
`

interface MenuItemRadioGroupChangeDetail {
  value: string
  name: string
}

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)

  const radioGroup = document.querySelector<HTMLElement>('#theme-group')

  radioGroup?.addEventListener('change', event => {
    const { value } = (event as CustomEvent<MenuItemRadioGroupChangeDetail>).detail
    document.body.classList.toggle('dark-mode', value === 'dark')
  })
})
