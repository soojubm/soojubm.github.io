import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { buttonBaseStyles } from '@/components/button/button.styles'

@customElement('mm-hashtag-link')
export class HashtagLink extends LitElement {
  static styles = [
    buttonBaseStyles,
    css`
      a {
        gap: 0;
        text-transform: none;
        text-decoration: none;
      }

      a::before {
        content: '#';
      }
    `,
  ]

  @property({ type: String }) href = ''

  render() {
    return html`
      <a href=${this.href}>
        <slot></slot>
      </a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-hashtag-link': HashtagLink
  }
}
