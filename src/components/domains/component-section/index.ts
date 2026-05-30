import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

@customElement('mm-component-section')
class ComponentSection extends LitElement {
  @property({ type: String }) title = ''
  @property({ type: String }) description = ''

  @state() private _hasContent = false

  static styles = css`
    .component-section {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin-top: 4rem;
    }

    .content {
      display: contents;
    }

    .content.has-content {
      display: block;
      border: var(--border-stronger);
      border-radius: var(--radius-large);
      margin: 0.5rem 0 0 calc(-5vw + 1rem);
      padding: 2rem calc(var(--grid-margin) - 1rem);
    }
  `

  private _onSlotChange(e: Event) {
    const slot = e.target as HTMLSlotElement
    this._hasContent = slot.assignedElements().length > 0
  }

  render() {
    return html`
      <section class="component-section">
        <mm-text size="24" weight="bold" as="h3">${this.title}</mm-text>
        ${this.description ? html`<mm-paragraph>${this.description}</mm-paragraph>` : nothing}
        <div class="content ${this._hasContent ? 'has-content' : ''}">
          <slot @slotchange=${this._onSlotChange}></slot>
        </div>
      </section>
    `
  }
}

export default ComponentSection
