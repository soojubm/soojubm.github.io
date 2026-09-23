import { LitElement, css, html, nothing } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import '@/components/common/text/semantics/text-block'
import { findAdjacentDocs } from '@/sitemap'
import { resetStyles } from '@/stylesheets/shared.styles'
import { getCurrentPageId } from '@/utils'

/** 문서 페이지 끝에서 사이트맵 순서의 이전·다음 문서로 이동한다. */
@customElement('mm-component-pager')
export class ComponentPager extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      nav {
        display: flex;
        justify-content: space-between;
        gap: var(--space-4);
        padding-top: var(--space-section);
      }

      a {
        ${surfaceBaseStyles};
        --surface-shadow: var(--material-elevated-shadow);
        --lift: none;

        flex: 1;
        gap: var(--space-3);
        transform: var(--lift);
        transition: box-shadow var(--transition-duration) var(--transition-easing),
          transform var(--transition-duration) var(--transition-easing);
      }

      a:hover {
        --lift: var(--interaction-hover-lift);
      }

      a[rel='next'] {
        align-items: flex-end;
        text-align: right;
      }

      a[rel='next'] mm-text-block {
        align-items: flex-end;
      }

      @media (max-width: 1100px) {
        nav {
          flex-direction: column-reverse;
        }
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
        <mm-icon name=${ICON_NAMES.PREVIOUS} aria-hidden="true"></mm-icon>
        <mm-text-block level="3" heading=${previous.name} description="이전 문서"></mm-text-block>
      </a>
    `
  }

  private renderNext() {
    const { next } = this.docs
    if (!next) return nothing

    return html`
      <a rel="next" href="${next.id}.html">
        <mm-icon name=${ICON_NAMES.NEXT} aria-hidden="true"></mm-icon>
        <mm-text-block level="3" heading=${next.name} description="다음 문서"></mm-text-block>
      </a>
    `
  }
}
