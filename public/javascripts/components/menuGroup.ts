import { makeStyleSheet } from './utils'

class MenuGroup extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')

    container.classList.add('menu-group')
    container.setAttribute('role', 'menu')
    // role menu || group

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('menuitem'))
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default MenuGroup
