import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

type ViewMode = 'grid' | 'list'

@customElement('mm-view-mode-switcher')
export class ViewModeSwitcher extends LitElement {
  @property({ type: String }) value: ViewMode = 'grid'

  private readonly options = JSON.stringify([
    { value: 'grid', icon: ICON_NAMES.GRID_VIEW, ariaLabel: '그리드 보기' },
    { value: 'list', icon: ICON_NAMES.LIST_VIEW, ariaLabel: '목록 보기' },
  ])

  private get selectedIndex() {
    return this.value === 'list' ? 1 : 0
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.handleHostClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleHostClick)
    super.disconnectedCallback()
  }

  private updateMode(mode: ViewMode) {
    this.value = mode

    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleClick(event: MouseEvent) {
    const button = event.composedPath().find(target => target instanceof HTMLButtonElement)
    if (!(button instanceof HTMLButtonElement)) return

    const mode = button.getAttribute('aria-label') === '목록 보기' ? 'list' : 'grid'
    this.updateMode(mode)
  }

  private handleHostClick = (event: MouseEvent) => {
    const rect = this.getBoundingClientRect()
    const mode = event.clientX - rect.left > rect.width / 2 ? 'list' : 'grid'

    this.updateMode(mode)
  }

  private handleOptionChange(event: CustomEvent<{ value: ViewMode }>) {
    event.stopPropagation()
    this.updateMode(event.detail.value)
  }

  render() {
    return html`
      <mm-toggle-button-group
        .options=${this.options}
        .selectedIndex=${this.selectedIndex}
        @click=${this.handleClick}
        @change=${this.handleOptionChange}
      ></mm-toggle-button-group>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-view-mode-switcher': ViewModeSwitcher
  }
}
