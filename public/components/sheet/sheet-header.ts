class SheetHeader extends HTMLElement {
  static get observedAttributes() {
    return ['title']
  }

  private _title = ''

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
    if (name === 'title') {
      this._title = newValue ?? ''
      this.render()
    }
  }

  private handleClose = () => {
    const event = new CustomEvent('sheetclose', { bubbles: true, composed: true })
    this.dispatchEvent(event)
  }

  private render() {
    if (!this.shadowRoot) return

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 0;
          border-bottom: var(--border);
          background: white;
        }
      </style>

      <mm-text variant="subhead">${this._title}</mm-text>
      <mm-icon-button variant="navigator" icon="xmark" aria-label="Close"></mm-icon-button>
    `

    this.shadowRoot.querySelector('mm-icon-button')?.addEventListener('click', this.handleClose)
  }
}

customElements.define('mm-sheet-header', SheetHeader)
export default SheetHeader
