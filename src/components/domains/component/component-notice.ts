import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('fff-component-notice')
export class ComponentNotice extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) heading = ''

  render() {
    return html`
      <fff-notice variant="info">
        <fff-text size="14" weight="bold">${this.heading}</fff-text>
        <fff-text size="14"><slot></slot></fff-text>
      </fff-notice>
    `
  }
}
