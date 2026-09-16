import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { Popover, PopoverPlacement } from '@/components/overlay/popover/popover'
import type { OptionItem } from '@/types'

import '@/components/common'
import '@/components/indicators/expand-indicator/expand-indicator'
import '@/components/overlay/popover/popover'
import '@/components/overlay/select/select-option'
import { emit } from '@/utils'

/**
 * popover를 프리미티브로 하는 선택 입력.
 */
@customElement('mm-select')
export class Select extends LitElement {
  static styles = css`
    :host {
      --select-width: auto;
      display: block;
      width: var(--select-width);
    }

    :host([width='100%']) mm-popover {
      display: block;
    }
  `
  @property({ attribute: false }) options: OptionItem[] = []
  @property({ type: String }) value = ''
  @property({ type: String }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  /** 호스트 폭. 기본은 트리거 콘텐츠 폭(auto)이며, `240px`·`100%` 등 임의 CSS 폭 값을 받는다. */
  @property({ type: String, reflect: true }) width = 'auto'
  @state() private open = false
  @query('mm-popover') private popoverEl?: Popover

  render() {
    return html`
      <mm-popover placement=${this.placement} @popover-toggle=${this.handlePopoverToggle}>
        <mm-button
          slot="trigger"
          size="small"
          aria-haspopup="listbox"
          aria-label=${this.triggerLabel || nothing}
        >
          ${this.currentLabel}
          <mm-expand-indicator ?expanded=${this.open}></mm-expand-indicator>
        </mm-button>
        <mm-menu-item-group
          role="listbox"
          aria-label=${this.ariaLabel || nothing}
          @input=${this.handleOptionInput}
        >
          ${repeat(
            this.options,
            option => option.value,
            option => this.renderOption(option),
          )}
        </mm-menu-item-group>
      </mm-popover>
    `
  }

  private get currentLabel() {
    return this.options.find(option => option.value === this.value)?.label ?? ''
  }

  // aria-label은 버튼 콘텐츠를 대체하므로, 컨트롤 이름에 현재 값을 이어 붙여 선택값이 함께 읽히게 한다.
  private get triggerLabel() {
    if (!this.ariaLabel) return ''

    return `${this.ariaLabel}, ${this.currentLabel}`
  }

  // 네이티브 select처럼 value가 비어 있으면 첫 번째 활성 옵션으로 채운다.
  protected willUpdate() {
    if (this.value) return

    this.value = this.options.find(option => !option.disabled)?.value ?? ''
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width')) this.style.setProperty('--select-width', this.width)
  }

  // 트리거의 펼침 표시를 popover의 열림 상태에 맞춘다.
  private handlePopoverToggle(event: CustomEvent<{ open: boolean }>) {
    this.open = event.detail.open
  }

  // 옵션 활성화 시: 값 반영 후 목록 닫기
  private handleOptionInput(event: CustomEvent<{ value: string }>) {
    this.popoverEl?.close()
    if (event.detail.value === this.value) return

    this.value = event.detail.value
    emit(this, 'change', { value: this.value })
  }

  // 옵션: 선택 시 닫히며 현재 선택된 옵션은 aria-selected로 강조
  private renderOption(option: OptionItem) {
    return html`
      <mm-select-option
        .value=${option.value}
        icon=${ifDefined(option.icon)}
        ?disabled=${option.disabled}
        ?selected=${option.value === this.value}
      >
        ${option.label}
      </mm-select-option>
    `
  }
}
