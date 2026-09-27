import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  justifyContentTokens,
  type JustifyContent,
  type FlexDirection,
} from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'

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

    ${unsafeCSS(buildAttributeRules('justify-content', justifyContentTokens))}

    :host([stretch]) ::slotted(*) {
      flex: 1;
      --button-width: 100%;
    }
  `
  @property({ type: String, reflect: true }) direction: FlexDirection = 'row'
  @property({ type: String, attribute: 'justify-content', reflect: true })
  justifyContent: JustifyContent = 'flex-start'
  @property({ type: Boolean, reflect: true }) stretch = false

  render() {
    return html`
      <slot></slot>
    `
  }
}
