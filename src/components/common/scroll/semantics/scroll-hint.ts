import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconButtonSize } from '@/components/common/icon-button/icon-button'

import '@/components/common/icon-button/semantics/prev-button'
import '@/components/common/icon-button/semantics/next-button'

type ScrollHintPlacement = 'start' | 'end'

/**
 * 가로 스크롤 영역의 한쪽 끝. 그쪽에 가려진 콘텐츠가 있는 동안만 흐림 레이어와
 * 그 방향으로 넘기는 버튼을 보인다. 트랙패드·가로 휠이 없어도 넘길 수 있게 하는 것이 버튼의 몫이다.
 * mm-scroll(direction=row)이 양 끝에 렌더한다.
 */
@customElement('mm-scroll-hint')
export class ScrollHint extends LitElement {
  static styles = css`
    :host {
      --scroll-hint-width: var(--size-80);
      --scroll-hint-gap: 0px;
      --_gradient-direction: to right;

      display: flex;
      flex: 0 0 var(--scroll-hint-width);
      order: 999;
      align-self: stretch;
      align-items: center;
      justify-content: flex-end;
      min-height: var(--size-32);
      margin-left: calc((var(--scroll-hint-width) + var(--scroll-hint-gap)) * -1);
      position: sticky;
      right: -1px;
      z-index: var(--material-zindex-elevated);
      pointer-events: none;
      transition: opacity var(--transition-duration) var(--transition-easing),
        visibility var(--transition-duration) var(--transition-easing);
      background: linear-gradient(
        var(--_gradient-direction),
        transparent 0%,
        color-mix(in srgb, var(--background-color) 50%, transparent) 55%,
        color-mix(in srgb, var(--background-color) 82%, transparent) 80%,
        var(--background-color) 100%
      );
    }

    :host([placement='start']) {
      --_gradient-direction: to left;

      order: -999;
      justify-content: flex-start;
      margin-right: calc((var(--scroll-hint-width) + var(--scroll-hint-gap)) * -1);
      margin-left: 0;
      left: 0;
      right: auto;
    }

    :host([hidden]) {
      opacity: 0;
      visibility: hidden;
    }

    mm-prev-button,
    mm-next-button {
      pointer-events: auto;
    }
  `
  @property({ type: String, reflect: true }) placement: ScrollHintPlacement = 'end'
  @property({ type: String }) size: IconButtonSize = 'medium'
  private scrollRoot?: HTMLElement
  private resizeObserver?: ResizeObserver

  connectedCallback() {
    super.connectedCallback()
    // 첫 측정 전에는 숨겨 둬야, 넘치지 않는 영역에서 흐림이 보였다가 사라지는 깜빡임이 없다.
    this.hidden = true
    // shadow root 최상위에 렌더되면 parentElement가 없으므로 그 host가 스크롤 영역이다.
    const parent = this.parentNode
    this.scrollRoot =
      parent instanceof ShadowRoot ? (parent.host as HTMLElement) : this.parentElement ?? undefined
    this.scrollRoot?.addEventListener('scroll', this.handleScrollRootScroll)
    this.resizeObserver = new ResizeObserver(this.handleScrollRootResize)
    this.resizeObserver.observe(this)
    // scrollRoot 자체는 크기가 고정돼 있어도 슬라이드 이미지가 늦게 로드되며 scrollWidth만 늘어날 수 있으므로,
    // 콘텐츠 자식들도 함께 관찰해야 그 변화를 잡아낸다. 합성 컴포넌트가 slot으로 넘긴 자식은 slot을 펼쳐 관찰한다.
    if (this.scrollRoot) {
      this.resizeObserver.observe(this.scrollRoot)
      Array.from(this.scrollRoot.children)
        .flatMap(child =>
          child instanceof HTMLSlotElement ? child.assignedElements({ flatten: true }) : [child],
        )
        .forEach(child => this.resizeObserver!.observe(child))
    }
    requestAnimationFrame(this.handleScrollRootResize)
  }

  disconnectedCallback() {
    this.scrollRoot?.removeEventListener('scroll', this.handleScrollRootScroll)
    this.resizeObserver?.disconnect()
    this.scrollRoot = undefined
    super.disconnectedCallback()
  }

  render() {
    if (this.placement === 'start') {
      return html`
        <mm-prev-button size=${this.size} @prev=${this.handlePrevClick}></mm-prev-button>
      `
    }

    return html`
      <mm-next-button size=${this.size} @next=${this.handleNextClick}></mm-next-button>
    `
  }

  private handlePrevClick = () => this.scrollByPage(-1)

  private handleNextClick = () => this.scrollByPage(1)

  // 한 번에 보이는 폭의 80%씩 넘겨, 직전 화면의 끝 항목이 다음 화면에서도 보이게 한다.
  private scrollByPage(direction: 1 | -1) {
    const root = this.scrollRoot
    if (!root) return

    root.scrollBy({ left: direction * root.clientWidth * 0.8, behavior: 'smooth' })
  }

  // 스크롤 중에는 스타일을 건드리지 않아야 매 프레임 레이아웃을 다시 계산하지 않는다. gap은 크기가 바뀔 때만 잰다.
  private handleScrollRootResize = () => {
    const root = this.scrollRoot
    if (!root) return

    const gap = getComputedStyle(root).columnGap
    this.style.setProperty('--scroll-hint-gap', gap === 'normal' ? '0px' : gap)
    this.handleScrollRootScroll()
  }

  private handleScrollRootScroll = () => {
    const root = this.scrollRoot
    if (!root) return

    const maxScrollLeft = root.scrollWidth - root.clientWidth
    const scrollLeft = Math.abs(root.scrollLeft)
    const canScroll = maxScrollLeft > 1
    const isAtStart = scrollLeft <= 1
    const isAtEnd = scrollLeft >= maxScrollLeft - 1

    const hidden = !canScroll || (this.placement === 'start' ? isAtStart : isAtEnd)
    if (this.hidden !== hidden) this.hidden = hidden
  }
}
