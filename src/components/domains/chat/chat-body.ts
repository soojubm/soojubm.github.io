import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import { scrollbarStyles } from '@/stylesheets/shared.styles'

import '@/components/common'

/* 맨 아래에서 이만큼 벗어나면 이동 버튼을 보인다. */
const SCROLL_BOTTOM_THRESHOLD = 96

/**
 * 채팅 스크롤 영역. 스크롤 위치를 알고 있으므로 맨 아래로 돌아가는 버튼도 소유한다.
 */
@customElement('mm-chat-body')
export class ChatBody extends LitElement {
  static styles = css`
    :host {
      display: block;
      flex: 1;
      min-height: 0;
      padding-inline: var(--layout-padding-inline);
      box-sizing: border-box;
      overflow-x: hidden;
      overflow-y: auto;

      ${scrollbarStyles};
    }

    /* 버튼은 스크롤 내용 위에 떠서 맨 아래에 붙는다. 음수 마진으로 자리를 차지하지 않는다. */
    .scroll-bottom {
      position: sticky;
      bottom: var(--space-4);
      display: flex;
      justify-content: center;
      margin-top: calc(-1 * var(--size-32));
      pointer-events: none;
      z-index: var(--material-zindex-elevated);
    }

    .scroll-bottom mm-icon-button {
      pointer-events: auto;
    }

    .scroll-bottom[hidden] {
      display: none;
    }
  `
  @state() private awayFromBottom = false

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('scroll', this.handleScroll, { passive: true })
  }

  disconnectedCallback() {
    this.removeEventListener('scroll', this.handleScroll)
    super.disconnectedCallback()
  }

  firstUpdated() {
    this.updateAwayFromBottom()
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
      <div class="scroll-bottom" ?hidden=${!this.awayFromBottom}>
        <mm-icon-button
          variant="secondary"
          icon=${ICON_NAMES.SCROLL_BOTTOM}
          aria-label="맨 아래로 이동"
          @click=${this.handleScrollBottomClick}
        ></mm-icon-button>
      </div>
    `
  }

  private updateAwayFromBottom() {
    const distance = this.scrollHeight - this.scrollTop - this.clientHeight
    this.awayFromBottom = distance > SCROLL_BOTTOM_THRESHOLD
  }

  private handleScroll = () => {
    this.updateAwayFromBottom()
  }

  private handleSlotChange() {
    this.updateAwayFromBottom()
  }

  private handleScrollBottomClick() {
    const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
    this.scrollTo({ top: this.scrollHeight, behavior: reduceMotion ? 'auto' : 'smooth' })
  }
}
