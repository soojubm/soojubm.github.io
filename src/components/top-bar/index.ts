import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { topBarStyles } from '@/components/top-bar/top-bar.styles'
import { emit } from '@/utils/emit'

@customElement('mm-top-bar')
class TopBar extends LitElement {
  static styles = [topBarStyles]

  @property({ type: String }) heading = ''
  @property({ type: String }) nav: 'back' | 'close' | '' = 'back'

  private handleNavClick = () => {
    emit(this, 'navclick')
  }

  render() {
    return html`
      <header role="navigation" class="top-bar">
        ${this.nav === 'back'
          ? html`
              <mm-icon-button
                variant="secondary"
                icon=${ICON_NAMES.BACK}
                @click=${this.handleNavClick}
              ></mm-icon-button>
            `
          : ''}
        <mm-paragraph size="large">${this.heading}</mm-paragraph>
        <slot name="action"></slot>
        ${this.nav === 'close'
          ? html`
              <mm-icon-button
                variant="secondary"
                icon=${ICON_NAMES.CLOSE}
                @click=${this.handleNavClick}
              ></mm-icon-button>
            `
          : ''}
      </header>
    `
  }
}

export default TopBar
