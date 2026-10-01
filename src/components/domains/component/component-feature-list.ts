import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { ICON_NAMES } from '@/components/common'

export interface ComponentFeatureItem {
  heading: string
  description: string
  // 설명(무엇인지) 아래에 해야 할 일을 체크리스트로 덧붙인다.
  rules?: string[]
}

/**
 * 컴포넌트 문서 페이지의 mm-feature 목록 칼럼 레이아웃을 소유한다.
 */
@customElement('mm-component-feature-list')
export class ComponentFeatureList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ attribute: false }) features: ComponentFeatureItem[] = []

  render() {
    return html`
      <mm-feature-group columns="2">
        ${this.features.map(
          feature => html`
            <mm-feature
              heading=${feature.heading}
              description=${feature.description}
              icon=${ICON_NAMES.INFO}
            >
              ${this.renderRules(feature.rules)}
            </mm-feature>
          `,
        )}
      </mm-feature-group>
    `
  }

  private renderRules(rules?: string[]) {
    if (!rules?.length) return nothing

    return html`
      <mm-text-list .texts=${rules}></mm-text-list>
    `
  }
}
