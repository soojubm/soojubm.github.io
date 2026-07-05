import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'

type Direction = 'row' | 'column'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around'

@customElement('mm-button-group')
export class ButtonGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: center;
        gap: var(--space-2);
      }

      :host([direction='column']) {
        flex-direction: column;
      }

      :host([justify-content='center']) {
        justify-content: center;
      }
      :host([justify-content='end']) {
        justify-content: flex-end;
      }
      :host([justify-content='between']) {
        justify-content: space-between;
      }
      :host([justify-content='around']) {
        justify-content: space-around;
      }

      :host([stretch]) ::slotted(*) {
        flex: 1;
        --button-width: 100%;
      }
    `,
  ]

  @property({ type: String, reflect: true }) direction: Direction = 'row'
  @property({ type: String, attribute: 'justify-content', reflect: true })
  justifyContent: Justify = 'start'
  @property({ type: Boolean, reflect: true }) stretch = false

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-button-group': ButtonGroup
  }
}
