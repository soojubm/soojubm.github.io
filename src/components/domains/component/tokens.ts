import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../text/semantics/heading'
import { componentTokensStyles, tokenStyles } from './tokens.styles'

/**
 * 개별 CSS 커스텀 프로퍼티(토큰) 행.
 * mm-component-tokens 안에서만 사용합니다.
 */
@customElement('mm-token')
export class Token extends LitElement {
  @property({ type: String }) name = ''
  @property({ type: String }) default = ''

  static styles = tokenStyles

  render() {
    return html`
      <dt>${this.name}</dt>
      <dd class="meta">
        ${this.default
          ? html`
              <mm-text>${this.default}</mm-text>
            `
          : ''}
      </dd>
    `
  }
}

/**
 * 컴포넌트 CSS 커스텀 프로퍼티(토큰) 목록.
 * mm-component-props와 동일한 레이아웃으로 토큰을 소개합니다.
 */
@customElement('mm-component-tokens')
export class ComponentTokens extends LitElement {
  static styles = componentTokensStyles

  render() {
    return html`
      <div class="component-tokens component-content-frame">
        <mm-heading style="display:none;">Component Tokens</mm-heading>
        <dl>
          <slot></slot>
        </dl>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-token': Token
    'mm-component-tokens': ComponentTokens
  }
}
