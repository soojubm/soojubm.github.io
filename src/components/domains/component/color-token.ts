import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/text/text'
import '@/components/common/tag/tag'
import '@/components/common/tag/tag-group'

/**
 * 색상 토큰 카드.
 * 원시 색(color)을 스와치로 보여주고, 캡션으로 토큰·값 매핑을 문서화한다.
 * text-color를 주면 surface 위에 대비쌍을 얹어 조합과 명도 대비(contrast)를 시연하고,
 * tags를 주면 그 원시 색을 참조하는 시맨틱 토큰 이름을 스와치 좌상단에 붙인다.
 * 색상 토큰 표를 구성하는 단위로 mm-token-item의 색상 대응물이다.
 */
@customElement('mm-color-token')
export class ColorToken extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        border: var(--border);
        border-radius: var(--radius);
        overflow: hidden;
      }

      .swatch {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        min-height: var(--size-80);
        padding: var(--space-3) var(--space-4);
        background: var(--color-token-surface);
        color: var(--color-token-on-surface);
        box-sizing: border-box;
      }

      /* 시맨틱 토큰 태그: 칩 좌상단에 얹는다. */
      .tags {
        position: absolute;
        top: var(--space-2);
        left: var(--space-3);
      }

      .label-row {
        display: flex;
        align-items: baseline;
        gap: var(--space-2);
      }

      /* 명도 대비 값: 라벨 색으로 흐르되 보조 정보라 10px로 낮춘다. */
      .contrast {
        font-size: 10px;
        opacity: 0.7;
      }

      figcaption {
        padding-bottom: var(--space-3);
        margin-left: var(--space-4);
        margin-top: var(--space-2);
        color: var(--foreground-color);
      }
    `,
  ]

  /** surface 배경색 (예: var(--color-primary)) */
  @property({ type: String }) color = ''
  @property({ type: String, attribute: 'text-color' }) textColor = ''
  /** surface 안에 표시되는 대비 라벨 (예: "foreground") */
  @property({ type: String }) label = ''
  /** 라벨 우측에 붙는 명도 대비 값 (예: "11.7:1") */
  @property({ type: String }) contrast = ''
  /** 캡션의 토큰·값 매핑 (예: "gray800: #303b35") */
  @property({ type: String }) token = ''
  /** 이 색을 참조하는 시맨틱 토큰 이름, 공백 구분 (예: "primary success") */
  @property({ type: String }) tags = ''

  render() {
    return html`
      <figure
        class="swatch"
        style=${`--color-token-surface: ${this.color}; --color-token-on-surface: ${this.textColor}`}
      >
        ${this.renderTags()} ${this.renderLabel()}
      </figure>
      ${this.renderCaption()}
    `
  }

  private renderTags() {
    if (!this.tags) return nothing

    const names = this.tags.split(' ').filter(Boolean)

    return html`
      <mm-tag-group class="tags">
        ${names.map(
          name =>
            html`
              <mm-tag>${name}</mm-tag>
            `,
        )}
      </mm-tag-group>
    `
  }

  private renderLabel() {
    if (!this.label && !this.contrast) return nothing

    return html`
      <div class="label-row">
        ${this.label
          ? html`
              <mm-text size="12" weight="bold">${this.label}</mm-text>
            `
          : nothing}
        ${this.contrast
          ? html`
              <span class="contrast">${this.contrast}</span>
            `
          : nothing}
      </div>
    `
  }

  private renderCaption() {
    if (!this.token) return nothing

    return html`
      <figcaption>
        <mm-text size="12" weight="bold">${this.token}</mm-text>
      </figcaption>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-color-token': ColorToken
  }
}
