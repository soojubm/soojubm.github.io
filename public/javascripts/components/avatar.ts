import { makeStyleSheet } from './utils'

export function inheritStyle(shadow, container) {
  const style = shadow.getAttribute('style')
  container.setAttribute('style', style || '')
}

class Avatar extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'open' })

    const avatar = document.createElement('figure')
    const badge = document.createElement('span')

    avatar.classList.add('avatar')
    badge.classList.add('avatar-badge')

    avatar.setAttribute('role', 'img')
    avatar.setAttribute('data-size', this.size || '')
    avatar.setAttribute('data-variant', this.variant || '')
    avatar.setAttribute('data-fallback', this.variant || '')

    // TODO
    if (this.fallback) {
      avatar.classList.add('no')
      avatar.innerText = this.fallback
    }

    shadow.appendChild(avatar)
    avatar.append(...this.childNodes, makeStyleSheet('avatar'))

    if (this.badge) {
      avatar.appendChild(badge)
    }

    const style = this.getAttribute('style')
    avatar.setAttribute('style', style || '')

    // if (this.badge === '') {
    //   container.appendChild(badge)
    // }
    // Attach the created elements to the shadow dom
    // <span class="avatar-badge"></span>
    // container.appendChild(label)
    // label.textContent = this.label

    // if (this.type === 'primary') container.classList.add('is-primary')
  }

  // static get observedAttributes() {
  //   return ['variant', 'size', 'badge']
  // }
  // attributeChangedCallback(attrName, oldVal, newVal) {
  //   this[attrName] = newVal
  // }

  get variant() {
    return this.getAttribute('variant')
  }

  get size() {
    return this.getAttribute('size')
  }

  get badge() {
    return this.getAttribute('badge')
  }

  // TODO fallback은 아님
  get fallback() {
    return this.getAttribute('fallback')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Avatar
