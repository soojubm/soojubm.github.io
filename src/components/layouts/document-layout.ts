import { html, nothing, render } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import type { TemplateResult } from 'lit'

import '@/components/common/navbar/navbar'
import '@/components/layouts/app-sidebar'
import '@/components/common/footer/footer'
import './fixed-bottom'

import '@/stylesheets/shared.css'

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
