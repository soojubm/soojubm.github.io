import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { tagToneStyles } from '@/components/common/tag/tag.styles'
import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import { CATEGORIES } from '@/pages/mocks'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'text.html', label: 'Text' },
  { href: 'button.html', label: 'Button' },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-tag')]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Glanceable',
    description:
      '클릭이나 삭제 같은 인터랙션 없이(Read-only), 컬러·아이콘 등의 시각적 단서로 상태·긴급도나 부가 메타 정보를 화면을 훑는 것만으로 한눈에 파악하게 합니다.',
  },
]

const tones = Object.keys(tagToneStyles)

const toneCode = tones.map(tone => `<fff-tag tone="${tone}">${tone}</fff-tag>`).join('\n')

const iconCode = `<fff-tag icon="check-circle">Tag</fff-tag>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Tag"
      description="인접 요소나 부모 요소를 부연하는 시각 정보입니다. 상태, 카테고리, 키워드로 강조된 시각 정보는 사용자가 복잡한 정보 더미에서 중요한 정보를 우선적으로 파악하도록 돕습니다."
    ></fff-page-header>

    <fff-component-aka
      .items=${[
        'Badge',
        'Label',
        'Keyword',
        'Flag',
        'activity bar counter (vs code)',
        'Counter badge (quantity)',
        'Health',
        'Status Pill',
      ]}
    ></fff-component-aka>

    <fff-flex direction="column" gap="4">
      <fff-tab-list value="tone" variant="pill">
        <fff-tab value="tone">Tone</fff-tab>
        <fff-tab value="icon">With Icon</fff-tab>
      </fff-tab-list>
      <fff-tab-panel value="tone">
        <fff-component-example>
          <fff-tag-group>
            ${tones.map(
              tone =>
                html`
                  <fff-tag tone=${tone}>${tone}</fff-tag>
                `,
            )}
          </fff-tag-group>
        </fff-component-example>
        <fff-component-code .code=${toneCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="icon">
        <fff-component-example>
          <fff-tag icon=${ICON_NAMES.SUCCESS}>Tag</fff-tag>
        </fff-component-example>
        <fff-component-code .code=${iconCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-tag']}></fff-component-tokens>

    <fff-component-guide .features=${componentFeatures}></fff-component-guide>

    <fff-component-anatomy
      .parts=${[
        '컨테이너 — tone으로 배경·글자 색상을 정의하는 배지 형태입니다.',
        '아이콘 — 분류나 상태를 보조하는 선택적 메타포입니다.',
        '레이블 — 분류·상태를 나타내는 짧은 텍스트.',
      ]}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-end', offset: '0.75rem' },
        { placement: 'block-end', offset: 'calc(100% - 0.75rem)' },
      ]}
    >
      <fff-tag tone="green" icon=${ICON_NAMES.SUCCESS}>승인됨</fff-tag>
    </fff-component-anatomy>

    <fff-component-section heading="MostPopularTag" description="구체 레벨. 가장 인기있는 태그">
      <fff-tag>
        <span aria-hidden="true">🔥</span>
        Most Popular
      </fff-tag>
    </fff-component-section>

    <fff-component-section heading="KeywordTagGroup" description="">
      <fff-keyword-tag-group
        .keywords=${['keyword1', 'keyword2', 'keyword3']}
      ></fff-keyword-tag-group>
    </fff-component-section>

    <fff-component-section
      heading="AccentTag"
      description="단일 엘리먼트에 시각적 강조를 부여하는 작은 라벨형 컴포넌트입니다. 리스트나 카드 안에서 특정 항목 하나를 다른 항목들과 구분 짓거나 콘텐츠의 상태·속성을 짧은 텍스트로 표시할 때 사용합니다."
    >
      <fff-tag-group>
        <fff-accent-tag>Featured</fff-accent-tag>
        <fff-accent-tag>New</fff-accent-tag>
        <fff-accent-tag>Beta</fff-accent-tag>
      </fff-tag-group>
    </fff-component-section>

    <fff-component-section heading="CategoryTag" description="">
      <fff-tag-group>
        ${Object.values(CATEGORIES).map(
          ({ label, tone }) => html`
            <fff-category-tag tone=${tone}>${label}</fff-category-tag>
          `,
        )}
      </fff-tag-group>
    </fff-component-section>

    <fff-component-section heading="StatusTag" description="">
      <fff-tag-group>
        <fff-status-tag variant="success">success</fff-status-tag>
        <fff-status-tag variant="warning">warning</fff-status-tag>
        <fff-status-tag variant="error">error</fff-status-tag>
        <fff-status-tag variant="info">info</fff-status-tag>
      </fff-tag-group>
    </fff-component-section>

    <fff-component-section
      heading="CodeTag"
      description="토큰·속성 이름처럼 코드로 읽어야 하는 조각을 태그로 보여 줍니다. 톤은 Tag와 같아, 이름의 자리마다 색을 나눠 칠할 수 있습니다. 문장 속 코드 조각은 fff-code를 씁니다."
    >
      <fff-code-tag size="large" tone="pink">avatar.background-color</fff-code-tag>
      <fff-tag-group>
        <fff-code-tag>button</fff-code-tag>
        <fff-code-tag tone="blue">background</fff-code-tag>
        <fff-code-tag tone="orange">subtle</fff-code-tag>
        <fff-code-tag tone="green">color</fff-code-tag>
      </fff-tag-group>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
