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
        135deg,
        var(--primary-color) 0 var(--space-2),
        var(--accent-color) var(--space-2) var(--space-4)
      );
    }
  `
  /** 재질처럼 뒤에 무엇이 비치는지 보여야 하는 토큰을 위해, 경계가 또렷한 줄무늬를 스테이지 전체 바탕에 깐다. */
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
