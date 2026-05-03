import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

interface OptionItem {
  label: string
  value: string
}

@customElement('button-list-component')
class ButtonListComponent extends LitElement {
  @property({ type: String }) options = '[]'
  @state() private selectedIndex = 0

  static styles = css`
    :host {
    }

    .button-list {
      display: flex;
      overflow: hidden;
      border: var(--border-stronger);
      border-radius: var(--radius);
    }

    button {
      border: 0;
      background: transparent;
      flex: 1;
      padding: 8px 16px;
      cursor: pointer;
      transition: background 0.3s, border-color 0.3s;

      font-family: inherit;
      font-weight: var(--font-weight-bold);
      color: var(--color-foreground);
    }

    button:hover {
      outline: 2px solid var(--color-border);
    }

    button.selected {
      background: var(--color-background-subtle);
      border-color: var(--color-primary);
      color: var(--color-primary);
    }
  `

  private get parsedOptions(): OptionItem[] {
    try {
      const parsed = JSON.parse(this.options)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  private onButtonClick(index: number, value: string) {
    this.selectedIndex = index

    this.dispatchEvent(
      new CustomEvent('optionChange', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <div class="button-list">
        ${this.parsedOptions.map(
          (option, index) => html`
            <button
              class=${index === this.selectedIndex ? 'selected' : ''}
              @click=${() => this.onButtonClick(index, option.value)}
            >
              ${option.label}
            </button>
          `,
        )}
      </div>
    `
  }
}

export default ButtonListComponent
