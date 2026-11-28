import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { spaceTokens } from '@/stylesheets/shared.styles'
import type { Space } from '@/stylesheets/shared.types'
import { buildAttributeRules } from '@/utils'
import '@/components/common'

@customElement('fff-token-swatches')
export class TokenSwatches extends LitElement {
  static styles = css`
    :host {
      --token-swatches-gap: var(--space-4);

      display: flex;
      align-items: flex-end;
      gap: var(--token-swatches-gap);
      /* hover lift 스와치가 위로 뜬 만큼 fff-scroll의 overflow가 잘라내지 않도록 남기는 여유 */
      padding-top: var(--space-1);
    }

    ${unsafeCSS(buildAttributeRules('gap', spaceTokens('--token-swatches-gap')))}

    .swatch {
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: var(--size-48);
      height: var(--size-48);
      border-radius: var(--border-radius);
      background: var(--background-color);
    }

    .column {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: var(--space-2);
    }
  `
  /** 칠할 CSS 선언 문자열. 원소마다 스와치 하나가 된다. */
  @property({ attribute: false }) swatches: string[] = []
  /** 스와치 안에 올릴 짧은 텍스트. swatches와 같은 순서로 짝지어지며, 칠한 면 위에서 읽히는지 보여줄 때 쓴다. */
  @property({ attribute: false }) contents: string[] = []
  @property({ type: String, reflect: true }) gap: Space = '4'

  render() {
    return html`
      ${this.swatches.map((swatch, index) => this.renderSwatch(swatch, index))}
    `
  }

  private renderSwatch(swatch: string, index: number) {
    return html`
      <div class="column">
        <div class="swatch" style=${swatch}>${this.renderContent(index)}</div>
        <fff-list-marker variant="number" value=${index + 1}></fff-list-marker>
      </div>
    `
  }

  private renderContent(index: number) {
    const content = this.contents[index]
    if (!content) return nothing

    return html`
      <fff-text size="12" weight="bold">${content}</fff-text>
    `
  }
}
