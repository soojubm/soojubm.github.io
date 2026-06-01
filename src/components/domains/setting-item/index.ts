import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

/**
 * 설정 화면의 한 행. mm-menu-item-row를 합성하고
 * setting 고유의 패딩·구분선을 입힙니다.
 *
 * <mm-setting-item start-icon="bell" label="알림" description="...">
 *   <mm-switch slot="action"></mm-switch>
 * </mm-setting-item>
 */
@customElement('mm-setting-item')
export class SettingItem extends LitElement {
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String, attribute: 'start-icon' }) startIcon = ''

  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = css`
    :host {
      display: block;
    }

    :host([disabled]) {
      opacity: 0.5;
      pointer-events: none;
    }
  `

  render() {
    return html`
      <mm-menu-item-row
        icon=${ifDefined(this.startIcon || undefined)}
        label=${this.label}
        description=${this.description}
        ?disabled=${this.disabled}
        role="group"
      >
        <slot name="action" slot="action"></slot>
      </mm-menu-item-row>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-setting-item': SettingItem
  }
}
