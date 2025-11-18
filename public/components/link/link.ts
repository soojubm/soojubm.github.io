import { makeStyleSheet } from '../../javascripts/components/utils'

class Link extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('a')
    container.classList.add('link')
    container.href = this.href || ''
    container.target = this.target || '_blank'
    container.dataset.variant = this.variant || 'primary'

    const icon = document.createElement('mm-icon')
    icon.setAttribute('name', 'arrow-up-right')
    icon.setAttribute('size', 'tiny')
    // TODO 위에서 생성

    if (this.isExternal) {
      container.setAttribute('rel', 'noopener noreferrer')
      const srOnly = document.createElement('span')
      srOnly.hidden = true // 임시
      srOnly.classList.add('sr-only')
      srOnly.textContent = '(새 창에서 열림)'
      container.appendChild(srOnly)
      // container.appendChild(icon)
    }

    shadow.appendChild(container)
    container.append(...this.childNodes, makeStyleSheet('link'))
    if (this.isExternal) container.appendChild(icon)
  }

  get href() {
    return this.getAttribute('href')
  }
  get target() {
    return this.getAttribute('target')
  }
  get variant() {
    return this.getAttribute('variant')
  }
  get isExternal() {
    return this.getAttribute('isExternal') === 'true'
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Link
