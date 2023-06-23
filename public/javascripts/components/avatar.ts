import { makeStyleSheet } from './utils'

class Avatar extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('figure')
    const badge = document.createElement('span')

    container.classList.add('avatar')
    badge.classList.add('avatar-badge')

    container.setAttribute('role', 'img')
    container.setAttribute('data-size', this.size || '')
    container.setAttribute('data-variant', this.variant || '')

    container.innerHTML = this.innerHTML

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('avatar'))

    if (this.badge === '') {
      container.appendChild(badge)
    }
    // Attach the created elements to the shadow dom
    // <span class="avatar-badge"></span>
    // container.appendChild(label)
    // label.textContent = this.label

    // if (this.type === 'primary') container.classList.add('is-primary')
  }

  get variant() {
    return this.getAttribute('variant')
  }

  get size() {
    return this.getAttribute('size')
  }
  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  get badge() {
    return this.getAttribute('badge')
  }

  connectedCallback() {
    // this.textContent = this.label
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Avatar
