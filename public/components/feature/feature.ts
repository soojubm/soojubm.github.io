import { makeStyleSheet } from '../../javascripts/components/utils'

class Feature extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('feature-item')

    const avatar = document.createElement('test-avatar')
    avatar.setAttribute('size', 'large')
    avatar.classList.add('feature-item-avatar')

    const heading = document.createElement('test-text')
    heading.setAttribute('variant', 'subhead')
    heading.innerText = this.heading || ''

    shadow.appendChild(container)
    container.append(avatar, heading)
  }

  get type() {
    return this.getAttribute('type')
  }

  get heading() {
    return this.getAttribute('heading')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Feature
