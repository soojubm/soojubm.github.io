import { css, LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { literal } from 'lit/static-html.js'

import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemCheckedRow,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'
import { emit } from '@/utils'
import '@/components/common/radio'

@customElement('mm-menu-item-radio')
export class MenuItemRadio extends withMenuItemPresentation(LitElement) {
  static styles = [
    css`
      :host {
        display: block;
      }

      div[role] {
        ${menuItemStyles}
      }
    `,
  ]
  @property({ type: Boolean }) disabled = false
  @property({ type: Boolean }) checked = false
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''

  // menu 밖(radiogroup)에서 쓰이므로 menuitemradio가 아니라 radio로 둔다.
  render() {
    return renderMenuItemCheckedRow(this, {
      role: 'radio',
      control: literal`mm-radio`,
      activate: this.activate,
    })
  }

  private activate = () => {
    if (this.disabled) return
    if (this.checked) return
    this.checked = true
    emit(this, 'change', { checked: this.checked, value: this.value, name: this.name })
  }
}
