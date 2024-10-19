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
