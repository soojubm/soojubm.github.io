import { html, nothing, render } from 'lit'
import type { TemplateResult } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import '../src/components/navbar/navbar'
import '../src/components/footer/footer'
import './fixed-bottom'
import './fixed-top'

// 컴포넌트 페이지용 임시
import '../src/stylesheets/shared.css'

export const renderLayout = (
  content: TemplateResult | string,
  options: { footer?: boolean; closeSidebar?: boolean; navbar?: boolean } = {},
) => {
  const navbar = options.navbar ?? true
  const body = typeof content === 'string' ? unsafeHTML(content) : content

  render(
    html`
      ${navbar
        ? html`
            <mm-navbar ?sidebar-collapsed=${!!options.closeSidebar}></mm-navbar>
          `
        : nothing}
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
