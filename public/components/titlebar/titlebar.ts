import { makeStyleSheet } from '../../javascripts/components/utils'

class TitleBar extends HTMLElement {
  static observedAttributes = ['status']

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('header')
    container.classList.add('titlebar')

    const title = document.createElement('span')
    title.classList.add('titlebar-title')
    title.innerText = this.heading || ''

    const back = document.createElement('test-chip')
    back.setAttribute('variant', 'back')
    back.ariaLabel = '이전 페이지로'

    const icon = document.createElement('test-icon')
    icon.setAttribute('slot', 'icon')
    icon.setAttribute('name', 'arrow-left')

    const actionSlot = document.createElement('slot')
    actionSlot.name = 'action'

    back.append(icon)

    shadow.appendChild(container)
    container.append(back, title, actionSlot, makeStyleSheet('titlebar'))
  }

  // get hasBack() {
  //   return this.getAttribute('hasBack')
  // }

  get heading() {
    return this.getAttribute('heading')
  }
  get value() {
    return this.getAttribute('value')
  }

  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot?.querySelector('test-chip button')?.setAttribute('data-variant', newValue)
  }
}

export default TitleBar
