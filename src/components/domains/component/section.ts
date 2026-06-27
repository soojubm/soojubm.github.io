import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { componentContentFrameStyles } from './component.styles'

@customElement('mm-component-section')
class ComponentSection extends LitElement {
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) level: 'semantic' | 'domain' = 'semantic'

  @state() private _hasContent = false

  static styles = [
    componentContentFrameStyles,
    css`
      .component-section {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        margin-top: var(--space-section);
      }

      .content {
        display: none;
      }

      .content.has-content {
        display: block;
        --component-content-frame-margin: var(--space-2) 0 0
          var(--component-content-offset-inline-start);
      }
    `,
  ]

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement
    this._hasContent = slot.assignedElements().length > 0
  }

  render() {
    return html`
      <section class="component-section">
        <div hidden><mm-tag>${this.level === 'domain' ? 'Domain' : 'Semantic'}</mm-tag></div>
        <mm-text size="24" weight="bold" as="h3">${this.heading}</mm-text>
        ${this.description
          ? html`
              <mm-paragraph>${this.description}</mm-paragraph>
            `
          : nothing}
        <div class="content component-content-frame ${this._hasContent ? 'has-content' : ''}">
          <slot @slotchange=${this._onSlotChange}></slot>
        </div>
      </section>
    `
  }
}

export default ComponentSection
