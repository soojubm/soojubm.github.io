class Sheet extends HTMLElement {
  constructor() {
    super()
    const shadow = this.attachShadow({ mode: 'open' })
    shadow.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
          justify-content: center;
          align-items: center;
          display: flex;
        }
        .sheet {
          background: white;
          border-radius: 12px;
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
      </style>
      <div class="sheet">
        <slot></slot>
      </div>
    `
  }
}

export default Sheet
