import { html, nothing, render } from 'lit'
import { unsafeHTML } from 'lit/directives/unsafe-html.js'

import type { TemplateResult } from 'lit'

import '@/components/common/navbar/navbar'
import '@/components/layouts/app-sidebar'
import '@/components/common/footer/footer'
import './fixed-bottom'
import './fixed-top'

import '@/stylesheets/shared.css'

/**
 * 모든 페이지가 공유하는 셸(navbar·sidebar·footer)을 document.body에 렌더한다.
 * 문서 페이지는 사이드바를 연 기본값을 그대로 쓰고, 패턴 페이지는 closeSidebar로 접는다.
 */
export interface LayoutOptions {
  footer?: boolean
  closeSidebar?: boolean
  navbar?: boolean
}

export const renderLayout = (content: TemplateResult | string, options: LayoutOptions = {}) => {
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

/**
 * 페이지 진입점. DOM이 준비되면 셸을 렌더하고, 이어서 initialize로 페이지별 배선을 실행한다.
 */
export const renderPage = (
  content: TemplateResult | string,
  options: LayoutOptions & { initialize?: () => void } = {},
) => {
  document.addEventListener('DOMContentLoaded', () => {
    renderLayout(content, options)
    options.initialize?.()
  })
}
