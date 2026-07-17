import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/feature/feature-group'

/**
 * 컴포넌트 문서 페이지의 mm-feature 목록 칼럼 레이아웃을 소유한다.
 */
@customElement('mm-component-feature-list')
class ComponentFeatureList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  render() {
    return html`
      <mm-feature-group columns="3">
        <slot></slot>
      </mm-feature-group>
    `
  }
}

export default ComponentFeatureList
