import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { sheetStyles } from '@/components/sheet/sheet.styles'
import { PortalController } from '@/controllers/portal-controller'
import { ScrollLockController } from '@/controllers/scroll-lock-controller'
import { emit } from '@/utils/emit'
export type SheetVariant = 'center' | 'bottom' | 'left' | 'right'
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
    isActive: () => this.isOpen,
    root: () => document.getElementById('sheet-page-root') ?? document.body,
  })

  // sheet-footer가 body 위에 겹쳐 뜨는 표면이라, body가 그 높이만큼 하단 여백을
  // 확보하도록 실제 렌더 높이를 --sheet-footer-height로 동기화한다.
  private footerResize = new ResizeObserver(([entry]) => {
    const height = entry?.borderBoxSize[0]?.blockSize ?? 0
    this.style.setProperty('--sheet-footer-height', `${height}px`)
  })
  private observedFooter: Element | null = null

  // 리스너 대상이 호스트 자신이라 portal 이동에도 유지되므로 생성자에서 한 번만 등록한다.
  constructor() {
    super()
    this.addEventListener('sheetclose', this.handleSheetClose)
    this.addEventListener('click', this.handleBackdropClick)
  }

  connectedCallback() {
    super.connectedCallback()
    this.syncFooterObserver()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.footerResize.disconnect()
    this.observedFooter = null
  }

  private handleSheetClose = () => {
    this.close()
  }

  render() {
    return html`
      <aside class="sheet" ?open=${this.isOpen}>
        <slot @slotchange=${this.syncFooterObserver}></slot>
      </aside>
    `
  }

  private syncFooterObserver = () => {
    const footer = this.querySelector('mm-sheet-footer')
    if (footer === this.observedFooter) return

    this.footerResize.disconnect()
    this.style.removeProperty('--sheet-footer-height')
    this.observedFooter = footer

    if (footer) this.footerResize.observe(footer, { box: 'border-box' })
  }

  /** 호스트(backdrop) 영역 클릭 시 닫는다 */
  private handleBackdropClick = (e: MouseEvent) => {
    if (!this.isOpen) return
    if (e.target === this) emit(this, 'sheetclose')
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('height')) this.syncHeight()
    if (changedProperties.has('isOpen')) this.syncModal()
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
    if (this.isOpen) {
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
    if (this.isOpen) {
      this.close()
      return
    }

    this.open()
  }
}
export default Sheet
