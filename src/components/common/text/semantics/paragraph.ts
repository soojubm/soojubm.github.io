import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  paragraphSizeToTextSize,
  textMaxLinesStyles,
  textSizeTokens,
  type ParagraphSize,
  type TextColor,
  type TextMaxLines,
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
    textMaxLinesStyles,
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
  @property({ type: String, reflect: true }) color: TextColor = 'inherit'
  @property({ type: String, attribute: 'max-lines', reflect: true }) maxLines: TextMaxLines = ''
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      <p><slot></slot></p>
    `
  }
}
