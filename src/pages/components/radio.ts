import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { OptionItem } from '@/types'

import { componentPropsOf, subComponentPropsOf } from '@/components/domains/component'
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
  },
  {
    href: 'https://carbondesignsystem.com/components/tile/usage/',
    label: 'Carbon - Selectable Tile',
  },
  {
    href: 'https://www.lightningdesignsystem.com/components/visual-picker/',
    label: 'Lightning - Visual Picker',
  },
]

const groupProps = componentPropsOf('fff-radio-group')

const componentProps: ComponentPropItemData[] = [
  ...groupProps,
  { name: 'change', type: 'CustomEvent detail: value, name', kind: 'event' },
  ...subComponentPropsOf('fff-radio', groupProps),
  { name: 'fff-radio change', type: 'CustomEvent detail: checked, value', kind: 'event' },
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

const membershipOptions: OptionItem[] = [
  { value: 'basic', label: '베이직 요금제' },
  { value: 'premium', label: '프리미엄 요금제' },
  { value: 'ultimate', label: '얼티메이트 요금제', disabled: true },
]

const sizeCode = `<fff-radio-group name="membership-size-default" value="basic" .options=\${options}></fff-radio-group>
<fff-radio-group name="membership-size-large" size="large" value="basic" .options=\${options}></fff-radio-group>`

const stateCode = `<fff-radio-group name="membership-option-disabled" value="premium" .options=\${options}></fff-radio-group>
<fff-radio-group name="membership-disabled" value="premium" disabled .options=\${options}></fff-radio-group>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="RadioGroup"
      description="옵션 목록에서 하나만 고르는 선택 컨트롤입니다. 한 옵션을 고르면 그룹 안의 다른 선택이 해제되므로, 사용자는 모든 선택지를 한눈에 비교한 뒤 서로 배타적인 옵션 중 하나를 확실하게 고를 수 있습니다."
    ></fff-page-header>

    <fff-flex direction="column" gap="4">
      <fff-tab-list value="size" variant="pill">
        <fff-tab value="size">Size</fff-tab>
        <fff-tab value="state">State</fff-tab>
      </fff-tab-list>
      <fff-tab-panel value="size">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-flex direction="column" gap="4">
              <fff-radio-group
                name="membership-size-default"
                value="basic"
                .options=${membershipOptions.slice(0, 2)}
              ></fff-radio-group>
              <fff-radio-group
                name="membership-size-large"
                size="large"
                value="basic"
                .options=${membershipOptions.slice(0, 2)}
              ></fff-radio-group>
            </fff-flex>
            <fff-paragraph>선택지가 화면의 주요 입력일 때 크게 씁니다.</fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${sizeCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="state">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-flex direction="column" gap="4">
              <fff-radio-group
                name="membership-option-disabled"
                value="premium"
                .options=${membershipOptions}
              ></fff-radio-group>
              <fff-radio-group
                name="membership-disabled"
                value="premium"
                disabled
                .options=${membershipOptions.slice(0, 2)}
              ></fff-radio-group>
            </fff-flex>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${stateCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-radio']}></fff-component-tokens>

    <fff-component-guide .features=${componentFeatures}></fff-component-guide>

    <fff-component-anatomy
      .parts=${[
        '그룹 — 라디오를 묶어 이름을 공유하고 하나만 선택되도록 보장합니다.',
        '컨트롤(인디케이터) — 선택 여부를 나타내는 원형 버튼입니다.',
        '선택 표식 — 선택 시 원 안에 채워지는 점(dot).',
        '레이블 — 선택지를 설명하는 클릭 가능한 텍스트.',
      ]}
      .markers=${[
        { placement: 'block-start' },
        { placement: 'inline-start', offset: 'calc(100% - 0.5rem)' },
        { placement: 'block-end', offset: '0.5rem' },
        { placement: 'inline-end', offset: 'calc(100% - 0.5rem)' },
      ]}
    >
      <fff-radio-group
        name="membership-anatomy"
        value="premium"
        .options=${membershipOptions.slice(0, 2)}
      ></fff-radio-group>
    </fff-component-anatomy>

    <fff-component-section
      heading="RadioCard"
      description="레이블만으로 부족해 가격·배지·설명을 넣어야 할 때, 면 전체를 선택지로 만듭니다."
    >
      <fff-radio-card-group name="license" value="standard">
        <fff-radio-card value="standard" checked>
          <fff-text-block
            level="4"
            heading="Standard License"
            description="개인·사내 프로젝트에 사용할 수 있습니다."
          ></fff-text-block>
          <fff-flex align-items="center" gap="2">
            <fff-text>₩ 2,000</fff-text>
            <fff-tag>460P 적립</fff-tag>
          </fff-flex>
        </fff-radio-card>
        <fff-radio-card value="extended">
          <fff-text-block
            level="4"
            heading="Extended License"
            description="재판매·배포용 제품에 포함할 수 있습니다."
          ></fff-text-block>
          <fff-flex align-items="center" gap="2">
            <fff-text>₩ 12,000</fff-text>
            <fff-tag>2,760P 적립</fff-tag>
          </fff-flex>
        </fff-radio-card>
      </fff-radio-card-group>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
