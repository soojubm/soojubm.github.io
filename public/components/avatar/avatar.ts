import { makeStyleSheet, inheritStyle } from '../../javascripts/components/utils'

class Avatar extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    const shadow = this.shadowRoot!

    // 이미 렌더링 되어 있으면 중복 생성 방지. 왜 여기서만?
    if (shadow.querySelector('.avatar')) return

    const container = document.createElement('figure')
    container.classList.add('avatar')
    container.role = 'img'
    container.dataset.size = this.size
    container.dataset.variant = this.variant
    container.ariaLabel = this.ariaLabel
    container.dataset.default = this.default

    const badge = document.createElement('mm-badge')

    if (this.icon) {
      const icon = document.createElement('mm-icon')
      const isLargeIcon = this.size === 'large' || this.size === 'huge'
      icon.setAttribute('name', this.icon)
      icon.setAttribute('size', isLargeIcon ? 'large' : 'medium')
      container.appendChild(icon)
    }

    const style = this.getAttribute('style')
    if (style) container.setAttribute('style', style)

    shadow.append(container, makeStyleSheet('avatar'))
    if (this.src) {
      const image = document.createElement('img')
      image.setAttribute('src', this.src)
      container.appendChild(image)
    }
    if (this.badge) container.appendChild(badge)
  }

  get variant() {
    return this.getAttribute('variant') ?? 'primary'
  }

  get size() {
    return this.getAttribute('size') ?? 'medium'
  }

  get badge() {
    return this.getAttribute('badge')
  }

  get src() {
    return this.getAttribute('src')
  }

  get icon() {
    return this.getAttribute('icon')
  }

  get default() {
    return this.getAttribute('default') ?? 'false'
  }
}

export default Avatar

// Attach the created elements to the shadow dom
// <span class="avatar-badge"></span>
// container.appendChild(label)
// label.textContent = this.label

// if (this.type === 'primary') container.classList.add('is-primary')
