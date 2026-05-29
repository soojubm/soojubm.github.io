import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-component-section')
class ComponentSection extends LitElement {
  @property({ type: String }) title = ''
  @property({ type: String }) description = ''

  static styles = css`
    /* slot에 들어온 direct child */
    ::slotted(*) {
      display: block;
      border: var(--border-stronger);
      border-radius: var(--radius-large);
      margin: 0.5rem 0 3rem calc(-5vw + 1rem);
      padding: 2rem calc(var(--grid-margin) - 1rem);
    }

    .component-temp {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      margin: 2rem 0;
    }
    @media (max-width: 768px) {
    }
  `

  render() {
    return html`
      <section class="component-temp">
        <mm-text variant="heading2" weight="bold">${this.title}</mm-text>
        ${this.description ? html`<mm-paragraph>${this.description}</mm-paragraph>` : nothing}
        <slot></slot>
      </section>
    `
  }
}

export default ComponentSection
