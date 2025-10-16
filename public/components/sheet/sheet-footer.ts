// mm-sheet-footer.ts
export interface SheetAction {
  label: string
  onClick: () => void
}

export class SheetFooter extends HTMLElement {
  private primaryAction: SheetAction | null = null
  private secondaryAction: SheetAction | null = null

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    // initial render (empty)
    this.render()
  }

  // external API: set actions
  set actions(actions: { primary?: SheetAction; secondary?: SheetAction }) {
    this.primaryAction = actions.primary ?? null
    this.secondaryAction = actions.secondary ?? null
    this.render()
  }

  connectedCallback() {
    // nothing else required; render already handles it
  }

  private render() {
    if (!this.shadowRoot) return

    // Build inner HTML
    this.shadowRoot.innerHTML = `
      <style>
        :host { display: flex; justify-content: flex-end; gap: 0.5rem; padding: 1rem; border-top: 1px solid #e5e5e5; background: white; }
        button { all: unset; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial; font-size: 0.95rem; padding: 0.5rem 1rem; border-radius: 8px; cursor: pointer; box-sizing: border-box; }
        button.primary { background-color: #007aff; color: white; }
        button.secondary { background-color: #f2f2f2; color: #111; }
        button:active { transform: translateY(1px); }
      </style>
      <div id="buttons"></div>
    `

    const container = this.shadowRoot.getElementById('buttons')!

    // Secondary first (left), then primary (right)
    if (this.secondaryAction) {
      const secBtn = document.createElement('button')
      secBtn.className = 'secondary'
      secBtn.textContent = this.secondaryAction.label
      secBtn.addEventListener('click', e => {
        // call user handler
        try {
          this.secondaryAction!.onClick()
        } catch (err) {
          console.error(err)
        }
        // also emit an event for host to react if needed
        this.dispatchEvent(
          new CustomEvent('secondaryaction', { detail: {}, bubbles: true, composed: true }),
        )
      })
      container.appendChild(secBtn)
    }

    if (this.primaryAction) {
      const priBtn = document.createElement('button')
      priBtn.className = 'primary'
      priBtn.textContent = this.primaryAction.label
      priBtn.addEventListener('click', e => {
        try {
          this.primaryAction!.onClick()
        } catch (err) {
          console.error(err)
        }
        this.dispatchEvent(
          new CustomEvent('primaryaction', { detail: {}, bubbles: true, composed: true }),
        )
      })
      container.appendChild(priBtn)
    }
  }
}

export default SheetFooter
