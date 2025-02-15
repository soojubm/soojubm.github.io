import { importStyle, makeStyleSheet } from '../../javascripts/components/utils'

// 동적으로 생성할 때, 다른 커스텀 엘리먼트에서.connectedCallback 에 넣으면 됨.

class Icon extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    if (this.shadowRoot) return

    const ICON_CLASSNAME = `iconoir-${this.name}`

    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('i')
    // container.role = 'img'
    container.classList.add('icon', ICON_CLASSNAME)
    if (this.size) container.dataset.size = this.size
    if (this.color) container.style.color = this.color

    const pretty = document.createElement('link')
    pretty.href = 'https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css'
    pretty.rel = 'stylesheet'

    shadow.append(makeStyleSheet('icon'), pretty, container)
  }
  disconnectedCallback() {}

  get name() {
    return this.getAttribute('name')
  }

  get size() {
    return this.getAttribute('size')
  }

  get color() {
    return this.getAttribute('color')
  }
  // set size(value) {
  //   // TODO TS2339: Property 'dataset' does not exist on type 'ChildNode'
  //   const node = this.shadowRoot!.lastChild as HTMLElement
  //   if (value) node.dataset.size = value
  // }
}

export default Icon
