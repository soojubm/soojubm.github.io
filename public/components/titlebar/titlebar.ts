import { makeStyleSheet } from '../../javascripts/components/utils'

class TitleBar extends HTMLElement {
  static observedAttributes = ['status']

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('header')
    container.classList.add('titlebar')
    // container.role='banner' | 'navigation'

    const title = document.createElement('span')
    title.classList.add('titlebar-title')
    title.innerText = this.heading || ''

    const back = document.createElement('mm-chip')
    back.setAttribute('variant', 'back')

    const icon = document.createElement('mm-icon')
    icon.setAttribute('slot', 'icon')
    icon.setAttribute('name', 'arrow-left')
    back.append(icon)

    // if (this.hiddenBack) back.hidden = true

    // back.setAttribute('icon', 'arrow-left')
    // if (!back.ariaLabel) back.ariaLabel = '이전 페이지로'
    // ariaLabel 때문에 쉐도우돔을 그리지 못 함.

    const actionSlot = document.createElement('slot')
    actionSlot.name = 'action'

    shadow.appendChild(container)
    if (!this.hiddenBack) container.appendChild(back)
    container.append(title, actionSlot, makeStyleSheet('titlebar'))
  }

  // get hasBack() {
  //   return this.getAttribute('hasBack')
  // }
  get hiddenBack() {
    return this.getAttribute('hiddenBack')
  }

  get heading() {
    return this.getAttribute('heading')
  }

  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot?.querySelector('mm-chip button')?.setAttribute('data-variant', newValue)
  }
}

export default TitleBar
