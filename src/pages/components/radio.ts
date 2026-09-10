import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentReferenceItemData } from '@/components/domains/component/component-references'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'checkbox.html', label: 'Checkbox' },
  { href: 'switch.html', label: 'Switch' },
]

// 카드형 라디오를 별도 페이지로 문서화하는 디자인 시스템.
const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.chakra-ui.com/docs/components/radio-card',
    label: 'Chakra UI - Radio Card',
    external: true,
  },
  {
    href: 'https://carbondesignsystem.com/components/tile/usage/',
    label: 'Carbon - Selectable Tile',
    external: true,
  },
  {
    href: 'https://www.lightningdesignsystem.com/components/visual-picker/',
    label: 'Lightning - Visual Picker',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'name', type: 'string', optional: true },
  { name: 'value', type: 'string', optional: true },
  { name: 'checked', type: 'boolean', optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
  { name: 'mm-radio-group name', type: 'string', optional: true },
  { name: 'mm-radio-group value', type: 'string', optional: true },
  { name: 'mm-radio-group legend', type: 'string', optional: true },
  { name: 'mm-radio-group disabled', type: 'boolean', optional: true },
  { name: 'change', type: 'CustomEvent detail: checked, value', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'radio-size' },
  { name: 'radio-border-radius' },
  { name: 'radio-border-color' },
  { name: 'radio-background-color' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '여러 선택지 중 하나만 선택하며, 그룹이 단일 선택을 보장합니다. 미리 선택된 기본값을 제공하는 것은 편향된 데이터를 수집할 위험이 있습니다. 만약 미리 선택된 값을 적용하는 경우 첫 번째 옵션을 기본 옵션으로.',
  },
  {
    heading: 'Glanceable',
    description:
      '수직 정렬로 옵션 목록을 쉽게 스캔할 수 있도록 합니다. 최대 5개의 옵션을 제공할 수 있으며, 그 이상의 옵션이 필요하다면 셀렉트Select 또는 가로 스크롤되는 칩Chip으로 제공하세요.',
  },
]

const main = html`
  <mm-page>
    <mm-page-header
      heading="RadioGroup"
      description="옵션 목록에서 하나의 옵션을 선택합니다."
    ></mm-page-header>

    <mm-component-example>
      <fieldset role="radiogroup" style="max-width: 640px">
        <mm-radio-group id="plan-group" name="membership" value="premium">
          <mm-radio value="basic">베이직 요금제</mm-radio>
          <mm-radio value="premium">프리미엄 요금제</mm-radio>
          <mm-radio value="ultimate" disabled>얼티메이트 요금제</mm-radio>
        </mm-radio-group>
      </fieldset>
    </mm-component-example>
    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨트롤(인디케이터) — 선택 여부를 나타내는 원형 버튼입니다.',
        '선택 표식 — 선택 시 원 안에 채워지는 점(dot).',
        '레이블 — 선택지를 설명하는 클릭 가능한 텍스트.',
      ]}
      .code=${'<mm-radio value="premium" checked>프리미엄 요금제</mm-radio>'}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-end', offset: '0.45rem' },
        { placement: 'inline-end' },
      ]}
    >
      <mm-radio value="premium" checked>프리미엄 요금제</mm-radio>
    </mm-component-anatomy>

    <mm-component-section
      heading="RadioCard"
      description="레이블만으로 부족해 가격·배지·설명을 담아야 할 때, 면 전체를 선택지로 만듭니다. 그룹·단일 선택 규칙은 라디오와 같아 mm-radio-group으로 묶습니다."
    >
      <mm-radio-group name="license" value="standard" style="max-width: 420px">
        <mm-radio-card value="standard" checked>
          <mm-text weight="bold">Standard License</mm-text>
          <mm-paragraph color="light">개인·사내 프로젝트에 사용할 수 있습니다.</mm-paragraph>
          <mm-flex align-items="center" gap="2">
            <mm-text>₩ 2,000</mm-text>
            <mm-tag>460P 적립</mm-tag>
          </mm-flex>
        </mm-radio-card>
        <mm-radio-card value="extended">
          <mm-text weight="bold">Extended License</mm-text>
          <mm-paragraph color="light">재판매·배포용 제품에 포함할 수 있습니다.</mm-paragraph>
          <mm-flex align-items="center" gap="2">
            <mm-text>₩ 12,000</mm-text>
            <mm-tag>2,760P 적립</mm-tag>
          </mm-flex>
        </mm-radio-card>
      </mm-radio-group>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>
  </mm-page>
`

renderPage(main)
