import { importScript, makeStyleSheet } from './utils'

class Chip extends HTMLElement {
  #internals = this.attachInternals() as any

  constructor() {
    super()

    console.log('#internals', this.#internals)
    const sheet = new CSSStyleSheet()
    // replace all styles synchronously:
    // sheet.replaceSync('@import url("/public/stylesheets/components/chip.css"); button { color: red; }')
    // document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]

    // replace all styles:
    // sheet
    //   .replace('@import url("/public/stylesheets/components/chip.css"); button { color: blue; }')
    //   .then(() => {
    //     console.log('Styles replaced', sheet)
    //   })
    //   .catch(err => {
    //     console.error('Failed to replace styles:', err)
    //   })

    // Any @import rules are ignored.
    // Both of these still apply the a{} style:
    // sheet.replaceSync('@import url("styles.css"); a { color: red; }')
    // sheet.replace('@import url("styles.css"); a { color: red; }')
    // Console warning: "@import rules are not allowed here..."

    // link rel=- dom 생성 안 됨

    const host = document.createElement('button')
    const label = document.createElement('span')
    const icon = document.createElement('span')
    const value = document.createElement('em')

    const iconSlot = document.createElement('slot')
    iconSlot.name = 'icon'
    iconSlot.classList.add('chip-icon')

    const shadow = this.attachShadow({ mode: 'open' })
    shadow.appendChild(host)

    // shadow.adoptedStyleSheets = [sheet]

    // console.log('!!!!!', document.adoptedStyleSheets)

    // host.shadowRoot?.adoptedStyleSheets = [sheet]
    host.classList.add('chip')
    label.classList.add('chip-label')
    icon.classList.add('chip-icon')
    // createElement('em') => reset em
    value.classList.add('chip-value')

    // this.addEventListener('click', e => {
    //   // Don't toggle the drawer if it's disabled.
    //   if (this.disabled) {
    //     return
    //   }
    //   this.toggleDrawer()
    // })

    // b.append(...this.childNodes)

    shadow.appendChild(makeStyleSheet('chip'))

    var pretty = document.createElement('link')
    pretty.href = 'https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css'

    // Attach the created elements to the shadow dom
    if (this.icon) host.appendChild(icon)
    host.appendChild(label)
    host.append(iconSlot, pretty)

    label.innerHTML = this.innerHTML || this.label || ''

    if (this.icon) {
      icon.innerHTML = this.icon
    }
    if (this.value) {
      value.textContent = this.value || ''
      label.appendChild(value)
    }
    if (this.status === 'active') host.setAttribute('aria-selected', 'true')
    if (this.status === 'disabled') host.setAttribute('disabled', 'true')
  }

  // static get observedAttributes() {
  //   return ['size', 'status', 'icon', 'type', 'value', 'label']
  // }

  // get content() {
  //   return this.innerHTML
  // }

  get size() {
    return this.getAttribute('size')
  }
  get status() {
    return this.getAttribute('status')
  }
  get icon() {
    return this.getAttribute('icon')
  }
  get type() {
    return this.getAttribute('type')
  }
  get value() {
    return this.getAttribute('value')
  }
  get label() {
    return this.getAttribute('label')
  }

  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  set status(value) {
    if (value) this.setAttribute('status', value)
  }

  set type(value) {
    if (value) this.setAttribute('type', value)
  }

  set label(value) {
    if (value) this.setAttribute('label', value)
  }

  connectedCallback() {
    console.log('@@@222')
  }
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
