import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { MetaItemData } from '@/components/common/meta-item/meta-item'

import { spaces } from '@/stylesheets/shared.styles'
import type { FlexDirection, FlexWrap, Space } from '@/stylesheets/shared.types'
import { buildAttributeRules, type AttributeTokens } from '@/utils'

/** 메타 정보 사이 간격은 space 단계 중 이 다섯만 쓴다. 기본 4는 :host가 선언한다. */
type MetaItemGroupGap = Extract<Space, '1' | '2' | '3' | '4' | '8'>

const metaItemGroupGapTokens: AttributeTokens<Exclude<MetaItemGroupGap, '4'>> = {
  '1': { gap: spaces['1'] },
  '2': { gap: spaces['2'] },
  '3': { gap: spaces['3'] },
  '8': { gap: spaces['8'] },
}

@customElement('fff-meta-item-group')
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

    :host([justify-content='center']) {
      justify-content: center;
    }

    :host([wrap='wrap']) {
      flex-wrap: wrap;
    }
    :host([wrap='wrap-reverse']) {
      flex-wrap: wrap-reverse;
    }

    ${unsafeCSS(buildAttributeRules('gap', metaItemGroupGapTokens))}
  `
  @property({ attribute: false }) items: MetaItemData[] = []
  @property({ type: String, reflect: true }) direction: FlexDirection = 'row'
  @property({ type: String, reflect: true }) gap: MetaItemGroupGap = '4'
  @property({ type: String, reflect: true }) wrap: FlexWrap = 'nowrap'
  @property({ type: String, reflect: true, attribute: 'justify-content' }) justifyContent:
    | 'flex-start'
    | 'center' = 'flex-start'

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`
      ${this.items.map(
        item => html`
          <fff-meta-item
            label=${item.label}
            value=${item.value}
            layout=${ifDefined(item.layout)}
            align=${ifDefined(item.align)}
            value-size=${ifDefined(item.valueSize)}
          ></fff-meta-item>
        `,
      )}
      <slot></slot>
    `
  }
}
