import { makeStyleSheet } from '../../javascripts/components/utils'

class MenuItem extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('a')
    container.setAttribute('href', this.href || '#')
    // container.setAttribute('target', '_blank')
    container.classList.add('item')
    container.role = 'menuitem'
    if (this.alignment) container.dataset.alignment = this.alignment
    if (this.tone) container.dataset.tone = this.tone

    const prefix = document.createElement('slot')
    prefix.name = 'prefix'

    const avatar = document.createElement('mm-avatar')
    avatar.setAttribute('variant', 'tertiary')
    if (this.icon) avatar.setAttribute('icon', this.icon)

    const action = document.createElement('slot')
    action.name = 'action'

    const label = document.createElement('mm-text')
    label.setAttribute('variant', 'body')
    label.innerText = this.label || ''

    // const description = document.createElement(this.description === 'description' ? 'span' : 'time')
    const description = document.createElement('mm-text')
    description.setAttribute('variant', 'label')
    description.innerText = this.description || ''

    // TODO
    if (this.current && this.current?.length > 0) {
      container.ariaCurrent = this.current
    }

    shadow.append(container, makeStyleSheet('menuitem'))
    if (this.icon) container.append(avatar)
    container.append(prefix, label, description, action)

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

  get icon() {
    return this.getAttribute('icon')
  }
  get tone() {
    return this.getAttribute('tone')
  }

  get description() {
    return this.getAttribute('description') || ''
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
