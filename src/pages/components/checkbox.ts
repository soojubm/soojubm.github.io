import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
  ComponentTokenItemData,
} from '@/components/domains/component'
import type { OptionItem } from '@/types'

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

const visibilityOptions: OptionItem[] = [
  { label: '공개', value: 'public' },
  { label: '비공개', value: 'private' },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Checkbox"
      description="옵션 목록에서 하나 이상의 옵션을 선택합니다."
    ></mm-page-header>

    <mm-component-example>
      <mm-checkbox-group
        legend="관심 분야"
        name="interest"
        size="large"
        .values=${['basic', 'disabled-checked']}
        .options=${[
          { value: 'basic', label: '체크박스 기본' },
          { value: 'disabled', label: '체크박스 비활성', disabled: true },
          { value: 'disabled-checked', label: '체크박스 비활성 체크', disabled: true },
        ]}
      ></mm-checkbox-group>
    </mm-component-example>

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

    <mm-component-section heading="Sampler" description="연습">
      <mm-flex direction="column" gap="3" style="max-width: 400px">
        <mm-top-bar nav="close" heading="컬렉션에 추가">
          <mm-button slot="action" variant="ghost">새 컬렉션</mm-button>
        </mm-top-bar>
        <mm-menu-item-checkbox-group aria-label="컬렉션 선택">
          <mm-menu-item-checkbox
            value="euljiro"
            label="을지로 맛집"
            description="장소 12개"
            emoji="🍜"
            checked
          ></mm-menu-item-checkbox>
          <mm-menu-item-checkbox
            value="seongsu"
            label="성수 카페"
            description="장소 8개"
            emoji="☕"
          ></mm-menu-item-checkbox>
        </mm-menu-item-checkbox-group>
        <mm-separator></mm-separator>
        <mm-top-bar heading="새 컬렉션">
          <mm-button slot="action" variant="ghost">완료</mm-button>
        </mm-top-bar>
        <mm-textfield label="컬렉션 이름" placeholder="컬렉션 이름"></mm-textfield>
        <mm-toggle-button-group
          .options=${visibilityOptions}
          value="public"
        ></mm-toggle-button-group>

        <mm-add-button>이 컬렉션에 멤버 추가</mm-add-button>

        <mm-separator></mm-separator>
        <mm-top-bar heading="멤버 추가">
          <mm-button slot="action" variant="ghost">완료</mm-button>
        </mm-top-bar>
        <mm-textfield label="TODO 멤버 검색" placeholder="멤버 이름"></mm-textfield>
      </mm-flex>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
