import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import './list-row'

/**
 * avatar를 leading으로 가지는 표현 전용 행. mm-list-row 위에 avatar 기본값을 얹는다.
 */
@customElement('mm-user-row')
export class UserRow extends LitElement {
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'avatar-size' }) avatarSize = 'medium'
  @property({ type: String, attribute: 'avatar-variant' }) avatarVariant = 'tertiary'

  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ]

  render() {
    return html`
      <mm-list-row label=${this.label} description=${this.description}>
        <mm-avatar
          slot="leading"
          size=${this.avatarSize}
          variant=${this.avatarVariant}
          src=${ifDefined(this.avatarSrc || undefined)}
          icon=${ifDefined(this.icon || undefined)}
        ></mm-avatar>
        <slot></slot>
        <slot name="trailing" slot="trailing"></slot>
      </mm-list-row>
    `
  }
}

export default UserRow
