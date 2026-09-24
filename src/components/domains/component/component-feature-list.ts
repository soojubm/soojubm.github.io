import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'
import { ICON_NAMES, type IconName } from '@/components/common'

export interface ComponentFeatureItem {
  heading: string
  description: string
  // 설명(무엇인지) 아래에 해야 할 일을 체크리스트로 덧붙인다.
  rules?: string[]
  icon?: IconName
}

/**
 * 문서에서 컴포넌트 성격을 설명하는 특성 어휘와 그 아이콘.
 * 어휘 자체는 foundations 문서가 정의하므로, 새 heading은 그 목록에 먼저 추가한다.
 * 어휘에 없는 일회성 heading은 항목에서 icon을 직접 지정한다.
 */
export const FEATURE_ICONS: Record<string, IconName> = {
  Disclosure: ICON_NAMES.EXPAND,
  Feedback: ICON_NAMES.NOTIFICATION,
  Glanceable: ICON_NAMES.VIEW,
  'Interactive - action': ICON_NAMES.CLICK,
  'Interactive - input': ICON_NAMES.FIELD,
  'Interactive - selection': ICON_NAMES.SELECTED,
  Modality: ICON_NAMES.LOCK,
  Representative: ICON_NAMES.PROFILE,
  Statusful: ICON_NAMES.ANNOUNCEMENT,
  Structural: ICON_NAMES.TASK_LIST,
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
              icon=${feature.icon ?? FEATURE_ICONS[feature.heading] ?? nothing}
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
