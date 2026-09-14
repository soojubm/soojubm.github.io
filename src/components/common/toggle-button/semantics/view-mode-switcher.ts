import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { OptionItem } from '@/types'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { emit } from '@/utils'
import '@/components/common/toggle-button/toggle-button-group'

type ViewMode = 'grid' | 'list'

@customElement('mm-view-mode-switcher')
export class ViewModeSwitcher extends LitElement {
  @property({ type: String }) value: ViewMode = 'grid'

  private readonly options: OptionItem[] = [
    { value: 'grid', icon: ICON_NAMES.GRID_VIEW, label: '그리드 보기' },
    { value: 'list', icon: ICON_NAMES.LIST_VIEW, label: '목록 보기' },
  ]

  render() {
    return html`
      <mm-toggle-button-group
        hidden-label
        .options=${this.options}
        .value=${this.value}
        @change=${this.handleOptionChange}
      ></mm-toggle-button-group>
    `
  }

  private updateMode(mode: ViewMode) {
    this.value = mode

    emit(this, 'change', { value: this.value })
  }

  private handleOptionChange(event: CustomEvent<{ value: ViewMode }>) {
    event.stopPropagation()
    this.updateMode(event.detail.value)
  }
}
