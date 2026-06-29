import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import '@/components/icon/icon'
import { tagStyles, type TagTone } from '@/components/tag/tag.styles'

@customElement('mm-tag')
export class Tag extends LitElement {
  static styles = [tagStyles]

  @property({ type: String, reflect: true, useDefault: true }) tone: TagTone = 'default'
  @property({ type: String }) icon?: IconName

  render() {
    return html`
      ${this.renderIcon()}
      <slot></slot>
    `
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <mm-icon part="icon" name=${this.icon}></mm-icon>
    `
  }
}

export default Tag
