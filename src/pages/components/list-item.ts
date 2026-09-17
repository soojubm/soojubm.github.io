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
  { href: 'menu-item.html', label: 'menuItem' },
]

// 커머스 맥락 컴포넌트는 기반 페이지에 전시하지 않고, 실제로 쓰이는 페이지로 연결한다.
const builtWithListItem: ComponentRelatedItemData[] = [
  { href: 'checkout.html', label: 'OrderProductItem' },
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
        description="leading(아바타·아이콘) + 본문(제목·설명) + trailing(액션) 한 줄을 구성하는 표현 전용 primitive. 상호작용 의미가 필요하면 menuItem을 사용합니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-aka .items=${['ListTile', 'Media Object']}></mm-component-aka>

    <mm-component-example>
      <mm-flex direction="column" gap="2">
        <mm-menu-item-group>
          <mm-list-item
            size="small"
            label="스몰 사이즈 / description 없음 → 32"
            avatar-shape="circle"
            avatar-variant="secondary"
            avatar-src="/src/images/soojubm.png"
          ></mm-list-item>
        </mm-menu-item-group>
        <mm-separator></mm-separator>
        <mm-menu-item-group>
          <mm-list-item
            size="small"
            label="스몰 사이즈 / description 있음 → 40"
            description="Youtube Subscriber"
            avatar-shape="circle"
            avatar-variant="secondary"
            avatar-src="/src/images/soojubm.png"
          ></mm-list-item>
        </mm-menu-item-group>
        <mm-separator></mm-separator>
        <mm-list-item
          label="48 사이즈"
          description="Youtube Subscriber"
          size="48"
          avatar-shape="circle"
          avatar-variant="secondary"
          avatar-src="/src/images/soojubm.png"
        ></mm-list-item>
        <mm-separator></mm-separator>
        <mm-list-item
          label="80 사이즈 용도 없음"
          description="Youtube Subscriber"
          size="80"
          avatar-shape="circle"
          avatar-variant="secondary"
          avatar-src="/src/images/soojubm.png"
        ></mm-list-item>
      </mm-flex>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
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
