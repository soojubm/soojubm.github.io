import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

type ParagraphSize = 'small' | 'medium' | 'large'
type ParagraphTruncate = '' | '1' | '2' | '3'

@customElement('mm-paragraph')
export class Paragraph extends LitElement {
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

      :host([color='light']) {
        color: var(--color-foreground-light);
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

      :host([truncate]) p {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      :host([truncate='1']) p {
        white-space: nowrap;
      }

      :host([truncate='2']) p,
      :host([truncate='3']) p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }

      :host([truncate='2']) p {
        -webkit-line-clamp: 2;
      }

      :host([truncate='3']) p {
        -webkit-line-clamp: 3;
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
  @property({ type: String, reflect: true }) truncate: ParagraphTruncate = ''
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      <p style=${styleMap(this.customColorStyle)}><slot></slot></p>
    `
  }

  private get customColorStyle() {
    const isKeyword = this.color === 'inherit' || this.color === 'light' || this.color === 'danger'
    return { color: isKeyword ? undefined : this.color }
  }
}
