import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import '@/components/common'

@customElement('mm-token-stage')
export class TokenStage extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      --surface-padding: 0;
      --surface-border-radius: var(--border-radius-large);

      overflow: hidden;
      /* 왼쪽 정렬 flex 부모(mm-text-block 등) 안에서도 내용 폭으로 줄지 않고 가로를 채운다. */
      align-self: stretch;
    }

    mm-scroll {
      --scroll-hint-padding-inline: var(--space-4);

      width: 100%;
    }

    /* 여백을 스크롤 영역 안쪽에 둬서, 샘플의 그림자가 여백 위로 번진다. scroll-hint는 표면 모서리에 붙는다. */
    .content {
      box-sizing: border-box;
      min-width: 100%;
      padding: var(--space-8) var(--space-16);
    }

    :host([full-width]) ::slotted(*) {
      width: 100%;
    }

    :host([striped]) {
      --surface-background-color: repeating-linear-gradient(
        90deg,
        var(--foreground-subtle-color) 0 var(--size-48),
        var(--background-subtle-color) var(--size-48) calc(var(--size-48) * 2)
      );
    }
  `
  /** 재질처럼 뒤에 무엇이 비치는지 보여야 하는 토큰을 위해, 중간 톤과 밝은 면이 번갈아 맞닿는 바탕을 스테이지 전체에 깐다. */
  @property({ type: Boolean, reflect: true }) striped = false
  /** 내용이 줄어들지 않고 스테이지 가로를 채운다. */
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <mm-scroll>
        <div class="content">
          <slot></slot>
        </div>
      </mm-scroll>
    `
  }
}
