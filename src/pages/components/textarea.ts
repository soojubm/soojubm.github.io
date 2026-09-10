import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'input.html', label: 'Input' },
  { href: 'button.html', label: 'Button' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'value', type: 'string', optional: true },
  { name: 'name', type: 'string', optional: true },
  { name: 'placeholder', type: 'string', optional: true },
  { name: 'label', type: 'string', optional: true },
  { name: 'helper', type: 'string', optional: true },
  { name: 'rows', type: 'number = 3', optional: true },
  { name: 'optional', type: 'boolean', optional: true },
  { name: 'disabled', type: 'boolean', optional: true },
  { name: 'aria-invalid', type: "'true' | 'false'", optional: true },
  { name: 'aria-describedby', type: 'string', optional: true },
  { name: 'input', type: 'CustomEvent detail: value', kind: 'event' },
  { name: 'single-line-change', type: 'CustomEvent detail: isSingleLine', kind: 'event' },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'input-height' },
  { name: 'input-padding-block' },
  { name: 'input-padding-inline' },
  { name: 'input-background-color' },
  { name: 'input-border' },
  { name: 'input-border-radius' },
  { name: 'input-focus-outline' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - input',
    description:
      '제한된 선택지가 아니라 자유 형식의 긴 텍스트를 받고, 규칙 검증과 오류 표시를 소유합니다. 글자 수 제한 같은 규칙은 오류가 나기 전에 미리 알리고, 여러 줄 입력이 예상되는 맥락에만 사용합니다.',
  },
]

const main = html`
  <mm-page>
    <mm-page-header heading="Textarea" description="long content field"></mm-page-header>

    <mm-component-example>
      <mm-flex direction="column" gap="4" style="width: 100%; max-width: 400px">
        <mm-textarea placeholder="Textarea placeholder..."></mm-textarea>

        <mm-textarea-field
          label="Textarea Field"
          placeholder="Textarea placeholder..."
          helper="레이블과 헬퍼 텍스트를 가질 수 있다."
        ></mm-textarea-field>
      </mm-flex>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
    </mm-component-guide>

    <mm-component-anatomy
      .code=${`<mm-textarea-field
    label="자기소개"
    placeholder="Textarea placeholder..."
    helper="레이블과 헬퍼 텍스트를 가질 수 있다."
    rows="3"
></mm-textarea-field>`}
    ></mm-component-anatomy>

    <mm-component-section heading="Comment Input" description="댓글 작성 입력 패턴">
      <div style="max-width: 480px">
        <mm-comment-input
          placeholder="무슨 생각을 하고 계신가요?"
          submit-label="댓글 게시"
        ></mm-comment-input>
      </div>
    </mm-component-section>

    <mm-component-section heading="Prompt Input" description="">
      <mm-prompt-input placeholder="Ask me anything..."></mm-prompt-input>
    </mm-component-section>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </mm-page>
`

renderPage(main)
