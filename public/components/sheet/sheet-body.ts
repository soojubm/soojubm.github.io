// mm-sheet-body.ts
class SheetBody extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>
        :host {
          padding: 16px;
          flex: 1;
          overflow-y: auto;
        }
      </style>
      <slot></slot>
    `
  }
}

export default SheetBody
