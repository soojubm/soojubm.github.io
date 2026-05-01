import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-component-section')
class ComponentSection extends LitElement {
  @property({ type: String }) title = ''
  @property({ type: String }) description = ''

  static styles = css`
    section { display: block; padding: 1rem 0; }
    mm-title-with-description { display: block; }
    mm-separator { margin: 1rem 0; display: block; }
    .children { margin-top: 0.5rem; }
    .component-temp {
      margin: 0 0 1rem calc(-5vw + 1rem);
      padding: 2rem calc(var(--grid-margin) - 1rem) 2.25rem;
      border: var(--border-stronger);
      border-radius: var(--radius-large);
    }
    @media (max-width: 768px) {
      .component-temp { margin-left: 0; padding-inline: var(--grid-margin); }
    }
  `

  render() {
    return html`
      <section class="component-temp">
        <mm-title-with-description level="2" title="${this.title}" description="${this.description}"></mm-title-with-description>
        <mm-separator></mm-separator>
        <div class="children"><slot></slot></div>
      </section>
    `
  }
}

export default ComponentSection
