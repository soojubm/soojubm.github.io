import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import * as Prism from 'prismjs'
import 'prismjs/components/prism-typescript'

import { codeBlockStyles } from '@/components/common/code-block/code-block.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * 코드 스니펫 블록.
 * Prism 기본 번들 문법(markup·css·javascript)과 추가로 불러온 typescript를 하이라이팅하고,
 * 모르는 language는 하이라이팅 없이 원문 그대로 보여준다.
 *
 * <mm-code-block .code=${'<mm-avatar size="80"></mm-avatar>'}></mm-code-block>
 */
@customElement('mm-code-block')
export class CodeBlock extends LitElement {
  static styles = [resetStyles, codeBlockStyles]

  @property({ type: String }) code = ''
  @property({ type: String }) language = 'markup'

  render() {
    return html`
      <pre><code>${this.renderCode()}</code></pre>
    `
  }

  private renderCode() {
    const grammar = Prism.languages[this.language]
    if (!grammar) return this.code

    return unsafeHTML(Prism.highlight(this.code, grammar, this.language))
  }
}
