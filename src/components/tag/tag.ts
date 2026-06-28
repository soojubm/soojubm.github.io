import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import '@/components/icon/icon'
import { tagStyles, type TagTone } from '@/components/tag/tag.styles'

export type TagToneMap<Value extends string> = Record<Value, TagTone>

export const getMappedTone = <Value extends string>(
  value: Value,
  toneByValue: TagToneMap<Value>,
  fallback: TagTone = 'default',
) => toneByValue[value] ?? fallback

export const renderTag = (tone: TagTone, fallback?: unknown, icon?: IconName) => html`
  <mm-tag tone=${tone} icon=${icon}>
    <slot name="icon" slot="icon"></slot>
    <slot>${fallback}</slot>
  </mm-tag>
`

export const renderMappedTag = <Value extends string>(
  value: Value,
  toneByValue: TagToneMap<Value>,
  icon?: IconName,
) => renderTag(getMappedTone(value, toneByValue), value, icon)

@customElement('mm-tag')
export class Tag extends LitElement {
  static styles = [tagStyles]

  @property({ type: String, reflect: true }) tone: TagTone = 'default'
  @property({ type: String }) icon?: IconName

  render() {
    return html`
      <span>
        ${this.icon
          ? html`
              <mm-icon name=${this.icon}></mm-icon>
            `
          : html`
              <slot name="icon"></slot>
            `}
        ${this.renderDefaultSlot()}
      </span>
    `
  }

  protected renderDefaultSlot() {
    return html`
      <slot></slot>
    `
  }
}

export default Tag
