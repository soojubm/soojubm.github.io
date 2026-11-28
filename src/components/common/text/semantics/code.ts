import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { codeTextStyles } from '@/components/common/text/semantics/code.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('fff-code')
export class Code extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-block;
      }

      code {
        display: inline-flex;
        vertical-align: 1px;
        align-items: center;
        height: 20px;
        padding: 0 var(--space-1);
        border: var(--border);
        border-radius: var(--border-radius);
        box-sizing: border-box;
        background: var(--background-color);
        ${codeTextStyles};
        color: var(--foreground-danger-color);
      }
    `,
  ]

  render() {
    return html`
      <code><slot></slot></code>
    `
  }
}
