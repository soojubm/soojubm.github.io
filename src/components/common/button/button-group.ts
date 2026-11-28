import { LitElement, css, html, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import { justifyContentTokens } from '@/stylesheets/shared.styles'
import type { JustifyContent, FlexDirection } from '@/stylesheets/shared.types'
import { buildAttributeRules } from '@/utils'

@customElement('fff-button-group')
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
    }
  `
  @property({ type: String, reflect: true }) direction: FlexDirection = 'row'
  @property({ type: String, attribute: 'justify-content', reflect: true })
  justifyContent: JustifyContent = 'flex-start'
  @property({ type: Boolean, reflect: true }) stretch = false
  @query('slot') private slotElement!: HTMLSlotElement

  render() {
    return html`
      <slot @slotchange=${this.syncFullWidth}></slot>
    `
  }

  protected updated(changed: PropertyValues<this>) {
    if (changed.has('stretch')) this.syncFullWidth()
  }

  // 늘어난 호스트 폭을 안쪽 버튼이 채우도록 자식 버튼에 full-width를 맞춘다.
  private syncFullWidth() {
    for (const child of this.slotElement.assignedElements()) {
      child.toggleAttribute('full-width', this.stretch)
    }
  }
}
