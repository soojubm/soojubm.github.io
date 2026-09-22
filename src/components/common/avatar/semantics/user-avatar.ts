import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AvatarSize } from '@/components/common/avatar/avatar'

import '@/components/common/avatar/avatar'
import '@/components/common/tag/semantics/dot'
import { buildAttributeRules } from '@/utils'

const userAvatarSizeTokens = {
  '80': { '--dot-size': 'var(--size-16)' },
  '48': { '--dot-size': '12px' },
}

@customElement('mm-user-avatar')
export class UserAvatar extends LitElement {
  static styles = css`
    /* 겹쳐 놓을 때 소비자가 host에 두르는 ring이 아바타의 원을 따라가게 한다. */
    :host {
      display: inline-flex;
      flex-shrink: 0;
      width: fit-content;
      height: fit-content;
      border-radius: var(--radius-full);
      position: relative;
    }

    /* 원의 45° 지점에 점의 중심을 얹는다. 모서리에서 반지름의 29.3%가 그 지점이다. */
    mm-dot {
      --dot-size: 8px;

      outline: calc(var(--border-width) * 2) solid var(--background-color);
      position: absolute;
      inset-inline-end: calc(14.6% - var(--dot-size) / 2);
      inset-block-end: calc(14.6% - var(--dot-size) / 2);
    }

    ${unsafeCSS(buildAttributeRules('size', userAvatarSizeTokens, 'mm-dot'))}
  `
  @property({ type: String }) name = ''
  @property({ type: String }) src?: string
  @property({ type: String, reflect: true, useDefault: true }) size: AvatarSize = '40'
  @property({ type: Boolean }) online = false
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  render() {
    return html`
      <mm-avatar
        shape="circle"
        size=${this.size}
        src=${ifDefined(this.src)}
        aria-label=${this.ariaLabel}
      >
        ${this.renderInitials()}
      </mm-avatar>
      ${this.renderPresence()}
    `
  }

  private renderInitials() {
    if (!this.initials) return nothing

    return this.initials
  }

  private renderPresence() {
    if (!this.online) return nothing

    return html`
      <mm-dot variant="online" role="img" aria-label="접속 중"></mm-dot>
    `
  }

  /** 사람 이름의 앞 글자. 공백으로 나뉘면 두 단어까지 딴다. */
  private get initials() {
    const words = this.name.trim().split(/\s+/).filter(Boolean)
    if (!words.length) return ''

    return words
      .slice(0, 2)
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
  }
}
