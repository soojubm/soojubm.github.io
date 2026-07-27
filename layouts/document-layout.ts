import { html, nothing, render } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import type { TemplateResult } from 'lit'

import '../src/components/common/navbar/navbar'
import '../src/components/layouts/app-sidebar'
import '../src/components/common/footer/footer'
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
      <mm-sidebar id="site-sidebar" open></mm-sidebar>
      <!-- <mm-toc></mm-toc> -->
      ${body}
      ${options.footer
        ? html`
            <mm-footer></mm-footer>
          `
        : nothing}
    `,
    document.body,
  )
}
