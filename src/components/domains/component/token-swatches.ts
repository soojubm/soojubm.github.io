import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { spaceTokens, type Space } from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'
import '@/components/common'

/**
 * 토큰마다 달라지는 선언 하나씩을 공통 박스에 칠해 번호와 함께 늘어놓는다.
 * 번호는 스와치를 가리키는 순번이며, 아래 토큰 목록과 같은 순서로 놓아야 짝이 맞는다.
 */
@customElement('mm-token-swatches')
export class TokenSwatches extends LitElement {
  static styles = css`
    :host {
      --token-swatches-gap: var(--space-4);

      display: flex;
      align-items: flex-end;
      gap: var(--token-swatches-gap);
      /* hover lift 스와치가 위로 뜬 만큼 mm-scroll의 overflow가 잘라내지 않도록 남기는 여유 */
      padding-top: var(--space-1);
    }

    ${unsafeCSS(buildAttributeRules('gap', spaceTokens('--token-swatches-gap')))}

    .swatch {
      flex-shrink: 0;
      width: var(--size-48);
      height: var(--size-48);
      border-radius: var(--radius);
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
  @property({ type: String, reflect: true }) gap: Space = '4'

  render() {
    return html`
      ${this.swatches.map((swatch, index) => this.renderSwatch(swatch, index))}
    `
  }

  private renderSwatch(swatch: string, index: number) {
    return html`
      <div class="column">
        <div class="swatch" style=${swatch}></div>
        <mm-list-marker variant="number" value=${index + 1}></mm-list-marker>
      </div>
    `
  }
}
