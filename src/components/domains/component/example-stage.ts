import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { surfaceBaseStyles, surfaceBleedStyles } from '@/components/common/surface/surface.styles'
import '@/components/common'
import { MEDIA } from '@/constants'

@customElement('fff-example-stage')
export class ExampleStage extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      --surface-padding: 0;
      --surface-border-radius: var(--border-radius-large);

      overflow: hidden;
      /* 왼쪽 정렬 flex 부모(fff-text-block 등) 안에서도 내용 폭으로 줄지 않고 가로를 채운다. */
      align-self: stretch;
    }

    /* 좁은 화면에서는 페이지 좌우 여백을 넘어 화면 가장자리까지 넓힌다. */
    @media ${MEDIA.narrow} {
      :host {
        ${surfaceBleedStyles};
      }
    }

    fff-scroll {
      --scroll-hint-padding-inline: var(--space-4);

      width: 100%;
    }

    /* 여백을 스크롤 영역 안쪽에 둬서, 샘플의 그림자가 여백 위로 번진다. scroll-hint는 표면 모서리에 붙는다. */
    .content {
      box-sizing: border-box;
      min-width: 100%;
      padding: var(--space-8) var(--layout-padding-inline);
    }

    /* 틀만 왼쪽으로 넓히고 내용은 페이지 본문 글자의 왼쪽 선에 맞춘다. */
    :host([aligned]) {
      width: auto;
      margin-inline-start: calc(var(--layout-padding-inline) * -1 + var(--space-4));
    }

    :host([aligned]) .content {
      padding-inline: calc(var(--layout-padding-inline) - var(--space-4));
    }

    @media ${MEDIA.default} {
      :host([aligned]) {
        ${surfaceBleedStyles};
      }

      :host([aligned]) .content {
        padding-inline: var(--layout-padding-inline);
      }
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
  /** 내용을 본문 글자의 왼쪽 선에 맞추고 틀만 왼쪽으로 넓힌다. */
  @property({ type: Boolean, reflect: true }) aligned = false

  render() {
    return html`
      <fff-scroll>
        <div class="content">
          <slot></slot>
        </div>
      </fff-scroll>
    `
  }
}
