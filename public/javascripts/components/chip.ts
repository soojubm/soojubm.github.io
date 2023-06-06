class Chip extends HTMLElement {
  constructor() {
    super()
    // this.innerHTML = `<button class="chip"></button>`
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('button')
    container.classList.add('chip')
    // container.setAttribute('class', 'chip')

    const label = document.createElement('span')
    label.setAttribute('class', 'chip-label')

    // this.addEventListener('click', () => alert('custom element'))

    shadow.appendChild(container)

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', '/public/stylesheets/components/chip.css')
    shadow.appendChild(linkElem)

    // ! webpack css

    // Attach the created elements to the shadow dom
    container.appendChild(label)

    label.textContent = this.label

    if (this.type === 'primary') container.classList.add('is-primary')
    if (this.status === 'active') container.setAttribute('aria-selected', 'true')
  }

  get size() {
    return this.getAttribute('size')
  }
  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  get status() {
    return this.getAttribute('status')
  }
  set status(value) {
    if (value) this.setAttribute('status', value)
  }

  get type() {
    return this.getAttribute('type')
  }
  set type(value) {
    if (value) this.setAttribute('type', value)
  }

  get label() {
    return this.getAttribute('label')
  }
  set label(value) {
    if (value) this.setAttribute('label', value)
  }
  connectedCallback() {
    // this.textContent = this.label

    console.log('ihnnerhtml', this.innerHTML)
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Chip
