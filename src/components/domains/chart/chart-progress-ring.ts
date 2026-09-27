import { LitElement, css, html, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import '@/components/common/text/text'

/**
 * 진행률을 원 둘레로 채우고 가운데에 퍼센트를 적는 고리.
 * 읽히는 진행률은 곁에 둔 네이티브 progress가 맡으므로 보조 기술에는 드러내지 않는다.
 */
@customElement('mm-chart-progress-ring')
export class ChartProgressRing extends LitElement {
  static styles = css`
    :host {
      display: grid;
      flex-shrink: 0;
      place-items: center;
      width: var(--size-80);
      height: var(--size-80);
    }

    svg,
    mm-text {
      grid-area: 1 / 1;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    circle {
      fill: none;
      stroke-width: 3;
      transform: rotate(-90deg);
      transform-origin: center;
    }

    .track {
      stroke: var(--background-subtle-color);
    }

    /* r을 100/2π로 잡아 둘레가 100이므로 offset에 퍼센트를 그대로 뺀다. */
    .value {
      stroke: var(--primary-color);
      stroke-linecap: round;
      stroke-dasharray: 100;
    }
  `
  /** 0–100 사이 퍼센트 */
  @property({ type: Number }) value = 0

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }

  render() {
    return html`
      <svg viewBox="0 0 36 36">
        ${svg`
          <circle class="track" cx="18" cy="18" r="15.9155"></circle>
          <circle
            class="value"
            cx="18"
            cy="18"
            r="15.9155"
            style=${styleMap({ strokeDashoffset: `${100 - this.value}` })}
          ></circle>
        `}
      </svg>
      <mm-text>${this.value}%</mm-text>
    `
  }
}
