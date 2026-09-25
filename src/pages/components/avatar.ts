import { html } from 'lit'

import type { AvatarItem } from '@/components/common'
import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { AVATAR_VARIANT_TYPE_UNION, ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'list-item.html', label: 'List Item' },
  { href: 'thumbnail.html', label: 'Thumbnail' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'variant', type: `${AVATAR_VARIANT_TYPE_UNION} = 'primary'` },
  { name: 'size', type: "'80' | '48' | '40' | '32' = '40'" },
  { name: 'shape', type: "'circle' | 'square' = 'square'" },
  { name: 'src', type: 'string', optional: true },
  { name: 'icon', type: 'IconName', optional: true },
  { name: 'aria-label', type: 'string', optional: true },
  { name: 'mm-user-avatar name', type: 'string', optional: true },
  { name: 'mm-user-avatar src', type: 'string', optional: true },
  { name: 'mm-user-avatar size', type: "'80' | '48' | '40' | '32' = '40'", optional: true },
  { name: 'mm-user-avatar online', type: 'boolean = false', optional: true },
  { name: 'mm-avatar-group avatars', type: 'AvatarItem[] = []', optional: true },
  { name: 'mm-avatar-group label', type: 'string', optional: true },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Representative',
    description:
      '사용자·브랜드·객체를 시각적으로 대변합니다. 이미지 프로필을 최우선으로 보여주며, 식별 정보에 상태 메타 데이터를 결합하면 하나의 독립된 정보 노출 단위로도 기능합니다. 이미지가 없거나 로드에 실패해도 이니셜 → 기본 아이콘 순으로 대체해 형태와 정체성을 유지하고, alt 텍스트 또는 aria-label을 반드시 제공합니다.',
  },
]

const groupAvatars: AvatarItem[] = [
  { name: '수줍이', src: '/src/images/soojubm.png' },
  { name: 'Min Ji' },
  { name: '김하늘' },
  {},
]

const userAvatarCode =
  '<mm-user-avatar name="수줍이" src="/src/images/soojubm.png" online></mm-user-avatar>'

const groupCode = '<mm-avatar-group .avatars=${avatars} label="수줍이 외 3명"></mm-avatar-group>'

