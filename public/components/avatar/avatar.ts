import { makeStyleSheet, inheritStyle } from '../../javascripts/components/utils'

class Avatar extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('figure')
    container.classList.add('avatar')
    container.role = 'img'

    const badgeSlot = document.createElement('slot')
    badgeSlot.name = 'badge'

    const badge = document.createElement('mm-badge')
    // badge.classList.add('avatar-badge')

    if (this.size) container.dataset.size = this.size
    if (this.variant) container.dataset.variant = this.variant

    if (this.default) container.dataset.default = 'true'
    if (this.icon) {
      const icon = document.createElement('mm-icon')
      const isLargeIcon = this.size === 'large' || this.size === 'huge'
      icon.setAttribute('name', this.icon)
      icon.setAttribute('size', isLargeIcon ? 'large' : 'medium')
      container.ariaLabel = this.ariaLabel
      container.appendChild(icon)
    }

    const style = this.getAttribute('style')
    if (style) container.setAttribute('style', style)

    shadow.append(container, makeStyleSheet('avatar'))
    container.append(...this.childNodes)
    if (this.src) {
      const image = document.createElement('img')
      image.setAttribute('src', this.src)
      container.appendChild(image)
    }
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

  // get iconSize() {
  //   return this.getAttribute('iconSize') || 'medium'
  // }

  get default() {
    return this.getAttribute('default')
  }
  connectedCallback() {}
  disconnectedCallback() {}
}

export default Avatar

// Attach the created elements to the shadow dom
// <span class="avatar-badge"></span>
// container.appendChild(label)
// label.textContent = this.label

// if (this.type === 'primary') container.classList.add('is-primary')
