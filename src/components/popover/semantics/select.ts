import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { PopoverPlacement } from '@/components/popover/popover'

import { PopupController } from '@/controllers/popup-controller'
import { MEDIA_QUERY } from '@/stylesheets/shared/breakpoints'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/menuitem/semantics/menu-item-action'
import '@/components/menuitem/semantics/menu-item-checkbox'
import '@/components/menuitem/semantics/menu-item-group'
import '@/components/popover/popover'
import '@/components/sheet/sheet'
import '@/components/sheet/semantics/sheet-body'
import { emit } from '@/utils/emit'

export interface SelectOption {
  label: string
  value: string
  type: 'default' | 'checkbox'
  checked: boolean
  selected: boolean
  icon?: IconName
}

/**
 * popover를 프리미티브로 하는 선택 입력.
 * phone 뷰포트에서는 같은 옵션 목록을 bottom sheet(mm-sheet)로 전환해 표시한다.
 */
@customElement('mm-select')
export class Select extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        --select-min-width: calc(var(--width-small) - var(--space-4) * 5);
        --select-max-height: var(--width-small);
        display: block;
        position: relative;
        width: 100%;
      }

      :host([inline]) {
        width: auto;
      }

      mm-popover {
        --popover-max-height: var(--select-max-height);
        min-width: var(--select-min-width);

        &[placement='bottom-left'][inline],
        &[placement='top-left'][inline] {
          right: auto;
        }
      }

      mm-menu-item-action[aria-current='true'] {
        color: var(--selection-foreground);
      }
    `,
  ]

  @property({ type: String }) value = ''
  @property({ type: String }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: Boolean, reflect: true }) inline = false
  @state() private options: SelectOption[] = []
  @state() private isPhoneViewport = false

  @queryAssignedElements({ selector: 'option', flatten: true })
  private optionElements!: HTMLOptionElement[]
  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private triggerElements!: HTMLElement[]

  private phoneMedia = window.matchMedia(MEDIA_QUERY.phone)

  private popup = new PopupController(this, {
    event: 'click',
    getTrigger: () => this.triggerElements[0],
  })

  render() {
    return html`
      ${this.renderTrigger()} ${this.renderPopoverList()} ${this.renderSheetList()}
      <slot hidden @slotchange=${this.syncOptions}></slot>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.phoneMedia.addEventListener('change', this.syncViewport)
    this.syncViewport()
  }

  disconnectedCallback() {
    this.phoneMedia.removeEventListener('change', this.syncViewport)
    super.disconnectedCallback()
  }

  firstUpdated() {
    this.syncOptions()
  }

  private syncViewport = () => {
    this.isPhoneViewport = this.phoneMedia.matches
  }

  private syncOptions() {
    this.options = this.parseLightDomOptions()
  }

  // light DOM의 <option> 요소를 SelectOption 데이터로 변환
  private parseLightDomOptions(): SelectOption[] {
    return this.optionElements.map(option => ({
      label: option.textContent || '',
      value: option.value,
      type: (option.getAttribute('type') as 'default' | 'checkbox') || 'default',
      checked: option.hasAttribute('checked'),
      selected: option.hasAttribute('selected'),
      icon: (option.getAttribute('icon') as IconName | null) ?? undefined,
    }))
  }

  // 일반 아이템 클릭 시: 선택 라벨 변경 후 목록 닫기
  private selectOption(option: SelectOption) {
    this.value = option.value
    this.popup.close()
    emit(this, 'change', { type: 'select', value: option.value })
  }

  // 체크박스 아이템 변경 시: 데이터 상태만 업데이트 (목록을 닫지 않음)
  private handleCheckboxChange(option: SelectOption, e: CustomEvent) {
    e.stopPropagation()

    const isChecked = e.detail.checked

    // 내부 state 업데이트 (불변성 유지)
    this.options = this.options.map(o =>
      o.value === option.value ? { ...o, checked: isChecked } : o,
    )

    // 외부로 이벤트 전파
    emit(this, 'change', {
      type: 'checkbox',
      value: option.value,
      checked: isChecked,
      values: this.options.filter(o => o.checked).map(o => o.value),
    })
  }

  // 트리거 스타일은 slot="trigger"로 들어온 외부 요소가 책임진다.
  private renderTrigger() {
    return html`
      <slot
        name="trigger"
        @click=${() => this.popup.toggle()}
        @slotchange=${this.popup.syncTrigger}
      ></slot>
    `
  }

  private renderPopoverList() {
    if (this.isPhoneViewport) return nothing

    return html`
      <mm-popover ?open=${this.popup.open} placement=${this.placement} ?inline=${this.inline}>
        <mm-menu-item-group>${this.renderOptionItems()}</mm-menu-item-group>
      </mm-popover>
    `
  }

  // phone 뷰포트: 앵커 대신 bottom sheet로 같은 옵션 목록을 전시한다.
  // sheet는 열릴 때 body로 portal되어 host 바깥으로 나가므로,
  // 내부 pointerdown이 outside-click으로 오인되지 않게 전파를 끊는다.
  private renderSheetList() {
    if (!this.isPhoneViewport) return nothing

    return html`
      <mm-sheet
        placement="bottom"
        ?open=${this.popup.open}
        @sheetclose=${() => this.popup.close()}
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <mm-sheet-body>
          <mm-menu-item-group>${this.renderOptionItems()}</mm-menu-item-group>
        </mm-sheet-body>
      </mm-sheet>
    `
  }

  private renderOptionItems() {
    return repeat(
      this.options,
      option => option.value,
      option => this.renderOption(option),
    )
  }

  private renderOption(option: SelectOption) {
    return option.type === 'checkbox'
      ? this.renderCheckboxOption(option)
      : this.renderDefaultOption(option)
  }

  // 체크박스 옵션: 클릭해도 닫히지 않고 체크 상태만 토글
  private renderCheckboxOption(option: SelectOption) {
    return html`
      <mm-menu-item-checkbox
        .checked=${option.checked}
        @change=${(e: CustomEvent) => this.handleCheckboxChange(option, e)}
      >
        ${option.label}
      </mm-menu-item-checkbox>
    `
  }

  // 일반 옵션: 선택 시 닫히며 현재 value면 aria-current로 강조
  private renderDefaultOption(option: SelectOption) {
    return html`
      <mm-menu-item-action
        icon=${option.icon || nothing}
        aria-current=${ifDefined(option.value === this.value ? 'true' : undefined)}
        @click=${() => this.selectOption(option)}
      >
        ${option.label}
      </mm-menu-item-action>
    `
  }
}

export default Select
