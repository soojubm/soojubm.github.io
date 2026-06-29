import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/text/semantics/text-block'

@customElement('mm-page-header')
export class PageHeader extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
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
          heading-level="1"
          heading=${this.heading}
          description=${this.description}
          ?centered=${this.centered}
        ></mm-text-block>
      </header>
    `
  }
}
