import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { AVATAR_VARIANT_TYPE_UNION, ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'avatar.html', label: 'Avatar' },
  { href: 'menu-item.html', label: 'Menu Item' },
]

// 커머스 맥락 컴포넌트는 기반 페이지에 전시하지 않고, 실제로 쓰이는 페이지로 연결한다.
const builtWithListItem: ComponentRelatedItemData[] = [
  { href: 'checkout.html', label: 'Order Product Item' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.apple.com/documentation/SwiftUI/List',
    label: 'SwiftUI - List',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/lists-and-tables',
    label: 'Apple HIG - Lists and Tables',
    external: true,
  },
  {
    href: 'https://m3.material.io/components/lists/overview',
    label: 'MD3 - Lists',
    external: true,
  },
  {
    href: 'https://reactnativeelements.com/docs/components/listitem',
    label: 'React Native Elements - ListItem',
    external: true,
  },
  {
    href: 'https://api.flutter.dev/flutter/material/ListTile-class.html',
    label: 'Flutter - ListTile',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'size', type: "'small' | '48' | '80' = 'small'" },
  { name: 'label', type: 'string', optional: true },
  { name: 'description', type: 'string', optional: true },
  { name: 'icon', type: 'IconName', optional: true },
  { name: 'emoji', type: 'string', optional: true },
  { name: 'avatar-src', type: 'string', optional: true },
  { name: 'avatar-variant', type: `${AVATAR_VARIANT_TYPE_UNION} = 'primary'`, optional: true },
  { name: 'avatar-shape', type: "'circle' | 'square' = 'square'", optional: true },
  { name: 'slot: default', type: 'HTMLElement', optional: true },
  { name: 'slot: avatar', type: 'HTMLElement', optional: true },
  { name: 'slot: trailing', type: 'HTMLElement', optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'list-item-size' },
  { name: 'list-item-gap' },
  { name: 'list-item-font-size' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Structural',
    description:
      'leading·content·trailing의 고정된 골격으로 반복되는 행의 구조를 잡습니다. 상호작용 없이 레이아웃만 담당하는 표현 전용 행입니다.',
  },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="List Item"
        description="목록의 한 행을 이루는 표현 전용 골격입니다. 앞쪽 아바타·아이콘, 가운데 제목·설명, 뒤쪽 액션 자리를 행마다 같은 위치에 고정하므로, 사용자는 반복되는 행을 같은 리듬으로 훑으며 항목 사이의 차이에만 눈을 둘 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-aka .items=${['ListTile', 'Media Object']}></mm-component-aka>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="size" variant="pill">
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="leading">Leading</mm-tab>
        <mm-tab value="trailing">Trailing</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="4">
              <mm-list-item
                label="Small"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></mm-list-item>
              <mm-list-item
                label="Small"
                description="Youtube Subscriber"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></mm-list-item>
              <mm-list-item
                size="48"
                label="48"
                description="Youtube Subscriber"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></mm-list-item>
              <mm-list-item
                size="80"
                label="80"
                description="Youtube Subscriber"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></mm-list-item>
            </mm-flex>
            <mm-paragraph>
              small은 description이 없으면 아바타를 32로, 있으면 40으로 전환합니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="leading">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="4">
              <mm-list-item icon=${ICON_NAMES.USER} label="아이콘"></mm-list-item>
              <mm-list-item emoji="🦔" label="이모지"></mm-list-item>
              <mm-list-item
                avatar-src="/src/images/soojubm.png"
                avatar-shape="circle"
                label="아바타"
              ></mm-list-item>
              <mm-list-item label="leading 없음"></mm-list-item>
            </mm-flex>
            <mm-paragraph>
              icon·emoji·avatar-src 중 하나로 leading을 채우고, 모두 없으면 content가 왼쪽 끝에서
              시작합니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="trailing">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="4">
              <mm-list-item
                size="48"
                label="수줍이"
                description="UI Designer"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              >
                <mm-follow-button slot="trailing"></mm-follow-button>
              </mm-list-item>
              <mm-list-item icon=${ICON_NAMES.NOTIFICATION} label="알림">
                <mm-tag slot="trailing">신규</mm-tag>
              </mm-list-item>
            </mm-flex>
            <mm-paragraph>
              trailing 슬롯에 액션 버튼·태그·메타 텍스트를 두어 행 오른쪽 끝에 정렬합니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-content-section heading-level="3" heading="menu-item과는 어떤 차이가 있나요?">
        <mm-paragraph>
          <mm-code>mm-list-item</mm-code>
          은 행의 골격만 그리고,
          <mm-code>mm-menu-item-action</mm-code>
          같은 menu-item 계열은 이 골격을 렌더한 뒤 role·포커스·키보드 조작·이벤트를 더합니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            html`
              <span>
                <b>행 전체를 눌러 명령을 실행하거나 선택 상태를 바꾸면 menu-item을 쓴다</b>
                <br />
                놓이는 부모에 맞는 role(menuitem·radio·checkbox 등)과 hover·포커스 표시, Enter·Space
                활성화를 컴포넌트가 소유한다
              </span>
            `,
            html`
              <span>
                <b>정보를 보여주기만 하는 행은 list-item을 쓴다</b>
                <br />
                trailing에 버튼을 두어도 상호작용은 그 버튼이 갖고, 행 자체는 표현으로 남는다
              </span>
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>
      <mm-content-section heading-level="3" heading="시각보정">
        <mm-paragraph>
          content 박스는 leading과 가운데 정렬되지만, 줄마다 행간이 달라 글자 묶음은 위아래 여백이
          다르게 남습니다.
        </mm-paragraph>
        <mm-text-list
          variant="check"
          .texts=${[
            html`
              <span>
                <b>위아래 행간 차이의 절반만큼 content를 위로 옮긴다</b>
                <br />
                small 사이즈에 description이 있으면 label(14/24)의 위 행간이 description(12/16)의
                아래 행간보다 넓어 글자가 아래로 치우쳐 보인다. 이동에는
                <mm-code>translate</mm-code>
                속성을 써서 레이아웃 박스와 정렬은 그대로 둔다
              </span>
            `,
          ]}
        ></mm-text-list>
      </mm-content-section>
    </mm-component-guide>

    <mm-component-anatomy
      style="--component-anatomy-stage-width: 320px"
      .parts=${[
        'leading — 아이콘 또는 아바타를 담는 선택적 영역. 없으면 content가 왼쪽 끝에서 시작합니다.',
        'content — label과 description으로 구성된 본문. flex: 1로 남은 공간을 채웁니다.',
        'trailing — 오른쪽에 배치되는 선택적 슬롯. 액션 버튼·뱃지·메타 텍스트 등을 넣습니다.',
      ]}
      .code=${`<mm-list-item label="수줍이" description="바보" size="48" avatar-shape="circle" avatar-src="...">
    <mm-follow-button slot="trailing"></mm-follow-button>
</mm-list-item>`}
      .markers=${[
        { placement: 'block-end', offset: '1.5rem' },
        { placement: 'block-end', offset: '9.41rem' },
        { placement: 'block-end', offset: 'calc(100% - 2.09rem)' },
      ]}
    >
      <mm-list-item
        label="수줍이"
        description="바보"
        size="48"
        avatar-variant="primary"
        avatar-shape="circle"
        avatar-src="/src/images/soojubm.png"
        style="width: 100%"
      >
        <mm-follow-button slot="trailing"></mm-follow-button>
      </mm-list-item>
    </mm-component-anatomy>

    <mm-component-section heading="UserRow" description="사용자 맥락">
      <mm-menu-item-group size="large">
        <mm-user-row
          label="수줍이"
          description="UI Designer"
          avatar-src="/src/images/soojubm.png"
        ></mm-user-row>
        <mm-user-row label="수줍이" description="바보" avatar-src="/src/images/soojubm.png">
          <mm-follow-button slot="trailing"></mm-follow-button>
        </mm-user-row>
        <mm-user-row
          label="알 수 없는 사용자"
          description="아바타 이미지가 없을 때"
          avatar-variant="secondary"
          icon=${ICON_NAMES.USER}
        >
          <mm-tag slot="trailing">테스트용 태그</mm-tag>
        </mm-user-row>
      </mm-menu-item-group>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-related
      heading="Built with List Item"
      .items=${builtWithListItem}
    ></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
