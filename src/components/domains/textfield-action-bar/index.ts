import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-textfield-action-bar')
export class TextfieldActionBar extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: var(--space-2);
      width: 100%;
    }

    :host([justify-content='start']) {
      justify-content: flex-start;
    }
    :host([justify-content='center']) {
      justify-content: center;
    }
    :host([justify-content='between']) {
      justify-content: space-between;
    }
  `

  @property({ type: String, attribute: 'justify-content', reflect: true })
  justifyContent: 'start' | 'center' | 'end' | 'between' = 'end'

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textfield-action-bar': TextfieldActionBar
  }
}
