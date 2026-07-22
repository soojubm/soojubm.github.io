import { html, nothing, render } from 'lit'
import type { TemplateResult } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import '../src/components/navbar/navbar'
import '../src/components/footer/footer'
import './fixed-bottom'

import '../src/stylesheets/shared.css'

export const renderDocumentLayout = (
  content: TemplateResult | string,
  options: { footer?: boolean } = {},
) => {
  const body = typeof content === 'string' ? unsafeHTML(content) : content

  render(
    html`
      <mm-navbar></mm-navbar>
      ${body}
      ${options.footer ? html`<mm-footer></mm-footer>` : nothing}
    `,
    document.body,
  )
}
