import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import {
  buttonBaseStyles,
  toggleButtonStyles,
  buttonSelectedStyles,
} from '@/components/button/button.styles'
import { ToggleController } from '@/controllers/toggle-controller'
import { emit } from '@/utils/emit'
import '@/components/icon/icon'

@customElement('mm-toggle-button')
export class ToggleButton extends LitElement {
  static styles = [buttonBaseStyles, toggleButtonStyles, buttonSelectedStyles]

  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: String }) icon?: IconName
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  private toggle = new ToggleController(this, {
    getValue: () => this.selected,
    setValue: selected => {
      this.selected = selected
    },
    isDisabled: () => this.disabled,
  })

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-pressed=${this.selected ? 'true' : 'false'}
        aria-label=${this.ariaLabel || nothing}
        @click=${this.handleClick}
      >
        ${this.renderIcon()}
        <slot></slot>
      </button>
    `
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <mm-icon name=${this.icon}></mm-icon>
    `
  }

  private handleClick(event: Event) {
    event.stopPropagation()
    if (!this.toggle.toggle()) return

    emit(this, 'change', { selected: this.selected, value: this.value })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toggle-button': ToggleButton
  }
}
