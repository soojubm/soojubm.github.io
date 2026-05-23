import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { featureStyles } from './feature.styles'

// 컴포넌트 외부로 상수 데이터를 분리하여 메모리 재할당 방지
const ICON_MAP: Record<string, string> = {
  interactive: 'cursor-pointer',
  easyScanning: 'eye-circle',
  groupable: 'information-circle',
  check: 'check-circle',
  warning: 'warning-triangle',
  error: 'alert-circle',
  user: 'user-circle',
}

@customElement('mm-feature')
export class Feature extends LitElement {
  @property({ type: String }) icon = ''

  // HTML 관례에 맞춰 외부 사용 시 title-text로 사용할 수 있도록 설정
  @property({ type: String, attribute: 'titletext' }) titleText = ''

  @property({ type: String }) description = ''
  @property({ type: String }) variant = ''

  static styles = [featureStyles]

  render() {
    const iconName = ICON_MAP[this.icon] ?? this.icon

    return html`
      <div data-variant="${this.variant}">
        <mm-avatar variant="secondary" size="large">
          <mm-icon size="large" name="${iconName}"></mm-icon>
        </mm-avatar>

        <mm-title-with-description
          level="3"
          .title="${this.titleText}"
          .description="${this.description}"
        ></mm-title-with-description>

        <slot></slot>
      </div>
    `
  }
}

export default Feature
