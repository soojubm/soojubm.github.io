import { makeStyleSheet } from './utils'

class Chip extends HTMLElement {
  constructor() {
    super()

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

    // host.setAttribute('class', 'chip')

    // this.addEventListener('click', e => {
    //   // Don't toggle the drawer if it's disabled.
    //   if (this.disabled) {
    //     return
    //   }
    //   this.toggleDrawer()
    // })

    shadow.appendChild(makeStyleSheet('chip'))

    // Attach the created elements to the shadow dom
    if (this.icon) host.appendChild(icon)
    host.appendChild(label)

    label.innerHTML = this.innerHTML || this.label || ''

    if (this.icon) {
      icon.innerHTML = this.icon
    }
    if (this.value) {
      value.textContent = this.value || ''
      label.appendChild(value)
    }
    if (this.type === 'primary') host.classList.add('is-primary')
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
  set size(value) {
    if (value) this.setAttribute('size', value)
  }

  get status() {
    return this.getAttribute('status')
  }
  set status(value) {
    if (value) this.setAttribute('status', value)
  }

  get icon() {
    return this.getAttribute('icon')
  }

  get type() {
    return this.getAttribute('type')
  }
  set type(value) {
    if (value) this.setAttribute('type', value)
  }

  get value() {
    return this.getAttribute('value')
  }

  get label() {
    return this.getAttribute('label')
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
