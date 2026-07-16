import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { featureStyles } from '@/components/feature/feature.styles'
import { ICON_NAMES, type IconName } from '@/components/icon-button/semantics/icon-names'

// 컴포넌트 외부로 상수 데이터를 분리하여 메모리 재할당 방지
const ICON_MAP: Record<string, IconName> = {
  interactive: ICON_NAMES.CLICK,
  easyScanning: ICON_NAMES.VIEW,
  groupable: ICON_NAMES.HELP,
  check: ICON_NAMES.SUCCESS,
  warning: ICON_NAMES.WARNING,
  error: ICON_NAMES.ERROR,
  user: ICON_NAMES.USER_CIRCLE,
}

const HEADING_ICON_MAP: Record<string, IconName> = {
  Glanceable: 'cursor-pointer',
  Categorical: 'task-list',
  Groupable: 'multi-window',
  Structural: 'task-list',
  Supplementary: 'database-script-plus',
  Representative: 'profile-circle',
  Feedback: 'cursor-pointer',
  'Interactive - action': ICON_NAMES.CLICK,
  'Interactive - selection': ICON_NAMES.SELECTED,
  Freeform: ICON_NAMES.FIELD,
  Immediate: ICON_NAMES.ON_TAG,
  'One signifier, one primary meaning': 'check',
  'Do not use interaction cues as decoration': 'interactive',
  'Do not rely on color alone': ICON_NAMES.VIEW,
  Dismissible: ICON_NAMES.DISMISS,
  Transient: ICON_NAMES.SPARKS,
  Anchored: ICON_NAMES.LINK,
  Validatable: ICON_NAMES.DOCUMENT_CHECK,
  Persistent: ICON_NAMES.APP_WINDOW,
  Statusful: ICON_NAMES.ANNOUNCEMENT,
  'Disclosure (점진적 공개)': ICON_NAMES.EXPAND,
  Fallback: ICON_NAMES.EMPTY,
  '타겟의 명료 (Clarity of Audience)': 'archery',
  '용도의 분명 (Explicit Intent)': 'cube-scan',
  '규모의 약속 (Controlled Scope)': 'compress',
  '내용의 간결 (Economy of Content)': 'stats-report',
  '정보의 당위 (Justified Information)': 'ruler-combine',
  '변화 전제 (Designed for Change)': 'coins-swap',
}

@customElement('mm-feature')
export class Feature extends LitElement {
  static styles = [featureStyles]

  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''

  @property({ type: String }) heading = ''

  @property({ type: String }) description = ''
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      ${this.renderVisual()}

      <mm-text-block
        level="3"
        ?centered=${this.centered}
        .heading=${this.heading}
        .description=${this.description}
      ></mm-text-block>

      <slot></slot>
    `
  }

  private renderVisual() {
    if (this.emoji) {
      return html`
        <mm-avatar variant="secondary" size="48">
          <span class="feature-emoji" aria-hidden="true">${this.emoji}</span>
        </mm-avatar>
      `
    }
    const icon = this.icon || HEADING_ICON_MAP[this.heading] || ''
    const iconName = ICON_MAP[icon] ?? icon
    return html`
      <mm-avatar variant="secondary" size="48">
        <mm-icon size="large" name=${iconName}></mm-icon>
      </mm-avatar>
    `
  }
}

export default Feature
