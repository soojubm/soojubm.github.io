import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  paragraphSizeToTextSize,
  textMaxLengthStyles,
  textSizeTokens,
  type ParagraphSize,
  type TextMaxLength,
} from '@/components/common/text/text.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'

const paragraphSizeTokens = {
  small: textSizeTokens[paragraphSizeToTextSize.small],
  large: { ...textSizeTokens[paragraphSizeToTextSize.large], 'max-width': '800px' },
}

@customElement('mm-paragraph')
export class Paragraph extends LitElement {
  static styles = [
    resetStyles,
    textMaxLengthStyles,
    css`
      :host {
        display: block;
        /* TODO */
        max-width: 560px;
        font-size: var(--font-size-14);
        line-height: var(--font-line-height-24);
        font-weight: var(--font-weight-normal);
      }

      :host([color='light']) {
        color: var(--foreground-subtle-color);
      }

      :host([color='danger']) {
        color: var(--danger-color);
      }

      ${unsafeCSS(buildAttributeRules('size', paragraphSizeTokens))}

      :host([centered]) {
        text-align: center;
      }
    `,
  ]
  @property({ type: String, reflect: true }) size: ParagraphSize = 'medium'
  @property({ type: String, reflect: true }) color = 'inherit'
  @property({ type: String, attribute: 'max-length', reflect: true }) maxLength: TextMaxLength = ''
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      <p><slot></slot></p>
    `
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('color')) return

    const isKeyword = this.color === 'inherit' || this.color === 'light' || this.color === 'danger'
    if (isKeyword) {
      this.style.removeProperty('--paragraph-color')
      return
    }

    this.style.setProperty('--paragraph-color', this.color)
  }
}
