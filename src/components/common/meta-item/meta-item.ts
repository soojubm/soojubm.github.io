import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { metaItemStyles } from '@/components/common/meta-item/meta-item.styles'
import '@/components/common/text/semantics/paragraph'

@customElement('mm-meta-item')
export class MetaItem extends LitElement {
  static styles = [metaItemStyles]
  @property({ type: String, reflect: true }) layout: 'horizontal' | 'stacked' | 'inline' =
    'horizontal'
  @property({ type: String, reflect: true }) align: 'start' | 'center' = 'start'
  @property({ type: Boolean, reflect: true }) code = false
  @property({ type: String }) label = ''
  @property({ type: String }) value = ''
  @property({ type: String, attribute: 'value-size' }) valueSize: 'medium' | 'large' = 'medium'

  render() {
    // code는 토큰·prop 이름처럼 촘촘히 읽는 값이라 라벨과 값 모두 작은 크기로 쓴다.
    const labelSize = this.code ? 'small' : 'medium'
    const valueSize = this.code ? 'small' : this.valueSize

    return html`
      <mm-paragraph size=${labelSize} color="light">${this.label}</mm-paragraph>
      <mm-paragraph size=${valueSize}>${this.value}</mm-paragraph>
    `
  }
}
