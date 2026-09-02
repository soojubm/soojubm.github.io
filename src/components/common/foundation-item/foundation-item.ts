import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/text/semantics/text-block'

/**
 * Foundations Overview에서 하위 문서로 이동하는 링크 카드.
 * 제목·설명은 text-block에 위임하고, host는 카드 박스와 링크 동작만 소유한다.
 */
@customElement('mm-foundation-item')
export class FoundationItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      a {
        display: flex;
        flex-direction: column;
        height: 100%;
        padding: var(--space-4);
        border-radius: var(--radius-large);
        box-sizing: border-box;
        background: var(--background-subtle-color);
        color: inherit;
        transition: box-shadow var(--transition-duration) var(--transition-easing),
          transform var(--transition-duration) var(--transition-easing);
      }

      a:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
      }

      a:focus-visible {
        outline: var(--interaction-focus-outline);
        outline-offset: 2px;
      }
    `,
  ]

  @property({ type: String }) href = ''
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''

  render() {
    return html`
      <a href=${this.href}>
        <mm-text-block
          level="3"
          heading=${this.heading}
          description=${this.description}
        ></mm-text-block>
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-foundation-item': FoundationItem
  }
}
