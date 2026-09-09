import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import * as Prism from 'prismjs'

import { codeStyles } from '@/components/common/code/code.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * 코드 스니펫 블록.
 * Prism 기본 번들이 가진 문법(markup·css·javascript)만 하이라이팅하고,
 * 모르는 language는 하이라이팅 없이 원문 그대로 보여준다.
 *
 * <mm-code .code=${'<mm-avatar size="80"></mm-avatar>'}></mm-code>
 */
@customElement('mm-code')
export class Code extends LitElement {
  static styles = [resetStyles, codeStyles]

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
