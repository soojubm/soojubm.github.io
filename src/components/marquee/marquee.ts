import { LitElement, css, html } from 'lit'
import type { PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

type MarqueeDirection = 'left' | 'right'

/**
 * 슬롯 콘텐츠를 가로로 반복 재생하는 marquee.
 * 콘텐츠 폭과 뷰포트 폭을 측정해 필요한 복제 수와 이동 거리를 계산한다.
 */
@customElement('mm-marquee')
export class Marquee extends LitElement {
  @property({ type: String, reflect: true }) direction: MarqueeDirection = 'left'
  @property({ type: String }) gap = '4'
  @property({ type: Number }) speed = 80
  @property({ type: Boolean, reflect: true, attribute: 'pause-on-hover' }) pauseOnHover = false

  @state() private _copyCount = 1
  @state() private _distance = 0
  @state() private _duration = 1

  @query('.source') private _sourceElement?: HTMLElement

  private _resizeObserver?: ResizeObserver
  private _measureFrame = 0

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        max-width: 100%;
        overflow: hidden;
        --marquee-gap: var(--space-4);
        --marquee-distance: 0px;
        --marquee-duration: 1s;
      }

      .viewport {
        width: 100%;
        overflow: hidden;
      }

      .track {
        display: flex;
        width: max-content;
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
    `,
  ]

  connectedCallback() {
    super.connectedCallback()
    this._resizeObserver = new ResizeObserver(() => this._queueMeasure())
  }

  firstUpdated() {
    if (this._sourceElement) this._resizeObserver?.observe(this._sourceElement)
    this._resizeObserver?.observe(this)
    this._queueMeasure()
  }

  updated(changed: PropertyValues) {
    this.style.setProperty('--marquee-gap', this._resolveGap(this.gap))
    this.style.setProperty('--marquee-distance', `${this._distance}px`)
    this.style.setProperty('--marquee-duration', `${this._duration}s`)
    this._syncClones()

    if (changed.has('gap') || changed.has('speed')) this._queueMeasure()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this._resizeObserver?.disconnect()
    cancelAnimationFrame(this._measureFrame)
  }

  private _handleSlotChange() {
    this._queueMeasure()
    this.updateComplete.then(() => this._syncClones())
  }

  private _queueMeasure() {
    cancelAnimationFrame(this._measureFrame)
    this._measureFrame = requestAnimationFrame(() => this._measure())
  }

  private _measure() {
    const source = this._sourceElement
    if (!source) return

    const distance = Math.ceil(source.getBoundingClientRect().width)
    if (distance <= 0) return

    const viewportWidth = Math.ceil(this.getBoundingClientRect().width)
    const copyCount = Math.max(2, Math.ceil((viewportWidth + distance) / distance) + 1)
    const duration = Math.max(1, distance / Math.max(1, this.speed))

    this._distance = distance
    this._copyCount = copyCount
    this._duration = duration
  }

  private _syncClones() {
    const nodes = this._assignedNodes()
    const clones = this.renderRoot.querySelectorAll<HTMLElement>('.clone')

    clones.forEach(container => {
      container.replaceChildren(...nodes.map(node => node.cloneNode(true)))
    })
  }

  private _assignedNodes() {
    const slot = this.renderRoot.querySelector('slot')
    return (
      slot?.assignedNodes({ flatten: true }).filter(node => {
        return node.nodeType !== Node.TEXT_NODE || Boolean(node.textContent?.trim())
      }) ?? []
    )
  }

  private _resolveGap(value: string) {
    if (!value) return '0px'
    return /^\d+$/.test(value) ? `var(--space-${value})` : value
  }

  render() {
    const cloneIndexes = Array.from({ length: this._copyCount - 1 }, (_, index) => index)

    return html`
      <div class="viewport">
        <div class="track">
          <div class="group source">
            <slot @slotchange=${this._handleSlotChange}></slot>
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
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-marquee': Marquee
  }
}
