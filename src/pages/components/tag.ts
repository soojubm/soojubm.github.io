import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'text.html', label: 'Text' },
  { href: 'button.html', label: 'Button' },
]

const componentProps: ComponentPropItemData[] = [
  {
    name: 'tone',
    type: "'default' | 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'pink' | 'orange' | 'cyan' = 'default'",
  },
  { name: 'icon', type: 'IconName', optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'tag-height' },
  { name: 'tag-padding-inline' },
  { name: 'tag-gap' },
  { name: 'tag-text-size' },
  { name: 'tag-text-color' },
  { name: 'tag-background-color' },
  { name: 'tag-border' },
  { name: 'tag-border-radius' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Glanceable',
    description:
      '클릭이나 삭제 같은 인터랙션 없이(Read-only), 컬러·아이콘 등의 시각적 단서로 상태·긴급도나 부가 메타 정보를 화면을 훑는 것만으로 한눈에 파악하게 합니다. (e.g., 진행 중, 승인 대기, 배송비 무료, NEW)',
  },
]

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
      <mm-tab-list value="default" variant="pill">
        <mm-tab value="default">Default</mm-tab>
        <mm-tab value="icon">With Icon</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="default">
        <mm-component-example>
          <mm-tag>Tag</mm-tag>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="icon">
        <mm-component-example>
          <mm-tag icon=${ICON_NAMES.SUCCESS}>Tag</mm-tag>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨테이너 — tone으로 배경·글자 색상을 정의하는 배지 형태입니다.',
        '아이콘 — 분류나 상태를 보조하는 선택적 메타포입니다.',
        '레이블 — 분류·상태를 나타내는 짧은 텍스트.',
      ]}
      .code=${'<mm-tag tone="green" icon="check-circle">승인됨</mm-tag>'}
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
      description="단일 엘리먼트에 시각적 강조를 부여하는 작은 라벨형 컴포넌트입니다. 리스트나 카드 안에서 특정 항목 하나를 다른 항목들과 구분 짓거나(New, Beta, Featured 등) 콘텐츠의 상태·속성을 짧은 텍스트로 표시할 때 사용합니다."
    >
      <mm-accent-tag>Featured</mm-accent-tag>
    </mm-component-section>

    <mm-component-section heading="CategoryTag" description="">
      <mm-tag-group>
        <mm-category-tag category="music">Jazz</mm-category-tag>
        <mm-category-tag category="finance">Stocks</mm-category-tag>
        <mm-category-tag category="design">UI Design</mm-category-tag>
        <mm-category-tag category="engineering">Frontend</mm-category-tag>
        <mm-category-tag category="marketing">Branding</mm-category-tag>
        <mm-category-tag category="news">Breaking</mm-category-tag>
        <mm-category-tag category="lifestyle">Wellness</mm-category-tag>
        <mm-category-tag category="sports" icon=${ICON_NAMES.GRAPH}>Football</mm-category-tag>
      </mm-tag-group>
    </mm-component-section>

    <mm-component-section heading="StatusTag" description="">
      <mm-tag-group>
        <mm-status-tag variant="neutral">neutral</mm-status-tag>
        <mm-status-tag variant="success">success</mm-status-tag>
        <mm-status-tag variant="warning">warning</mm-status-tag>
        <mm-status-tag variant="error">error</mm-status-tag>
        <mm-status-tag variant="info">info</mm-status-tag>
      </mm-tag-group>
    </mm-component-section>

    <mm-component-section
      heading="ProgressTag"
      description="작업이 어느 단계에 있는지 점과 라벨로 보입니다. 점의 색이 단계를 가르고, 이름은 라벨이 맡습니다."
    >
      <mm-tag-group>
        <mm-progress-tag variant="todo">시작 전</mm-progress-tag>
        <mm-progress-tag variant="in-progress">진행 중</mm-progress-tag>
        <mm-progress-tag variant="done">완료</mm-progress-tag>
        <mm-progress-tag variant="blocked">보류</mm-progress-tag>
      </mm-tag-group>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
