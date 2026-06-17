import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { sheetStyles } from './sheet.styles'
export type SheetVariant = 'center' | 'bottom' | 'left' | 'right' | 'anchor' | 'inline'
export type SheetWidth = 'small' | 'medium' | 'large' | 'full'

let scrollLockCount = 0
let lockedScrollY = 0
let previousBodyStyles: Partial<CSSStyleDeclaration> = {}

function lockBodyScroll() {
  scrollLockCount += 1
  if (scrollLockCount > 1) return

  lockedScrollY = window.scrollY
  previousBodyStyles = {
    left: document.body.style.left,
    overflow: document.body.style.overflow,
    position: document.body.style.position,
    right: document.body.style.right,
    top: document.body.style.top,
    width: document.body.style.width,
  }

  document.body.classList.add('lock-scroll')
  document.body.style.position = 'fixed'
  document.body.style.top = `-${lockedScrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
}

function unlockBodyScroll() {
  if (!scrollLockCount) return

  scrollLockCount -= 1
  if (scrollLockCount > 0) return

  document.body.classList.remove('lock-scroll')
  document.body.style.position = previousBodyStyles.position ?? ''
  document.body.style.top = previousBodyStyles.top ?? ''
  document.body.style.left = previousBodyStyles.left ?? ''
  document.body.style.right = previousBodyStyles.right ?? ''
  document.body.style.width = previousBodyStyles.width ?? ''
  document.body.style.overflow = previousBodyStyles.overflow ?? ''
  window.scrollTo(0, lockedScrollY)

  lockedScrollY = 0
  previousBodyStyles = {}
}

@customElement('mm-sheet')
class Sheet extends LitElement {
  @property({ type: String, reflect: true }) variant: SheetVariant = 'center'
  @property({ type: String, reflect: true }) width: SheetWidth = 'medium'
  @property({ type: String }) height?: string
  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen = false
  @property({ type: Boolean, reflect: true, attribute: 'backdrop-blur' }) backdropBlur = false

  /** anchor variant: 열기를 유발한 클릭 자체가 document 핸들러를 트리거하지 않도록 스킵 */
  private _skipNextOutsideClick = false
  private _hasLockedScroll = false

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
    this.releaseScrollLock()
  }

  /** modal variant: 호스트(backdrop) 영역 클릭 시 닫는다 */
  private handleBackdropClick = (e: MouseEvent) => {
    if (!this._isModal || !this.isOpen) return
    if (e.target === this) this.close()
  }

  /** anchor variant만 outside-click으로 닫는다 — dropdown과 동일한 패턴 */
  private handleOutsideClick = (e: MouseEvent) => {
    if (this.variant !== 'anchor' || !this.isOpen) return
    if (this._skipNextOutsideClick) {
      this._skipNextOutsideClick = false
      return
    }
    if (!e.composedPath().includes(this)) this.close()
  }

  private get _isModal() {
    return this.variant !== 'anchor' && this.variant !== 'inline'
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('isOpen') || changedProperties.has('variant')) {
      this.syncScrollLock()
    }
  }

  private syncScrollLock() {
    if (this.isOpen && this._isModal) {
      this.acquireScrollLock()
      return
    }

    this.releaseScrollLock()
  }

  private acquireScrollLock() {
    if (this._hasLockedScroll) return

    lockBodyScroll()
    this._hasLockedScroll = true
  }

  private releaseScrollLock() {
    if (!this._hasLockedScroll) return

    unlockBodyScroll()
    this._hasLockedScroll = false
  }

  static styles = sheetStyles

  render() {
    const heightStyle = this.height ? `height:${this.height};` : ''
    return html`
      <aside class="sheet" variant=${this.variant} ?open=${this.isOpen} style="${heightStyle}">
        <slot></slot>
      </aside>
    `
  }

  open() {
    this.isOpen = true
    this._skipNextOutsideClick = true // 열기를 유발한 클릭을 outside-click 핸들러가 받지 않도록
    this.syncScrollLock()
  }

  close() {
    this.isOpen = false
    this.syncScrollLock()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }
}
export default Sheet
