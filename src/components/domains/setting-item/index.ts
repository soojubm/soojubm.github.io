import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-setting-item')
export class SettingItem extends LitElement {
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''

  @property({ type: Boolean, reflect: true })
  disabled = false

  static styles = css`
    :host {
      display: block;
      border-bottom: 1px solid var(--color-border, #262626);
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4, 16px);
      padding: var(--space-5, 20px) 0;
    }

    .content {
      min-width: 0;
      display: flex;
      flex-direction: column;
    }

    .action {
      flex: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
  `

  render() {
    return html`
      <div class="item">
        <div class="content">
          <mm-text weight="bold">${this.label}</mm-text>
          <mm-text>${this.description}</mm-text>
        </div>
        <div class="action">
          <slot name="action"></slot>
        </div>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-setting-item': SettingItem
  }
}
