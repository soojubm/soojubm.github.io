import { makeStyleSheet } from '../../javascripts/components/utils'

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

    const title = document.createElement('mm-text')
    title.setAttribute('variant', 'subhead')
    title.innerText = this.titleText || ''

    const backButton = document.createElement('mm-icon-button')
    backButton.setAttribute('variant', 'navigator')
    backButton.setAttribute('icon', 'arrow-left')

    if (!this.hiddenBack) container.append(backButton)

    // if (!back.ariaLabel) back.ariaLabel = '이전 페이지로'
    // ariaLabel 때문에 쉐도우돔을 그리지 못 함.

    const actionSlot = document.createElement('slot')
    actionSlot.name = 'action'

    shadow.append(container, makeStyleSheet('titlebar'))
    container.append(title, actionSlot)
  }

  // get hasBack() {
  //   return this.getAttribute('hasBack')
  // }

  get hiddenBack() {
    return this.hasAttribute('hiddenBack')
  }

  get titleText() {
    return this.getAttribute('titleText')
  }

  connectedCallback() {}
  disconnectedCallback() {}
  attributeChangedCallback(name, oldValue, newValue) {
    // const backButton = this.shadowRoot?.querySelector('mm-icon-button button')
    // if (backButton) {
    //   backButton.setAttribute('variant', newValue)
    // }
    // this.shadowRoot?.querySelector('mm-icon-button')?.setAttribute('variant', newValue)
  }
}

export default TitleBar
