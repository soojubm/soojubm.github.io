import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { popoverStyles } from '../../stylesheets/shared/popover.styles'
export type SheetType = 'center' | 'bottom' | 'left' | 'right' | 'anchor' | 'inline'
export type SheetSize = 'small' | 'medium' | 'large' | 'full'

@customElement('mm-sheet')
class Sheet extends LitElement {
  @property({ type: String }) type: SheetType = 'center'
  @property({ type: String }) size: SheetSize = 'medium'
  @property({ type: String }) height?: string
  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen = false

  /** anchor 타입: 열기를 유발한 클릭 자체가 document 핸들러를 트리거하지 않도록 스킵 */
  private _skipNextOutsideClick = false

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('sheetclose', () => this.close())
    this.addEventListener('click', this.handleBackdropClick)
    document.addEventListener('click', this.handleOutsideClick)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('click', this.handleBackdropClick)
    document.removeEventListener('click', this.handleOutsideClick)
  }

  /** center/bottom/left/right 타입: 호스트(backdrop) 영역 클릭 시 닫는다 */
  private handleBackdropClick = (e: MouseEvent) => {
    if (!this._isModal || !this.isOpen) return
    if (e.target === this) this.close()
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

  private get _isModal() {
    return this.type !== 'anchor' && this.type !== 'inline'
  }

  static styles = [
    popoverStyles,
    css`
      :host {
        --sheet-z-index: var(--zindex-sheet);
        --sheet-backdrop-color: var(--color-backdrop);
        --sheet-radius: calc(var(--radius) * 2);
        --sheet-bottom-offset: var(--space-4);
        --sheet-bottom-max-width: calc(var(--layout-width-small) + var(--space-4) * 10);
        --sheet-anchor-width: calc(var(--width-small) + var(--space-4) * 7.5);
        --sheet-anchor-max-height: calc(var(--width-small) * 2);
        --sheet-size-small: var(--sheet-anchor-width);
        --sheet-size-medium: var(--layout-width-tiny);
        --sheet-size-large: var(--layout-width-small);
        --sheet-size-full: 100%;

        display: flex;
        position: fixed;
        inset: 0;
        justify-content: center;
        align-items: center;
        z-index: var(--sheet-z-index);
        background: var(--sheet-backdrop-color);

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

        & .sheet {
          transform: scale(1);
          transition: transform 220ms cubic-bezier(0.18, 1.25, 0.4, 1);
        }
      }

      :host([open][type='bottom']) .sheet { transform: translateY(0); }
      :host([open][type='left']) .sheet { transform: translateX(0); }
      :host([open][type='right']) .sheet { transform: translateX(0); }
      :host([open][type='inline']) .sheet { transform: translateY(0); }

      .sheet {
        background: var(--color-background);
        border-radius: var(--sheet-radius);
        width: 100%;
        padding: 0 var(--space-4);
        box-sizing: border-box;
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        position: relative;

        transform: scale(0.96);
        transition: transform 180ms cubic-bezier(0.2, 0.8, 0.2, 1);
      }

      /* bottom */
      :host([type='bottom']) .sheet {
        margin-top: auto;
        margin-bottom: var(--sheet-bottom-offset);
        max-width: var(--sheet-bottom-max-width);
        border-bottom-left-radius: var(--sheet-radius);
        border-bottom-right-radius: var(--sheet-radius);
        transform: translateY(100%);
      }

      /* left */
      :host([type='left']) .sheet {
        margin-right: auto;
        max-width: 90vw;
        height: 100%;
        max-height: 100vh;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        transform: translateX(-100%);
      }

      /* right */
      :host([type='right']) .sheet {
        margin-left: auto;
        max-width: 90vw;
        height: 100%;
        max-height: 100vh;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        transform: translateX(100%);
      }

      /* anchor — popoverStyles 공유, :host 애니메이션은 .sheet.popover가 담당 */
      :host([type='anchor']) {
        position: fixed;
        inset: auto; /* base의 inset: 0 리셋 — JS가 top/left를 주입 */
        background: transparent;
        width: auto;
        height: auto;
        opacity: 1;
        visibility: visible;
        pointer-events: auto;

        & .sheet {
          width: var(--sheet-anchor-width);
          max-height: var(--sheet-anchor-max-height);
        }
      }

      /* inline */
      :host([type='inline']) {
        position: relative;
        inset: auto; /* base의 inset: 0 리셋 */
        background: transparent;

        & .sheet {
          transform: translateY(var(--space-1-minus));
        }
      }
    `,
  ]

  render() {
    const maxWidth =
      this.type === 'center'
        ? {
            small: 'var(--sheet-size-small)',
            medium: 'var(--sheet-size-medium)',
            large: 'var(--sheet-size-large)',
            full: 'var(--sheet-size-full)',
          }[this.size] || 'var(--sheet-size-medium)'
        : this.type === 'left' || this.type === 'right'
        ? '90vw'
        : '100%'
    const heightStyle = this.height ? `height:${this.height};` : ''
    const isAnchor = this.type === 'anchor'
    const cls = ['sheet', isAnchor && 'popover', isAnchor && this.isOpen && 'open']
      .filter(Boolean)
      .join(' ')
    return html`<aside class="${cls}" style="max-width:${maxWidth};${heightStyle}">
      <slot></slot>
    </aside>`
  }

  open() {
    this.isOpen = true
    this._skipNextOutsideClick = true // 열기를 유발한 클릭을 outside-click 핸들러가 받지 않도록
    if (this._isModal) document.body.classList.add('lock-scroll')
  }

  close() {
    this.isOpen = false
    if (this._isModal) document.body.classList.remove('lock-scroll')
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }
}
export default Sheet
