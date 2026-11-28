import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import { topBarStyles } from '@/components/layouts/top-bar/top-bar.styles'
import { emit } from '@/utils'
import '@/components/common'

/**
 * 화면 단위 상단 바.
 * heading 레벨은 상단 바 크기에 맞춰 고정한다. fff-heading이 의미 단계와 타입 스케일을 함께 정해
 * 레벨을 올리면 글자도 커지므로, 페이지 최상위 제목은 본문의 page-header가 맡는다.
 */
export type TopBarNav = 'back' | 'close'

@customElement('fff-top-bar')
export class TopBar extends LitElement {
  static styles = [topBarStyles]
  @property({ type: String }) heading = ''
  @property({ type: String }) nav: TopBarNav = 'back'

  render() {
    return html`
      <header>
        ${this.renderBackButton()}
        <fff-heading level="3">${this.heading}</fff-heading>
        <div class="trailing-area">
          <slot name="action"></slot>
          ${this.renderCloseButton()}
        </div>
      </header>
    `
  }

  private renderBackButton() {
    if (this.nav !== 'back') return nothing

    return html`
      <fff-icon-button
        variant="secondary"
        icon=${ICON_NAMES.BACK}
        aria-label="뒤로"
        @click=${this.handleNavClick}
      ></fff-icon-button>
    `
  }

  private renderCloseButton() {
    if (this.nav !== 'close') return nothing

    return html`
      <fff-icon-button
        variant="secondary"
        icon=${ICON_NAMES.CLOSE}
        aria-label="닫기"
        @click=${this.handleNavClick}
      ></fff-icon-button>
    `
  }

  private handleNavClick = () => {
    emit(this, 'nav-click')
  }
}
