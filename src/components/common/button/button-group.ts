import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { buildAttributeRules } from '@/utils'

type Direction = 'row' | 'column'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around'

const buttonGroupJustifyContentTokens = {
  center: { 'justify-content': 'center' },
  end: { 'justify-content': 'flex-end' },
  between: { 'justify-content': 'space-between' },
  around: { 'justify-content': 'space-around' },
}

@customElement('mm-button-group')
export class ButtonGroup extends LitElement {
  static styles = css`
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

    ${unsafeCSS(buildAttributeRules('justify-content', buttonGroupJustifyContentTokens))}

    :host([stretch]) ::slotted(*) {
      flex: 1;
      --button-width: 100%;
    }
  `
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
