import { importScript, makeStyleSheet } from './utils'

class Icon extends HTMLElement {
  constructor() {
    super()
    const iconClassName = `iconoir-${this.name}`

    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('i')
    container.role = 'img'
    container.classList.add('icon', iconClassName)
    if (this.size) container.dataset.size = this.size

    // TODO
    const pretty = document.createElement('link')
    pretty.href = 'https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css'
    pretty.rel = 'stylesheet'

    shadow.append(makeStyleSheet('icon'), pretty, container)
    container.append()

    console.log('@ size', this.size, this, this.shadowRoot, this.shadowRoot!.lastChild!)
  }

  get name() {
    return this.getAttribute('name')
  }

  get size() {
    return this.getAttribute('size')
  }
  // set size(value) {
  //   // TODO TS2339: Property 'dataset' does not exist on type 'ChildNode'
  //   const node = this.shadowRoot!.lastChild as HTMLElement
  //   if (value) node.dataset.size = value
  // }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Icon
