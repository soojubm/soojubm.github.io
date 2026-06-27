import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '@/components/flex/flex'

@customElement('mm-textfield-action-bar')
export class TextfieldActionBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }
  `

  @property({ type: String, attribute: 'justify-content', reflect: true })
  justifyContent: 'start' | 'center' | 'end' | 'between' = 'end'

  render() {
    return html`
      <mm-flex gap="2" align-items="center" justify-content=${this.justifyContent}>
        <slot></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textfield-action-bar': TextfieldActionBar
  }
}
