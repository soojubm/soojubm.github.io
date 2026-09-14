import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { OptionItem } from '@/types'

import { emit } from '@/utils'
import '@/components/common/toggle-button/toggle-button-group'

type Gender = 'other' | 'female' | 'male'

@customElement('mm-gender-selector')
export class GenderSelector extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    :host([stretch]) {
      display: block;
    }
  `

  @property({ type: String }) value: Gender = 'other'
  @property({ type: Boolean, reflect: true }) stretch = false

  private readonly options: OptionItem[] = [
    { value: 'other', label: '기타' },
    { value: 'female', label: '여성' },
    { value: 'male', label: '남성' },
  ]

  render() {
    return html`
      <mm-toggle-button-group
        aria-label="성별"
        .options=${this.options}
        .value=${this.value}
        ?stretch=${this.stretch}
        @change=${this.handleGenderChange}
      ></mm-toggle-button-group>
    `
  }

  private handleGenderChange(event: CustomEvent<{ value: Gender }>) {
    event.stopPropagation()
    this.value = event.detail.value
    emit(this, 'change', { value: this.value })
  }
}
