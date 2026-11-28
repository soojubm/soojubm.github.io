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

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-avatar')]

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
  variant => `<fff-avatar variant="${variant}" size="40" icon="profile-circle"></fff-avatar>`,
).join('\n')

const sizeCode = [...AVATAR_SIZES]
  .map(
    size => `<fff-avatar size="${size}" shape="circle" src="/src/images/soojubm.png"></fff-avatar>`,
  )
  .join('\n')

const shapeCode = `<fff-avatar size="40" shape="circle" src="/src/images/soojubm.png"></fff-avatar>
<fff-avatar size="40" icon="github"></fff-avatar>`

const fallbackCode = `<fff-avatar size="40"></fff-avatar>
<fff-avatar size="40">MM</fff-avatar>
<fff-avatar size="40">
  <span aria-hidden="true" style="font-size: var(--font-size-24)">🦔</span>
</fff-avatar>`

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
    'fff-token-item[element="fff-avatar"]',
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
  <fff-main>
    <fff-page-header
      heading="Avatar"
      description="사용자나 회사 등 개체를 대표하는 시각 정보입니다. 정보 더미의 주체로서 인접한 정보 더미 중 최상위 위계를 갖습니다."
    ></fff-page-header>

    <fff-flex direction="column" gap="4">
      <fff-tab-list
        value="variant"
        variant="pill"
        .tabs=${[
          { value: 'variant', label: 'Variant' },
          { value: 'size', label: 'Size' },
          { value: 'shape', label: 'Shape' },
          { value: 'fallback', label: 'Fallback' },
        ]}
      ></fff-tab-list>
      <fff-tab-panel value="variant">
        <fff-component-example>
          <fff-flex gap="2">
            ${AVATAR_VARIANTS.map(
              variant => html`
                <fff-avatar variant=${variant} size="40" icon=${ICON_NAMES.PROFILE}></fff-avatar>
              `,
            )}
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${variantCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="size">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-flex gap="2" align-items="flex-end">
              ${[...AVATAR_SIZES].map(
                size => html`
                  <fff-avatar
                    size=${size}
                    shape="circle"
                    src="/src/images/soojubm.png"
                  ></fff-avatar>
                `,
              )}
            </fff-flex>
            <fff-paragraph>48 이상에서는 아이콘과 이니셜도 한 단계 커집니다.</fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${sizeCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="shape">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-flex gap="2">
              <fff-avatar size="40" shape="circle" src="/src/images/soojubm.png"></fff-avatar>
              <fff-avatar size="40" icon=${ICON_NAMES.GITHUB}></fff-avatar>
            </fff-flex>
            <fff-paragraph>
              사람을 나타내면 circle을, 아이콘이나 조직·브랜드를 나타내면 기본값인 square를 씁니다.
            </fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${shapeCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="fallback">
        <fff-component-example>
          <fff-flex gap="2">
            <fff-avatar size="40"></fff-avatar>
            <fff-avatar size="40">MM</fff-avatar>
            <fff-avatar size="40">
              <span aria-hidden="true" style="font-size: var(--font-size-24)">🦔</span>
            </fff-avatar>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${fallbackCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens>
      <fff-flex gap="2">
        <fff-toggle-button-group
          id="avatar-token-variant"
          aria-label="variant"
          value="primary"
          .options=${avatarTokenVariants}
        ></fff-toggle-button-group>
        <fff-toggle-button-group
          id="avatar-token-size"
          aria-label="size"
          value="40"
          .options=${avatarTokenSizes}
        ></fff-toggle-button-group>
        <fff-toggle-button-group
          id="avatar-token-shape"
          aria-label="shape"
          value="square"
          .options=${avatarTokenShapes}
        ></fff-toggle-button-group>
      </fff-flex>

      <fff-token-group aria-label="avatar 토큰">
        <fff-token-item element="fff-avatar" key="avatar-width"></fff-token-item>
        <fff-token-item element="fff-avatar" key="avatar-height"></fff-token-item>
        <fff-token-item element="fff-avatar" key="avatar-background-color"></fff-token-item>
        <fff-token-item element="fff-avatar" key="avatar-icon-color"></fff-token-item>
        <fff-token-item element="fff-avatar" key="avatar-border"></fff-token-item>
        <fff-token-item element="fff-avatar" key="avatar-border-radius"></fff-token-item>
        <fff-token-item element="fff-avatar" key="avatar-font-size"></fff-token-item>
      </fff-token-group>
    </fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-section
      heading="UserAvatar"
      description="사람을 대표하는 아바타입니다. 원형을 고정하고 이름의 앞 글자로 폴백하며, 접속 중이면 우하단에 점을 띄워 지금 닿을 수 있는 상대인지 알립니다."
    >
      <fff-flex gap="2" align-items="flex-end">
        <fff-user-avatar
          size="80"
          name="수줍이"
          src="/src/images/soojubm.png"
          online
        ></fff-user-avatar>
        <fff-user-avatar
          size="48"
          name="수줍이"
          src="/src/images/soojubm.png"
          online
        ></fff-user-avatar>
        <fff-user-avatar size="40" name="수줍이" online></fff-user-avatar>
        <fff-user-avatar size="32" name="Min Ji"></fff-user-avatar>
      </fff-flex>
    </fff-component-section>

    <fff-component-section
      heading="AvatarGroup"
      description="최대 3개를 겹쳐 표시하고 초과 인원은 숫자로 대체합니다."
    >
      <fff-avatar-group .avatars=${groupAvatars} label="수줍이 외 3명"></fff-avatar-group>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main, { initialize: syncAvatarTokens })
