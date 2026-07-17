import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/flex/flex'

@customElement('mm-component-guide')
class ComponentGuide extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: var(--space-section) 0 0;
    }
  `

  render() {
    return html`
      <mm-flex direction="column" gap="4">
        <div hidden><mm-text as="h2">Component Guide</mm-text></div>
        <mm-flex direction="column" gap="8">
          <slot></slot>
        </mm-flex>
      </mm-flex>
    `
  }
}

export default ComponentGuide
