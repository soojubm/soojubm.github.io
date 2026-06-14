import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import type { TextWeight } from '../text.styles'

type ParagraphSize = 'small' | 'medium' | 'large'

@customElement('mm-paragraph')
export class Paragraph extends LitElement {
  @property({ type: String, reflect: true }) size: ParagraphSize = 'medium'
  @property({ type: String, reflect: true }) weight: TextWeight = 'medium'
  @property({ type: String }) color = 'inherit'
  @property({ type: Boolean, reflect: true }) center = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        /* TODO */
        max-width: 560px;
        font-size: var(--font-size-14);
        line-height: var(--font-line-height-24);
        font-weight: var(--font-weight-medium);
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

      :host([weight='bold']) {
        font-weight: var(--font-weight-bold);
      }

      :host([center]) {
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

  updated(changed: Map<string, unknown>) {
    if (changed.has('color')) {
      this.style.color = this.color !== 'inherit' ? this.color : ''
    }
  }

  render() {
    return html`
      <p><slot></slot></p>
    `
  }
}
