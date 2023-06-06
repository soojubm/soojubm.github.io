class Avatar extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('figure')
    container.classList.add('avatar')
    container.setAttribute('role', 'img')
    container.setAttribute('data-size', this.size || '')

    shadow.appendChild(container)

    const badge = document.createElement('span')
    badge.classList.add('avatar-badge')
    container.appendChild(badge)

    // Apply external styles to the shadow dom
    const linkElem = document.createElement('link')
    linkElem.setAttribute('rel', 'stylesheet')
    linkElem.setAttribute('href', '/public/stylesheets/components/avatars.css')
    shadow.appendChild(linkElem)

    // Attach the created elements to the shadow dom
    // <span class="avatar-badge"></span>
    // container.appendChild(label)
    // label.textContent = this.label

    // if (this.type === 'primary') container.classList.add('is-primary')
  }

  get size() {
    return this.getAttribute('size')
  }
  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  get badge() {
    return this.getAttribute('badge')
  }
  set badge(value) {
    if (value) this.setAttribute('badge', value)
  }

  connectedCallback() {
    // this.textContent = this.label
  }

  disconnectedCallback() {
    console.log('disconnected', this)
  }
}

export default Avatar
