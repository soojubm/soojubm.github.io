import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import '@/components/icon/icon'
import { tagStyles, type TagTone } from '@/components/tag/tag.styles'

export type TagToneMap<Value extends string> = Partial<Record<Value, TagTone>>

export const getMappedTone = <Value extends string>(
  value: Value,
  toneByValue: TagToneMap<Value>,
  fallbackTone: TagTone = 'default',
): TagTone => {
  return toneByValue[value] ?? fallbackTone
}

export const renderTag = (tone: TagTone, fallbackContent?: unknown, icon?: IconName) => html`
  <mm-tag tone=${tone} icon=${ifDefined(icon)}>
    ${icon
      ? nothing
      : html`
          <slot name="icon" slot="icon"></slot>
        `}
    <slot>${fallbackContent}</slot>
  </mm-tag>
`

export const renderMappedTag = <Value extends string>(
  value: Value,
  toneByValue: TagToneMap<Value>,
  icon?: IconName,
) => {
  return renderTag(getMappedTone(value, toneByValue), value, icon)
}

@customElement('mm-tag')
export class Tag extends LitElement {
  static styles = [tagStyles]

  @property({ type: String, reflect: true, useDefault: true }) tone: TagTone = 'default'
  @property({ type: String }) icon?: IconName

  render() {
    return html`
      <span part="base">
        ${this.renderIcon()}
        <slot></slot>
      </span>
    `
  }

  private renderIcon() {
    if (this.icon) {
      return html`
        <mm-icon part="icon" name=${this.icon}></mm-icon>
      `
    }

    return html`
      <slot name="icon"></slot>
    `
  }
}

export default Tag
