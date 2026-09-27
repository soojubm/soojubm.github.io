import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { FlexDirection, FlexWrap } from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'

const metaItemGroupGapTokens = {
  2: { gap: 'var(--space-2)' },
  3: { gap: 'var(--space-3)' },
  8: { gap: 'var(--space-8)' },
}

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

    ${unsafeCSS(buildAttributeRules('gap', metaItemGroupGapTokens))}
  `
  @property({ type: String, reflect: true }) direction: FlexDirection = 'row'
  @property({ type: String, reflect: true }) gap = '4'
  @property({ type: String, reflect: true }) wrap: FlexWrap = 'nowrap'

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
