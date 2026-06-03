import { css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ToggleButton } from './toggle-button'
import '../button'

/**
 * 팔로우 토글 버튼.
 * ToggleButton의 토글 로직을 상속하고, mm-button으로 렌더링합니다.
 */
@customElement('mm-follow-button')
export class FollowButton extends ToggleButton {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      :host([selected]) mm-button {
        --button-color: var(--selection-background);
        --button-border: 1px solid var(--selection-indicator-color);
        --button-text-color: var(--selection-foreground);
      }
    `,
  ]

  override render() {
    return html`
      <mm-button
        icon=${this.selected ? 'check' : 'plus'}
        ?disabled=${this.disabled}
        aria-pressed=${this.selected ? 'true' : 'false'}
        @click=${this.handleClick}
      >
        ${this.selected ? '팔로잉' : '팔로우'}
      </mm-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-follow-button': FollowButton
  }
}
