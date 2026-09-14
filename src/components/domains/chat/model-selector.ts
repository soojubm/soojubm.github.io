import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { OptionItem } from '@/types'

import '@/components/overlay/popover/semantics/select'

const MODEL_OPTIONS: OptionItem[] = [
  { value: 'claude-opus', label: 'Claude Opus' },
  { value: 'claude-sonnet', label: 'Claude Sonnet' },
  { value: 'claude-haiku', label: 'Claude Haiku' },
]

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
      <mm-select .value=${this.value} .options=${MODEL_OPTIONS} placement="top-left"></mm-select>
    `
  }
}
