import { makeStyleSheet } from './utils'

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
    if (this.isfullwidth) {
      container.dataset.isfullwidth = 'true'
    }

    console.log(this.isfullwidth, 'isfullwidth')
    // Button.append(...this.childNodes)
    container.textContent = this.textContent || this.label

    shadow.appendChild(container)
    shadow.appendChild(makeStyleSheet('button'))
  }

  get variant() {
    return this.getAttribute('variant')
  }
  // set variant(value) {
  //   if (value) this.setAttribute('data-variant', value)
  // }

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

  get isfullwidth() {
    return this.getAttribute('isfullwidth')
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }
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
