export type SheetType = 'center' | 'bottom' | 'left' | 'right' | 'anchor' | 'inline'
export type SheetSize = 'small' | 'medium' | 'large' | 'full'

class Sheet extends HTMLElement {
  static get observedAttributes() {
    return ['type', 'size']
  }

  private _type: SheetType = 'center'
  private _size: SheetSize = 'medium'

  constructor() {
    super()
    this.attachShadow({ mode: 'open' })
    this.render()
  }

  connectedCallback() {
    this.updateAccessibilityRole()
    this.render()
    // mm-sheet-header 닫기 버튼 이벤트 자동 처리
    this.addEventListener('sheetclose', () => this.close())
  }

  attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
    if (name === 'type') {
      this._type = (newValue as SheetType) || 'center'
      this.updateAccessibilityRole()
    }
    if (name === 'size') this._size = (newValue as SheetSize) || 'medium'
    this.render()
  }

  private updateAccessibilityRole() {
    if (this._type === 'center') {
      this.setAttribute('role', 'dialog')
      this.setAttribute('aria-modal', 'true')
    } else {
      this.removeAttribute('role')
      this.removeAttribute('aria-modal')
    }
  }

  get type() {
    return this._type
  }
  set type(value: SheetType) {
    this.setAttribute('type', value)
  }

  get size() {
    return this._size
  }
  set size(value: SheetSize) {
    this.setAttribute('size', value)
  }

  private render() {
    if (!this.shadowRoot) return

    const sizeStyles =
      this._type === 'center'
        ? {
            small: 'max-width: 320px;',
            medium: 'max-width: 480px;',
            large: 'max-width: 640px;',
            full: 'max-width: 100%;',
          }[this._size] || 'max-width: 480px;'
        : 'max-width: 100%;'

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: none;
          // display: flex;
          position: fixed;
          inset: 0;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.5);
          z-index: 1000;
        }

        .sheet {
          background: white;
          border-radius: 12px;
          width: 100%;
          padding: 0 var(--space-4);
          ${sizeStyles}
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          position: relative;
        }

        /* type별 포지션 */
        :host([type="bottom"]) .sheet { margin-top:auto; margin-bottom:1rem; max-width:800px; border-bottom-left-radius:12px; border-bottom-right-radius:12px; }
        :host([type="left"]) .sheet { margin-right:auto; max-width:400px; height:100%; max-height:100vh; border-top-right-radius:0; border-bottom-right-radius:0; }
        :host([type="right"]) .sheet { margin-left:auto; max-width:400px; height:100%; max-height:100vh; border-top-left-radius:0; border-bottom-left-radius:0; }
        :host([type="anchor"]) { position:absolute; background:transparent; }
        :host([type="inline"]) { position:relative; background:transparent; }
      </style>
      <aside class="sheet">
        <slot></slot>
      </aside>
    `
  }

  open() {
    this.style.display = 'flex'
  }
  close() {
    this.style.display = 'none'
  }
}

customElements.define('mm-sheet', Sheet)
export default Sheet
