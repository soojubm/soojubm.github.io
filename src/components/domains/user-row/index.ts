import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '../../icon-button/semantics/icon-names'
import '../../list-row/list-row'

/**
 * avatar를 leading으로 가지는 표현 전용 행.
 */
@customElement('mm-user-row')
export class UserRow extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ]

  @property({ type: String }) size = 'medium'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'

  render() {
    return html`
      <mm-list-row
        size=${this.size}
        label=${this.label}
        description=${this.description}
        icon=${this.icon}
        avatar-src=${this.avatarSrc}
        avatar-variant=${this.avatarVariant}
      >
        <slot></slot>
        <slot name="trailing" slot="trailing"></slot>
      </mm-list-row>
    `
  }
}

export default UserRow
