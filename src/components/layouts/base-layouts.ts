import { html, nothing, render } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import type { TemplateResult } from 'lit'

import '@/components/common/navbar/navbar'
import '@/components/layouts/app-sidebar'
import '@/components/common/footer/footer'
import './fixed-bottom'
import './fixed-top'

// 컴포넌트 페이지용 임시
import '@/stylesheets/shared.css'

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
            <mm-navbar></mm-navbar>
            <mm-sidebar id="site-sidebar" ?open=${!options.closeSidebar}></mm-sidebar>
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
