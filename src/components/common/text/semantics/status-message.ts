import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@/components/common/text/semantics/text-block'

@customElement('fff-status-message')
export class StatusMessage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: String }) message = ''

  render() {
    return html`
      <fff-text-block
        level="3"
        heading=${this.heading}
        description=${this.message}
        centered
      ></fff-text-block>
    `
  }
}
