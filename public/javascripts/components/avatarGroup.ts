import { makeStyleSheet } from './utils'

class AvatarGroup extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')

    container.classList.add('avatar-group')
    container.setAttribute('role', 'group')

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('avatar'))
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default AvatarGroup
