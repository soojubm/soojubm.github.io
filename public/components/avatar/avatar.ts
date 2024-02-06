import { makeStyleSheet, inheritStyle } from '../../javascripts/components/utils'

class Avatar extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('figure')
    container.classList.add('avatar')
    container.role = 'img'

    const badge = document.createElement('span')
    badge.classList.add('avatar-badge')

    if (this.size) container.dataset.size = this.size
    if (this.variant) container.dataset.variant = this.variant
    // container.innerHTML = this.content

    if (this.default === 'true') {
      container.dataset.default = 'true'
    }

    // TODO chip와 공통
    if (this.icon) {
      const icon = document.createElement('test-icon')
      icon.setAttribute('name', this.icon)

      container.ariaLabel = this.ariaLabel

      container.appendChild(icon)
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

  get content() {
    return this.innerHTML
  }

  get src() {
    return this.getAttribute('src')
  }

  get icon() {
    return this.getAttribute('icon')
  }

  get default() {
    return this.getAttribute('default')
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
