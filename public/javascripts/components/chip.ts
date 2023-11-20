import { importScript, makeStyleSheet } from './utils'

class Chip extends HTMLElement {
  // #internals = this.attachInternals() as any

  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    // console.log('#internals', this.#internals)
    // const sheet = new CSSStyleSheet()

    // replace all styles synchronously:
    // document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]

    // Any @import rules are ignored.
    // Both of these still apply the a{} style:
    // sheet.replaceSync('@import url("styles.css"); a { color: red; }')
    // sheet.replace('@import url("styles.css"); a { color: red; }').then(() => {
    //     console.log('Styles replaced', sheet)
    //   })
    //   .catch(err => {
    //     console.error('Failed to replace styles:', err)
    //   })
    // Console warning: "@import rules are not allowed here..."

    // shadow.adoptedStyleSheets = [sheet]
    // host.shadowRoot?.adoptedStyleSheets = [sheet]

    const host = document.createElement('button')
    host.classList.add('chip')

    const label = document.createElement('span')
    label.classList.add('chip-label')

    const name = document.createElement('b')
    name.classList.add('chip-name')

    const iconSlot = document.createElement('slot')
    iconSlot.name = 'icon'

    const suffixSlot = document.createElement('slot')
    suffixSlot.name = 'suffix'

    host.appendChild(iconSlot)
    if (this.name) {
      name.innerText = this.name || ''
      host.appendChild(name)
    }
    if (this.label) {
      label.innerText = this.label || ''
      host.appendChild(label)
    }
    // else {
    //   host.innerHTML = host.innerText
    // }

    shadow.appendChild(host)
    host.append(suffixSlot, makeStyleSheet('chip'))

    // this.addEventListener('click', e => {
    //   if (this.disabled) return
    //   this.toggleDrawer()
    // })

    // b.append(...this.childNodes)

    // TODO info naked
    if (this.status === 'info') host.dataset.status = 'info'
    if (this.status === 'active') host.setAttribute('aria-selected', 'true')
    if (this.status === 'disabled') host.setAttribute('disabled', 'true')
    if (this.status === 'checked') host.setAttribute('aria-checked', 'true')
    if (this.status === 'destructive') host.dataset.variant = 'destructive'
  }

  // static get observedAttributes() {
  //   return ['size', 'status', 'icon', 'type', 'value', 'label']
  // }

  get content() {
    return this.innerHTML
  }

  get size() {
    return this.getAttribute('size')
  }
  get status() {
    return this.getAttribute('status')
  }
  get type() {
    return this.getAttribute('type')
  }
  get value() {
    return this.getAttribute('value')
  }
  get name() {
    return this.getAttribute('name')
  }
  get label() {
    return this.getAttribute('label')
  }

  connectedCallback() {}
  disconnectedCallback() {}
  // attributeChangedCallback(name, oldValue, newValue) {
  //   // When the drawer is disabled, update keyboard/screen reader behavior.
  //   if (this.disabled) {
  //     this.setAttribute('tabindex', '-1')
  //     this.setAttribute('aria-disabled', 'true')
  //   } else {
  //     this.setAttribute('tabindex', '0')
  //     this.setAttribute('aria-disabled', 'false')
  //   }
  //   // TODO: also react to the open attribute changing.
  // }
}

export default Chip
