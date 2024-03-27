import { makeStyleSheet, inheritStyle, setSlotElement } from '../../javascripts/components/utils'

class Media extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('media')

    const image = document.createElement('img')
    if (this.src) image.src = this.src
    if (this.alt) image.alt = this.alt

    const style = shadow.getAttribute('style')
    container.setAttribute('style', style || '')

    shadow.appendChild(container)
    container.appendChild(makeStyleSheet('media'))
    container.appendChild(image)

    // inheritStyle(shadow, container)
  }

  get size() {
    return this.getAttribute('size')
  }

  get src() {
    return this.getAttribute('src')
  }

  get alt() {
    return this.getAttribute('alt')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Media
