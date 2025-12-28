class SheetBody extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })

    const style = document.createElement('style')
    style.textContent = `
      :host {
        display: block;
        flex: 1 1 auto;
        min-height: 0;
        overflow-y: auto;
        box-sizing: border-box;
      }
      .content {
        padding: 1rem 0;
        box-sizing: border-box;
      }
    `
    const container = document.createElement('div')
    container.className = 'content'
    const slot = document.createElement('slot')
    container.appendChild(slot)

    shadow.appendChild(style)
    shadow.appendChild(container)
  }
}

customElements.define('mm-sheet-body', SheetBody)

export default SheetBody
