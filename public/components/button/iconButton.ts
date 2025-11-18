import { makeStyleSheet } from '../../javascripts/components/utils'

// aria label

class IconButton extends HTMLElement {
  private hostElement: HTMLButtonElement
  private iconElement: HTMLElement

  static get observedAttributes() {
    return ['disabled', 'icon', 'variant', 'label', 'size', 'color']
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
    hostElement.dataset.size = this.size

    iconElement.setAttribute('name', this.icon)

    if (this.color) {
      iconElement.setAttribute('color', this.color)
    }

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
    return this.getAttribute('icon') ?? ''
  }

  get variant() {
    return this.getAttribute('variant') || ''
  }

  get size() {
    return this.getAttribute('size') || ''
  }
  get color() {
    return this.getAttribute('color') || ''
  }

  get label() {
    return this.getAttribute('label') || ''
  }

  get tooltip() {
    return this.getAttribute('tooltip') || ''
  }

  disconnectedCallback() {}

  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return

    // color 속성이 변경되었을 때 처리
    if (name === 'color' && this.iconElement) {
      if (newValue) {
        this.iconElement.setAttribute('color', newValue)
      } else {
        // color 속성이 제거되었을 경우
        this.iconElement.removeAttribute('color')
      }
    }
  }
}

export default IconButton
