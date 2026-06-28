import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

@customElement('mm-page-header')
export class PageHeader extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
      :host([centered]) .page-header {
        text-align: center;
      }
    `,
  ]

  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      <mm-flex
        as="header"
        class="page-header"
        direction="column"
        gap="3"
        align-items=${this.centered ? 'center' : 'start'}
      >
        <mm-text as="h1" size="32" weight="bold">${this.heading}</mm-text>
        ${this.renderDescription()}
      </mm-flex>
    `
  }

  private renderDescription() {
    if (!this.description) return null

    return html`
      <mm-paragraph size="large" ?centered=${this.centered}>${this.description}</mm-paragraph>
    `
  }
}
