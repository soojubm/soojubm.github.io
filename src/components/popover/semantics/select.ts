import { LitElement, css, html } from 'lit'
import { customElement, property, query, queryAssignedElements, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type Popover from '@/components/popover/popover'
import type { PopoverPlacement } from '@/components/popover/popover'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/menuitem/semantics/menu-item-action'
import '@/components/menuitem/semantics/menu-item-group'
import '@/components/popover/popover'
import { emit } from '@/utils/emit'

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
        --select-min-width: 160px;
        display: block;
        width: var(--select-width, auto);
      }

      mm-popover {
        --popover-max-height: var(--select-max-height);
      }

      mm-popover::part(panel) {
        min-width: var(--select-min-width);
      }

      /* full(100%)이 아니면 호스트가 트리거 폭이므로, 좌측 placement는 트리거 왼쪽에 앵커해 오른쪽으로 자란다. */
      :host(:not([width='100%'])) mm-popover[placement='bottom-left']::part(panel),
      :host(:not([width='100%'])) mm-popover[placement='top-left']::part(panel) {
        right: auto;
      }

      :host([width='100%']) mm-popover {
        display: block;
      }

      mm-menu-item-action[aria-current='true'] {
        color: var(--interaction-selected-foreground-color);
      }
    `,
  ]

  @property({ type: String }) value = ''
  @property({ type: String }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: String }) padding?: string
  /** 호스트 폭. 기본은 트리거 콘텐츠 폭(auto)이며, `240px`·`100%` 등 임의 CSS 폭 값을 받는다. */
  @property({ type: String, reflect: true }) width = 'auto'
  @state() private options: SelectOption[] = []

  @queryAssignedElements({ selector: 'option', flatten: true })
  private optionElements!: HTMLOptionElement[]

  @query('mm-popover') private popoverEl?: Popover

  render() {
    return html`
      <mm-popover placement=${this.placement} padding=${ifDefined(this.padding)}>
        <slot name="trigger" slot="trigger"></slot>
        ${this.renderOptionList()}
      </mm-popover>
      <slot hidden @slotchange=${this.syncOptions}></slot>
    `
  }

  firstUpdated() {
    this.syncOptions()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width')) this.style.setProperty('--select-width', this.width)
  }

  // 네이티브 select처럼 value가 비어 있으면 selected 옵션에서 초기값을 채운다.
  private syncOptions() {
    this.options = this.parseLightDomOptions()
    if (!this.value) this.value = this.options.find(option => option.selected)?.value ?? ''
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

  // 옵션 클릭 시: 값 반영 후 목록 닫기
  private selectOption(option: SelectOption) {
    this.value = option.value
    this.popoverEl?.close()
    emit(this, 'change', { value: option.value })
  }

  // popover가 옵션 목록 표면을 소유한다. 그룹 시맨틱은 목록 전체에 한 번만 적용한다.
  private renderOptionList() {
    return html`
      <mm-menu-item-group>
        ${repeat(
          this.options,
          option => option.value,
          option => this.renderOption(option),
        )}
      </mm-menu-item-group>
    `
  }

  // 옵션: 선택 시 닫히며 현재 선택된 옵션은 aria-current로 강조
  private renderOption(option: SelectOption) {
    const isSelected = option.value === this.value

    return html`
      <mm-menu-item-action
        icon=${ifDefined(option.icon)}
        aria-current=${ifDefined(isSelected ? 'true' : undefined)}
        @click=${() => this.selectOption(option)}
      >
        ${option.label}
      </mm-menu-item-action>
    `
  }
}

export default Select
