import { makeStyleSheet } from '../../javascripts/components/utils'

class Button extends HTMLElement {
  // static observedAttributes = ['disabled']
  constructor() {
    super()
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
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('button')
    container.classList.add('button')
    container.dataset.variant = this.variant || ''
    container.dataset.size = this.size || ''
    container.dataset.status = this.status || ''

    const prefixSlot = document.createElement('slot')
    prefixSlot.name = 'prefix'

    const label = document.createElement('label')

    const suffixSlot = document.createElement('slot')
    suffixSlot.name = 'suffix'

    // ! boolean타입이면 속성의 값이 있는지 없는지를 체크해야함.
    if (this.isfullwidth) container.dataset.isfullwidth = 'true'

    // Button.append(...this.childNodes)
    label.textContent = this.textContent || this.label

    shadow.append(container, makeStyleSheet('button'))
    container.appendChild(prefixSlot)
    container.appendChild(label)
    container.appendChild(suffixSlot)
  }

  get variant() {
    return this.getAttribute('variant')
  }

  get isfullwidth() {
    return this.getAttribute('isfullwidth')
  }

  get size() {
    return this.getAttribute('size')
  }
  // set size(value) {
  //   if (value) this.setAttribute('data-size', value)
  // }

  get label() {
    return this.getAttribute('label')
  }

  get status() {
    return this.getAttribute('status')
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }

  // get type() {}
  // set disabled(flag) {
  //   this.toggleAttribute('disabled', Boolean(flag))
  // }

  // attributeChangedCallback(name, oldValue, newValue) {
  //   if(this.disabled) {
  //     this.removeAttribute('tabindex')
  //     this._internals.ariaDisabled = true
  //   } else {

  //   }
  // }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default Button
