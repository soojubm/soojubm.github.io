import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'input.html', label: 'Input' },
  { href: 'button.html', label: 'Button' },
]

const componentReferences: ComponentReferenceItemData[] = [
  { href: 'https://fluxui.dev/components/composer', label: 'Flux UI - Composer', external: true },
  {
    href: 'https://www.prompt-kit.com/docs/prompt-input',
    label: 'prompt-kit - Prompt Input',
    external: true,
  },
  {
    href: 'https://elements.ai-sdk.dev/components/prompt-input',
    label: 'AI Elements - Prompt Input',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'value', type: 'string', optional: true },
  { name: 'name', type: 'string', optional: true },
  { name: 'placeholder', type: 'string', optional: true },
  { name: 'label', type: 'string', optional: true },
  { name: 'description', type: 'string', optional: true },
  { name: 'rows', type: 'number = 2', optional: true },
  { name: 'optional', type: 'boolean', optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
  { name: 'aria-invalid', type: "'true' | 'false'", optional: true },
  { name: 'aria-describedby', type: 'string', optional: true },
  { name: 'slot="leading"', type: '입력 영역 위쪽 액션', optional: true },
  { name: 'slot="trailing"', type: '입력 영역 아래쪽 액션', optional: true },
  { name: 'input', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - input',
    description:
      '제한된 선택지가 아니라 자유 형식의 긴 텍스트를 받고, 규칙 검증과 오류 표시를 소유합니다. 글자 수 제한 같은 규칙은 오류가 나기 전에 미리 알리고, 여러 줄 입력이 예상되는 맥락에만 사용합니다. 높이는 기본 2줄(rows)을 유지해 한 줄 입력 필드와 구분합니다.',
  },
]

const main = html`
  <mm-main>
    <mm-page-header
      heading="Textarea"
      description="여러 줄의 긴 텍스트를 받는 입력 필드입니다. 기본 여러 줄 높이로 한 줄 입력과 구분되고 글자 수 같은 규칙을 미리 알려 주므로, 사용자는 긴 내용을 한눈에 보며 작성하고 제한을 넘기기 전에 조절할 수 있습니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="default" variant="pill">
        <mm-tab value="default">Default</mm-tab>
        <mm-tab value="label">With Label</mm-tab>
        <mm-tab value="optional">Optional</mm-tab>
        <mm-tab value="state">State</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="default">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-textarea placeholder="자유롭게 적어주세요"></mm-textarea>
            <mm-paragraph>
              <mm-code>mm-textarea</mm-code>
              는 레이블 없이 입력 영역만 렌더합니다. 주변 제목이나 맥락이 입력 항목을 설명할 때
              씁니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="label">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-textarea-field
              label="자기소개"
              description="200자 이내로 입력하세요."
              placeholder="자유롭게 적어주세요"
            ></mm-textarea-field>
            <mm-paragraph>
              레이블과 설명이 필요하면
              <mm-code>mm-textarea-field</mm-code>
              를 씁니다. label은 입력 항목의 이름이며, 화면에 보이게 둡니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="optional">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-textarea-field
              label="요청 사항"
              placeholder="직접 입력"
              optional
            ></mm-textarea-field>
            <mm-paragraph>
              텍스트 영역은 기본적으로 필수 입력입니다. 입력하면 명확한 이점이 있을 때만 optional로
              선택 입력을 표시합니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="state">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-flex direction="column" gap="3">
              <mm-textarea placeholder="Placeholder"></mm-textarea>
              <mm-textarea placeholder="Disabled" disabled></mm-textarea>
              <mm-textarea value="Invalid" aria-invalid="true"></mm-textarea>
            </mm-flex>
            <mm-paragraph>aria-invalid로 오류 상태를 표시합니다.</mm-paragraph>
          </mm-flex>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-textarea']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-textarea-field
    label="자기소개"
    placeholder="Textarea placeholder..."
    description="레이블과 헬퍼 텍스트를 가질 수 있다."
    rows="2"
></mm-textarea-field>`}
    ></mm-component-anatomy>

    <mm-component-section heading="Comment Input" description="댓글 작성 입력 패턴">
      <mm-comment-input
        placeholder="무슨 생각을 하고 계신가요?"
        submit-label="댓글 게시"
      ></mm-comment-input>
    </mm-component-section>

    <mm-component-section heading="Prompt Input" description="">
      <mm-prompt-input placeholder="Ask me anything..."></mm-prompt-input>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
