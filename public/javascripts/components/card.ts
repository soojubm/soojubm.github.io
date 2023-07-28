import { makeStyleSheet } from './utils'

class Card extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    const thumbnail = document.createElement('slot')
    const heading = document.createElement('slot')
    const body = document.createElement('slot')
    const tags = document.createElement('slot')

    container.classList.add('card')
    thumbnail.name = 'thumbnail'
    heading.name = 'heading'
    body.name = 'body'
    tags.name = 'tags'
    // thumbnail.classList.add('card-thumbnail')
    shadow.appendChild(container)
    container.append(thumbnail, heading, body, tags, makeStyleSheet('tiles'))

    const className = this.getAttribute('class')
    if (className) {
      container.classList.add(className)
    }
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Card
