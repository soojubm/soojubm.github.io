import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/button/button'

@customElement('mm-show-more-button')
export class ShowMoreButton extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }
  `

  render() {
    return html`
      <mm-button variant="secondary" icon=${ICON_NAMES.EXPAND} icon-position="trailing">
        더 불러오기
      </mm-button>
    `
  }
}
