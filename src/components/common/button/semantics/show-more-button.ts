import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import '@/components/common/button/button'

/**
 * 목록의 다음 항목을 이어서 불러오는 버튼.
 * 불러온 항목은 다시 접히지 않으므로 상태를 갖지 않는다.
 */
@customElement('mm-show-more-button')
export class ShowMoreButton extends LitElement {
  static styles = css`
    :host {
      display: flex;
      justify-content: center;
    }
  `
  @property({ type: String }) label = 'Show more'

  render() {
    return html`
      <mm-button variant="tertiary" icon=${ICON_NAMES.EXPAND} icon-position="trailing">
        ${this.label}
      </mm-button>
    `
  }
}
