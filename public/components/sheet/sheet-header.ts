class SheetHeader extends HTMLElement {
  static get observedAttributes() {
    return ['title']
  }

  private _title = ''

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
    if (name === 'title') {
      this._title = newValue ?? ''
      this.render()
    }
  }

  connectedCallback() {
    this.render()
  }

  private handleClose = () => {
    const event = new CustomEvent('sheetclose', { bubbles: true })
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
          padding: 1rem;
          border-bottom: 1px solid #e5e5e5;
          background: white;
          font-family: sans-serif;
        }

        h2 {
          font-size: 1rem;
          margin: 0;
        }

        button {
          all: unset;
          cursor: pointer;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          line-height: 1;
          color: #666;
          border-radius: 4px;
        }

        button:hover {
          background-color: #f2f2f2;
        }
      </style>

      <h2>${this._title}</h2>
      <button aria-label="Close">&times;</button>
    `

    this.shadowRoot.querySelector('button')?.addEventListener('click', this.handleClose)
  }
}

export default SheetHeader
