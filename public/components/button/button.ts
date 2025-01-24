import { makeStyleSheet } from '../../javascripts/components/utils'

class Button extends HTMLElement {
  private hostElement: HTMLButtonElement
  private labelElement: HTMLElement
  private iconElement?: HTMLElement

  static get observedAttributes() {
    return ['disabled']
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    this.hostElement = document.createElement('button')
    this.labelElement = document.createElement('label')
    this.iconElement = undefined
  }

  connectedCallback() {
    const { shadowRoot, hostElement, labelElement, iconElement } = this

    hostElement.classList.add('button')
    hostElement.dataset.variant = this.variant
    hostElement.dataset.size = this.size
    hostElement.dataset.status = this.status

    hostElement.dataset.isfullwidth = this.isfullwidth === 'true' ? 'true' : 'false'

    labelElement.classList.add('button-label')
    labelElement.textContent = this.textContent

    shadowRoot!.innerHTML = ''
    shadowRoot!.append(hostElement, makeStyleSheet('button'))
    hostElement.appendChild(labelElement)

    // if (this.icon && !this.iconElement) {
    //   iconElement = document.createElement('mm-icon')
    //   iconElement.setAttribute('name', this.icon)
    //   hostElement.appendChild(iconElement)
    // }

    if (this.disabled) {
      this.hostElement.setAttribute('disabled', 'true')
      this.hostElement.setAttribute('aria-disabled', 'true') // TODO 이거 필수인지?
    }

    if (this.status === 'active') hostElement.setAttribute('aria-selected', 'true')
    if (this.status === 'checked') hostElement.setAttribute('aria-checked', 'true')
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      // this.render()
    }
  }
  disconnectedCallback() {}

  get variant() {
    return this.getAttribute('variant') || 'tertiary'
  }

  get isfullwidth() {
    return this.getAttribute('isfullwidth') || 'false'
  }

  get size() {
    return this.getAttribute('size') || 'medium'
  }

  get status() {
    return this.getAttribute('status') || ''
  }

  // todo type check boolean? string?
  get disabled(): boolean {
    return this.hasAttribute('disabled')
  }

  get icon() {
    return this.getAttribute('icon') || ''
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if(this.disabled) {
  //     this.removeAttribute('tabindex')
  //     this._internals.ariaDisabled = true
  //   } else {
}

export default Button

// if (this.isfullwidth) {
//   hostElement.dataset.isfullwidth = '';
// } else {
//   delete hostElement.dataset.isfullwidth;
// }

// TODO:
// class BlueBuy extends HTMLElement {
//   static get observedAttributes() {
//     return ['sku'];
//   }
//   connectedCallback() {
//     this.render();
//   }
//   render() {
//     const sku = this.getAttribute('sku');
//     const price = prices[sku];
//     this.innerHTML = `<button type="button">buy for ${price}</button>`;
//   }
//   attributeChangedCallback(attr, oldValue, newValue) {
//     this.render();
//   }
//   disconnectedCallback() {...}
// }
// window.customElements.define('blue-buy', BlueBuy);

// this._internals = this.attachInternals()
// this._internals.role = 'button'

// this.addEventListener('keydown', e => {
//   if (e.code === 'Enter' || e.code === 'space') {
//     this.dispatchEvent(
//       new PointerEvent('click', {
//         bubbles: true,
//         cancelable: true,
//       }),
//     )
//   }
// })

// this.addEventListener('click', e => {
//   if (this.disabled) {
//     e.preventDefault()
//     e.stopImmediatePropagation()
//   }
// })

// this._observer = new MutationObserver(() => {
//   this._internals.ariaLabel = this.textContent
// })

// import { importScript, makeStyleSheet } from '../../javascripts/components/utils'

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

// class Chip extends HTMLElement {
//   static get observedAttributes() {
//     return ['icon']
//   }
//   constructor() {
//     super()
//   }

//   // static get observedAttributes() {
//   //   return ['size', 'status', 'icon', 'type', 'value', 'label']
//   // }

//   get size() {
//     return this.getAttribute('size')
//   }

//   get variant() {
//     return this.getAttribute('variant')
//   }

//   get status() {
//     return this.getAttribute('status')
//   }
//   get type() {
//     return this.getAttribute('type')
//   }
//   get value() {
//     return this.getAttribute('value')
//   }
//   get name() {
//     return this.getAttribute('name')
//   }

//   get icon() {
//     return this.getAttribute('icon')
//   }

//   get ariaLabel() {
//     return this.getAttribute('aria-label')
//   }

//   connectedCallback() {
//     const shadow = this.attachShadow({ mode: 'open' })

//     const host = document.createElement('button')
//     host.classList.add('chip')

//     const name = document.createElement('span')
//     name.classList.add('chip-name')

//     // append 순서로 slot 순서를 결정할 수 있다.

//     // TODO avatar와 공통
//     if (this.icon) {
//       const icon = document.createElement('mm-icon')
//       icon.setAttribute('name', this.icon)

//       host.ariaLabel = this.ariaLabel

//       host.appendChild(icon)
//     }

//     shadow.append(host, makeStyleSheet('chip'))

//     if (this.name) {
//       name.innerText = this.name || ''
//       host.appendChild(name)
//     }

//     // // 예시로 textContent 설정
//     // const text = this.textContent.trim();

//     // // textContent가 비어있지 않을 때만 요소 추가
//     // if (text.length > 0) {
//     //     const newElement = document.createElement('p');
//     //     newElement.textContent = text;
//     //     this.container.appendChild(newElement);
//     // }
//     if (this.textContent && this.textContent.trim().length > 0) {
//       const label = document.createElement('span')
//       label.classList.add('chip-label')
//       label.innerText = this.textContent

//       host.appendChild(label)
//     }

//     // TODO
//     // shadow.appendChild(container)
//     // container.append(...this.childNodes, makeStyleSheet('menuitem'))

//     // this.addEventListener('click', e => {
//     //   if (this.disabled) return
//     //   this.toggleDrawer()
//     // })

//     // b.append(...this.childNodes)

//     if (this.variant) host.dataset.variant = this.variant

//     if (this.status === 'active') host.setAttribute('aria-selected', 'true')
//     if (this.status === 'disabled') host.setAttribute('disabled', 'true')
//     if (this.status === 'checked') host.setAttribute('aria-checked', 'true')
//   }
//   disconnectedCallback() {}
//   // attributeChangedCallback(name, oldValue, newValue) {
//   //   // When the drawer is disabled, update keyboard/screen reader behavior.
//   //   if (this.disabled) {
//   //     this.setAttribute('tabindex', '-1')
//   //     this.setAttribute('aria-disabled', 'true')
//   //   } else {
//   //     this.setAttribute('tabindex', '0')
//   //     this.setAttribute('aria-disabled', 'false')
//   //   }
//   // }
// }

// export default Chip
