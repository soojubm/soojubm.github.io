import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/avatar/avatar'
import '@/components/common/text/text'

@customElement('mm-avatar-group')
export class AvatarGroup extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
      border-radius: var(--radius);
    }

    .avatars {
      display: flex;
    }

    .avatars mm-avatar {
      margin-left: -6px;
      outline: 4px solid var(--background-color);
    }

    .avatars mm-avatar:first-child {
      margin-left: 0;
    }

    .label {
      font-size: var(--font-size-14);
      line-height: var(--size-24);
      color: var(--foreground-color);
    }
  `
  @property({ attribute: false }) avatars: string[] = []
  @property({ type: String }) label = ''
  /** 노출할 최대 아바타 수 (나머지는 +N으로 묶음) */
  private readonly maxVisible = 3

  render() {
    const overflowCount = this.avatars.length - this.maxVisible

    return html`
      <div class="avatars">${this.renderAvatarList(overflowCount)}</div>
      ${this.renderLabel()}
    `
  }

  private renderAvatarList(overflowCount: number) {
    return [this.renderAvatars(), this.renderOverflow(overflowCount)]
  }

  private renderAvatars() {
    return this.avatars.slice(0, this.maxVisible).map(src => this.renderAvatar(src))
  }

  private renderAvatar(src: string) {
    return html`
      <mm-avatar size="32" shape="circle" .src=${src || undefined}></mm-avatar>
    `
  }

  private renderOverflow(overflowCount: number) {
    if (overflowCount <= 0) return nothing

    return html`
      <mm-avatar size="32" shape="circle">
        <mm-text size="12">+${overflowCount}</mm-text>
      </mm-avatar>
    `
  }

  private renderLabel() {
    if (!this.label) return nothing

    return html`
      <mm-text class="label">${this.label}</mm-text>
    `
  }
}
