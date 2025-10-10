import { makeStyleSheet } from '../../javascripts/components/utils'

class Feature extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('feature-item')

    const avatar = document.createElement('mm-avatar')
    avatar.setAttribute('variant', 'secondary')
    avatar.setAttribute('size', 'medium')

    const icon = document.createElement('mm-icon')
    icon.setAttribute('name', this.icon || '')
    icon.setAttribute('size', 'medium')

    avatar.appendChild(icon)

    const titleWithDescription = document.createElement('mm-title-with-description')
    titleWithDescription.setAttribute('level', '4')
    titleWithDescription.setAttribute('title', this.titleText || '')
    titleWithDescription.setAttribute('description', this.description || '')
    titleWithDescription.classList.add('feature-item-header')

    const style = document.createElement('style')
    style.textContent = `
      mm-avatar::part(avatar) {
        border-color: var(--color-foreground) !important;
      }
    `
    shadow.appendChild(style) // ✅ 중요!
    // const subtitle = document.createElement('sup')
    // subtitle.innerText = this.subtitle || ''

    shadow.appendChild(container)

    container.append(avatar, titleWithDescription, makeStyleSheet('feature'))
    container.append(...this.childNodes)
  }

  get type() {
    return this.getAttribute('type')
  }

  get icon() {
    return this.getAttribute('icon')
  }

  get titleText() {
    return this.getAttribute('titleText')
  }

  get subtitle() {
    return this.getAttribute('subtitle')
  }

  get description() {
    return this.getAttribute('description')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Feature
