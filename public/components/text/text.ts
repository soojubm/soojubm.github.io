import { makeStyleSheet } from '../../javascripts/components/utils'

// : 'title' | 'subhead' | 'body' | 'body-large' | 'label' | 'heading4'

class Text extends HTMLElement {
  private hostElement: HTMLParagraphElement

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    this.hostElement = document.createElement('p')
    this.hostElement.classList.add('text')

    // ★ 스타일을 constructor 에서 1회만 추가
    shadowRoot.append(makeStyleSheet('text'))
    shadowRoot.append(this.hostElement)
  }

  connectedCallback() {
    const { hostElement } = this
    hostElement.dataset.variant = this.variant
    hostElement.dataset.truncated = this.truncated ? 'true' : 'false'
    hostElement.dataset.center = this.center ? 'true' : 'false'
    hostElement.innerHTML = this.innerHTML
  }

  get variant() {
    return this.getAttribute('variant') || 'body'
  }
  get center() {
    return this.hasAttribute('center')
  }
  get truncated() {
    return this.hasAttribute('truncated')
  }
}

export default Text
