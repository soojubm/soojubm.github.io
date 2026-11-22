import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('mm-token-stage')
export class TokenStage extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    mm-surface {
      --surface-padding: var(--space-8) var(--space-16);
    }

    mm-scroll {
      width: 100%;
    }

    :host([backdrop]) mm-surface {
      --surface-background-color: repeating-linear-gradient(
        90deg,
        var(--foreground-subtle-color) 0 var(--size-48),
        var(--background-subtle-color) var(--size-48) calc(var(--size-48) * 2)
      );
    }
  `
  /** 재질처럼 뒤에 무엇이 비치는지 보여야 하는 토큰을 위해, 중간 톤과 밝은 면이 번갈아 맞닿는 바탕을 스테이지 전체에 깐다. */
  @property({ type: Boolean, reflect: true }) backdrop = false

  render() {
    return html`
      <mm-surface variant="outlined" radius="large">
        <mm-scroll>
          <slot></slot>
        </mm-scroll>
      </mm-surface>
    `
  }
}
