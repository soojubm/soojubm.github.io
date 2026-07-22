import { html } from 'lit'
import { renderDocumentLayout } from '../../../layouts/document-layout'

const main = html`
  <main class="page">
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

    <mm-component-props>
      <mm-prop name="value" type="string" optional></mm-prop>
      <mm-prop name="name" type="string" optional></mm-prop>
      <mm-prop name="placeholder" type="string" optional></mm-prop>
      <mm-prop name="label" type="string" optional></mm-prop>
      <mm-prop name="helper" type="string" optional></mm-prop>
      <mm-prop name="optional" type="boolean" optional></mm-prop>
      <mm-prop name="disabled" type="boolean" optional></mm-prop>
      <mm-prop name="aria-invalid" type="'true' | 'false'" optional></mm-prop>
      <mm-prop name="aria-describedby" type="string" optional></mm-prop>
      <mm-prop name="input" type="CustomEvent detail: value" kind="event"></mm-prop>
    </mm-component-props>

    <mm-component-tokens>
      <mm-token name="input-height" default="var(--size-48)"></mm-token>
      <mm-token name="input-background-color" default="var(--background-subtle-color)"></mm-token>
      <mm-token name="input-border" default="var(--border)"></mm-token>
      <mm-token name="input-border-radius" default="var(--radius)"></mm-token>
      <mm-token name="input-text-color" default="var(--foreground-color)"></mm-token>
    </mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list>
        <mm-feature
          heading="Freeform"
          description="제한된 선택지가 아니라 자유 형식의 긴 텍스트를 받습니다. 여러 줄 입력이 예상되는 맥락에만 사용합니다."
        ></mm-feature>
        <mm-feature
          heading="Validatable"
          description="입력값의 규칙 검증과 오류 표시를 소유합니다. 글자 수 제한 같은 규칙은 오류가 나기 전에 미리 알립니다."
        ></mm-feature>
      </mm-component-feature-list>
    </mm-component-guide>

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
    <mm-component-related>
      <mm-button-group>
        <mm-hashtag-link href="input.html">Input</mm-hashtag-link>
        <mm-hashtag-link href="button.html">Button</mm-hashtag-link>
      </mm-button-group>
    </mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
