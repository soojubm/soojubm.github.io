import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('mm-component-notice')
export class ComponentNotice extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) heading = ''

  render() {
    return html`
      <mm-notice variant="info">
        <mm-text size="14" weight="bold">${this.heading}</mm-text>
        <mm-text size="14"><slot></slot></mm-text>
      </mm-notice>
    `
  }
}
