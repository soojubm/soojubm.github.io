import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { spaces, type FlexDirection, type FlexWrap, type Space } from '@/stylesheets/shared.styles'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

/** 메타 정보 사이 간격은 space 단계 중 이 넷만 쓴다. 기본 4는 :host가 선언한다. */
type MetaItemGroupGap = Extract<Space, '2' | '3' | '4' | '8'>

const metaItemGroupGapTokens: AttributeTokens<Exclude<MetaItemGroupGap, '4'>> = {
  '2': { gap: spaces['2'] },
  '3': { gap: spaces['3'] },
  '8': { gap: spaces['8'] },
}

@customElement('mm-meta-item-group')
export class MetaItemGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: ${unsafeCSS(spaces['4'])};
    }

    :host([direction='column']) {
      flex-direction: column;
    }

    :host([wrap='wrap']) {
      flex-wrap: wrap;
    }
    :host([wrap='wrap-reverse']) {
      flex-wrap: wrap-reverse;
    }

    ${unsafeCSS(buildAttributeRules('gap', metaItemGroupGapTokens))}
  `
  @property({ type: String, reflect: true }) direction: FlexDirection = 'row'
  @property({ type: String, reflect: true }) gap: MetaItemGroupGap = '4'
  @property({ type: String, reflect: true }) wrap: FlexWrap = 'nowrap'

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
