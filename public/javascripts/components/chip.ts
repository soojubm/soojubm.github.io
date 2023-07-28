import { importScript, makeStyleSheet } from './utils'

class Chip extends HTMLElement {
  // #internals = this.attachInternals() as any

  constructor() {
    super()
    // console.log('#internals', this.#internals)
    // const sheet = new CSSStyleSheet()

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

    const host = document.createElement('button')
    const label = document.createElement('span')
    const name = document.createElement('b')

    const iconSlot = document.createElement('slot')
    const badgeSlot = document.createElement('slot')
    iconSlot.name = 'icon'
    badgeSlot.name = 'badge'

    // iconSlot.classList.add('chip-icon')

    const shadow = this.attachShadow({ mode: 'open' })

    // shadow.adoptedStyleSheets = [sheet]
    // host.shadowRoot?.adoptedStyleSheets = [sheet]

    host.classList.add('chip')
    name.classList.add('chip-name')
    label.classList.add('chip-label')
    // createElement('em') => reset em

    host.appendChild(iconSlot)
    if (this.name) {
      name.innerText = this.name || ''
      host.appendChild(name)
    }
    if (this.label) {
      label.innerText = this.label || ''
      host.appendChild(label)
    }

    shadow.appendChild(host)
    shadow.appendChild(makeStyleSheet('chip'))
    host.appendChild(badgeSlot)

    // this.addEventListener('click', e => {
    //   // Don't toggle the drawer if it's disabled.
    //   if (this.disabled) {
    //     return
    //   }
    //   this.toggleDrawer()
    // })

    // b.append(...this.childNodes)

    // Attach the created elements to the shadow dom

    // if (this.value) {
    //   value.textContent = this.value || ''
    //   label.appendChild(value)
    // }
    if (this.status === 'active') host.setAttribute('aria-selected', 'true')
    if (this.status === 'disabled') host.setAttribute('disabled', 'true')
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
