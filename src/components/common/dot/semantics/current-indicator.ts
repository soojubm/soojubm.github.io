import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement } from 'lit/decorators.js'

import { dotSizes, dotStyles, dotToneColor } from '@/components/common/dot/dot.styles'
import '@/components/overlay/tooltip'

/**
 * 지금 위치한 항목을 가리키는 점.
 * 현재라는 의미는 항목의 aria-current가 전하므로, 이 요소는 현재 항목에만 놓여 화면용 표시만 맡는다.
 * 점이 무엇인지는 포인터를 올렸을 때 툴팁으로 알리며, 점보다 넓은 영역을 잡아 가운데에 점을 둔다.
 * 자리는 항목이 정한다: 가로로 늘어선 항목은 아래 가운데(dotBelowStyles), 세로 목록은 행 끝에 둔다.
 */
@customElement('mm-current-indicator')
export class CurrentIndicator extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }

    /* 툴팁은 트리거 위에서 열리므로, 점이 아니라 24 영역 전체를 트리거로 잡고 점은 가운데 그린다. */
    [slot='trigger'] {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--size-24);
      height: var(--size-24);

      &::before {
        content: '';
        ${dotStyles}
        --dot-size: ${unsafeCSS(dotSizes['6'])};
        --dot-background-color: ${unsafeCSS(dotToneColor('gray'))};
      }
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }

  render() {
    return html`
      <mm-tooltip content="현재 위치" placement="center">
        <span slot="trigger"></span>
      </mm-tooltip>
    `
  }
}
