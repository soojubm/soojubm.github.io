import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { arrayAttributeConverter } from '@/utils/property-converters'

@customElement('mm-component-aka')
export class ComponentAka extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: none;
      }
    `,
  ]

  @property({
    attribute: 'items',
    converter: arrayAttributeConverter<string>(),
  })
  items: string[] = []

  render() {
    if (!this.items.length) return nothing
    return html`
      <dl>
        <dt>a.k.a.</dt>
        ${this.renderItems()}
      </dl>
    `
  }

  private renderItems() {
    return this.items.map(item => this.renderItem(item))
  }

  private renderItem(item: string) {
    return html`
      <dd>${item}</dd>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-component-aka': ComponentAka
  }
}
