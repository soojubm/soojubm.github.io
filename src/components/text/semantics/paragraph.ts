import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { textMaxLengthStyles, type TextMaxLength } from '@/components/text/text.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

type ParagraphSize = 'small' | 'medium' | 'large'

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
        font-weight: var(--font-weight-medium);
        color: var(--paragraph-color, inherit);
      }

      :host([color='light']) {
        color: var(--foreground-subtle-color);
      }

      :host([color='danger']) {
        color: var(--color-danger);
      }

      :host([size='small']) {
        font-size: var(--font-size-12);
        line-height: var(--font-line-height-16);
      }
      :host([size='large']) {
        max-width: 800px;
        font-size: var(--font-size-18);
        line-height: var(--font-line-height-28);
      }

      :host([centered]) {
        text-align: center;
      }

      p {
        margin: 0;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
        font-weight: inherit;
        color: inherit;
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
