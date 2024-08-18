import { makeStyleSheet } from '../../javascripts/components/utils'

class MenuItem extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('a')
    container.classList.add('item')
    container.role = 'menuitem'
    container.setAttribute('href', this.href || '#')
    container.setAttribute('target', this.target || '')
    if (this.alignment) container.dataset.alignment = this.alignment

    const check = document.createElement('slot')
    check.name = 'check'
    check.classList.add('item-check')

    const avatar = document.createElement('slot')
    avatar.name = 'avatar'

    const action = document.createElement('slot')
    action.name = 'action'

    const text = document.createElement('slot')
    text.name = 'text'

    const label = document.createElement('span')
    label.classList.add('item-label')
    label.innerText = this.label || ''

    const description = document.createElement(this.description === 'description' ? 'span' : 'time')
    description.innerText = this.description || ''
    description.classList.add('item-description')

    // TODO
    if (this.current && this.current?.length > 0) container.ariaCurrent = this.current

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

  get current() {
    return this.ariaCurrent
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default MenuItem
