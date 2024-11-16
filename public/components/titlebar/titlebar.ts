import { makeStyleSheet } from '../../javascripts/components/utils'

// todo appbar

class TitleBar extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('header')
    container.role = 'navigation'
    container.classList.add('titlebar')

    const title = document.createElement('span')
    title.classList.add('titlebar-title')
    title.innerText = this.heading || ''

    if (!this.hiddenBack) {
      const backButton = document.createElement('mm-button')
      backButton.setAttribute('variant', 'back')

      const icon = document.createElement('mm-icon')
      icon.setAttribute('name', 'arrow-left')

      backButton.appendChild(icon)
      container.append(backButton)
    }

    // if (this.hiddenBack) back.hidden = true

    // if (!back.ariaLabel) back.ariaLabel = '이전 페이지로'
    // ariaLabel 때문에 쉐도우돔을 그리지 못 함.

    const actionSlot = document.createElement('slot')
    actionSlot.name = 'action'

    shadow.appendChild(container)
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

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if (name === 'icon') {
  //     alert()
  //   }
  // }

  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    this.shadowRoot?.querySelector('mm-button button')?.setAttribute('data-variant', newValue)
  }
}

export default TitleBar
