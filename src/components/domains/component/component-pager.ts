import { LitElement, css, html, nothing } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import { buttonBaseStyles } from '@/components/common/button/button.styles'
import { findAdjacentDocs } from '@/sitemap'
import { resetStyles } from '@/stylesheets/shared.styles'
import { getCurrentPageId } from '@/utils'

/** 문서 페이지 끝에서 사이트맵 순서의 이전·다음 문서로 이동한다. */
@customElement('mm-component-pager')
export class ComponentPager extends LitElement {
  static styles = [
    resetStyles,
    buttonBaseStyles,
    css`
      :host {
        display: block;
      }

      nav {
        display: flex;
        justify-content: space-between;
        gap: var(--space-3);
        padding: var(--space-section) 0;
      }

      a[rel='next'] {
        margin-inline-start: auto;
      }
    `,
  ]
  private docs = findAdjacentDocs(getCurrentPageId())

  render() {
    return html`
      <nav aria-label="문서 이동">${this.renderPrevious()} ${this.renderNext()}</nav>
    `
  }

  private renderPrevious() {
    const { previous } = this.docs
    if (!previous) return nothing

    return html`
      <a rel="prev" href="${previous.id}.html">
        <mm-icon name=${ICON_NAMES.PREVIOUS}></mm-icon>
        ${previous.name}
      </a>
    `
  }

  private renderNext() {
    const { next } = this.docs
    if (!next) return nothing

    return html`
      <a rel="next" href="${next.id}.html">
        ${next.name}
        <mm-icon name=${ICON_NAMES.NEXT}></mm-icon>
      </a>
    `
  }
}
