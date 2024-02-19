import { makeStyleSheet } from '../../javascripts/components/utils'

class Feature extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('feature-item')

    const avatar = document.createElement('test-avatar')
    avatar.setAttribute('size', 'large')
    avatar.innerText = this.icon || ''
    avatar.classList.add('feature-item-avatar')

    const heading = document.createElement('test-text')
    heading.setAttribute('variant', 'subhead')
    heading.innerText = this.titleText || ''
    heading.classList.add('feature-item-title')

    const subtitle = document.createElement('sup')
    subtitle.innerText = this.subtitle || ''

    const description = document.createElement('test-text')
    description.setAttribute('variant', 'body')
    description.innerText = this.description || ''
    description.classList.add('feature-item-description')

    shadow.appendChild(container)
    container.append(avatar, heading, subtitle, description, makeStyleSheet('feature'))
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
