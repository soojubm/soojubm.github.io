import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import Dropdown, { type DropdownOption } from '../../dropdown/dropdown'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import '../../button/button'

@customElement('mm-model-selector')
export class ModelSelector extends Dropdown {
  @property({ type: String, reflect: true }) value = 'claude-sonnet'

  protected get defaultOptions(): DropdownOption[] {
    return [
      { label: 'Claude Opus',   value: 'claude-opus',   type: 'default', checked: false, selected: this.value === 'claude-opus' },
      { label: 'Claude Sonnet', value: 'claude-sonnet', type: 'default', checked: false, selected: this.value === 'claude-sonnet' },
      { label: 'Claude Haiku',  value: 'claude-haiku',  type: 'default', checked: false, selected: this.value === 'claude-haiku' },
    ]
  }

  static styles = [
    ...Dropdown.styles,
    css`
      .dropdown {
        width: auto;
      }

      /* 위로 열리는 리스트 */
      .dropdown-list {
        top: auto;
        bottom: calc(100% + 4px);
        left: 0;
        right: auto;
        transform-origin: bottom center;
        transform: translateY(4px) scale(0.98);
      }

      .dropdown-list.open {
        transform: translateY(0) scale(1);
      }

      .dropdown-list.align-right {
        left: auto;
        right: 0;
      }

      mm-button {
        --button-icon-gap: var(--space-1);
      }

      mm-button mm-icon {
        transition: transform 160ms ease;
      }

      mm-button[aria-expanded='true'] mm-icon {
        transform: rotate(180deg);
      }
    `,
  ]

  protected renderTrigger() {
    return html`
      <mm-button
        variant="tertiary"
        size="medium"
        icon=${ICON_NAMES.EXPAND}
        icon-position="trailing"
        aria-haspopup="true"
        aria-expanded="${this.isOpen}"
        @click="${this.toggleOpen}"
      >
        ${this.selectedLabel}
      </mm-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-model-selector': ModelSelector
  }
}
