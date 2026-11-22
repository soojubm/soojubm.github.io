import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { MenuItemGroupSize } from '@/components/common/menu-item/menu-item-group'
import type { MenuOptionItem } from '@/types'

import '@/components/common/menu-item/menu-item-group'
import '@/components/common/menu-item/semantics/menu-item-checkbox'
import { MultipleSelection } from '@/controllers/multiple-selection'
import { emit } from '@/utils'

/**
 * 옵션을 mm-menu-item-checkbox 행으로 그리는 다중 선택 그룹.
 * 선택된 value 목록을 values prop으로 관리하며
 * 변경 시 change 이벤트를 발행합니다.
 */
@customElement('mm-menu-item-checkbox-group')
export class MenuItemCheckboxGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ attribute: false }) options: MenuOptionItem[] = []
  @property({ attribute: false }) values: string[] = []
  @property({ type: String }) size: MenuItemGroupSize = 'medium'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  private selection = new MultipleSelection({
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.options,
  })

  render() {
    return html`
      <mm-menu-item-group role="group" size=${this.size} aria-label=${this.ariaLabel || nothing}>
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
      <mm-menu-item-checkbox
        size=${option.description ? 'medium' : 'small'}
        value=${option.value}
        label=${option.label}
        description=${option.description ?? ''}
        icon=${ifDefined(option.icon)}
        emoji=${option.emoji ?? ''}
        ?disabled=${option.disabled}
        .checked=${this.selection.isOptionSelected(option)}
        @change=${(event: Event) => this.handleOptionChange(event, option)}
      ></mm-menu-item-checkbox>
    `
  }

  private handleOptionChange(event: Event, option: MenuOptionItem) {
    // 행 단위 이벤트는 여기서 끊고 그룹 단위 change로 다시 발행한다.
    event.stopPropagation()
    this.selection.select(option)
    emit(this, 'change', { values: this.values })
  }
}
