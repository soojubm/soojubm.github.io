import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemContent,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'
import '@/components/indicators/selected-indicator/selected-indicator'
import { emit } from '@/utils'

@customElement('fff-select-option')
export class SelectOption extends withMenuItemPresentation(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }

      [role='option'] {
        ${menuItemStyles}
        padding-inline: var(--space-2);
      }
    `,
  ]
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) selected = false
  @property({ type: String }) value = ''

  render() {
    return html`
      <div
        role="option"
        aria-selected=${this.selected ? 'true' : 'false'}
        aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
        @click=${this.handleRowClick}
        @keydown=${this.handleRowKeydown}
      >
        ${renderMenuItemContent(this, this.renderSelectedIndicator())}
      </div>
    `
  }

  // 선택은 aria-selected가 전달하므로 체크 표시는 장식으로만 둔다.
  private renderSelectedIndicator() {
    return html`
      <fff-selected-indicator slot="trailing" ?selected=${this.selected}></fff-selected-indicator>
    `
  }

  private handleRowClick() {
    this.activate()
  }

  private handleRowKeydown(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    this.activate()
  }

  private activate = () => {
    if (this.disabled) return
    emit(this, 'input', { value: this.value })
  }
}
