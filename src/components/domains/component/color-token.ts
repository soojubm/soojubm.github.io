import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, queryAll, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import {
  computedTokenValue,
  primitiveTokenName,
  tokenAliases,
  tokenDisplayName,
} from '@/components/domains/component/token-values'
import { ThemeChangeController } from '@/controllers/theme-change-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { contrastRatio } from '@/utils/color'
import '@/components/common'

// 원시 색 스와치에 태그로 붙이는 역할. 상태 역할끼리는 색이 달라 한 원시 색에 하나만 붙는다.
// 상태를 표현하는 색만 붙이고, 표면·전경·테두리처럼 원시 색을 물려받는 나머지 역할은 각자의 목록에서 소개한다.
const STATUS_ROLES = ['primary', 'accent', 'danger', 'warning']

@customElement('fff-color-token')
export class ColorToken extends LitElement {
  static styles = [
    resetStyles,
    css`
      /* 그리드 한 줄에서 카드 높이가 맞춰지면 스와치가 남는 높이를 가져간다.
         대비쌍이 더 많은 카드 옆에 빈 여백이 남지 않게 한다. */
      :host {
        ${surfaceBaseStyles};
        --surface-padding: 0;
        --surface-border: none;

        overflow: hidden;
      }

      .swatch {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: flex-end;
        gap: var(--space-1);
        min-height: var(--size-80);
        padding: var(--space-3);
        border-radius: var(--border-radius);
        background: var(--color-token-background-color);
        box-sizing: border-box;
      }

      /* 카드 바탕과 같은 색은 면이 사라지므로 스와치에만 경계선을 두른다. */
      .swatch.blends-in {
        box-shadow: inset 0 0 0 var(--border-width) var(--border-color);
      }

      /* 이 색을 물려받는 상태 역할 태그: 칩 위쪽에 두고 대비쌍을 아래로 민다. */
      fff-code-tag {
        align-self: flex-start;
        margin-bottom: auto;
      }

      /* 캡션처럼 이름을 위에, 값을 아래에 둔다. 이름은 라벨 색을 낮춰 값보다 한 걸음 물러난다. */
      .label-row {
        display: flex;
        flex-direction: column;
        font-family: var(--font-family-code);
      }

      .key {
        opacity: 0.7;
      }

      /* 명도 대비: 보조 정보라 값 옆에 10px로 낮춘다. */
      .detail {
        margin-left: var(--space-1);
        font-size: 10px;
        opacity: 0.7;
      }

      figcaption {
        margin-top: var(--space-2);
        font-family: var(--font-family-code);
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
  @state() private blendsIn = false
  @query('.swatch') private swatch!: HTMLElement
  @queryAll('.label-row') private labelRows!: NodeListOf<HTMLElement>

  render() {
    return html`
      <figure
        class=${classMap({ swatch: true, 'blends-in': this.blendsIn })}
        style=${styleMap({ '--color-token-background-color': `var(--${this.name})` })}
      >
        ${this.renderRoleTag()} ${this.renderPairs()}
      </figure>
      ${this.renderCaption()}
    `
  }

  updated() {
    this.measureContrasts()
  }

  private renderRoleTag() {
    const role = tokenAliases(this.name)
      .map(tokenDisplayName)
      .find(alias => STATUS_ROLES.includes(alias))
    if (!role) return nothing

    return html`
      <fff-code-tag>${role}</fff-code-tag>
    `
  }

  private renderPairs() {
    return this.pairs.map(
      (pair, index) => html`
        <div class="label-row" style=${styleMap({ color: `var(--${pair})` })}>
          <fff-text class="key" size="12" weight="bold">${pair}</fff-text>
          <fff-text size="12" weight="bold">
            ${this.referencedValue(pair)}
            <span class="detail">${this.contrasts[index] ?? ''}</span>
          </fff-text>
        </div>
      `,
    )
  }

  private renderCaption() {
    if (!this.name) return nothing

    // 시맨틱 토큰은 실제 색이 아니라 물려받는 원시 토큰 이름을 보여준다. 값은 테마마다 바뀌어도
    // 어떤 원시 색을 참조하는지는 구조로 고정되어 있어, 그 구조를 그대로 문서화한다.
    const value = this.referencedValue(this.name)

    return html`
      <figcaption>
        <fff-text size="12" weight="bold" color="light">${this.name}</fff-text>
        <fff-text size="12" weight="bold">${value}</fff-text>
      </figcaption>
    `
  }

  private referencedValue(name: string) {
    return primitiveTokenName(name) ?? computedTokenValue(name, this)
  }

  /** 대비는 브라우저가 실제로 칠한 색끼리 잰다. 토큰이 어떤 단계를 거쳐 왔는지와 무관해진다. */
  private measureContrasts() {
    const background = getComputedStyle(this.swatch).backgroundColor
    // 카드 바탕과 대비가 없으면 스와치 면이 보이지 않는다.
    const blendsIn = contrastRatio(background, getComputedStyle(this).backgroundColor) === '1.0:1'
    if (blendsIn !== this.blendsIn) this.blendsIn = blendsIn

    const measured = [...this.labelRows].map(row =>
      contrastRatio(getComputedStyle(row).color, background),
    )

    if (measured.join() === this.contrasts.join()) return

    this.contrasts = measured
  }
}
