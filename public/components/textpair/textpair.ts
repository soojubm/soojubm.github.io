class TextPair extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const container = document.createElement('div')

    const labelTextElement = document.createElement('mm-text')
    labelTextElement.setAttribute('variant', 'label-strong')
    labelTextElement.innerText = this.labelText || ''

    const descriptionElement = document.createElement('mm-text')
    descriptionElement.setAttribute('variant', 'body')
    descriptionElement.innerText = this.descriptionText || ''

    shadow.appendChild(container)
    container.append(labelTextElement, descriptionElement)
  }

  get labelText() {
    return this.getAttribute('labelText')
  }

  get descriptionText() {
    return this.getAttribute('descriptionText')
  }

  connectedCallback() {}
  disconnectedCallback() {}
}

export default TextPair
