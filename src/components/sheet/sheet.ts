import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { sheetStyles } from '@/components/sheet/sheet.styles'
import { PortalController } from '@/controllers/portal-controller'
import { ScrollLockController } from '@/controllers/scroll-lock-controller'
import { emit } from '@/utils/emit'
export type SheetVariant = 'center' | 'bottom' | 'left' | 'right' | 'inline'
export type SheetWidth = 'small' | 'medium' | 'large' | 'full'

@customElement('mm-sheet')
class Sheet extends LitElement {
  static styles = sheetStyles

  @property({ type: String, reflect: true }) variant: SheetVariant = 'center'
  @property({ type: String, reflect: true }) width: SheetWidth = 'medium'
  @property({ type: String }) height?: string
  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen = false
  @property({ type: Boolean, reflect: true, attribute: 'backdrop-blur' }) backdropBlur = false

  private scrollLock = new ScrollLockController(this)
  private portal = new PortalController(this, {
    isActive: () => this.isOpen && this.isModal,
    root: () => document.getElementById('sheet-page-root') ?? document.body,
  })

  private handleSheetClose = () => {
    this.close()
  }

  render() {
    return html`
      <aside class="sheet" variant=${this.variant} ?open=${this.isOpen}>
        <slot></slot>
      </aside>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('sheetclose', this.handleSheetClose)
    this.addEventListener('click', this.handleBackdropClick)
  }

  disconnectedCallback() {
    this.removeEventListener('sheetclose', this.handleSheetClose)
    this.removeEventListener('click', this.handleBackdropClick)
    super.disconnectedCallback()
  }

  /** modal variant: 호스트(backdrop) 영역 클릭 시 닫는다 */
  private handleBackdropClick = (e: MouseEvent) => {
    if (!this.isModal || !this.isOpen) return
    if (e.target === this) this.requestClose()
  }

  private requestClose() {
    emit(this, 'sheetclose')
  }

  private get isModal() {
    return this.variant !== 'inline'
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('height')) this.syncHeight()
    if (changedProperties.has('isOpen') || changedProperties.has('variant')) this.syncModal()
  }

  private syncHeight() {
    if (!this.height) {
      this.style.removeProperty('--sheet-height')
      return
    }

    this.style.setProperty('--sheet-height', this.height)
  }

  // portal과 스크롤 잠금을 함께 동기화한다.
  // host를 portal로 옮기면 lifecycle이 재실행되며 스크롤 잠금이 풀리므로,
  // 열 때는 portal 이후에 잠그고 닫을 때는 잠금을 푼 뒤 복원한다.
  private syncModal() {
    if (this.isOpen && this.isModal) {
      this.portal.sync()
      this.scrollLock.set(true)
      return
    }

    this.scrollLock.set(false)
    this.portal.sync()
  }

  open() {
    this.isOpen = true
    this.syncModal()
  }

  close() {
    this.isOpen = false
    this.syncModal()
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }
}
export default Sheet
