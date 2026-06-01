import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../shared/reset.styles'
import '../../text/semantics/section-title'

/**
 * 개별 CSS 커스텀 프로퍼티(토큰) 행.
 * mm-component-tokens 안에서만 사용합니다.
 */
@customElement('mm-token')
export class Token extends LitElement {
  /** CSS 변수 이름 (예: --avatar-size) */
  @property({ type: String }) name = ''
  /** 기본값 (예: var(--size-medium)) */
  @property({ type: String }) default = ''
  /** 토큰 설명 */
  @property({ type: String }) description = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: contents;
      }

      dt {
        font-size: var(--font-size-14);
      }

      .meta {
        display: flex;
        flex-direction: column;
      }
    `,
  ]

  render() {
    return html`
      <dt>${this.name}</dt>
      <dd class="meta">
        ${this.default ? html`<mm-text>${this.default}</mm-text>` : ''}
        ${this.description ? html`<mm-text>${this.description}</mm-text>` : ''}
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
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .component-tokens {
        margin: 1rem 0 0 calc(-5vw + 1rem);
        padding: 1.5rem calc(var(--grid-margin) - 1rem);
        background-color: var(--color-background-subtle);
        border: var(--component-tokens-border, none);
        border-radius: var(--radius-large);
      }

      dl {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: var(--space-2) var(--space-4);
        margin: 0;
      }

      @media (max-width: 1100px) {
        .component-tokens {
          margin-inline: calc(var(--grid-margin) * -1);
          padding-inline: var(--grid-margin);
          border-inline: 0;
          border-radius: 0;
        }
      }
    `,
  ]

  render() {
    return html`
      <div class="component-tokens">
        <mm-section-title style="display:none;">Component Tokens</mm-section-title>
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
