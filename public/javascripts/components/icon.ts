import { importScript, makeStyleSheet } from './utils'

class Icon extends HTMLElement {
  constructor() {
    super()
    const iconClassName = `iconoir-${this.name}`

    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('i')
    container.classList.add('icon')
    container.classList.add(iconClassName)
    container.role = 'img'

    const pretty = document.createElement('link')
    pretty.href = 'https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css'
    pretty.rel = 'stylesheet'

    shadow.append(pretty, container, makeStyleSheet('icon'))
  }

  get name() {
    return this.getAttribute('name')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Icon
