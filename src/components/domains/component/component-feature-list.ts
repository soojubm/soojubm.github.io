import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/feature/feature-group'
import '@/components/feature/feature'
import { arrayAttributeConverter } from '@/utils/property-converters'

export interface ComponentFeatureItem {
  heading: string
  description: string
}

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

  @property({
    attribute: 'features',
    converter: arrayAttributeConverter<ComponentFeatureItem>(),
  })
  features: ComponentFeatureItem[] = []

  render() {
    return html`
      <mm-feature-group columns="3">
        ${this.features.map(
          feature => html`
            <mm-feature heading=${feature.heading} description=${feature.description}></mm-feature>
          `,
        )}
      </mm-feature-group>
    `
  }
}

export default ComponentFeatureList
