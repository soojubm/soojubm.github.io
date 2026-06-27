import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { emit } from '@/utils/emit'

type ViewMode = 'grid' | 'list'

@customElement('mm-view-mode-switcher')
export class ViewModeSwitcher extends LitElement {
  @property({ type: String }) value: ViewMode = 'grid'

  private readonly options = [
    { value: 'grid', icon: ICON_NAMES.GRID_VIEW, ariaLabel: '그리드 보기' },
    { value: 'list', icon: ICON_NAMES.LIST_VIEW, ariaLabel: '목록 보기' },
  ]

  render() {
    return html`
      <mm-toggle-button-group
        .options=${this.options}
        .selectedIndex=${this.selectedIndex}
        @change=${this.handleOptionChange}
      ></mm-toggle-button-group>
    `
  }

  private get selectedIndex() {
    return this.value === 'list' ? 1 : 0
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

declare global {
  interface HTMLElementTagNameMap {
    'mm-view-mode-switcher': ViewModeSwitcher
  }
}
