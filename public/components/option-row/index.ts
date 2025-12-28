class OptionRow extends HTMLElement {
  static get observedAttributes() {
    return ['selected', 'disabled', 'primarytext', 'secondarytext']
  }

  private root: ShadowRoot
  private btn!: HTMLButtonElement
  private listRow!: HTMLElement
  private indicator!: HTMLElement
  private dot!: HTMLElement
  private isRendered = false

  constructor() {
    super()
    this.root = this.attachShadow({ mode: 'open' })
    this.handleClick = this.handleClick.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  // -------------------------
  // PROPS
  // -------------------------
  get selected(): boolean {
    return this.hasAttribute('selected')
  }
  set selected(value: boolean) {
    this.toggleAttribute('selected', value)
    this.syncAria()
  }

  get disabled(): boolean {
    return this.hasAttribute('disabled')
  }
  set disabled(value: boolean) {
    this.toggleAttribute('disabled', value)
    this.syncDisabled()
  }

  get primaryText(): string {
    return this.getAttribute('primarytext') || ''
  }
  get secondaryText(): string {
    return this.getAttribute('secondarytext') || ''
  }

  // -------------------------
  // LIFECYCLE
  // -------------------------
  connectedCallback() {
    if (!this.isRendered) {
      this.render()
      this.isRendered = true
    }
    this.addEventListeners()
    this.syncAria()
    this.syncDisabled()
  }

  disconnectedCallback() {
    this.removeEventListeners()
  }

  attributeChangedCallback(name: string) {
    if (!this.isRendered) return

    if (name === 'selected') this.syncAria()
    if (name === 'disabled') this.syncDisabled()
    if (name === 'primarytext') {
      this.listRow?.setAttribute('primarytext', this.primaryText)
    }
    if (name === 'secondarytext') {
      this.listRow?.setAttribute('secondarytext', this.secondaryText)
    }
  }

  // -------------------------
  // RENDER (createElement only)
  // -------------------------
  private render() {
    //
    // <style>
    //
    const style = document.createElement('style')
    style.textContent = `
      :host {
        display: block;
      }
      :host([hidden]) {
        display: none;
      }
      :host([disabled]) button {
        cursor: default;
        opacity: 0.5;
      }
      button {
        all: unset;
        display: block;
        width: 100%;
        cursor: pointer;
      }

      .indicator {
        width: 16px;
        height: 16px;
        border-radius: 999px;
        border: 1.5px solid rgba(0,0,0,0.35);
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: transparent;
      }
      :host([selected]) .indicator {
        border-color: currentColor;
      }
      :host([selected]) .dot {
        background: currentColor;
      }
    `
    this.root.appendChild(style)

    //
    // <button>
    //
    const btn = document.createElement('button')
    this.btn = btn
    this.root.appendChild(btn)

    //
    // <mm-list-row>
    //
    const listRow = document.createElement('mm-list-row')
    listRow.setAttribute('primarytext', this.primaryText)
    listRow.setAttribute('secondarytext', this.secondaryText)
    this.listRow = listRow
    btn.appendChild(listRow)

    //
    // <slot name="avatar" slot="avatar">
    //
    const avatarSlot = document.createElement('slot')
    avatarSlot.name = 'avatar'
    avatarSlot.slot = 'avatar'
    listRow.appendChild(avatarSlot)

    //
    // <span slot="action" class="indicator">
    //
    const indicator = document.createElement('span')
    indicator.slot = 'action'
    indicator.classList.add('indicator')

    const dot = document.createElement('span')
    dot.classList.add('dot')

    indicator.appendChild(dot)
    this.indicator = indicator
    this.dot = dot

    listRow.appendChild(indicator)
  }

  // -------------------------
  // EVENTS
  // -------------------------
  private addEventListeners() {
    this.btn.addEventListener('click', this.handleClick)
    this.btn.addEventListener('keydown', this.handleKeyDown)
  }

  private removeEventListeners() {
    this.btn.removeEventListener('click', this.handleClick)
    this.btn.removeEventListener('keydown', this.handleKeyDown)
  }

  private handleClick() {
    if (this.disabled) return
    this.toggleSelection()
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (this.disabled) return
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.toggleSelection()
    }
  }

  private toggleSelection() {
    this.selected = !this.selected

    this.dispatchEvent(
      new CustomEvent('mm-change', {
        detail: { selected: this.selected },
        bubbles: true,
        composed: true,
      }),
    )
  }

  // -------------------------
  // SYNC
  // -------------------------
  private syncAria() {
    this.setAttribute('role', 'option')
    this.setAttribute('aria-selected', String(this.selected))
  }

  private syncDisabled() {
    this.btn.toggleAttribute('disabled', this.disabled)
  }
}

export default OptionRow
