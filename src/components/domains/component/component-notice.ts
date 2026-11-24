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
      <mm-notice variant="info" heading=${this.heading}>
        <mm-text size="14"><slot></slot></mm-text>
      </mm-notice>
    `
  }
}
