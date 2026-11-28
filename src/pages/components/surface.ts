import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { code, componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const scrollThumbnails = [
  { src: '/src/images/temp.png', alt: '풍경 샘플' },
  { src: '/src/images/soojubm.png', alt: '프로필 샘플' },
  { src: '/src/images/work-studium.jpg', alt: '작업 샘플' },
  { src: '/src/images/cake_gosum.jpg', alt: '고슴이 샘플' },
  { src: '/src/images/work-famus.jpg', alt: '작업 샘플' },
  { src: '/src/images/prometheus.jpg', alt: '영화 샘플' },
]

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'sheet.html', label: 'Sheet' },
  { href: 'popover.html', label: 'Popover' },
  { href: 'dialog.html', label: 'Dialog' },
]

const componentReferences: ComponentReferenceItemData[] = [
  { href: 'https://mui.com/material-ui/react-paper/', label: 'MUI - Paper' },
  {
    href: 'https://carbondesignsystem.com/components/tile/usage/',
    label: 'Carbon Design System - Tile',
  },
  {
    href: 'https://heroui.com/en/docs/react/components/surface',
    label: 'HeroUI (React) - Surface',
  },
  {
    href: 'https://developer.dynatrace.com/design/components/layouts/Surface/',
    label: 'Dynatrace Design - Surface',
  },
  {
    href: 'https://heroui.com/en/docs/native/components/surface',
    label: 'HeroUI (Native) - Surface',
  },
  { href: 'https://ant.design/components/card', label: 'Ant Design - Card' },
  { href: 'https://fluxui.dev/components/card', label: 'Flux UI - Card' },
  {
    href: 'https://ui.shadcn.com/docs/components/base/item',
    label: 'shadcn/ui - Item',
  },
  {
    href: 'https://getcssscan.com/css-box-shadow-examples',
    label: 'CSS box-shadow examples',
  },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-surface')]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Structural',
    description:
      '독립된 배경 영역으로 화면을 논리적인 단위로 분리하고 관련 정보를 하나로 묶습니다. 명도 대비와 음영(Shadow)의 깊이감으로 정보 레이어의 상하 관계까지 드러내며, 이 배경색·깊이의 변화가 해당 영역의 클릭 가능 여부를 식별하는 기표로도 작동합니다.',
  },
]

const variantCode = `<fff-surface variant="ghost">
  <fff-text-block level="3" heading="ghost" description="..."></fff-text-block>
</fff-surface>
<fff-surface variant="outlined">
  <fff-text-block level="3" heading="outlined" description="..."></fff-text-block>
</fff-surface>
<fff-surface variant="filled">
  <fff-text-block level="3" heading="filled" description="..."></fff-text-block>
</fff-surface>
<fff-surface variant="elevated">
  <fff-text-block level="3" heading="elevated" description="..."></fff-text-block>
</fff-surface>`

const radiusCode = `<fff-surface radius="default">
  <fff-text-block level="3" heading="default radius" description="..."></fff-text-block>
</fff-surface>
<fff-surface radius="large">
  <fff-text-block level="3" heading="large radius" description="..."></fff-text-block>
</fff-surface>`

const bleedCode = `<fff-surface variant="paper" radius="large" bleed>
  <fff-text-block level="3" heading="bleed" description="..."></fff-text-block>
</fff-surface>`

