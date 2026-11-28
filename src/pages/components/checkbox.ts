import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { componentPropsOf, subComponentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'radio.html', label: 'Radio' },
  { href: 'switch.html', label: 'Switch' },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-checkbox'),
  ...subComponentPropsOf('fff-checkbox-group'),
  { name: 'change', type: 'CustomEvent detail: checked', kind: 'event' },
  { name: 'fff-checkbox-group change', type: 'CustomEvent detail: values', kind: 'event' },
  ...subComponentPropsOf('fff-terms-agreement'),
  { name: 'fff-terms-agreement change', type: 'CustomEvent detail: values', kind: 'event' },
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
      '옵션 목록을 파악하기 쉽게 수직 정렬합니다. 레이블은 최대 2단어로 작성합니다. TODO choice냐 action option(?)이냐. action option일 때는 동사를 포함하여 작성합니다.',
  },
]

const singleCode = `<fff-checkbox name="remember" value="remember">로그인 상태 유지</fff-checkbox>`

const sizeCode = `<fff-checkbox-group name="size-default" .options=\${options}></fff-checkbox-group>
<fff-checkbox-group name="size-large" size="large" .options=\${options}></fff-checkbox-group>`

const stateCode = `<fff-checkbox-group name="state" .options=\${options} .values=\${['checked', 'disabled-checked']}></fff-checkbox-group>
<fff-checkbox indeterminate>Indeterminate</fff-checkbox>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Checkbox"
      description="옵션 목록에서 여러 개를 고르거나 하나의 동의를 표시하는 선택 컨트롤입니다. 누를 때마다 체크 상태가 바뀌고 각 옵션이 서로 독립적으로 동작하므로, 사용자는 해당하는 항목을 모두 골라 원하는 조합을 만들 수 있습니다."
    ></fff-page-header>

    <fff-flex direction="column" gap="4">
      <fff-tab-list
        value="size"
        variant="pill"
        .tabs=${[
          { value: 'size', label: 'Size' },
          { value: 'single', label: 'Single' },
          { value: 'state', label: 'State' },
        ]}
      ></fff-tab-list>
      <fff-tab-panel value="size">
        <fff-component-example>
          <fff-flex direction="column" gap="4">
            <fff-checkbox-group
              name="size-default"
              .options=${[
                { value: 'a', label: '기본 크기' },
                { value: 'b', label: '기본 크기' },
              ]}
            ></fff-checkbox-group>
            <fff-checkbox-group
              name="size-large"
              size="large"
              .options=${[
                { value: 'a', label: 'large 크기' },
                { value: 'b', label: 'large 크기' },
              ]}
            ></fff-checkbox-group>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${sizeCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="single">
        <fff-component-example>
          <fff-checkbox name="remember" value="remember">로그인 상태 유지</fff-checkbox>
        </fff-component-example>
        <fff-component-code .code=${singleCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="state">
        <fff-component-example>
          <fff-flex direction="column" gap="4">
            <fff-checkbox-group
              name="state"
              .options=${[
                { value: 'unchecked', label: 'Unchecked' },
                { value: 'checked', label: 'Checked' },
                { value: 'disabled', label: 'Disabled', disabled: true },
                { value: 'disabled-checked', label: 'Disabled checked', disabled: true },
              ]}
              .values=${['checked', 'disabled-checked']}
            ></fff-checkbox-group>
            <fff-checkbox indeterminate>Indeterminate</fff-checkbox>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${stateCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-checkbox']}></fff-component-tokens>

    <fff-component-feature-list .features=${componentFeatures}></fff-component-feature-list>

    <fff-component-anatomy
      .parts=${[
        '컨트롤(인디케이터) — 체크 여부를 시각적으로 나타내는 사각형 박스입니다.',
        '체크 표식 — 선택 시 나타나는 체크 아이콘(또는 indeterminate 표식).',
        '레이블 — 선택지를 설명하는 클릭 가능한 텍스트.',
      ]}
      .markers=${[
        { placement: 'inline-start' },
        { placement: 'block-end', offset: '0.5rem' },
        { placement: 'inline-end' },
      ]}
    >
      <fff-checkbox size="large" checked>관심 분야</fff-checkbox>
    </fff-component-anatomy>

    <fff-component-section
      heading="TermsAgreement"
      description="약관 목록이 일부만 선택되면 전체 동의 체크박스는 indeterminate로 표시합니다."
    >
      <fff-terms-agreement
        name="terms"
        .options=${[
          { value: 'terms5', label: '이용약관 동의 (필수)' },
          { value: 'terms6', label: '개인정보 수집/이용 동의' },
          { value: 'terms7', label: '개인정보 제3자 제공 동의' },
        ]}
      >
        모두 동의합니다 (선택동의 포함)
      </fff-terms-agreement>

      <fff-surface variant="outlined">
        <fff-checkbox-group
          name="terms-detail"
          .options=${[
            { value: 'gender', label: '성별' },
            { value: 'birth', label: '생년월일' },
          ]}
        ></fff-checkbox-group>
      </fff-surface>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
