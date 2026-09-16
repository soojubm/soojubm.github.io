import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { buttonBaseStyles } from '@/components/common/button/button.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-hashtag-link')
export class HashtagLink extends LitElement {
  static styles = [
    resetStyles,
    buttonBaseStyles,
    css`
      a {
        gap: 0;
        text-transform: none;
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
