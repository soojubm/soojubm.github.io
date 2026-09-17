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
  { href: 'radio.html', label: 'Radio' },
  { href: 'switch.html', label: 'Switch' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'name', type: 'string', optional: true },
  { name: 'value', type: 'string', optional: true },
  { name: 'size', type: "'large'", optional: true },
  { name: 'checked', type: 'boolean', optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
  { name: 'indeterminate', type: 'boolean', optional: true },
  {
    name: 'mm-checkbox-group options',
    type: '{ value: string; label: string; disabled?: boolean }[] = []',
  },
  { name: 'mm-checkbox-group name', type: 'string', optional: true },
  { name: 'mm-checkbox-group size', type: "'large'", optional: true },
  { name: 'mm-checkbox-group legend', type: 'string', optional: true },
  { name: 'mm-checkbox-group values', type: 'string[] = []', optional: true },
  { name: 'change', type: 'CustomEvent detail: checked, value', kind: 'event' },
  { name: 'mm-checkbox-group change', type: 'CustomEvent detail: values', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'checkbox-size' },
  { name: 'checkbox-border-radius' },
  { name: 'checkbox-border-color' },
  { name: 'checkbox-background-color' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - selection',
    description:
      '여러 선택지에서 복수 선택이 가능하며, 선택 여부는 checked 상태로 드러납니다. 미리 선택된 기본값을 제공하는 것은 편향된 데이터를 수집할 위험이 있습니다.',
  },
  {
    heading: 'Glanceable',
    description:
      '옵션 목록을 파악하기 쉽게 수직 정렬합니다. 레이블은 최대 2단어로 작성합니다. choice냐 action option(?)이냐. action option일 때는 동사를 포함하여 작성합니다.',
  },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Checkbox"
        description="옵션 목록에서 여러 개를 고르거나 하나의 동의를 표시하는 선택 컨트롤입니다. 누를 때마다 체크 상태가 바뀌고 각 옵션이 서로 독립적으로 동작하므로, 사용자는 해당하는 항목을 모두 골라 원하는 조합을 만들 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="size" variant="pill">
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="single">Single</mm-tab>
        <mm-tab value="state">State</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="4">
              <mm-checkbox-group
                name="size-default"
                .options=${[
                  { value: 'a', label: '기본 크기' },
                  { value: 'b', label: '기본 크기' },
                ]}
              ></mm-checkbox-group>
              <mm-checkbox-group
                name="size-large"
                size="large"
                .options=${[
                  { value: 'a', label: 'large 크기' },
                  { value: 'b', label: 'large 크기' },
                ]}
              ></mm-checkbox-group>
            </mm-flex>
            <mm-paragraph>
              size="large"는 약관 동의처럼 선택지가 화면의 주요 입력일 때 씁니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="single">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-checkbox name="remember" value="remember">로그인 상태 유지</mm-checkbox>
            <mm-paragraph>
              선택지가 하나면 그룹으로 감싸지 않고
              <mm-code>mm-checkbox</mm-code>
              를 단독으로 씁니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="state">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="3">
              <mm-checkbox>Unchecked</mm-checkbox>
              <mm-checkbox checked>Checked</mm-checkbox>
              <mm-checkbox indeterminate>Indeterminate</mm-checkbox>
              <mm-checkbox disabled>Disabled</mm-checkbox>
              <mm-checkbox disabled checked>Disabled checked</mm-checkbox>
            </mm-flex>
            <mm-paragraph>
              indeterminate는 하위 선택지 중 일부만 선택된 상위 체크박스에 씁니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      .parts=${[
        '컨트롤(인디케이터) — 체크 여부를 시각적으로 나타내는 사각형 박스입니다.',
        '체크 표식 — 선택 시 나타나는 체크 아이콘(또는 indeterminate 표식).',
        '레이블 — 선택지를 설명하는 클릭 가능한 텍스트.',
      ]}
      .code=${'<mm-checkbox size="large" checked>관심 분야</mm-checkbox>'}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-end', offset: '0.5rem' },
        { placement: 'inline-end' },
      ]}
    >
      <mm-checkbox size="large" checked>관심 분야</mm-checkbox>
    </mm-component-anatomy>

    <mm-component-section
      heading="MasterCheckbox"
      description="TermsAllCheckbox, TermsCheckboxGroup"
    >
      <mm-master-checkbox aria-controls="main-terms-group">
        <mm-paragraph>모두 동의합니다 (선택동의 포함)</mm-paragraph>
      </mm-master-checkbox>

      <mm-checkbox-group
        id="main-terms-group"
        name="terms"
        size="large"
        .options=${[
          { value: 'terms5', label: '이용약관 동의 (필수)' },
          { value: 'terms6', label: '개인정보 수집/이용 동의' },
          { value: 'terms7', label: '개인정보 제3자 제공 동의' },
        ]}
      ></mm-checkbox-group>

      <mm-surface variant="outlined">
        <mm-checkbox-group
          name="terms-detail"
          .options=${[
            { value: 'gender', label: '성별' },
            { value: 'birth', label: '생년월일' },
          ]}
        ></mm-checkbox-group>
      </mm-surface>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
