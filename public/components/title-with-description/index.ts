class TitleWithDescription extends HTMLElement {
  private hostElement: HTMLElement
  private titleElement: HTMLElement
  private descriptionElement: HTMLElement

  static get observedAttributes() {
    return ['title', 'description', 'level']
  }

  static variants = {
    '1': {
      title: 'title',
      description: 'body-large',
      gap: 'var(--space-3)',
    },
    '2': {
      title: 'subhead',
      description: 'body',
      gap: 'var(--space-1)',
    },
  }

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.hostElement = document.createElement('div')
    this.titleElement = document.createElement('mm-text')
    this.descriptionElement = document.createElement('mm-text')
  }
  connectedCallback() {
    const { shadowRoot, hostElement, titleElement, descriptionElement } = this

    const level = this.getAttribute('level') || '1'
    const variant = TitleWithDescription.variants[level]
    if (variant) {
      titleElement.setAttribute('variant', variant.title)
      titleElement.textContent = this.title
      descriptionElement.setAttribute('variant', variant.description)
      descriptionElement.textContent = this.description
    }
    if (!hostElement.isConnected) {
      hostElement.append(titleElement, descriptionElement)
      shadowRoot!.append(hostElement)
    }

    const style = document.createElement('style')
    style.textContent = `
      :host > div {
        display: flex;
        flex-direction: column;
        gap: ${variant?.gap || '12px'};
      }
    `
    shadowRoot!.append(style)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'title' && this.titleElement) {
      this.titleElement.textContent = newValue
    }
    if (name === 'description' && this.descriptionElement) {
      this.descriptionElement.textContent = newValue
    }
  }

  get title() {
    return this.getAttribute('title') || ''
  }
  get description() {
    return this.getAttribute('description') || ''
  }

  disconnectedCallback() {}
}

export default TitleWithDescription
