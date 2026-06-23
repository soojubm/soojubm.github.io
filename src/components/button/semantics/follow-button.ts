import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import '../button'
import { toggleSelection } from '../button.utils'

@customElement('mm-follow-button')
export class FollowButton extends LitElement {
  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: Boolean }) disabled = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      :host([selected]) mm-button {
        --button-color: var(--selection-background);
        --button-border: var(--border-width) solid var(--selection-indicator-color);
        --button-text-color: var(--selection-foreground);
      }
    `,
  ]

  private handleClick() {
    toggleSelection(this)
  }

  render() {
    return html`
      <mm-button
        variant=${this.selected ? 'tertiary' : 'primary'}
        ?disabled=${this.disabled}
        aria-pressed=${String(this.selected)}
        @click=${this.handleClick}
      >
        ${this.selected ? '팔로우 중' : '팔로우'}
      </mm-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-follow-button': FollowButton
  }
}
