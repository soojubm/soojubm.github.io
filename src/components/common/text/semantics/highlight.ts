import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('fff-highlight')
export class Highlight extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline;
      }

      mark {
        background: none;
        color: var(--foreground-color);
        font-weight: var(--font-weight-bold);
      }
    `,
  ]

  // 인라인이라 템플릿의 앞뒤 공백이 글자 사이 여백으로 보이지 않도록 한 줄로 둔다.
  // prettier-ignore
  render() {
    return html`<mark><slot></slot></mark>`
  }
}
