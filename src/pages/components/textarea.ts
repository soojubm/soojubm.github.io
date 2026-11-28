import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'input.html', label: 'Input' },
  { href: 'button.html', label: 'Button' },
]

const componentReferences: ComponentReferenceItemData[] = [
  { href: 'https://fluxui.dev/components/composer', label: 'Flux UI - Composer' },
  {
    href: 'https://www.prompt-kit.com/docs/prompt-input',
    label: 'prompt-kit - Prompt Input',
  },
  {
    href: 'https://elements.ai-sdk.dev/components/prompt-input',
    label: 'AI Elements - Prompt Input',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-textarea-field'),
  { name: 'slot="leading"', type: '입력 영역 위쪽 액션', optional: true },
  { name: 'slot="trailing"', type: '입력 영역 아래쪽 액션', optional: true },
  { name: 'input', type: 'CustomEvent detail: value', kind: 'event' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - input',
    description:
      '제한된 선택지가 아니라 자유 형식의 긴 텍스트를 받고, 규칙 검증과 오류 표시를 함께 제공합니다. 글자 수 제한 같은 규칙은 오류가 나기 전에 미리 알리고, 여러 줄 입력이 예상되는 맥락에만 사용합니다.',
  },
]

const defaultCode = `<fff-textarea placeholder="자유롭게 적어주세요"></fff-textarea>`

const labelCode = `<fff-textarea-field label="자기소개" description="200자 이내로 입력하세요." placeholder="자유롭게 적어주세요"></fff-textarea-field>`

const optionalCode = `<fff-textarea-field label="요청 사항" placeholder="직접 입력" optional></fff-textarea-field>`

const stateCode = `<fff-textarea placeholder="Placeholder"></fff-textarea>
<fff-textarea placeholder="Disabled" disabled></fff-textarea>
<fff-textarea value="Invalid" aria-invalid="true"></fff-textarea>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Textarea"
      description="여러 줄의 긴 텍스트를 받는 입력 필드입니다. 기본 여러 줄 높이로 한 줄 입력과 구분되고 글자 수 같은 규칙을 미리 알려 주므로, 사용자는 긴 내용을 한눈에 보며 작성하고 제한을 넘기기 전에 조절할 수 있습니다."
    ></fff-page-header>

    <fff-flex direction="column" gap="4">
      <fff-tab-list value="default" variant="pill">
        <fff-tab value="default">Default</fff-tab>
        <fff-tab value="label">With Label</fff-tab>
        <fff-tab value="optional">Optional</fff-tab>
        <fff-tab value="state">State</fff-tab>
      </fff-tab-list>
      <fff-tab-panel value="default">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-textarea placeholder="자유롭게 적어주세요"></fff-textarea>
            <fff-paragraph>
              <fff-code>fff-textarea</fff-code>
              는 레이블 없이 입력 영역만 보여 줍니다. 주변 제목이나 맥락이 입력 항목을 설명할 때
              씁니다.
            </fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${defaultCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="label">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-textarea-field
              label="자기소개"
              description="200자 이내로 입력하세요."
              placeholder="자유롭게 적어주세요"
            ></fff-textarea-field>
            <fff-paragraph>
              레이블과 설명이 필요하면
              <fff-code>fff-textarea-field</fff-code>
              를 씁니다.
            </fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${labelCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="optional">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-textarea-field
              label="요청 사항"
              placeholder="직접 입력"
              optional
            ></fff-textarea-field>
            <fff-paragraph>텍스트 영역은 기본적으로 필수 입력입니다.</fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${optionalCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="state">
        <fff-component-example>
          <fff-flex direction="column" gap="3">
            <fff-textarea placeholder="Placeholder"></fff-textarea>
            <fff-textarea placeholder="Disabled" disabled></fff-textarea>
            <fff-textarea value="Invalid" aria-invalid="true"></fff-textarea>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${stateCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-textarea']}></fff-component-tokens>

    <fff-component-guide .features=${componentFeatures}></fff-component-guide>

    <fff-component-section heading="Comment Input" description="댓글 작성 입력 패턴">
      <fff-comment-input
        placeholder="무슨 생각을 하고 계신가요?"
        submit-label="댓글 게시"
      ></fff-comment-input>
    </fff-component-section>

    <fff-component-section heading="Prompt Input" description="">
      <fff-prompt-input placeholder="Ask me anything..."></fff-prompt-input>
    </fff-component-section>
    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
