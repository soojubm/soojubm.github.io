import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { TagTone } from '@/components/tag/tag.styles'

import '@/components/tag/tag'

@customElement('mm-accent-tag')
export class AccentTag extends LitElement {
  @property({ type: String, reflect: true }) tone: TagTone = 'gold'
  @property({ type: String }) icon?: IconName

  render() {
    return html`
      <mm-tag tone=${this.tone} icon=${ifDefined(this.icon)}>
        <slot></slot>
      </mm-tag>
    `
  }
}

export default AccentTag
