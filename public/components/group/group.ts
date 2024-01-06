import { makeStyleSheet } from '../../javascripts/components/utils'

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

    // TODO : alignment -> direction / align
    if (this.align) container.dataset.align = this.align

    const style = this.getAttribute('style')
    container.setAttribute('style', style || '')

    if (this.bleeding) this.dataset.bleeding = 'true'

    container.dataset.temp = this.temp || ''
    if (this.variant) container.dataset.variant = this.variant
    // if (this.variant) container.setAttribute('data-variant', this.variant)

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('group'))
  }

  get variant() {
    return this.getAttribute('variant')
  }

  get temp() {
    return this.getAttribute('temp')
  }

  get bleeding() {
    return this.getAttribute('bleeding')
  }

  get align() {
    return this.getAttribute('align')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Group
