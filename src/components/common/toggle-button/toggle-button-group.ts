import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAll } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { OptionItem } from '@/types'

import { buttonBaseStyles, buttonSelectedStyles } from '@/components/common/button/button.styles'
import { RovingFocusController, type Orientation } from '@/controllers/roving-focus-controller'
import { SingleSelection } from '@/controllers/single-selection'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'
import '@/components/common/icon/icon'

@customElement('mm-toggle-button-group')
export class ToggleButtonGroup extends LitElement {
  static styles = [
    resetStyles,
    buttonBaseStyles,
    buttonSelectedStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        border-radius: 0;
      }

      button:first-child {
        border-start-start-radius: var(--border-radius);
        border-end-start-radius: var(--border-radius);
      }

      button:last-child {
        border-start-end-radius: var(--border-radius);
        border-end-end-radius: var(--border-radius);
      }

      :host([stretch]) {
        display: flex;
      }

      :host([stretch]) button {
        flex: 1;
      }
    `,
  ]
  @property({ attribute: false }) options: OptionItem[] = []
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) stretch = false
  // 아이콘만 보일 때 label을 보이는 텍스트 대신 버튼의 접근성 이름으로 쓴다.
  @property({ type: Boolean, attribute: 'hidden-label' }) hiddenLabel = false
  @property({ type: String }) orientation: Orientation = 'horizontal'
  @queryAll('button') private buttons!: NodeListOf<HTMLButtonElement>
  private selection = new SingleSelection({
    getValue: () => this.value,
    setValue: value => {
      this.value = value
    },
  })
  private rovingFocus = new RovingFocusController(this, {
    getItems: () => Array.from(this.buttons),
    orientation: () => this.orientation,
    getActiveIndex: () => this.options.findIndex(option => this.selection.isOptionSelected(option)),
  })

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`
      ${repeat(
        this.options,
        option => option.value,
        option => this.renderOption(option),
      )}
    `
  }

  private renderOption(option: OptionItem) {
    return html`
      <button
        type="button"
        aria-pressed=${this.selection.isOptionSelected(option) ? 'true' : 'false'}
        aria-label=${this.hiddenLabel ? option.label : nothing}
        ?disabled=${option.disabled}
        @click=${() => this.handleOptionClick(option)}
      >
        ${this.renderIcon(option.icon)}${this.hiddenLabel ? nothing : option.label}
      </button>
    `
  }

  private renderIcon(icon?: IconName) {
    if (!icon) return nothing

    return html`
      <mm-icon name=${icon}></mm-icon>
    `
  }

  private handleOptionClick(option: OptionItem) {
    if (option.disabled) return

    this.selection.select(option)
    emit(this, 'change', { value: this.value })
  }
}
