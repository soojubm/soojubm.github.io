import { LitElement, css, html, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { styleMap } from 'lit/directives/style-map.js'

import { ResizeController } from '@/controllers/resize-controller'
import { ScheduleController } from '@/controllers/schedule-controller'
import { spaceTokens, type Space } from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'

type MarqueeDirection = 'left' | 'right'

/**
 * 슬롯 콘텐츠를 가로로 반복 재생하는 marquee.
 * 콘텐츠 폭과 뷰포트 폭을 측정해 필요한 복제 수와 이동 거리를 계산한다.
 */
@customElement('mm-marquee')
export class Marquee extends LitElement {
  static styles = css`
    :host {
      display: block;
      max-width: 100%;
      overflow: hidden;
      --marquee-gap: var(--space-4);
      --marquee-height: auto;
    }

    ${unsafeCSS(buildAttributeRules('gap', spaceTokens('--marquee-gap')))}

    .viewport {
      width: 100%;
      height: var(--marquee-height);
      overflow: hidden;
    }

    .track {
      display: flex;
      width: max-content;
      height: 100%;
      animation: marquee-scroll var(--marquee-duration) linear infinite;
      transform: translate3d(0, 0, 0);
      will-change: transform;
    }

    :host([direction='right']) .track {
      animation-name: marquee-scroll-right;
    }

    :host([pause-on-hover]:hover) .track {
      animation-play-state: paused;
    }

    .group {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      gap: var(--marquee-gap);
      height: 100%;
      padding-inline-end: var(--marquee-gap);
      box-sizing: border-box;
    }

    ::slotted(*) {
      flex: 0 0 auto;
    }

    @media (prefers-reduced-motion: reduce) {
      .track {
        animation: none;
      }
    }

    @keyframes marquee-scroll {
      to {
        transform: translate3d(calc(var(--marquee-distance) * -1), 0, 0);
      }
    }

    @keyframes marquee-scroll-right {
      from {
        transform: translate3d(calc(var(--marquee-distance) * -1), 0, 0);
      }

      to {
        transform: translate3d(0, 0, 0);
      }
    }
  `
  @property({ type: String, reflect: true }) direction: MarqueeDirection = 'left'
  @property({ type: String, reflect: true }) gap: Space = '4'
  @property({ type: String }) height?: string
  @property({ type: Number }) speed = 80
  @property({ type: Boolean, reflect: true, attribute: 'pause-on-hover' }) pauseOnHover = false
  @state() private copyCount = 1
  @state() private distance = 0
  @state() private duration = 1
  @query('.source') private sourceElement?: HTMLElement
  @query('slot') private slotElement?: HTMLSlotElement
  private measureFrame = new ScheduleController(this, () => this.measure())
  private resize: ResizeController = new ResizeController(this, {
    getTargets: () => [this, this.sourceElement],
    onResize: () => this.measureFrame.request(),
  })

  render() {
    const cloneIndexes = Array.from({ length: this.copyCount - 1 }, (_, index) => index)
    const trackStyle = {
      '--marquee-distance': `${this.distance}px`,
      '--marquee-duration': `${this.duration}s`,
    }

    return html`
      <div class="viewport">
        <div class="track" style=${styleMap(trackStyle)}>
          <div class="group source">
            <slot @slotchange=${this.handleSlotChange}></slot>
          </div>
          ${repeat(
            cloneIndexes,
            index => index,
            () => html`
              <div class="group clone" aria-hidden="true" inert></div>
            `,
          )}
        </div>
      </div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'marquee')
  }

  updated(changed: PropertyValues) {
    if (changed.has('gap')) this.measureFrame.request()

    if (changed.has('height')) this.updateHeight()

    if (changed.has('speed')) this.measureFrame.request()

    if (changed.has('copyCount')) this.syncClones()
  }

  private handleSlotChange = () => {
    this.measureFrame.request()
    this.updateComplete.then(() => this.syncClones())
  }

  private measure() {
    const source = this.sourceElement
    if (!source) return

    const distance = Math.ceil(source.getBoundingClientRect().width)
    if (distance <= 0) return

    const viewportWidth = Math.ceil(this.getBoundingClientRect().width)
    const copyCount = Math.max(2, Math.ceil((viewportWidth + distance) / distance) + 1)
    const duration = Math.max(1, distance / Math.max(1, this.speed))

    this.distance = distance
    this.copyCount = copyCount
    this.duration = duration
  }

  private syncClones() {
    const nodes = this.assignedNodes()
    const clones = this.renderRoot.querySelectorAll<HTMLElement>('.clone')

    clones.forEach(container => {
      container.replaceChildren(...nodes.map(node => node.cloneNode(true)))
    })
  }

  private assignedNodes() {
    return (
      this.slotElement?.assignedNodes({ flatten: true }).filter(node => {
        return node.nodeType !== Node.TEXT_NODE || Boolean(node.textContent?.trim())
      }) ?? []
    )
  }

  // 임의 값이라 나열할 수 없고 host가 소비하므로 host에 직접 주입한다.
  private updateHeight() {
    if (!this.height) {
      this.style.removeProperty('--marquee-height')
      return
    }

    this.style.setProperty('--marquee-height', this.height)
  }
}
