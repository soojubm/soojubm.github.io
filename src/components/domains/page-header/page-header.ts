import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/text/semantics/text-block'

@customElement('mm-page-header')
export class PageHeader extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        padding-bottom: 2rem;
      }
    `,
  ]

  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      <header>
        <mm-text-block
          heading=${this.heading}
          description=${this.description}
          ?centered=${this.centered}
        ></mm-text-block>
      </header>
    `
  }
}
