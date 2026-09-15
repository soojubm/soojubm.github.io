import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { OptionItem } from '@/types'

import '@/components/overlay/select/select'

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
      <mm-select
        aria-label="모델"
        .value=${this.value}
        .options=${MODEL_OPTIONS}
        placement="top-left"
        @change=${this.handleSelectChange}
      ></mm-select>
    `
  }

  // select가 트리거 라벨을 스스로 소유하므로, 여기서는 외부에 노출하는 value 프로퍼티만 동기화한다.
  private handleSelectChange(event: CustomEvent<{ value: string }>) {
    this.value = event.detail.value
  }
}
