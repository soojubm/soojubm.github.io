import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'
import * as Prism from 'prismjs'
import 'prismjs/components/prism-typescript'

import { codeBlockStyles } from '@/components/common/code-block/code-block.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/icon-button/semantics/copy-button'

export type CodeBlockVariant = 'default' | 'plain'

@customElement('mm-code-block')
export class CodeBlock extends LitElement {
  static styles = [resetStyles, codeBlockStyles]
  @property({ type: String, reflect: true }) variant: CodeBlockVariant = 'default'
  @property({ type: String }) code = ''
  @property({ type: String }) language = 'markup'
  @property({ type: Boolean }) copyable = true

  render() {
    return html`
      <pre><code>${this.renderCode()}</code></pre>
      ${this.renderCopyButton()}
    `
  }

  private renderCopyButton() {
    if (!this.copyable) return nothing

    return html`
      <mm-copy-button value=${this.code}></mm-copy-button>
    `
  }

  private renderCode() {
    const grammar = Prism.languages[this.language]
    if (!grammar) return this.code

    return unsafeHTML(Prism.highlight(this.code, grammar, this.language))
  }
}
