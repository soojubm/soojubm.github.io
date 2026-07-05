import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

type Direction = 'row' | 'column'
type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse'

@customElement('mm-meta-item-group')
export class MetaItemGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      gap: var(--space-4);
    }

    :host([direction='column']) {
      flex-direction: column;
    }

    :host([wrap='wrap']) {
      flex-wrap: wrap;
    }
    :host([wrap='wrap-reverse']) {
      flex-wrap: wrap-reverse;
    }

    :host([gap='2']) {
      gap: var(--space-2);
    }
    :host([gap='3']) {
      gap: var(--space-3);
    }
    :host([gap='8']) {
      gap: var(--space-8);
    }
  `

  @property({ type: String, reflect: true }) role = 'group'
  @property({ type: String, reflect: true }) direction: Direction = 'row'
  @property({ type: String, reflect: true }) gap = '4'
  @property({ type: String, reflect: true }) wrap: Wrap = 'nowrap'

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-meta-item-group': MetaItemGroup
  }
}
