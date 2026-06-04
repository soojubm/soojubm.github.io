import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-textfield-action-bar')
export class TextfieldActionBar extends LitElement {
  @property({ type: String, reflect: true }) align: 'start' | 'center' | 'end' | 'between' = 'end'

  static styles = css`
    :host {
      display: flex;
      align-items: center;
      width: 100%;
      gap: var(--space-2);
    }

    :host([align='start']) {
      justify-content: flex-start;
    }

    :host([align='center']) {
      justify-content: center;
    }

    :host([align='end']) {
      justify-content: flex-end;
    }

    :host([align='between']) {
      justify-content: space-between;
    }
  `

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textfield-action-bar': TextfieldActionBar
  }
}
