import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES, type IconName } from '../icon-button/semantics/icon-names'
import { featureStyles } from './feature.styles'

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
  Informational: 'megaphone',
  Hierarchical: 'cursor-pointer',
  Semantic: 'cursor-pointer',
  'Behavior- instantly action': 'on-tag',
  'Interactive - choice': 'interactive',
  'Easy scanning': 'task-list',
  Groupable: 'multi-window',
  Structural: 'task-list',
  Supplementary: 'database-script-plus',
  'Not Recommended': 'thumbs-down',
  'Aids accessibility': 'accessibility',
  Representative: 'profile-circle',
  Feedback: 'cursor-pointer',
  Interactive: 'task-list',
  Inputtable: 'cursor-pointer',
  eye: 'cursor-pointer',
  Dimensional: 'cursor-pointer',
  Indicative: 'cube-scan',
  'Interactive - content switching': 'cursor-pointer',
  Actionable: 'cursor-pointer',
  'Feedback needed': 'reply-to-message',
  'One signifier, one primary meaning': 'check',
  'Do not use interaction cues as decoration': 'interactive',
  'Do not rely on color alone': ICON_NAMES.VIEW,
  '타겟의 명료 (Clarity of Audience)': 'archery',
  '용도의 분명 (Explicit Intent)': 'cube-scan',
  '규모의 약속 (Controlled Scope)': 'compress',
  '내용의 간결 (Economy of Content)': 'stats-report',
  '정보의 당위 (Justified Information)': 'ruler-combine',
  '변화 전제 (Designed for Change)': 'coins-swap',
}

@customElement('mm-feature')
export class Feature extends LitElement {
  @property({ type: String }) icon?: IconName
  @property({ type: String }) emoji = ''

  @property({ type: String }) heading = ''

  @property({ type: String }) description = ''
  /** 비주얼과 텍스트를 가운데 정렬한다. */
  @property({ type: Boolean, reflect: true }) centered = false

  static styles = [featureStyles]

  private renderVisual() {
    if (this.emoji) {
      return html`
        <mm-avatar variant="secondary" size="large">
          <span aria-hidden="true" style="font-size: var(--font-size-24)">${this.emoji}</span>
        </mm-avatar>
      `
    }
    const icon = this.icon || HEADING_ICON_MAP[this.heading] || ''
    const iconName = ICON_MAP[icon] ?? icon
    return html`
      <mm-avatar variant="secondary" size="large">
        <mm-icon size="large" name="${iconName}"></mm-icon>
      </mm-avatar>
    `
  }

  render() {
    return html`
      <div>
        ${this.renderVisual()}

        <mm-text-block
          level="3"
          ?centered=${this.centered}
          .heading=${this.heading}
          .description="${this.description}"
        ></mm-text-block>

        <slot></slot>
      </div>
    `
  }
}

export default Feature
