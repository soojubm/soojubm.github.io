import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/overlay/popover/semantics/select'

@customElement('mm-model-selector')
export class ModelSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `

  @property({ type: String }) value = 'claude-sonnet'

  render() {
    return html`
      <mm-select .value=${this.value} placement="top-left">
        <option value="claude-opus">Claude Opus</option>
        <option value="claude-sonnet" selected>Claude Sonnet</option>
        <option value="claude-haiku">Claude Haiku</option>
      </mm-select>
    `
  }
}
