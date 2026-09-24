import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/icon'
import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import '@/components/common/text/semantics/text-block'
import { MEDIA } from '@/constants'
import { resetStyles } from '@/stylesheets/shared.styles'

export interface PagerLink {
  href: string
  heading: string
  description: string
}

/** 이전·다음 링크 카드로 이동한다. 내비게이션 이름(aria-label)과 링크 문구는 감싸는 시멘틱 컴포넌트가 정한다. */
@customElement('mm-pager')
export class Pager extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
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

      @media ${MEDIA.compact} {
        :host {
          flex-direction: column-reverse;
        }
      }
    `,
  ]
  @property({ attribute: false }) previous?: PagerLink
  @property({ attribute: false }) next?: PagerLink

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'navigation')
  }

  render() {
    return html`
      ${this.renderLink('prev', this.previous)} ${this.renderLink('next', this.next)}
    `
  }

  private renderLink(rel: 'prev' | 'next', link?: PagerLink) {
    if (!link) return nothing

    return html`
      <a rel=${rel} href=${link.href}>
        <mm-icon
          name=${rel === 'prev' ? ICON_NAMES.PREVIOUS : ICON_NAMES.NEXT}
          aria-hidden="true"
        ></mm-icon>
        <mm-text-block
          level="3"
          heading=${link.heading}
          description=${link.description}
        ></mm-text-block>
      </a>
    `
  }
}
