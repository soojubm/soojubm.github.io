import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-page-header')
export class PageHeader extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
      .page-header {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        align-items: flex-start;
      }
      :host([centered]) .page-header {
        align-items: center;
        text-align: center;
      }
    `,
  ]

  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      <header class="page-header">
        <mm-text as="h1" size="32" weight="bold">${this.heading}</mm-text>
        ${this.description
          ? html`
              <mm-paragraph size="large" ?centered=${this.centered}>
                ${this.description}
              </mm-paragraph>
            `
          : null}
      </header>
    `
  }
}
