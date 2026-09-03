import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'

import { AVATAR_VARIANT_TYPE_UNION } from '@/components/common/avatar'
import { renderDocumentLayout } from '@/components/layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'avatar.html', label: 'Avatar' },
  { href: 'menu-item.html', label: 'menuItem' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.apple.com/documentation/SwiftUI/List',
    label: 'SwiftUI - List',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/lists-and-tables',
    label: 'HIG Lists and Tables',
    external: true,
  },
  { href: 'https://m3.material.io/components/lists/overview', label: 'MD3 Lists', external: true },
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
  { name: 'size', type: '' },
  { name: 'label', type: 'string', optional: true },
  { name: 'description', type: 'string', optional: true },
  { name: 'icon', type: 'IconName', optional: true },
  { name: 'avatar-src', type: 'string', optional: true },
  { name: 'avatar-variant', type: `${AVATAR_VARIANT_TYPE_UNION} = 'tertiary'`, optional: true },
  { name: 'avatar-shape', type: '', optional: true },
  { name: 'slot: default', type: 'HTMLElement', optional: true },
  { name: 'slot: trailing', type: 'HTMLElement', optional: true },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Structural',
    description:
      'leading·content·trailing의 고정된 골격으로 반복되는 행의 구조를 잡습니다. 상호작용 없이 레이아웃만 담당하는 표현 전용 행입니다.',
  },
  { heading: 'TODO', description: 'TODO' },
]

const main = html`
  <main class="page">
    <mm-page-header
      heading="List Item"
      description="leading(아바타·아이콘) + 본문(제목·설명) + trailing(액션) 한 줄을 구성하는 표현 전용 primitive. 상호작용 의미가 필요하면 menuItem을 사용합니다."
    ></mm-page-header>

    <mm-component-aka items='["ListTile", "Media Object"]'></mm-component-aka>

    <mm-component-example>
      <mm-flex direction="column" gap="2">
        <mm-menu-item-group>
          <mm-list-item
            size="small"
            label="스몰 사이즈 / description 없음 → 32"
            avatar-variant="secondary"
            avatar-src="/src/images/soojubm.png"
          ></mm-list-item>
        </mm-menu-item-group>
        <mm-separator scope="element"></mm-separator>
        <mm-menu-item-group>
          <mm-list-item
            size="small"
            label="스몰 사이즈 / description 있음 → 40"
            description="Youtube Subscriber"
            avatar-variant="secondary"
            avatar-src="/src/images/soojubm.png"
          ></mm-list-item>
        </mm-menu-item-group>
        <mm-separator scope="element"></mm-separator>
        <mm-list-item
          label="48 사이즈"
          description="Youtube Subscriber"
          size="48"
          avatar-variant="secondary"
          avatar-src="/src/images/soojubm.png"
        ></mm-list-item>
        <mm-separator scope="element"></mm-separator>
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

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
    </mm-component-guide>

    <mm-component-anatomy
      style="--component-anatomy-stage-width: 320px"
      parts='[
      "leading — 아이콘 또는 아바타를 담는 선택적 영역. 없으면 content가 왼쪽 끝에서 시작합니다.",
      "content — label과 description으로 구성된 본문. flex: 1로 남은 공간을 채웁니다.",
      "trailing — 오른쪽에 배치되는 선택적 슬롯. 액션 버튼·뱃지·메타 텍스트 등을 넣습니다."
    ]'
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
      <mm-list-marker
        variant="number"
        value="1"
        style="position: absolute; left: 1.5rem; bottom: -1.75rem; transform: translateX(-50%)"
      ></mm-list-marker>
      <mm-list-marker
        variant="number"
        value="2"
        style="position: absolute; left: 9.41rem; bottom: -1.75rem; transform: translateX(-50%)"
      ></mm-list-marker>
      <mm-list-marker
        variant="number"
        value="3"
        style="position: absolute; right: 2.09rem; bottom: -1.75rem; transform: translateX(50%)"
      ></mm-list-marker>
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
          icon="user"
        >
          <mm-tag slot="trailing">테스트용 태그</mm-tag>
        </mm-user-row>
      </mm-menu-item-group>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
