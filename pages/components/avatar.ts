import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { AVATAR_SHAPE_TYPE_LABEL, AVATAR_VARIANT_TYPE_UNION } from '@/components/avatar'

import { renderDocumentLayout } from '../../layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'list-item.html', label: 'List Item' },
  { href: 'thumbnail.html', label: 'Thumbnail' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'variant', type: "${AVATAR_VARIANT_TYPE_UNION} = 'primary'" },
  { name: 'size', type: "'80' | '48' | '40' | '32' = '40'" },
  { name: 'shape', type: '' },
  { name: 'src', type: 'string', optional: true },
  { name: 'icon', type: 'IconName', optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'avatar-size', default: 'var(--size-40)' },
  { name: 'avatar-background-color', default: 'var(--background-subtle-color)' },
  { name: 'avatar-border', default: 'var(--border)' },
  { name: 'avatar-border-radius', default: 'var(--radius)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Representative',
    description:
      '사용자·브랜드·객체를 시각적으로 대변합니다. 이미지 프로필을 최우선으로 보여주며, 식별 정보에 상태 메타 데이터를 결합하면 하나의 독립된 정보 노출 단위로도 기능합니다.',
  },
  {
    heading: 'Fallback',
    description:
      '이미지가 없거나 로드에 실패해도 이니셜 → 아이콘 → 기본 아이콘 순으로 대체해 형태와 정체성을 유지합니다. alt 텍스트 또는 aria-label을 반드시 제공하세요.',
  },
  {
    heading: 'Groupable',
    description:
      '여러 아바타는 avatar-group으로 겹쳐 묶어 참여자 무리를 압축해 보여줍니다. 겹침 간격과 초과 인원 표시는 그룹이 소유합니다.',
  },
]

const groupAvatars = ['', '', '', '']

const main = html`
  <main class="page">
    <mm-page-header
      heading="Avatar"
      description="사용자나 회사 등 개체를 대표하는 시각 정보입니다. 정보 더미의 주체로서 인접한 정보 더미 중 최상위 위계를 갖습니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-flex gap="2">
        <mm-avatar variant="primary" size="48" src="/src/images/soojubm.png"></mm-avatar>
        <mm-avatar variant="secondary" size="48" src="/src/images/soojubm.png"></mm-avatar>
        <mm-avatar variant="tertiary" size="48" src="/src/images/soojubm.png"></mm-avatar>
      </mm-flex>
      <mm-separator></mm-separator>
      <mm-flex gap="2">
        <mm-avatar
          variant="primary"
          size="48"
          shape="circle"
          src="/src/images/soojubm.png"
        ></mm-avatar>
        <mm-avatar
          variant="secondary"
          size="48"
          shape="circle"
          src="/src/images/soojubm.png"
        ></mm-avatar>
        <mm-avatar
          variant="tertiary"
          size="48"
          shape="circle"
          src="/src/images/soojubm.png"
        ></mm-avatar>
      </mm-flex>
      <mm-separator></mm-separator>
      <mm-flex gap="2">
        <mm-avatar size="80" src="/src/images/soojubm.png"></mm-avatar>
        <mm-avatar size="48" src="/src/images/soojubm.png"></mm-avatar>
        <mm-avatar size="40" src="/src/images/soojubm.png"></mm-avatar>
        <mm-avatar size="32" src="/src/images/soojubm.png"></mm-avatar>
      </mm-flex>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-anatomy
      parts='[
      "컨테이너 — variant·size로 형태와 크기·배경을 정의합니다.",
      "콘텐츠 — 이미지 > 아이콘 > 이니셜 > 기본 아이콘 순서로 폴백합니다."
    ]'
    >
      <div style="position: relative; display: inline-block">
        <mm-avatar size="80" variant="secondary"></mm-avatar>
        <mm-list-marker
          variant="number"
          value="1"
          style="position: absolute; left: -1.75rem; top: 50%; transform: translateY(-50%)"
        ></mm-list-marker>
        <mm-list-marker
          variant="number"
          value="2"
          style="
          position: absolute;
          left: 50%;
          top: calc(50% + 1.25rem);
          transform: translate(-50%, -50%);
        "
        ></mm-list-marker>
      </div>
    </mm-component-anatomy>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
    </mm-component-guide>

    <mm-component-section
      heading="Fallback"
      description="src·icon이 없을 때 슬롯 콘텐츠 → 기본 아이콘 순으로 표시됩니다."
    >
      <mm-flex gap="2">
        <mm-avatar size="40">MM</mm-avatar>
        <mm-avatar size="40" icon="profile-circle"></mm-avatar>
        <mm-avatar size="40"></mm-avatar>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="AvatarGroup"
      description="최대 3개를 겹쳐 표시하고 초과 인원은 숫자로 대체합니다."
    >
      <mm-avatar-group .avatars=${groupAvatars} label="수줍이 외 3명"></mm-avatar-group>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
