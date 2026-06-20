import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ICON_NAMES } from '../icon-button/semantics/icon-names'
import { featureStyles } from './feature.styles'

// 컴포넌트 외부로 상수 데이터를 분리하여 메모리 재할당 방지
const ICON_MAP: Record<string, string> = {
  interactive: ICON_NAMES.CLICK,
  easyScanning: ICON_NAMES.VIEW,
  groupable: ICON_NAMES.HELP,
  check: ICON_NAMES.SUCCESS,
  warning: ICON_NAMES.WARNING,
  error: ICON_NAMES.ERROR,
  user: ICON_NAMES.USER_CIRCLE,
}

@customElement('mm-feature')
export class Feature extends LitElement {
  @property({ type: String }) icon = ''
  @property({ type: String }) emoji = ''

  // HTML 관례에 맞춰 외부 사용 시 title-text로 사용할 수 있도록 설정
  @property({ type: String, attribute: 'titletext' }) titleText = ''

  @property({ type: String }) description = ''
  @property({ type: String }) variant = ''

  static styles = [featureStyles]

  private renderVisual() {
    if (this.emoji) {
      return html`
        <mm-avatar variant="secondary" size="large">
          <span aria-hidden="true" style="font-size: var(--font-size-24)">${this.emoji}</span>
        </mm-avatar>
      `
    }
    const iconName = ICON_MAP[this.icon] ?? this.icon
    return html`
      <mm-avatar variant="secondary" size="large">
        <mm-icon size="large" name="${iconName}"></mm-icon>
      </mm-avatar>
    `
  }

  render() {
    return html`
      <div data-variant="${this.variant}">
        ${this.renderVisual()}

        <mm-text-block
          level="3"
          .heading="${this.titleText}"
          .description="${this.description}"
        ></mm-text-block>

        <slot></slot>
      </div>
    `
  }
}

export default Feature
