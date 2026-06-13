import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-component-aka')
export class ComponentAka extends LitElement {
  @property({
    type: Array,
    converter: value => {
      if (!value) return []
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    },
  })
  items: string[] = []

  static styles = [
    resetStyles,
    css`
      :host {
        display: none;
      }
    `,
  ]

  render() {
    if (!this.items.length) return nothing
    return html`
      <dl>
        <dt>a.k.a.</dt>
        ${this.items.map(
          item =>
            html`
              <dd>${item}</dd>
            `,
        )}
      </dl>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-component-aka': ComponentAka
  }
}
