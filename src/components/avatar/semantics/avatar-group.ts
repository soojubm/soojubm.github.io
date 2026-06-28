import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { arrayAttributeConverter } from '@/utils/property-converters'
import '@/components/flex/flex'
import '@/components/text/text'

@customElement('mm-avatar-group')
export class AvatarGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .avatars {
        display: flex;
      }

      .avatars mm-avatar,
      .avatars .overflow {
        margin-left: -6px;
      }

      .avatars mm-avatar:first-child,
      .avatars .overflow:first-child {
        margin-left: 0;
      }

      .label {
        font-size: var(--font-size-14);
        line-height: var(--size-small);
        color: var(--color-foreground);
      }
    `,
  ]

  @property({
    attribute: 'avatars',
    converter: arrayAttributeConverter<string>(),
  })
  avatars: string[] = []

  @property({ type: String }) label = ''
  @property({ type: String }) size = 'small'

  /** 노출할 최대 아바타 수 (나머지는 +N으로 묶음) */
  private readonly maxVisible = 3

  render() {
    const overflowCount = this.avatars.length - this.maxVisible

    return html`
      <mm-flex gap="2" align-items="center">
        <div class="avatars">${this.renderAvatarList(overflowCount)}</div>
        ${this.renderLabel()}
      </mm-flex>
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
      <mm-avatar size=${this.size} .src=${src || undefined}></mm-avatar>
    `
  }

  private renderOverflow(overflowCount: number) {
    if (overflowCount <= 0) return nothing

    return html`
      <mm-avatar size=${this.size}>
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

declare global {
  interface HTMLElementTagNameMap {
    'mm-avatar-group': AvatarGroup
  }
}
