import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, queryAll, state } from 'lit/decorators.js'

import {
  computedTokenValue,
  tokenAliases,
  tokenDisplayName,
} from '@/components/domains/component/token-values'
import { ThemeChangeController } from '@/controllers/theme-change-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { contrastRatio } from '@/utils/color'
import '@/components/common/text/text'
import '@/components/common/tag/tag'
import '@/components/common/tag/tag-group'

/**
 * 색상 토큰 카드.
 * 토큰 이름만 받아 스와치·캡션·태그·명도 대비를 모두 그 이름에서 끌어낸다.
 * 값은 자기 자리에서 계산된 스타일로 읽고, 대비는 화면에 실제로 쓰인 두 색을 재서 붙이므로
 * 색을 바꾸거나 테마를 바꿔도 문서가 따라온다.
 * pairs에 전경색 토큰을 주면 그 표면 위에 유효한 조합을 쌓아 시연한다.
 * 색상 토큰 표를 구성하는 단위로 mm-token-item의 색상 대응물이다.
 */
@customElement('mm-color-token')
export class ColorToken extends LitElement {
  static styles = [
    resetStyles,
    css`
      /* 그리드 한 줄에서 카드 높이가 맞춰지면 스와치가 남는 높이를 가져간다.
         태그가 여러 줄로 늘어난 카드 옆에 빈 여백이 남지 않게 한다. */
      :host {
        display: flex;
        flex-direction: column;
        border: var(--border);
        border-radius: var(--radius);
        overflow: hidden;
      }

      .swatch {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: flex-end;
        min-height: var(--size-80);
        padding: var(--space-3) var(--space-4);
        background: var(--color-token-background-color);
        box-sizing: border-box;
      }

      /* 이 색을 물려받는 상위 토큰 태그: 칩 위쪽에 두고 대비쌍을 아래로 민다.
         한 원시 색이 여러 역할로 쓰이면 줄바꿈으로 늘어나므로 스와치가 함께 자라야 한다. */
      .tags {
        margin-bottom: auto;
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

  private themeChange = new ThemeChangeController(this)

  /** 스와치로 보여줄 색상 토큰 이름 (예: gray800, background-subtle-color) */
  @property({ type: String }) name = ''
  /** 이 표면 위에 얹는 전경색 토큰 이름, 위에서 아래로 쌓인다. */
  @property({ attribute: false }) pairs: string[] = []

  @state() private contrasts: string[] = []

  @query('.swatch') private swatch!: HTMLElement
  @queryAll('.label-row') private labelRows!: NodeListOf<HTMLElement>

  render() {
    return html`
      <figure class="swatch" style="--color-token-background-color: var(--${this.name})">
        ${this.renderTags()} ${this.renderPairs()}
      </figure>
      ${this.renderCaption()}
    `
  }

  updated() {
    this.measureContrasts()
  }

  private renderTags() {
    const aliases = tokenAliases(this.name).map(tokenDisplayName)
    if (!aliases.length) return nothing

    if (aliases.length === 1) {
      return html`
        <mm-tag class="tags">${aliases[0]}</mm-tag>
      `
    }

    return html`
      <mm-tag-group class="tags">
        ${aliases.map(
          alias =>
            html`
              <mm-tag>${alias}</mm-tag>
            `,
        )}
      </mm-tag-group>
    `
  }

  private renderPairs() {
    return this.pairs.map(
      (pair, index) => html`
        <div class="label-row" style="color: var(--${pair})">
          <mm-text size="12" weight="bold">${tokenDisplayName(pair)}</mm-text>
          <span class="contrast">${this.contrasts[index] ?? ''}</span>
        </div>
      `,
    )
  }

  private renderCaption() {
    if (!this.name) return nothing

    return html`
      <figcaption>
        <mm-text size="12" weight="bold">
          ${tokenDisplayName(this.name)}: ${computedTokenValue(this.name, this)}
        </mm-text>
      </figcaption>
    `
  }

  /** 대비는 브라우저가 실제로 칠한 색끼리 잰다. 토큰이 어떤 단계를 거쳐 왔는지와 무관해진다. */
  private measureContrasts() {
    const background = getComputedStyle(this.swatch).backgroundColor
    const measured = [...this.labelRows].map(row =>
      contrastRatio(getComputedStyle(row).color, background),
    )

    if (measured.join() === this.contrasts.join()) return

    this.contrasts = measured
  }
}
