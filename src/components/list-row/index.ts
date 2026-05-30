import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-list-row')
class ListRow extends LitElement {
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'
  @property({ type: String }) size = 'medium'
  @property({ type: String }) icon = ''
  @property({ type: String, attribute: 'primarytext' }) primaryText = ''
  @property({ type: String, attribute: 'secondarytext' }) secondaryText = ''

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      width: 100%;
      gap: var(--space-2);
    }
    .text-container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .text-container.size-small {
      flex-direction: row;
      align-items: center;
      gap: var(--space-2);
    }
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `

  render() {
    return html`
      <div class="avatar">
        <mm-avatar
          variant="${this.avatarVariant}"
          size="${this.size}"
          icon="${this.icon}"
        ></mm-avatar>
      </div>
      <div class="text-container ${this.size === 'small' ? 'size-small' : ''}">
        <mm-text size="14" weight="bold">${this.primaryText}</mm-text>
        ${this.secondaryText ? html`<mm-text size="12" color="var(--color-foreground-light)">${this.secondaryText}</mm-text>` : ''}
      </div>
    `
  }
}

export default ListRow
