import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-component-guide')
class ComponentGuide extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      padding: var(--space-section) 0 0;
    }

    div {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
    }
  `

  render() {
    return html`
      <!-- <div hidden><mm-text as="h2">Component Guide</mm-text></div> -->
      <div>
        <slot></slot>
      </div>
    `
  }
}

export default ComponentGuide
