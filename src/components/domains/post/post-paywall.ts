import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * mm-post-paywall
 * 글 본문이 끊기는 자리에서 뒤따르는 내용이 멤버십 전용임을 알리는 영역.
 * 바로 위 본문 끝을 배경색으로 흐려 글이 이어진다는 인상을 주고, 안내 내용은 슬롯으로 받는다.
 */
@customElement('mm-post-paywall')
export class PostPaywall extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
    }

    /* 본문 끝이 흐려지며 안내로 이어지도록 host 위쪽으로 그라데이션을 겹친다. */
    :host::before {
      content: '';
      height: 20rem;
      background: linear-gradient(
        to bottom,
        transparent,
        color-mix(in srgb, var(--background-color) 75%, transparent),
        var(--background-color)
      );
      position: absolute;
      left: 0;
      right: 0;
      bottom: 100%;
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
