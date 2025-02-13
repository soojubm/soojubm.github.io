class PageHeader extends HTMLElement {
  private hostElement: HTMLElement
  private titleElement: HTMLElement
  private descriptionElement: HTMLElement

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    this.hostElement = document.createElement('mm-text-group')
    this.titleElement = document.createElement('mm-text')
    this.descriptionElement = document.createElement('mm-text')
  }
  connectedCallback() {
    const { shadowRoot, hostElement, titleElement, descriptionElement } = this

    hostElement.setAttribute('variant', 'title')
    titleElement.setAttribute('variant', 'title')
    titleElement.textContent = this.title
    descriptionElement.setAttribute('variant', 'body-large')
    descriptionElement.textContent = this.description

    hostElement.append(titleElement, descriptionElement)

    shadowRoot!.append(hostElement)
  }

  get title() {
    return this.getAttribute('title') || ''
  }
  get description() {
    return this.getAttribute('description') || ''
  }

  disconnectedCallback() {}
}

export default PageHeader
