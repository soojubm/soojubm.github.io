import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import {
  AVATAR_SHAPES,
  AVATAR_SIZES,
  AVATAR_VARIANTS,
  ICON_NAMES,
  type AvatarItem,
} from '@/components/common'
import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'list-item.html', label: 'List Item' },
  { href: 'thumbnail.html', label: 'Thumbnail' },
  { href: 'dot.html', label: 'Dot' },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('mm-avatar')]

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

const variantCode = AVATAR_VARIANTS.map(
  variant => `<mm-avatar variant="${variant}" size="48" icon="profile-circle"></mm-avatar>`,
).join('\n')

const sizeCode = [...AVATAR_SIZES]
  .map(
    size => `<mm-avatar size="${size}" shape="circle" src="/src/images/soojubm.png"></mm-avatar>`,
  )
  .join('\n')

const shapeCode = `<mm-avatar size="48" shape="circle" src="/src/images/soojubm.png"></mm-avatar>
<mm-avatar size="48" icon="github"></mm-avatar>`

const fallbackCode = `<mm-avatar size="40">MM</mm-avatar>
<mm-avatar size="40">
  <span aria-hidden="true" style="font-size: var(--font-size-24)">🦔</span>
</mm-avatar>
<mm-avatar size="40"></mm-avatar>`

const toOptions = (values: readonly string[]) => values.map(value => ({ value, label: value }))
const avatarTokenVariants = toOptions(AVATAR_VARIANTS)
const avatarTokenShapes = toOptions(AVATAR_SHAPES)
const avatarTokenSizes = toOptions(AVATAR_SIZES)

// select를 고르면 토큰 카드가 그 variant·size에서 먹는 값으로 바뀐다.
const syncAvatarTokens = () => {
  const variant = document.querySelector<HTMLElement & { value: string }>('#avatar-token-variant')
  const size = document.querySelector<HTMLElement & { value: string }>('#avatar-token-size')
  const shape = document.querySelector<HTMLElement & { value: string }>('#avatar-token-shape')
  const items = document.querySelectorAll<HTMLElement & { state: Record<string, string> }>(
    'mm-token-item[element="mm-avatar"]',
  )
  const update = () => {
    items.forEach(item => {
      item.state = {
        variant: variant?.value ?? '',
        size: size?.value ?? '',
        shape: shape?.value ?? '',
      }
    })
  }
  variant?.addEventListener('change', update)
  size?.addEventListener('change', update)
  shape?.addEventListener('change', update)
}

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
      </mm-tab-list>
      <mm-tab-panel value="variant">
        <mm-component-example>
          <mm-flex gap="2">
            ${AVATAR_VARIANTS.map(
              variant => html`
                <mm-avatar variant=${variant} size="48" icon=${ICON_NAMES.PROFILE}></mm-avatar>
              `,
            )}
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${variantCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex gap="2" align-items="flex-end">
              ${[...AVATAR_SIZES].map(
                size => html`
                  <mm-avatar size=${size} shape="circle" src="/src/images/soojubm.png"></mm-avatar>
                `,
              )}
            </mm-flex>
            <mm-paragraph>48 이상에서는 아이콘과 이니셜도 한 단계 커집니다.</mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${sizeCode}></mm-component-code>
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
        <mm-component-code .code=${shapeCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="fallback">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex gap="2">
              <mm-avatar size="48">MM</mm-avatar>
              <mm-avatar size="48">
                <span aria-hidden="true" style="font-size: var(--font-size-24)">🦔</span>
              </mm-avatar>
              <mm-avatar size="48"></mm-avatar>
            </mm-flex>
            <mm-paragraph-group>
              <mm-paragraph>
                src가 없으면 안에 넣은 이니셜·이모지를, 그것도 비어 있으면 기본 아이콘을 표시합니다.
              </mm-paragraph>
              <mm-paragraph>
                이모지 크기는 아바타 크기를 따르고, 기본 크기(40)에서만 주변 본문 크기를
                물려받습니다.
              </mm-paragraph>
            </mm-paragraph-group>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${fallbackCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens>
      <mm-flex gap="2">
        <mm-toggle-button-group
          id="avatar-token-variant"
          aria-label="variant"
          value="primary"
          .options=${avatarTokenVariants}
        ></mm-toggle-button-group>
        <mm-toggle-button-group
          id="avatar-token-size"
          aria-label="size"
          value="40"
          .options=${avatarTokenSizes}
        ></mm-toggle-button-group>
        <mm-toggle-button-group
          id="avatar-token-shape"
          aria-label="shape"
          value="square"
          .options=${avatarTokenShapes}
        ></mm-toggle-button-group>
      </mm-flex>

      <mm-token-group aria-label="avatar 토큰">
        <mm-token-item element="mm-avatar" key="avatar-width"></mm-token-item>
        <mm-token-item element="mm-avatar" key="avatar-height"></mm-token-item>
        <mm-token-item element="mm-avatar" key="avatar-background-color"></mm-token-item>
        <mm-token-item element="mm-avatar" key="avatar-icon-color"></mm-token-item>
        <mm-token-item element="mm-avatar" key="avatar-border"></mm-token-item>
        <mm-token-item element="mm-avatar" key="avatar-border-radius"></mm-token-item>
      </mm-token-group>
    </mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨테이너 — variant·size로 형태와 크기·배경을 정의합니다.',
        '콘텐츠 — 이미지 &gt; 이니셜 &gt; 기본 아이콘 순서로 폴백합니다.',
      ]}
      .markers=${[{ placement: 'inline-start' }, { placement: 'block-end', inset: true }]}
    >
      <mm-avatar size="80" variant="secondary"></mm-avatar>
    </mm-component-anatomy>

    <mm-component-section
      heading="UserAvatar"
      description="사람을 대표하는 아바타입니다. 원형을 고정하고 이름의 앞 글자로 폴백하며, 접속 중이면 우하단에 점을 띄워 지금 닿을 수 있는 상대인지 알립니다."
    >
      <mm-flex gap="2" align-items="flex-end">
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
    >
      <mm-avatar-group .avatars=${groupAvatars} label="수줍이 외 3명"></mm-avatar-group>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main, { initialize: syncAvatarTokens })
