import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { ICON_NAMES } from '@/components/common'
import { componentContentFrameStyles } from '@/components/domains/component/component.styles'

export interface ComponentFeatureItem {
  heading: string
  description: string
  // 설명(무엇인지) 아래에 해야 할 일을 체크리스트로 덧붙인다.
  rules?: string[]
}

// 컴포넌트 특성(heading)마다 쓰는 아이콘. 목록에 없는 heading은 INFO로 둔다.
const FEATURE_ICONS: Record<string, string> = {
  'Interactive - action': ICON_NAMES.INTERACTIVE_ACTION,
  'Interactive - selection': ICON_NAMES.INTERACTIVE_SELECTION,
  'Interactive - input': ICON_NAMES.INTERACTIVE_INPUT,
  'Input - file': ICON_NAMES.IMPORT,
  Feedback: ICON_NAMES.FEEDBACK,
  Glanceable: ICON_NAMES.GLANCEABLE,
  Structural: ICON_NAMES.STRUCTURAL,
  Contextual: ICON_NAMES.CONTEXTUAL,
  Representative: ICON_NAMES.REPRESENTATIVE,
  Modality: ICON_NAMES.MODALITY,
  Transient: ICON_NAMES.TRANSIENT,
  Stateful: ICON_NAMES.STATEFUL,
  Disclosure: ICON_NAMES.DISCLOSURE,
}

/**
 * 컴포넌트 문서 페이지의 mm-feature 목록 칼럼 레이아웃을 소유한다.
 */
@customElement('mm-component-feature-list')
export class ComponentFeatureList extends LitElement {
  static styles = [
    componentContentFrameStyles,
    css`
      :host {
        display: block;
        padding: var(--space-4) 0 0;
      }
    `,
  ]
  @property({ attribute: false }) features: ComponentFeatureItem[] = []

  render() {
    return html`
      <div class="component-content-frame">
        <mm-feature-group columns="2">
          ${this.features.map(
            feature => html`
              <mm-feature
                heading=${feature.heading}
                description=${feature.description}
                icon=${FEATURE_ICONS[feature.heading] ?? ICON_NAMES.INFO}
              >
                ${this.renderRules(feature.rules)}
              </mm-feature>
            `,
          )}
        </mm-feature-group>
      </div>
    `
  }

  private renderRules(rules?: string[]) {
    if (!rules?.length) return nothing

    return html`
      <mm-text-list .texts=${rules}></mm-text-list>
    `
  }
}
