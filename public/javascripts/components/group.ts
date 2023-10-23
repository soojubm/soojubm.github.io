import { makeStyleSheet } from './utils'

class Group extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('group')
    container.role = 'group'

    // const align = 'vertical' || 'horizontal'
    const alignment = this.getAttribute('alignment')
    container.dataset.alignment = alignment || ''

    const style = this.getAttribute('style')
    container.setAttribute('style', style || '')

    if (this.bleeding) this.dataset.bleeding = 'true'

    container.dataset.temp = this.temp || ''
    // if (this.variant) container.setAttribute('data-variant', this.variant)

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('group'))
  }

  get temp() {
    return this.getAttribute('temp')
  }

  get bleeding() {
    return this.getAttribute('bleeding')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Group
