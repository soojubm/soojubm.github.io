import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { sheetStyles } from './sheet.styles'
import { emit } from '../../utils/emit'
export type SheetVariant = 'center' | 'bottom' | 'left' | 'right' | 'inline'
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

  private _hasLockedScroll = false

  private handleSheetClose = () => {
    this.close()
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('sheetclose', this.handleSheetClose)
    this.addEventListener('click', this.handleBackdropClick)
  }

  disconnectedCallback() {
    this.removeEventListener('sheetclose', this.handleSheetClose)
    this.removeEventListener('click', this.handleBackdropClick)
    this.releaseScrollLock()
    super.disconnectedCallback()
  }

  /** modal variant: 호스트(backdrop) 영역 클릭 시 닫는다 */
  private handleBackdropClick = (e: MouseEvent) => {
    if (!this._isModal || !this.isOpen) return
    if (e.target === this) this.requestClose()
  }

  private requestClose() {
    emit(this, 'sheetclose')
  }

  private get _isModal() {
    return this.variant !== 'inline'
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
