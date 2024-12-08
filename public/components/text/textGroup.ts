import { makeStyleSheet } from '../../javascripts/components/utils'

class TextGroup extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.role = 'group'
    container.classList.add('text-group')

    shadow.append(container, makeStyleSheet('text'))
    container.append(...this.childNodes)
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default TextGroup
