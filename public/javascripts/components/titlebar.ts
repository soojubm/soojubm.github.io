import { makeStyleSheet } from './utils'

class TitleBar extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('header')
    const actionSlot = document.createElement('slot')
    const backSlot = document.createElement('slot')
    const title = document.createElement('span')

    container.classList.add('titlebar')
    title.classList.add('titlebar-title')

    title.innerText = this.heading || ''

    actionSlot.name = 'action'
    backSlot.name = 'back'

    shadow.appendChild(container)
    container.append(backSlot, title, actionSlot, makeStyleSheet('titlebar'))
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
}

export default TitleBar
