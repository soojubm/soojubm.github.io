import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { sheetStyles } from '@/components/sheet/sheet.styles'
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

  private handleSheetClose = () => {
    this.close()
  }

  render() {
    const sheetStyle = {
      height: this.height ?? null,
    }

    return html`
      <aside
        class="sheet"
        variant=${this.variant}
        ?open=${this.isOpen}
        style=${styleMap(sheetStyle)}
      >
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
    if (changedProperties.has('isOpen') || changedProperties.has('variant')) this.syncScrollLock()
  }

  private syncScrollLock() {
    this.scrollLock.set(this.isOpen && this.isModal)
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