const bandCode = `<fff-surface variant="filled" band>
  <fff-text-block level="3" heading="band" description="..."></fff-text-block>
</fff-surface>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Surface"
      description="콘텐츠가 놓이는 기본 바탕이자, 정보의 논리적 구조를 시각적 깊이로 표현하는 기반입니다. 배경과 대비되는 명도나 그림자(Elevation)를 활용해 요소 간의 층위(Layer)를 형성하며, 사용자는 화면의 입체적인 구조를 직관적으로 이해하고 현재 상호작용 중인 정보의 중요도를 인지하게 됩니다."
    ></fff-page-header>

    <fff-component-aka
      .items=${[
        'EmphasisBox',
        'Box',
        'Card',
        'Module',
        'Section',
        'Container',
        'Paper',
        'Building block',
        'Segment',
        'Panel',
      ]}
    ></fff-component-aka>

    <fff-flex direction="column" gap="4">
      <fff-tab-list value="variant" variant="pill">
        <fff-tab value="variant">Variant</fff-tab>
        <fff-tab value="radius">Radius</fff-tab>
        <fff-tab value="bleed">Bleed</fff-tab>
        <fff-tab value="band">Band</fff-tab>
      </fff-tab-list>
      <fff-tab-panel value="variant">
        <fff-component-example>
          <fff-flex direction="column" gap="3">
            <fff-surface variant="outlined">
              <fff-text-block
                level="3"
                heading="outlined"
                description="콘텐츠 레벨에서 테두리로 영역을 구획할 때 사용한다. 클릭할 수 없다."
              ></fff-text-block>
            </fff-surface>
            <fff-surface variant="filled">
              <fff-text-block
                level="3"
                heading="filled"
                description="콘텐츠 레벨에서 내부에 클릭 가능한 액션이 있을 때 배경으로 강조한다."
              ></fff-text-block>
            </fff-surface>
            <fff-surface variant="elevated">
              <fff-text-block
                level="3"
                heading="elevated"
                description="시스템 레벨에서 화면 위에 떠 있는 요소를 그림자로 강조할 때 사용한다."
              ></fff-text-block>
            </fff-surface>
            <fff-surface variant="ghost">
              <fff-text-block
                level="3"
                heading="ghost"
                description="투명한 배경. 클릭할 수 없다."
              ></fff-text-block>
            </fff-surface>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${variantCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="radius">
        <fff-component-example>
          <fff-grid columns="2">
            <fff-surface radius="default">
              <fff-text-block
                level="3"
                heading="default radius"
                description="엘리먼트 레벨에서 사용한다. 본문 안에서 반복되는 개별 항목의 경계를 표현한다."
              ></fff-text-block>
            </fff-surface>
            <fff-surface radius="large">
              <fff-text-block
                level="3"
                heading="large radius"
                description="섹션 레벨에서 사용한다. 여러 콘텐츠를 하나로 묶는 상위 영역의 경계를 표현한다."
              ></fff-text-block>
            </fff-surface>
          </fff-grid>
        </fff-component-example>
        <fff-component-code .code=${radiusCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="bleed">
        <fff-component-example>
          <fff-surface variant="paper" radius="large" bleed>
            <fff-text-block
              level="3"
              heading="bleed"
              description="화면이 좁아지면 면이 화면 가장자리까지 넓어진다."
            ></fff-text-block>
          </fff-surface>
        </fff-component-example>
        <fff-component-code .code=${bleedCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="band">
        <fff-component-example>
          <fff-surface variant="filled" band>
            <fff-text-block
              level="3"
              heading="band"
              description="면이 화면 좌우 끝까지 넓어지고 내용은 본문 칼럼에 남는다."
            ></fff-text-block>
          </fff-surface>
        </fff-component-example>
        <fff-component-code .code=${bandCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-surface']}></fff-component-tokens>

    <fff-component-guide .features=${componentFeatures}>
      <fff-paragraph-group>
        <fff-heading level="3">언제 사용하나요</fff-heading>
        <fff-paragraph>
          관련된 콘텐츠를 하나의 영역으로 묶어 배경과 시각적으로 분리해야 할 때 사용합니다. 명도
          대비나 그림자로 영역의 층위를 드러내야 하거나, 그 배경 변화 자체가 클릭 가능 여부를 알리는
          기표로 쓰여야 하는 경우에 적합합니다. 단순히 요소 사이 여백만 필요하다면 surface 대신
          레이아웃 컴포넌트를 사용하세요.
        </fff-paragraph>
      </fff-paragraph-group>

      <fff-paragraph-group>
        <fff-heading level="3">좁은 화면에서는 어떻게 보이나요</fff-heading>
        <fff-paragraph>
          페이지 좌우 여백 안에 놓인 섹션 단위 면에는 ${code('bleed')}를 사용합니다. 좁은 화면에서
          면이 화면 가장자리까지 넓어지고 내용은 본문과 같은 위치에 남아, 바깥 여백 때문에 내용이
          좁아지는 일을 막습니다.
        </fff-paragraph>
      </fff-paragraph-group>

      <fff-paragraph-group>
        <fff-heading level="3">시각보정이 필요해요</fff-heading>
        <fff-paragraph>
          surface 안의 leading·trailing 요소에 따라 위치를 맞추는 보정이 필요할 수 있습니다.
        </fff-paragraph>
      </fff-paragraph-group>
    </fff-component-guide>

    <fff-component-section heading="FeedSurface" description="" width="narrow">
      <section role="feed" aria-busy="false">
        <article aria-setsize="3" aria-posinset="1">
          <fff-flex direction="column" gap="3">
            <fff-flex as="header" direction="column" gap="3">
              <fff-tag>
                <span aria-hidden="true">🔥</span>
                Most Popular
              </fff-tag>
              <fff-user-item
                size="medium"
                icon=${ICON_NAMES.USER}
                label="수줍이"
                description="2 hour ago"
              ></fff-user-item>
            </fff-flex>
            <fff-flex direction="column" gap="3">
              <fff-thumbnail ratio="16:9" src="/src/images/soojubm.png" alt=""></fff-thumbnail>
              <fff-paragraph>
                Monotonectally productivate progressive human capital without user friendly portals.
                Globally benchmark top-line ideas with distributed catalysts for change.
                Authoritatively restore ubiquitous partnerships vis-a-vis
                <fff-link href="#">synergistic models</fff-link>
                .
              </fff-paragraph>
              <fff-text-list
                .texts=${[
                  'TODO 원활한 피드 탐색 경험을 위해 모든 피드를 보여주지 않는 것이 좋을 수 있다. 피드가 노출되는 이유를 알려줄 수 있다. 또한 사용자는 보고 싶은 피드와 보고 싶지 않은 피드를 결정할 권리가 있다.',
                  'TODO 글줄의 길이를 상대적으로 좁게 짜는 경향이 있다.',
                  'TODO 리액션 버튼과 리액션 수치를 각각 제공할 수 있고 따로 제공할 수 있다. 리액션한 사용자 목록을 어떻게 보여줄 것인가.',
                  'TODO 중복 리액션과 횟수 등 기능 정의.',
                  '리액션 =&gt; 알림.',
                ]}
              ></fff-text-list>
              <fff-keyword-tag-group
                .keywords=${['Google', 'Meta', 'Nvidia']}
              ></fff-keyword-tag-group>
              <fff-surface radius="large" variant="elevated">
                <fff-flex direction="column" gap="2">
                  <fff-tag>3월 14일 수정됨</fff-tag>
                  <fff-menu-item-group size="large">
                    <fff-menu-item-action
                      size="medium"
                      label="Kakao"
                      description="https://www.kakaocorp.com"
                      avatar-src="/src/images/soojubm.png"
                    ></fff-menu-item-action>
                    <fff-menu-item-action
                      size="medium"
                      label="Naver"
                      description="https://www.naver.com"
                      avatar-src="/src/images/soojubm.png"
                    ></fff-menu-item-action>
                  </fff-menu-item-group>
                </fff-flex>
              </fff-surface>
            </fff-flex>
            <div>
              <fff-menu-item-action icon=${ICON_NAMES.LIKE} label="192"></fff-menu-item-action>
            </div>
          </fff-flex>
        </article>
      </section>
    </fff-component-section>

    <fff-component-section
      heading="Scroll Area"
      description="내용이 프레임을 넘칠 때 그 안에서 스크롤되는 영역입니다."
    >
      <fff-flex direction="column" gap="4">
        <fff-tab-list value="row" variant="pill">
          <fff-tab value="row">Row</fff-tab>
          <fff-tab value="column">Column</fff-tab>
        </fff-tab-list>
        <fff-tab-panel value="row">
          <fff-flex direction="column" gap="6">
            <fff-scroll gap="3" hide-scrollbar>
              ${scrollThumbnails.map(
                ({ src, alt }) => html`
                  <fff-thumbnail
                    ratio="1:1"
                    src=${src}
                    alt=${alt}
                    style="width: 220px"
                  ></fff-thumbnail>
                `,
              )}
            </fff-scroll>
            <fff-paragraph>트랙패드나 가로 휠이 없어도 넘길 수 있습니다.</fff-paragraph>
          </fff-flex>
        </fff-tab-panel>
        <fff-tab-panel value="column">
          <fff-scroll direction="column" gap="3" style="max-height: calc(var(--size-80) * 3)">
            <fff-surface>
              <fff-text weight="bold">Surface 1</fff-text>
            </fff-surface>
            <fff-surface>
              <fff-text weight="bold">Surface 2</fff-text>
            </fff-surface>
            <fff-surface>
              <fff-text weight="bold">Surface 3</fff-text>
            </fff-surface>
            <fff-surface>
              <fff-text weight="bold">Surface 4</fff-text>
            </fff-surface>
            <fff-surface>
              <fff-text weight="bold">Surface 5</fff-text>
            </fff-surface>
          </fff-scroll>
        </fff-tab-panel>
      </fff-flex>
    </fff-component-section>

    <fff-component-section
      heading="Marquee"
      description="콘텐츠를 가로로 끊김 없이 반복해 흘려보내는 영역입니다. 모션 줄이기를 켠 환경에서는 움직이지 않습니다."
    >
      <fff-flex direction="column" gap="4">
        <fff-marquee gap="6" speed="64" pause-on-hover>
          <fff-paragraph>짧은 문장</fff-paragraph>
          <fff-paragraph>
            길이가 서로 다른 콘텐츠도 같은 트랙 안에서 자연스럽게 반복됩니다.
          </fff-paragraph>
          <fff-paragraph>문장이 끊김 없이 이어서 흐릅니다.</fff-paragraph>
          <fff-paragraph>화면 폭이 달라져도 빈틈 없이 이어집니다.</fff-paragraph>
        </fff-marquee>
        <fff-marquee gap="3" height="120px" speed="72" pause-on-hover>
          ${scrollThumbnails.slice(0, 4).map(
            ({ src, alt }) => html`
              <fff-thumbnail style="width: 120px" ratio="1:1" src=${src} alt=${alt}></fff-thumbnail>
            `,
          )}
        </fff-marquee>
      </fff-flex>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
