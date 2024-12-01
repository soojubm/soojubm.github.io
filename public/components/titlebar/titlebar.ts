import { makeStyleSheet } from '../../javascripts/components/utils'

// todo appbar

class TitleBar extends HTMLElement {
  static get observedAttributes() {
    return ['variant']
  }

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
      const backButton = document.createElement('mm-icon-button')
      backButton.setAttribute('variant', 'navigator')

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

    console.log('@', this.shadowRoot?.querySelector('mm-icon-button'))
  }

  // get hasBack() {
  //   return this.getAttribute('hasBack')
  // }

  get hiddenBack() {
    return this.hasAttribute('hiddenBack')
  }

  get heading() {
    return this.getAttribute('heading')
  }

  connectedCallback() {
    const backButton = this.shadowRoot?.querySelector('mm-icon-button')
    if (backButton) {
      backButton.setAttribute('variant', this.getAttribute('variant') || 'default')
    }
  }
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    const backButton = this.shadowRoot?.querySelector('mm-icon-button')
    if (backButton) {
      backButton.setAttribute('variant', newValue)
    }
    // this.shadowRoot?.querySelector('mm-icon-button')?.setAttribute('variant', newValue)
  }
}

export default TitleBar
