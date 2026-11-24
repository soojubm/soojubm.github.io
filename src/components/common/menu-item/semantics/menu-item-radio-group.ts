import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type {
  MenuItemGroupGap,
  MenuItemGroupSize,
} from '@/components/common/menu-item/menu-item-group'
import type { MenuOptionItem } from '@/types'

import '@/components/common/menu-item/menu-item-group'
import '@/components/common/menu-item/semantics/menu-item-radio'
import { SingleSelection } from '@/controllers/single-selection'
import { emit } from '@/utils'

@customElement('mm-menu-item-radio-group')
export class MenuItemRadioGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ attribute: false }) options: MenuOptionItem[] = []
  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: String }) size: MenuItemGroupSize = 'medium'
  @property({ type: String }) gap?: MenuItemGroupGap
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  private selection = new SingleSelection({
    getValue: () => this.value,
    setValue: value => {
      this.value = value
    },
  })

  render() {
    return html`
      <mm-menu-item-group
        role="radiogroup"
        size=${this.size}
        gap=${ifDefined(this.gap)}
        aria-label=${this.ariaLabel || nothing}
      >
        ${repeat(
          this.options,
          option => option.value,
          option => this.renderOption(option),
        )}
      </mm-menu-item-group>
    `
  }

  // 보조 설명이 붙은 행은 두 줄을 담아야 하므로 medium으로 그린다.
  private renderOption(option: MenuOptionItem) {
    return html`
      <mm-menu-item-radio
        size=${option.description ? 'medium' : 'small'}
        name=${ifDefined(this.name || undefined)}
        value=${option.value}
        label=${option.label}
        description=${option.description ?? ''}
        icon=${ifDefined(option.icon)}
        emoji=${option.emoji ?? ''}
        ?disabled=${option.disabled}
        .checked=${this.selection.isOptionSelected(option)}
        @change=${(event: Event) => this.handleOptionChange(event, option)}
      ></mm-menu-item-radio>
    `
  }

  private handleOptionChange(event: Event, option: MenuOptionItem) {
    // 행 단위 이벤트는 여기서 끊고 그룹 단위 change로 다시 발행한다.
    event.stopPropagation()
    this.selection.select(option)
    emit(this, 'change', { value: this.value, name: this.name })
  }
}
