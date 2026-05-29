import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

interface DropdownOption {
  label: string
  value: string
  type: 'default' | 'checkbox'
  checked: boolean
}

@customElement('mm-dropdown')
class Dropdown extends LitElement {
  @state() private isOpen = false
  @state() private selectedLabel = 'Select an option'
  @state() private options: DropdownOption[] = []

  static styles = css`
    .dropdown {
      position: relative;
      width: 100%;
    }

    .dropdown-button {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 10px var(--space-3);
      border: var(--border-stronger);
      border-radius: var(--radius);
      background-color: var(--color-background);
      color: var(--color-foreground);
      cursor: pointer;
      text-align: left;
      font-family: inherit;
    }

    .dropdown-button[aria-expanded='true'] mm-icon {
      transform: rotate(180deg);
    }

    .dropdown-button mm-icon {
      transition: transform 160ms ease;
    }

    .dropdown-list {
      position: absolute;
      top: calc(100% + 4px);
      left: 0;
      right: 0;
      z-index: 10;

      max-height: 200px;
      overflow-y: auto;
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
  `

  connectedCallback(): void {
    super.connectedCallback()
    // 마크업에서 type과 checked 속성을 함께 읽어옵니다.
    this.options = Array.from(this.querySelectorAll('option')).map(option => ({
      label: option.textContent || '',
      value: option.value,
      type: (option.getAttribute('type') as 'default' | 'checkbox') || 'default',
      checked: option.hasAttribute('checked'),
    }))
  }

  private toggleOpen() {
    this.isOpen = !this.isOpen
  }

  // 일반 아이템 클릭 시: 선택 라벨 변경 후 드롭다운 닫기
  private selectOption(option: DropdownOption) {
    this.selectedLabel = option.label
    this.isOpen = false
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { type: 'select', value: option.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  // 체크박스 아이템 변경 시: 데이터 상태만 업데이트 (드롭다운을 닫지 않음)
  private handleCheckboxChange(option: DropdownOption, e: CustomEvent) {
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

  render() {
    return html`
      <div class="dropdown">
        <button
          class="dropdown-button"
          aria-haspopup="true"
          aria-expanded="${this.isOpen}"
          @click="${this.toggleOpen}"
        >
          ${this.selectedLabel}
          <mm-icon name="nav-arrow-down"></mm-icon>
        </button>
        <div class="dropdown-list ${this.isOpen ? 'open' : ''}" role="menu">
          ${this.options.map(option => {
            // 1. 체크박스 타입일 때
            if (option.type === 'checkbox') {
              return html`
                <mm-menu-item-checkbox
                  .checked=${option.checked}
                  @change=${(e: CustomEvent) => this.handleCheckboxChange(option, e)}
                >
                  ${option.label}
                </mm-menu-item-checkbox>
              `
            }
            // 2. 기본 일반 행 타입일 때
            return html`
              <mm-menu-item-row @click="${() => this.selectOption(option)}">
                ${option.label}
              </mm-menu-item-row>
            `
          })}
        </div>
      </div>
    `
  }
}

export default Dropdown
