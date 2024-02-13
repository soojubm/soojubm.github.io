import { makeStyleSheet } from '../../javascripts/components/utils'

const HOST_CLASS_NAME = null

class MenuItem extends HTMLElement {
  constructor() {
    super()
    // TODO a
    const container = document.createElement('a')
    const check = document.createElement('slot')
    const avatar = document.createElement('slot')
    const action = document.createElement('slot')
    const text = document.createElement('slot')
    const label = document.createElement('span')
    const description = document.createElement(this.description === 'description' ? 'span' : 'time')

    container.role = 'menuitem'

    container.classList.add('item')
    if (this.alignment) container.dataset.alignment = this.alignment
    label.classList.add('item-label')
    description.classList.add('item-description')
    check.classList.add('item-check')
    // action.classList.add('item-action')

    check.name = 'check'
    avatar.name = 'avatar'
    action.name = 'action'
    text.name = 'text'

    container.setAttribute('href', this.href || '#')
    container.setAttribute('target', this.target || '')

    description.innerText = this.description || ''

    label.innerText = this.label || ''

    const shadow = this.attachShadow({ mode: 'open' })

    // shadow.appendChild(avatar)
    // shadow.appendChild(button)

    shadow.append(container, makeStyleSheet('menuitem'))
    container.append(check, avatar, text, label, description, action)

    // const template = this.getTemplate()
    // shadow.innerHTML = template

    // const host = document.createElement('button')

    // shadow.appendChild(host)

    // host.classList.add('chip')

    // const b = this.querySelector('[slot="trigger"]')

    // if (b) {
    //   b.addEventListener('click', () => {
    //     if (p.style.display === 'none') {
    //       p.style.display = 'block'
    //     } else {
    //       p.style.display = 'none'
    //     }
    //   })
    // }
  }

  get alignment() {
    return this.getAttribute('alignment')
  }

  get href() {
    return this.getAttribute('href')
  }

  get target() {
    return this.getAttribute('target')
  }

  get description() {
    return this.getAttribute('description' || 'time')
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