const main = html`
  <mm-main>
    <mm-page-header
      heading="Avatar"
      description="사용자나 회사 등 개체를 대표하는 시각 정보입니다. 정보 더미의 주체로서 인접한 정보 더미 중 최상위 위계를 갖습니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="variant" variant="pill">
        <mm-tab value="variant">Variant</mm-tab>
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="shape">Shape</mm-tab>
        <mm-tab value="fallback">Fallback</mm-tab>
        <mm-tab value="aria-label">Accessible Label</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="variant">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex gap="2">
              <mm-avatar variant="primary" size="48" icon=${ICON_NAMES.PROFILE}></mm-avatar>
              <mm-avatar variant="secondary" size="48" icon=${ICON_NAMES.PROFILE}></mm-avatar>
              <mm-avatar variant="tertiary" size="48" icon=${ICON_NAMES.PROFILE}></mm-avatar>
            </mm-flex>
            <mm-paragraph>
              배경과 테두리로 주변 표면과의 대비를 정합니다. 이미지가 영역을 덮으면 차이가 드러나지
              않으므로 아이콘·이니셜 아바타에서 고릅니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex gap="2" align-items="end">
              <mm-avatar size="80" shape="circle" src="/src/images/soojubm.png"></mm-avatar>
              <mm-avatar size="48" shape="circle" src="/src/images/soojubm.png"></mm-avatar>
              <mm-avatar size="40" shape="circle" src="/src/images/soojubm.png"></mm-avatar>
              <mm-avatar size="32" shape="circle" src="/src/images/soojubm.png"></mm-avatar>
            </mm-flex>
            <mm-paragraph>48 이상에서는 아이콘과 이니셜도 한 단계 커집니다.</mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="shape">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex gap="2">
              <mm-avatar size="48" shape="circle" src="/src/images/soojubm.png"></mm-avatar>
              <mm-avatar size="48" icon=${ICON_NAMES.GITHUB}></mm-avatar>
            </mm-flex>
            <mm-paragraph>
              사람을 나타내면 circle을, 아이콘이나 조직·브랜드를 나타내면 기본값인 square를 씁니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="fallback">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex gap="2">
              <mm-avatar size="40">MM</mm-avatar>
              <mm-avatar size="40">
                <span aria-hidden="true" style="font-size: var(--font-size-24)">🦔</span>
              </mm-avatar>
              <mm-avatar size="40"></mm-avatar>
            </mm-flex>
            <mm-paragraph>
              src가 없으면 슬롯의 이니셜·이모지를, 슬롯도 비어 있으면 기본 아이콘을 표시합니다.
            </mm-paragraph>
            <mm-paragraph>
              이모지는 슬롯 요소에 글자 크기를 직접 줍니다. 32·48·80은 아바타가 글자 크기를 정하지만
              기본인 40은 정하지 않아 주변 본문 크기를 물려받습니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="aria-label">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex gap="4" align-items="center">
              <mm-user-item
                size="medium"
                label="수줍이"
                description="UI Designer"
                avatar-src="/src/images/soojubm.png"
              ></mm-user-item>
              <mm-avatar
                size="40"
                shape="circle"
                src="/src/images/soojubm.png"
                aria-label="수줍이"
              ></mm-avatar>
            </mm-flex>
            <mm-paragraph>
              아바타가 이름 옆에 놓이면 장식으로 두고, 아바타만으로 개체를 알려야 할 때 aria-label을
              줍니다. aria-label이 있으면 host가 role=img를 갖습니다.
            </mm-paragraph>
            <mm-flex gap="4" align-items="center">
              <mm-list-item size="medium" emoji="🦔" label="고슴이"></mm-list-item>
              <mm-avatar size="40" shape="circle" aria-label="고슴이">
                <span aria-hidden="true">🦔</span>
              </mm-avatar>
            </mm-flex>
            <mm-paragraph>
              이모지는 스크린리더가 글리프 이름을 읽으므로
              <mm-code>aria-hidden="true"</mm-code>
              인 요소에 담습니다. 개체의 이름은 옆 텍스트가 전하고, 아바타만 놓이면
              <mm-code>aria-label</mm-code>
              이 전합니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-avatar']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨테이너 — variant·size로 형태와 크기·배경을 정의합니다.',
        '콘텐츠 — 이미지 &gt; 이니셜 &gt; 기본 아이콘 순서로 폴백합니다.',
      ]}
      .code=${'<mm-avatar variant="secondary" size="80"></mm-avatar>'}
      .markers=${[{ placement: 'inline-start' }, { placement: 'block-end', inset: true }]}
    >
      <mm-avatar size="80" variant="secondary"></mm-avatar>
    </mm-component-anatomy>

    <mm-component-section
      heading="UserAvatar"
      description="사람을 대표하는 아바타입니다. 원형을 고정하고 이름의 앞 글자로 폴백하며, 접속 중이면 우하단에 점을 띄워 지금 닿을 수 있는 상대인지 알립니다."
      .code=${userAvatarCode}
    >
      <mm-flex gap="2" align-items="end">
        <mm-user-avatar
          size="80"
          name="수줍이"
          src="/src/images/soojubm.png"
          online
        ></mm-user-avatar>
        <mm-user-avatar
          size="48"
          name="수줍이"
          src="/src/images/soojubm.png"
          online
        ></mm-user-avatar>
        <mm-user-avatar size="40" name="수줍이" online></mm-user-avatar>
        <mm-user-avatar size="32" name="Min Ji"></mm-user-avatar>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="AvatarGroup"
      description="최대 3개를 겹쳐 표시하고 초과 인원은 숫자로 대체합니다."
      .code=${groupCode}
    >
      <mm-avatar-group .avatars=${groupAvatars} label="수줍이 외 3명"></mm-avatar-group>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
