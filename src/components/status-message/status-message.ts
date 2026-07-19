import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { statusMessageStyles } from '@/components/status-message/status-message.styles'

@customElement('mm-status-message')
class StatusMessage extends LitElement {
  static styles = [statusMessageStyles]

  @property({ type: String }) heading = ''
  @property({ type: String }) message = ''

  render() {
    return html`
      <mm-text-block
        level="3"
        heading=${this.heading}
        description=${this.message}
        centered
      ></mm-text-block>
    `
  }
}

export default StatusMessage
