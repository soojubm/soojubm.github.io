import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { IconName } from '@/components/common/icon/icon-names'
import type { Popover, PopoverPlacement } from '@/components/overlay/popover/popover'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/button/button'
import '@/components/common/menu-item/menu-item-group'
import '@/components/overlay/popover/popover'
import '@/components/overlay/popover/semantics/select-option'
import { emit } from '@/utils'

export interface SelectOption {
  label: string
  value: string
  selected: boolean
  icon?: IconName
}

/**
 * popover를 프리미티브로 하는 선택 입력.
 */
@customElement('mm-select')
export class Select extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        --select-width: auto;
        display: block;
        width: var(--select-width);
      }

      /* full(100%)이 아니면 호스트가 트리거 폭이므로, 좌측 placement는 트리거 왼쪽에 앵커해 오른쪽으로 자란다. */
      :host(:not([width='100%'])) mm-popover[placement='bottom-left']::part(panel),
      :host(:not([width='100%'])) mm-popover[placement='top-left']::part(panel) {
        right: auto;
      }

      :host([width='100%']) mm-popover {
        display: block;
      }
    `,
  ]

  @property({ type: String }) value = ''
  @property({ type: String }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: String }) padding?: string
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  /** 호스트 폭. 기본은 트리거 콘텐츠 폭(auto)이며, `240px`·`100%` 등 임의 CSS 폭 값을 받는다. */
  @property({ type: String, reflect: true }) width = 'auto'
  @state() private options: SelectOption[] = []

  @queryAssignedElements({ selector: 'option', flatten: true })
  private optionElements!: HTMLOptionElement[]

  @query('mm-popover') private popoverEl?: Popover

  render() {
    return html`
      <mm-popover placement=${this.placement} padding=${ifDefined(this.padding)}>
        <mm-button slot="trigger" size="small" icon=${ICON_NAMES.EXPAND} icon-position="trailing">
          ${this.currentLabel}
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
      <slot hidden @slotchange=${this.handleOptionSlotChange}></slot>
    `
  }

  private get currentLabel() {
    return this.options.find(option => option.value === this.value)?.label ?? ''
  }

  firstUpdated() {
    this.handleOptionSlotChange()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width')) this.style.setProperty('--select-width', this.width)
  }

  // 네이티브 select처럼 value가 비어 있으면 selected 옵션, 그마저 없으면 첫 옵션으로 채운다.
  private handleOptionSlotChange() {
    this.options = this.parseLightDomOptions()
    if (!this.value) {
      this.value =
        this.options.find(option => option.selected)?.value ?? this.options[0]?.value ?? ''
    }
  }

  // light DOM의 <option> 요소를 SelectOption 데이터로 변환
  private parseLightDomOptions(): SelectOption[] {
    return this.optionElements.map(option => ({
      label: option.textContent || '',
      value: option.value,
      selected: option.hasAttribute('selected'),
      icon: (option.getAttribute('icon') as IconName | null) ?? undefined,
    }))
  }

  // 옵션 활성화 시: 값 반영 후 목록 닫기
  private handleOptionInput(event: CustomEvent<{ value: string }>) {
    this.popoverEl?.close()
    if (event.detail.value === this.value) return

    this.value = event.detail.value
    emit(this, 'change', { value: this.value })
  }

  // 옵션: 선택 시 닫히며 현재 선택된 옵션은 aria-selected로 강조
  private renderOption(option: SelectOption) {
    return html`
      <mm-select-option
        .value=${option.value}
        icon=${ifDefined(option.icon)}
        ?selected=${option.value === this.value}
      >
        ${option.label}
      </mm-select-option>
    `
  }
}
