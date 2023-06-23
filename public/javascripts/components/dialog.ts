class Dialog extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.shadowRoot!.innerHTML = `
      <style>
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.3);
        }

        :host([important]) ::slotted(h1) {
          text-decoration: underline;
          color: blue;
        }
      </style>

      <dialog>
        <form method="dialog">
          <slot name="title"></slot>
          <hr >
          <slot name="content"></slot>
          <button>확인</button>
        </form>
      </dialog>
    `
  }

  connectedCallback() {
    this.shadowRoot!.querySelector('dialog')!.showModal()
  }
}

export default Dialog
