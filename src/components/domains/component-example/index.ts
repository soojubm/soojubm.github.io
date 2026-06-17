import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { componentExampleStyles } from './component-example.styles'

@customElement('mm-component-example')
export class ComponentExample extends LitElement {
  static styles = componentExampleStyles

  render() {
    return html`
      <section class="component-example">
        <slot></slot>
      </section>
    `
  }
}
