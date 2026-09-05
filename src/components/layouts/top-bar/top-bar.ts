import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { topBarStyles } from '@/components/layouts/top-bar/top-bar.styles'
import { emit } from '@/utils'
import '@/components/common/text/semantics/heading'
import '@/components/common/icon-button'

// TODO
// top-bar-titlte / sheet-header-title

@customElement('mm-top-bar')
class TopBar extends LitElement {
  static styles = [topBarStyles]

  @property({ type: String }) heading = ''
  @property({ type: String }) nav: 'back' | 'close' = 'back'

  render() {
    return html`
      <header role="navigation">
        ${this.renderBackButton()}
        <mm-heading level="3">${this.heading}</mm-heading>
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
      <mm-icon-button
        variant="secondary"
        icon=${ICON_NAMES.BACK}
        @click=${this.handleNavClick}
      ></mm-icon-button>
    `
  }

  private renderCloseButton() {
    if (this.nav !== 'close') return nothing

    return html`
      <mm-icon-button
        variant="secondary"
        icon=${ICON_NAMES.CLOSE}
        @click=${this.handleNavClick}
      ></mm-icon-button>
    `
  }

  private handleNavClick = () => {
    emit(this, 'nav-click')
  }
}

export default TopBar
