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

    const prefixSlot = document.createElement('slot')
    prefixSlot.name = 'prefix'

    const suffixSlot = document.createElement('slot')
    suffixSlot.name = 'suffix'

    shadow.append(host, makeStyleSheet('chip'))

    if (this.name) {
      name.innerText = this.name || ''
      host.appendChild(name)
    }
    // console.log(this.textContent)

    // append 순서로 slot 순서를 결정할 수 있다.
    host.appendChild(iconSlot)

    host.appendChild(prefixSlot)

    // TODO label tag
    // if (this.textContent && this.textContent.length > 0) {}
    label.innerText = this.textContent || ''
    host.appendChild(label)

    host.appendChild(suffixSlot)

    // this.addEventListener('click', e => {
    //   if (this.disabled) return
    //   this.toggleDrawer()
    // })

    // b.append(...this.childNodes)

    if (this.variant === 'plain') host.dataset.status = 'plain'

    if (this.status === 'active') host.setAttribute('aria-selected', 'true')
    if (this.status === 'disabled') host.setAttribute('disabled', 'true')
    if (this.status === 'checked') host.setAttribute('aria-checked', 'true')
    if (this.status === 'destructive') host.dataset.variant = 'destructive'
  }

  // static get observedAttributes() {
  //   return ['size', 'status', 'icon', 'type', 'value', 'label']
  // }

  get size() {
    return this.getAttribute('size')
  }

  get variant() {
    return this.getAttribute('variant')
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
