import { LitElement, css, html, nothing, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../icon-button/semantics/icon-names'
import '../menuitem/semantics/menu-item-action'
import '../menuitem/semantics/menu-item-checkbox'

export interface DropdownOption {
  label: string
  value: string
  type: 'default' | 'checkbox'
  checked: boolean
  selected: boolean
  icon?: string
}

@customElement('mm-dropdown')
export class Dropdown extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: String }) align: 'left' | 'right' = 'left'
  @state() protected isOpen = false
  @state() protected selectedLabel = 'Select an option'
  @state() protected options: DropdownOption[] = []

  static styles = [
    resetStyles,
    css`
      .dropdown {
        position: relative;
        width: 100%;
      }

      .dropdown-button {
      }

      // TODO component and state
      .dropdown-button mm-icon {
        transition: transform 160ms ease;
      }

      .dropdown-button[aria-expanded='true'] mm-icon {
        transform: rotate(180deg);
      }

      .dropdown-list {
        position: absolute;
        top: calc(100% + 4px);
        left: 0;
        right: 0;
        z-index: 10;

        min-width: 120px;
        max-height: 200px;
        overflow-y: auto;

        // style
        padding: var(--space-1);
        border: var(--border-stronger);
        border-radius: var(--radius);
        background-color: var(--color-background);
        box-shadow: var(--shadow);

        /* 초기 상태 */
        opacity: 0;
        transform: translateY(-4px) scale(0.98);
        transform-origin: top center;

        visibility: hidden;
        pointer-events: none;

        transition: opacity 120ms ease, transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
          visibility 0s linear 180ms;
      }

      .dropdown-list.open {
        opacity: 1;
        transform: translateY(0) scale(1);

        visibility: visible;
        pointer-events: auto;

        transition: opacity 120ms ease, transform 220ms cubic-bezier(0.18, 1.25, 0.4, 1),
          visibility 0s;
      }

      .dropdown-list.align-right {
        left: auto;
        right: 0;
      }

      mm-menu-item-action[aria-current='true'] {
        color: var(--color-primary);
      }
    `,
  ]

  connectedCallback(): void {
    super.connectedCallback()
    this.syncOptions()
    document.addEventListener('click', this.handleOutsideClick)
  }

  disconnectedCallback(): void {
    super.disconnectedCallback()
    document.removeEventListener('click', this.handleOutsideClick)
  }

  // composedPath()로 shadow 경계를 넘어 판별 — 트리거가 다른 컴포넌트의 shadow DOM에 끼워져도 동작
  private handleOutsideClick = (e: MouseEvent) => {
    if (this.isOpen && !e.composedPath().includes(this)) this.isOpen = false
  }

  protected get defaultOptions(): DropdownOption[] {
    return []
  }

  protected syncOptions() {
    const lightDomOptions = this.parseLightDomOptions()
    this.options = lightDomOptions.length > 0 ? lightDomOptions : this.defaultOptions
    this.selectedLabel = this.resolveSelectedLabel()
  }

  // light DOM의 <option> 요소를 DropdownOption 데이터로 변환
  private parseLightDomOptions(): DropdownOption[] {
    return Array.from(this.querySelectorAll('option')).map(option => ({
      label: option.textContent || '',
      value: option.value,
      type: (option.getAttribute('type') as 'default' | 'checkbox') || 'default',
      checked: option.hasAttribute('checked'),
      selected: option.hasAttribute('selected'),
      icon: option.getAttribute('icon') ?? undefined,
    }))
  }

  // value > selected > 첫 default 옵션 순으로 표시 라벨 결정
  private resolveSelectedLabel(): string {
    return (
      this.options.find(option => option.value === this.value)?.label ??
      this.options.find(option => option.selected)?.label ??
      this.options.find(option => option.type === 'default')?.label ??
      this.selectedLabel
    )
  }

  protected toggleOpen() {
    this.isOpen = !this.isOpen
  }

  // 일반 아이템 클릭 시: 선택 라벨 변경 후 드롭다운 닫기
  protected selectOption(option: DropdownOption) {
    this.value = option.value
    this.selectedLabel = option.label
    this.isOpen = false
    this.emitSelectChange(option)
  }

  protected emitSelectChange(option: DropdownOption) {
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { type: 'select', value: option.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  // 체크박스 아이템 변경 시: 데이터 상태만 업데이트 (드롭다운을 닫지 않음)
  protected handleCheckboxChange(option: DropdownOption, e: CustomEvent) {
    const isChecked = e.detail.checked

    // 내부 state 업데이트 (불변성 유지)
    this.options = this.options.map(o =>
      o.value === option.value ? { ...o, checked: isChecked } : o,
    )

    // 외부로 이벤트 전파
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: {
          type: 'checkbox',
          value: option.value,
          checked: isChecked,
          currentCheckedValues: this.options.filter(o => o.checked).map(o => o.value),
        },
        bubbles: true,
        composed: true,
      }),
    )
  }

  // 트리거: 소비자가 slot="trigger"로 커스텀 트리거(아이콘 버튼 등)를 끼워 넣을 수 있다.
  // 슬롯에 click을 위임하므로 끼워 넣은 요소든 기본 버튼이든 클릭하면 펼쳐진다.
  protected renderTrigger() {
    return html`
      <slot name="trigger" @click="${this.toggleOpen}">
        <button class="dropdown-button" aria-haspopup="true" aria-expanded="${this.isOpen}">
          ${this.selectedLabel}
          <mm-icon name=${ICON_NAMES.EXPAND}></mm-icon>
        </button>
      </slot>
    `
  }

  protected renderList() {
    return html`
      <div
        part="list"
        class="dropdown-list ${this.isOpen ? 'open' : ''} ${this.align === 'right' ? 'align-right' : ''}"
        role="menu"
      >
        ${this.options.map(option => this.renderOption(option))}
      </div>
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
        icon=${option.icon ?? nothing}
        aria-current=${option.value === this.value ? 'true' : nothing}
        @click="${() => this.selectOption(option)}"
      >
        ${option.label}
      </mm-menu-item-action>
    `
  }

  // 슬롯 trigger에 aria-haspopup / aria-expanded를 직접 반영
  private _updateTriggerAria() {
    const trigger = this.querySelector('[slot="trigger"]')
    if (!trigger) return
    trigger.setAttribute('aria-haspopup', 'true')
    trigger.setAttribute('aria-expanded', String(this.isOpen))
  }

  protected updated(changed: PropertyValues) {
    if (changed.has('isOpen')) {
      this._updateTriggerAria()
    }
  }

  render() {
    return html`
      <div part="dropdown" class="dropdown">${this.renderTrigger()} ${this.renderList()}</div>
    `
  }
}

export default Dropdown
