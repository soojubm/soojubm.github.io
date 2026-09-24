import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { ICON_NAMES } from '@/components/common'

/**
 * 선택 상태를 나타내는 장식용 체크 표시.
 * 선택 상호작용과 aria 상태는 행(옵션·메뉴 항목)이 소유하고, 이 요소는 selected 상태만 받아 체크 노출로 반영한다.
 * 선택되지 않아도 자리를 유지해 목록의 행마다 트레일링 폭이 같게 한다.
 */
@customElement('mm-selected-indicator')
export class SelectedIndicator extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--size-24);
      height: var(--size-24);
    }

    mm-icon {
      visibility: hidden;
    }

    :host([selected]) mm-icon {
      visibility: visible;
    }
  `
  @property({ type: Boolean, reflect: true }) selected = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }

  render() {
    return html`
      <mm-icon name=${ICON_NAMES.CHECK}></mm-icon>
    `
  }
}
