import { makeStyleSheet } from '../../javascripts/components/utils'

class Button extends HTMLElement {
  static get observedAttributes() {
    return ['disabled']
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    const variant = this.getAttribute('variant')

    const host = document.createElement('button')
    host.classList.add('button')
    host.dataset.variant = variant || ''
    host.dataset.size = this.size || ''
    host.dataset.status = this.status || ''
    const label = document.createElement('label')
    label.classList.add('button-label')

    const iconSlot = document.createElement('slot')
    iconSlot.name = 'icon'

    // ! boolean타입이면 속성의 값이 있는지 없는지를 체크해야함.
    if (this.isfullwidth) host.dataset.isfullwidth = 'true'

    label.textContent = this.textContent || this.label

    shadowRoot?.append(host, makeStyleSheet('button'))
    if (label && label.textContent!.length > 0) host.appendChild(label)

    if (this.icon) {
      const icon = document.createElement('mm-icon')
      icon.setAttribute('name', this.icon)
      host.ariaLabel = this.ariaLabel

      host.appendChild(icon)
    }

    if (this.status === 'active') host.setAttribute('aria-selected', 'true')
    if (this.status === 'disabled') host.setAttribute('disabled', 'true')
    if (this.status === 'checked') host.setAttribute('aria-checked', 'true')
  }

  // get variant() {
  //   return this.getAttribute('variant')
  // }

  get isfullwidth() {
    return this.getAttribute('isfullwidth')
  }

  get size() {
    return this.getAttribute('size')
  }

  get label() {
    return this.getAttribute('label')
  }

  get status() {
    return this.getAttribute('status')
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  get icon() {
    return this.getAttribute('icon')
  }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if(this.disabled) {
  //     this.removeAttribute('tabindex')
  //     this._internals.ariaDisabled = true
  //   } else {

  //   }
  // }

  connectedCallback() {}
  attributeChangedCallback() {}
  disconnectedCallback() {}
}

export default Button

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

//     // TODO label tag
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
//   //   // TODO: also react to the open attribute changing.
//   // }
// }

// export default Chip
