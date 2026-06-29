import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import '@/components/tag/tag'

@customElement('mm-keyword-tag')
export class KeywordTag extends LitElement {
  @property({ type: String }) icon?: IconName

  render() {
    return html`
      <mm-tag tone="default" icon=${ifDefined(this.icon)}>
        <slot></slot>
      </mm-tag>
    `
  }
}

export default KeywordTag
