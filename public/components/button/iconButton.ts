import { makeStyleSheet } from '../../javascripts/components/utils'

// aria label

class IconButton extends HTMLElement {
  private hostElement: HTMLButtonElement
  private iconElement: HTMLElement

  static get observedAttributes() {
    return ['disabled', 'icon', 'variant', 'label']
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    this.hostElement = document.createElement('button')
    this.iconElement = document.createElement('mm-icon')
  }

  connectedCallback() {
    const { shadowRoot, hostElement, iconElement } = this

    hostElement.classList.add('icon-button')
    hostElement.dataset.variant = this.variant

    iconElement.setAttribute('name', this.icon)

    hostElement.appendChild(this.iconElement)

    // 이것도 안 됨..
    // hostElement.innerHTML = `
    //   <mm-icon name=${this.icon}></mm-icon>
    // `

    shadowRoot!.append(this.hostElement, makeStyleSheet('button'))
  }
  // attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
  //   if (oldValue !== newValue) {
  //     this.render();
  //   }
  // }

  get icon() {
    return this.getAttribute('icon') || ''
  }

  get variant() {
    return this.getAttribute('variant') || ''
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  get tooltip() {
    return this.getAttribute('tooltip') || ''
  }
  disconnectedCallback() {}
}

export default IconButton
