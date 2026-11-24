import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

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
