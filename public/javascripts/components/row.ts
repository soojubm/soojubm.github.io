import { makeStyleSheet } from './utils'

class Row extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('row')
    container.role = 'group'

    // const align = 'vertical' || 'horizontal'
    const direction = this.getAttribute('direction')
    container.dataset.direction = direction || ''

    const style = this.getAttribute('style')
    container.setAttribute('style', style || '')

    if (this.bleeding) this.dataset.bleeding = 'true'

    container.dataset.temp = this.temp || ''
    // if (this.variant) container.setAttribute('data-variant', this.variant)

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('row'))
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

export default Row
