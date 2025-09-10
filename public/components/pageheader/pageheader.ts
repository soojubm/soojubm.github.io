class PageHeader extends HTMLElement {
  private hostElement: HTMLElement
  private titleElement: HTMLElement
  private descriptionElement: HTMLElement

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
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

    const style = document.createElement('style')
    style.textContent = `
      // :host {
      //   display: block; /* Custom Element는 기본적으로 display: inline 이므로 블록 요소로 변경 */
      //   max-width: 50%;
      // }

      // @media (max-width: 1080px) {
      //   :host {
      //     max-width: 100%;
      //   }
      // }

      // mm-text-group[variant="title"] {
      //   margin-bottom: 10px;
      // }
      // mm-text[variant="title"] {
      //   font-size: 2em;
      //   color: #333;
      // }
      // mm-text[variant="body-large"] {
      //   font-size: 1.2em;
      //   color: #666;
      // }
    `
    shadowRoot!.append(style)
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
