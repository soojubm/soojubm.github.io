import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { featureStyles } from './feature.styles'

@customElement('mm-feature')
class Feature extends LitElement {
  @property({ type: String }) icon = ''
  @property({ type: String, attribute: 'titletext' }) titleText = ''
  @property({ type: String }) description = ''
  @property({ type: String }) variant = ''

  static styles = [featureStyles]

  private iconMap: Record<string, string> = {
    interactive: 'cursor-pointer',
    easyScanning: 'eye-circle',
    groupable: 'information-circle',
    check: 'check-circle',
    warning: 'warning-triangle',
    error: 'alert-circle',
    user: 'user-circle',
  }

  render() {
    const iconName = this.iconMap[this.icon] ?? this.icon
    return html`
      <div class="feature-item" data-variant="${this.variant}">
        <mm-avatar variant="secondary" size="large">
          <mm-icon size="large" name="${iconName}"></mm-icon>
        </mm-avatar>
        <mm-title-with-description
          class="feature-item-header"
          level="4"
          title="${this.titleText}"
          description="${this.description}"
        ></mm-title-with-description>
        <slot></slot>
      </div>
    `
  }
}

export default Feature
