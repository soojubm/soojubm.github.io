import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentExampleStyles } from '@/components/domains/component/component.styles'

@customElement('mm-component-example')
export class ComponentExample extends LitElement {
  static styles = componentExampleStyles
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <section class="component-example component-content-frame">
        <slot></slot>
      </section>
    `
  }
}
