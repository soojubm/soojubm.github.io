import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'
import { styleMap } from 'lit/directives/style-map.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { PopupController } from '@/controllers/popup-controller'
import type { IconName } from '@/components/icon-button/semantics/icon-names'
import '@/components/menuitem/semantics/menu-item-action'
import '@/components/menuitem/semantics/menu-item-checkbox'
import '@/components/sheet/sheet'
import '@/components/sheet/semantics/sheet-body'
import { emit } from '@/utils/emit'

type DropdownPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

export interface DropdownOption {
  label: string
  value: string
  type: 'default' | 'checkbox'
  checked: boolean
  selected: boolean
  icon?: IconName
}

@customElement('mm-dropdown')
export class Dropdown extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        --dropdown-offset: var(--space-1);
        --dropdown-min-width: calc(var(--width-small) - var(--space-4) * 5);
        --dropdown-max-height: var(--width-small);
        display: block;
        position: relative;
        width: 100%;
      }

      :host([inline]) {
        width: auto;
      }

      .dropdown-list {
        --sheet-padding-inline: var(--space-1);
        --sheet-max-height: var(--dropdown-max-height);
        min-width: var(--dropdown-min-width);

        position: absolute;
        top: calc(100% + var(--dropdown-offset));
        left: 0;
        right: 0;

        &[placement='bottom-right'],
        &[placement='top-right'] {
          left: auto;
          right: 0;
        }

        &[placement='bottom-left'][inline],
        &[placement='top-left'][inline] {
          right: auto;
        }

        &[placement='top-left'],
        &[placement='top-right'] {
          top: auto;
          bottom: calc(100% + var(--dropdown-offset));
        }
      }

      mm-menu-item-action[aria-current='true'] {
        color: var(--selection-foreground);
      }
    `,
  ]

  @property({ type: String }) value = ''
  @property({ type: String }) placement: DropdownPlacement = 'bottom-left'
  @property({ type: Boolean, reflect: true }) inline = false
  @property({ type: String, attribute: 'list-min-width' }) listMinWidth = ''
  @state() protected options: DropdownOption[] = []

  @queryAssignedElements({ selector: 'option', flatten: true })
  private optionElements!: HTMLOptionElement[]
  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private triggerElements!: HTMLElement[]

  private popup = new PopupController(this, {
    event: 'click',
    getTrigger: () => this.triggerElements[0],
  })

  render() {
    return html`
      ${this.renderTrigger()} ${this.renderList()}
      <slot hidden @slotchange=${this.syncOptions}></slot>
    `
  }

  firstUpdated() {
    this.syncOptions()
  }

  protected get defaultOptions(): DropdownOption[] {
    return []
  }

  protected syncOptions() {
    const lightDomOptions = this.parseLightDomOptions()
    this.options = lightDomOptions.length > 0 ? lightDomOptions : this.defaultOptions
  }

  // light DOM의 <option> 요소를 DropdownOption 데이터로 변환
  private parseLightDomOptions(): DropdownOption[] {
    return this.optionElements.map(option => ({
      label: option.textContent || '',
      value: option.value,
      type: (option.getAttribute('type') as 'default' | 'checkbox') || 'default',
      checked: option.hasAttribute('checked'),
      selected: option.hasAttribute('selected'),
      icon: (option.getAttribute('icon') as IconName | null) ?? undefined,
    }))
  }

  protected toggleOpen = () => {
    this.popup.toggle()
  }

  // 일반 아이템 클릭 시: 선택 라벨 변경 후 드롭다운 닫기
  protected selectOption(option: DropdownOption) {
    this.value = option.value
    this.popup.close()
    this.emitSelectChange(option)
  }

  protected emitSelectChange(option: DropdownOption) {
    emit(this, 'change', { type: 'select', value: option.value })
  }

  // 체크박스 아이템 변경 시: 데이터 상태만 업데이트 (드롭다운을 닫지 않음)
  protected handleCheckboxChange(option: DropdownOption, e: CustomEvent) {
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
  protected renderTrigger() {
    return html`
      <slot name="trigger" @click=${this.toggleOpen} @slotchange=${this.popup.syncTrigger}></slot>
    `
  }

  protected renderList() {
    const listStyles = {
      minWidth: this.listMinWidth || null,
    }

    return html`
      <mm-sheet
        class="dropdown-list"
        variant="inline"
        ?open=${this.popup.open}
        placement=${this.placement}
        ?inline=${this.inline}
        style=${styleMap(listStyles)}
      >
        <mm-sheet-body role="menu">
          ${repeat(
            this.options,
            option => option.value,
            option => this.renderOption(option),
          )}
        </mm-sheet-body>
      </mm-sheet>
    `
  }

  protected renderOption(option: DropdownOption) {
    return option.type === 'checkbox'
      ? this.renderCheckboxOption(option)
      : this.renderDefaultOption(option)
  }

  // 체크박스 옵션: 클릭해도 닫히지 않고 체크 상태만 토글
  protected renderCheckboxOption(option: DropdownOption) {
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
  protected renderDefaultOption(option: DropdownOption) {
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

export default Dropdown
