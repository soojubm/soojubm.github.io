import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { menuItemStyles } from './menuitem.styles'
import { MenuItemRow } from './menu-item-row'

@customElement('menu-item-link')
export class MenuItemLink extends MenuItemRow {
  @property() href = ''

  render() {
    return html` <a href=${this.href} class="reset"> ${super.render()} </a> `
  }
}
