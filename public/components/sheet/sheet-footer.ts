export interface SheetAction {
  label: string
  onClick: () => void
}

class SheetFooter extends HTMLElement {
  static get observedAttributes() {
    return ['primary-label', 'secondary-label']
  }

  private primaryAction: SheetAction | null = null
  private secondaryAction: SheetAction | null = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback() {
    this.render()
  }

  attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
    if (name === 'primary-label' && newValue) {
      this.primaryAction = {
        label: newValue,
        onClick: () => console.log('primary clicked'),
      }
    }
    if (name === 'secondary-label' && newValue) {
      this.secondaryAction = {
        label: newValue,
        onClick: () => console.log('secondary clicked'),
      }
    }
    this.render()
  }

  private render() {
    if (!this.shadowRoot) return
    const { primaryAction, secondaryAction } = this

    this.shadowRoot.innerHTML = `
      <style>
        :host div {
          display: flex;
          justify-content: flex-end;
          gap: var(--space-2);
          padding: 1rem 0;
          border-top: var(--border);
          font-family: sans-serif;
        }
      </style>
      <div id="buttons"></div>
    `

    const container = this.shadowRoot.getElementById('buttons')!

    if (secondaryAction) {
      const secBtn = document.createElement('mm-button')
      secBtn.classList.add('secondary')
      secBtn.textContent = secondaryAction.label
      secBtn.addEventListener('click', secondaryAction.onClick)
      container.appendChild(secBtn)
    }

    if (primaryAction) {
      const priBtn = document.createElement('mm-button')
      priBtn.classList.add('primary')
      priBtn.setAttribute('variant', 'primary')
      priBtn.textContent = primaryAction.label
      priBtn.addEventListener('click', primaryAction.onClick)
      container.appendChild(priBtn)
    }
  }
}

customElements.define('mm-sheet-footer', SheetFooter)
export default SheetFooter
