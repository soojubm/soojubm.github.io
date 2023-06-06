class Tile extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')
    container.classList.add('tile')
    // container.setAttribute('class', 'chip')

    shadow.appendChild(container)

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', '/public/stylesheets/components/tile.css')
    shadow.appendChild(linkElem)
  }

  get size() {
    return this.getAttribute('size')
  }
  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  connectedCallback() {
    // this.textContent = this.label
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Tile
