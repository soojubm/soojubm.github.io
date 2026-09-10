import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'checkbox.html', label: 'Checkbox' },
  { href: 'switch.html', label: 'Switch' },
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

    <mm-component-section heading="Radio?" description="">
      <mm-surface variant="elevated">
        <mm-radio name="gender" value="">
          <mm-paragraph color="light">Standard License</mm-paragraph>
          <mm-paragraph>₩ 2,000</mm-paragraph>
          <mm-tag>460P 적립</mm-tag>
        </mm-radio>
      </mm-surface>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-page>
`

renderPage(main)
