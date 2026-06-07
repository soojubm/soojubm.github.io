import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
export type SheetType = 'center' | 'bottom' | 'left' | 'right' | 'anchor' | 'inline'
export type SheetSize = 'small' | 'medium' | 'large' | 'full'

@customElement('mm-sheet')
class Sheet extends LitElement {
  @property({ type: String }) type: SheetType = 'center'
  @property({ type: String }) size: SheetSize = 'medium'
  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen = false

  /** anchor 타입: 열기를 유발한 클릭 자체가 document 핸들러를 트리거하지 않도록 스킵 */
  private _skipNextOutsideClick = false

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('sheetclose', () => this.close())
    document.addEventListener('click', this.handleOutsideClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    document.removeEventListener('click', this.handleOutsideClick)
  }

  /** anchor 타입만 outside-click으로 닫는다 — dropdown과 동일한 패턴 */
  private handleOutsideClick = (e: MouseEvent) => {
    if (this.type !== 'anchor' || !this.isOpen) return
    if (this._skipNextOutsideClick) {
      this._skipNextOutsideClick = false
      return
    }
    if (!e.composedPath().includes(this)) this.close()
  }

  static styles = css`
    :host {
      display: flex;
      position: fixed;
      inset: 0;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      background: rgba(0, 0, 0, 0.5);

      opacity: 0;
      visibility: hidden;
      pointer-events: none;
      transition: opacity 180ms ease, visibility 0s linear 180ms;
    }

    :host([open]) {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transition: opacity 180ms ease, visibility 0s;
    }

    .sheet {
      background: var(--color-background);
      border-radius: 12px;
      width: 100%;
      padding: 0 var(--space-4);
      max-height: 90vh;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;

      transform: scale(0.96);
      transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    :host([open]) .sheet {
      transform: scale(1);
      transition: transform 220ms cubic-bezier(0.18, 1.25, 0.4, 1);
    }

    /* bottom */
    :host([type='bottom']) .sheet {
      margin-top: auto;
      margin-bottom: 1rem;
      max-width: 800px;
      border-bottom-left-radius: 12px;
      border-bottom-right-radius: 12px;
      transform: translateY(20px);
    }

    :host([open][type='bottom']) .sheet {
      transform: translateY(0);
    }

    /* left */
    :host([type='left']) .sheet {
      margin-right: auto;
      max-width: 90vw;
      height: 100%;
      max-height: 100vh;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      transform: translateX(-20px);
    }

    :host([open][type='left']) .sheet {
      transform: translateX(0);
    }

    /* right */
    :host([type='right']) .sheet {
      margin-left: auto;
      max-width: 90vw;
      height: 100%;
      max-height: 100vh;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      transform: translateX(20px);
    }

    :host([open][type='right']) .sheet {
      transform: translateX(0);
    }

    /* anchor — dropdown과 동일한 패턴 */
    :host([type='anchor']) {
      position: fixed;
      inset: auto; /* base의 inset: 0 리셋 — JS가 top/left를 주입 */
      background: transparent;
      width: auto;
      height: auto;
    }

    :host([type='anchor']) .sheet {
      width: 320px;
      max-height: 400px;
      transform: translateY(-4px) scale(0.98);
      transform-origin: top left;
      transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
    }

    :host([open][type='anchor']) .sheet {
      transform: translateY(0) scale(1);
      transition: transform 220ms cubic-bezier(0.18, 1.25, 0.4, 1);
    }

    /* inline */
    :host([type='inline']) {
      position: relative;
      inset: auto; /* base의 inset: 0 리셋 */
      background: transparent;
    }

    :host([type='inline']) .sheet {
      transform: translateY(-4px);
    }

    :host([open][type='inline']) .sheet {
      transform: translateY(0);
    }
  `

  render() {
    const maxWidth =
      this.type === 'center'
        ? { small: '320px', medium: '480px', large: '640px', full: '100%' }[this.size] || '480px'
        : '100%'
    return html`<aside class="sheet" style="max-width:${maxWidth}"><slot></slot></aside>`
  }

  open() {
    this.isOpen = true
    this._skipNextOutsideClick = true // 열기를 유발한 클릭을 outside-click 핸들러가 받지 않도록
  }

  close() {
    this.isOpen = false
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }
}
export default Sheet
