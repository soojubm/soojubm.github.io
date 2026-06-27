import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

type ScrollHintPlacement = 'start' | 'end'

@customElement('mm-scroll-hint')
export class ScrollHint extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        --scroll-hint-width: var(--size-huge);
        --scroll-hint-gap: 0px;

        display: block;
        flex: 0 0 var(--scroll-hint-width);
        order: 999;
        align-self: stretch;
        min-height: var(--size-medium);
        margin-left: calc((var(--scroll-hint-width) + var(--scroll-hint-gap)) * -1);
        position: sticky;
        right: -1px;
        z-index: 1;
        pointer-events: none;
      }

      :host([placement='start']) {
        order: -999;
        margin-right: calc((var(--scroll-hint-width) + var(--scroll-hint-gap)) * -1);
        margin-left: 0;
        left: 0;
        right: auto;
      }

      :host([hidden]) {
        opacity: 0;
        visibility: hidden;
      }

      .hint {
        width: 100%;
        height: 100%;
        background: var(--gradient-scroll-hint-end);
      }

      :host([placement='start']) .hint {
        background: var(--gradient-scroll-hint-start);
      }
    `,
  ]

  @property({ type: String, reflect: true }) placement: ScrollHintPlacement = 'end'

  private scrollRoot?: HTMLElement
  private resizeObserver?: ResizeObserver

  render() {
    return html`
      <div class="hint" aria-hidden="true"></div>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.scrollRoot = this.parentElement ?? undefined
    this.scrollRoot?.addEventListener('scroll', this.syncVisibility)
    this.resizeObserver = new ResizeObserver(this.syncVisibility)
    this.resizeObserver.observe(this)
    if (this.scrollRoot) this.resizeObserver.observe(this.scrollRoot)
    requestAnimationFrame(this.syncVisibility)
  }

  disconnectedCallback() {
    this.scrollRoot?.removeEventListener('scroll', this.syncVisibility)
    this.resizeObserver?.disconnect()
    this.scrollRoot = undefined
    super.disconnectedCallback()
  }

  private syncVisibility = () => {
    const root = this.scrollRoot
    if (!root) return

    const gap = getComputedStyle(root).columnGap
    this.style.setProperty('--scroll-hint-gap', gap === 'normal' ? '0px' : gap)

    const maxScrollLeft = root.scrollWidth - root.clientWidth
    const scrollLeft = Math.abs(root.scrollLeft)
    const canScroll = maxScrollLeft > 1
    const isAtStart = scrollLeft <= 1
    const isAtEnd = scrollLeft >= maxScrollLeft - 1

    this.toggleAttribute('hidden', !canScroll || (this.placement === 'start' ? isAtStart : isAtEnd))
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-scroll-hint': ScrollHint
  }
}
