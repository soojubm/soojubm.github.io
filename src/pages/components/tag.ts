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

const componentProps: ComponentPropItemData[] = [...componentPropsOf('mm-tag')]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Glanceable',
    description:
      '클릭이나 삭제 같은 인터랙션 없이(Read-only), 컬러·아이콘 등의 시각적 단서로 상태·긴급도나 부가 메타 정보를 화면을 훑는 것만으로 한눈에 파악하게 합니다.',
  },
]

const tones = Object.keys(tagToneStyles)

const toneCode = tones.map(tone => `<mm-tag tone="${tone}">${tone}</mm-tag>`).join('\n')

const iconCode = `<mm-tag icon="check-circle">Tag</mm-tag>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Tag"
      description="인접 요소나 부모 요소를 부연하는 시각 정보입니다. 상태, 카테고리, 키워드로 강조된 시각 정보는 사용자가 복잡한 정보 더미에서 중요한 정보를 우선적으로 파악하도록 돕습니다."
    ></mm-page-header>

    <mm-component-aka
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
    ></mm-component-aka>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="tone" variant="pill">
        <mm-tab value="tone">Tone</mm-tab>
        <mm-tab value="icon">With Icon</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="tone">
        <mm-component-example>
          <mm-tag-group>
            ${tones.map(
              tone =>
                html`
                  <mm-tag tone=${tone}>${tone}</mm-tag>
                `,
            )}
          </mm-tag-group>
        </mm-component-example>
        <mm-component-code .code=${toneCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="icon">
        <mm-component-example>
          <mm-tag icon=${ICON_NAMES.SUCCESS}>Tag</mm-tag>
        </mm-component-example>
        <mm-component-code .code=${iconCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-tag']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
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
      <mm-tag tone="green" icon=${ICON_NAMES.SUCCESS}>승인됨</mm-tag>
    </mm-component-anatomy>

    <mm-component-section heading="MostPopularTag" description="구체 레벨. 가장 인기있는 태그">
      <mm-tag>
        <span aria-hidden="true">🔥</span>
        Most Popular
      </mm-tag>
    </mm-component-section>

    <mm-component-section heading="KeywordTagGroup" description="">
      <mm-keyword-tag-group
        .keywords=${['keyword1', 'keyword2', 'keyword3']}
      ></mm-keyword-tag-group>
    </mm-component-section>

    <mm-component-section
      heading="AccentTag"
      description="단일 엘리먼트에 시각적 강조를 부여하는 작은 라벨형 컴포넌트입니다. 리스트나 카드 안에서 특정 항목 하나를 다른 항목들과 구분 짓거나 콘텐츠의 상태·속성을 짧은 텍스트로 표시할 때 사용합니다."
    >
      <mm-tag-group>
        <mm-accent-tag>Featured</mm-accent-tag>
        <mm-accent-tag>New</mm-accent-tag>
        <mm-accent-tag>Beta</mm-accent-tag>
      </mm-tag-group>
    </mm-component-section>

    <mm-component-section heading="CategoryTag" description="">
      <mm-tag-group>
        ${Object.values(CATEGORIES).map(
          ({ label, tone }) => html`
            <mm-category-tag tone=${tone}>${label}</mm-category-tag>
          `,
        )}
      </mm-tag-group>
    </mm-component-section>

    <mm-component-section heading="StatusTag" description="">
      <mm-tag-group>
        <mm-status-tag variant="success">success</mm-status-tag>
        <mm-status-tag variant="warning">warning</mm-status-tag>
        <mm-status-tag variant="error">error</mm-status-tag>
        <mm-status-tag variant="info">info</mm-status-tag>
      </mm-tag-group>
    </mm-component-section>

    <mm-component-section
      heading="CodeTag"
      description="토큰·속성 이름처럼 코드로 읽어야 하는 조각을 태그로 보여 줍니다. 톤은 Tag와 같아, 이름의 자리마다 색을 나눠 칠할 수 있습니다. 문장 속 코드 조각은 mm-code를 씁니다."
    >
      <mm-tag-group>
        <mm-code-tag>button</mm-code-tag>
        <mm-code-tag tone="blue">background</mm-code-tag>
        <mm-code-tag tone="orange">subtle</mm-code-tag>
        <mm-code-tag tone="green">color</mm-code-tag>
      </mm-tag-group>
      <mm-code-tag size="large" tone="pink">avatar.background-color</mm-code-tag>
      <mm-component-code
        .code=${'<mm-code-tag tone="blue">background</mm-code-tag>\n<mm-code-tag size="large" tone="pink">avatar.background-color</mm-code-tag>'}
      ></mm-component-code>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
