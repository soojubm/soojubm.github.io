import { makeStyleSheet } from './utils'

const HOST_CLASS_NAME = null

class MenuItem extends HTMLElement {
  constructor() {
    super()
    const container = document.createElement('div')
    const avatar = document.createElement('slot')
    const action = document.createElement('slot')
    const label = document.createElement('span')

    container.classList.add('item')
    label.classList.add('item-label')
    // action.classList.add('item-action')

    avatar.name = 'avatar'
    action.name = 'action'

    label.innerText = this.label || ''

    const shadow = this.attachShadow({ mode: 'open' })

    // shadow.appendChild(avatar)
    // shadow.appendChild(button)

    shadow.appendChild(container)
    container.append(avatar, label, action)
    container.appendChild(makeStyleSheet('menuitem'))

    // const template = this.getTemplate()
    // shadow.innerHTML = template

    // const host = document.createElement('button')

    // shadow.appendChild(host)

    // host.classList.add('chip')
  }

  get label() {
    return this.getAttribute('label')
  }

  render() {}

  getTemplate() {
    return `
        <a href="/chapter3.html">
            // <img class="icon" src="></img>
        </a>
        <h1 class="heading">${this.title}</h1>

        <slot name="slot-avatar"></slot>
        <span></span>


        <style>
        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: var(--space-3);
        }
        </style>
    `
  }

  connectedCallback() {
    this.render()
  }
  disconnectedCallback() {}
}

export default MenuItem
