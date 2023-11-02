import { makeStyleSheet } from './utils'

type selectType = 'single' | 'multiple'
type selects = []
type selected = 'childNode value attr'

class chipGroup extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.role = 'group'
    container.classList.add('chip-group')

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('chip'))
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default chipGroup
