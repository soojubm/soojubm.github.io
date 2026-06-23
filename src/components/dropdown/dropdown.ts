import { LitElement, css, html, nothing, type PropertyValues } from 'lit'
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'
import '../button/button'
import { ICON_NAMES, type IconName } from '../icon-button/semantics/icon-names'
import '../menuitem/semantics/menu-item-action'
import '../menuitem/semantics/menu-item-checkbox'

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
  @property({ type: String }) value = ''
  @property({ type: String }) placement: 'left' | 'right' = 'left'
  @state() protected isOpen = false
  @state() protected options: DropdownOption[] = []

  @queryAssignedElements({ selector: 'option', flatten: true })
  private _optionElements!: HTMLOptionElement[]
  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private _triggerElements!: HTMLElement[]

  static styles = [
    resetStyles,
    css`
      .dropdown {
        --dropdown-offset: var(--space-1);
        --dropdown-z-index: var(--zindex-loader);
        --dropdown-min-width: calc(var(--width-small) - var(--space-4) * 5);
        --dropdown-max-height: var(--width-small);

        position: relative;
        width: 100%;
      }

      .dropdown-button {
        // TODO component and state
        mm-icon {
          transition: transform 160ms ease;
        }

        &[aria-expanded='true'] mm-icon {
          transform: rotate(180deg);
        }
      }

      .dropdown-list {
        display: flex;
        flex-direction: column;

        min-width: var(--dropdown-min-width);
        max-height: var(--dropdown-max-height);

        padding: var(--space-1);
        border: var(--border-stronger);
        border-radius: var(--radius);
        background: var(--color-background);
        box-shadow: var(--shadow);

        position: absolute;
        top: calc(100% + var(--dropdown-offset));
        left: 0;
        right: 0;
        z-index: var(--dropdown-z-index);

        overflow-y: auto;
        box-sizing: border-box;

        opacity: 0;
        transform: translateY(var(--space-1-minus)) scale(0.98);
        transform-origin: top left;
        visibility: hidden;
        pointer-events: none;
        transition: opacity 120ms ease, transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1),
          visibility 0s linear 180ms;

        &[open] {
          opacity: 1;
          transform: translateY(0) scale(1);
          visibility: visible;
          pointer-events: auto;
          transition: opacity 120ms ease, transform 220ms cubic-bezier(0.18, 1.25, 0.4, 1),
            visibility 0s;
        }

        &[placement='right'] {
          left: auto;
          right: 0;
        }
      }

      mm-menu-item-action[aria-current='true'] {
        color: var(--selection-foreground);
      }
    `,
  ]

  connectedCallback(): void {
    super.connectedCallback()
    document.addEventListener('click', this.handleOutsideClick)
  }

  firstUpdated() {
    this.syncOptions()
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
  }

  // light DOM의 <option> 요소를 DropdownOption 데이터로 변환
  private parseLightDomOptions(): DropdownOption[] {
    return this._optionElements.map(option => ({
      label: option.textContent || '',
      value: option.value,
      type: (option.getAttribute('type') as 'default' | 'checkbox') || 'default',
      checked: option.hasAttribute('checked'),
      selected: option.hasAttribute('selected'),
      icon: (option.getAttribute('icon') as IconName | null) ?? undefined,
    }))
  }

  // value > selected > 첫 default 옵션 순으로 표시 라벨 결정
  private resolveSelectedLabel(): string {
    return (
      this.options.find(option => option.value === this.value)?.label ??
      this.options.find(option => option.selected)?.label ??
      this.options.find(option => option.type === 'default')?.label ??
      'Select an option'
    )
  }

  protected toggleOpen() {
    this.isOpen = !this.isOpen
  }

  // 일반 아이템 클릭 시: 선택 라벨 변경 후 드롭다운 닫기
  protected selectOption(option: DropdownOption) {
    this.value = option.value
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
    e.stopPropagation()

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
          values: this.options.filter(o => o.checked).map(o => o.value),
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
        <mm-button
          class="dropdown-button"
          size="small"
          aria-haspopup="true"
          aria-expanded=${String(this.isOpen)}
        >
          ${this.resolveSelectedLabel()}
          <mm-icon name=${ICON_NAMES.EXPAND}></mm-icon>
        </mm-button>
      </slot>
    `
  }

  protected renderList() {
    return html`
      <div
        part="list"
        class="dropdown-list"
        ?open=${this.isOpen}
        placement=${this.placement}
        role="menu"
      >
        ${repeat(
          this.options,
          option => option.value,
          option => this.renderOption(option),
        )}
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
        icon=${option.icon || nothing}
        aria-current=${option.value === this.value ? 'true' : nothing}
        @click="${() => this.selectOption(option)}"
      >
        ${option.label}
      </mm-menu-item-action>
    `
  }

  // 펼침 상태는 실제 트리거 요소가 소유하므로 네이티브 attribute를 직접 갱신한다.
  private _updateTriggerAria() {
    const trigger = this._triggerElements[0]
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
      <slot hidden @slotchange=${this.syncOptions}></slot>
    `
  }
}

export default Dropdown
