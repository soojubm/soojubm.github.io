import { LitElement, css } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * 나란한 짧은 항목 사이에 놓는 가운뎃점.
 * 점은 ::before로 그려 텍스트를 드래그해 복사할 때 선택되지 않고, 항목이 이미 순서대로 읽히므로 보조 기술에는 드러내지 않는다.
 * 점과 항목 사이 간격은 부모의 gap이 맡는다.
 */
@customElement('mm-bullet')
export class Bullet extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }

    :host::before {
      content: '·';
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }
}
