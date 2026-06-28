import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

type Direction = 'row' | 'column'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around'

@customElement('mm-button-group')
export class ButtonGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
      }

      :host([stretch]) slot::slotted(*) {
        flex: 1;
        --button-width: 100%;
      }
    `,
  ]

  @property({ type: String }) direction: Direction = 'row'
  @property({ type: String, attribute: 'justify-content' }) justifyContent: Justify = 'start'
  @property({ type: Boolean, reflect: true }) stretch = false

  render() {
    return html`
      <mm-flex
        direction=${this.direction}
        justify-content=${this.justifyContent}
        align-items="center"
        wrap
        gap="2"
        ?stretch=${this.stretch}
      >
        <slot></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-button-group': ButtonGroup
  }
}
