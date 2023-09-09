import { makeStyleSheet } from './utils'

export function inheritStyle(shadow, container) {
  const style = shadow.getAttribute('style')
  container.setAttribute('style', style || '')
}

class Avatar extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('figure')
    const badge = document.createElement('span')

    // container.role = 'img'
    container.classList.add('avatar')
    if (this.size) container.dataset.size = this.size
    if (this.variant) container.dataset.variant = this.variant
    // container.innerHTML = this.content

    badge.classList.add('avatar-badge')

    // TODO
    if (this.fallback) {
      container.classList.add('no')
      container.innerText = this.fallback
    }

    const style = this.getAttribute('style')
    if (style) container.setAttribute('style', style)

    if (this.src) {
      const image = document.createElement('image')
      image.setAttribute('src', this.src)
      container.appendChild(image)
    }

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('avatar'))
    // TODO childNodes => iconSlot
    container.append(...this.childNodes)
    if (this.badge) container.appendChild(badge)
  }

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
  get content() {
    return this.innerHTML
  }

  get src() {
    return this.getAttribute('src')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Avatar

// static get observedAttributes() {
//   return ['variant', 'size', 'badge']
// }
// attributeChangedCallback(attrName, oldVal, newVal) {
//   this[attrName] = newVal
// }

// Attach the created elements to the shadow dom
// <span class="avatar-badge"></span>
// container.appendChild(label)
// label.textContent = this.label

// if (this.type === 'primary') container.classList.add('is-primary')
