import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { OutsideClickController } from '@/controllers/outside-click-controller'
import { scrollbarStyles } from '@/stylesheets/shared/scrollbar.styles'
import { emit } from '@/utils/emit'

export type PopoverPlacement = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right'

/**
 * anchor 기반 non-modal 레이어 프리미티브.
 * viewport 기준 modal 레이어인 mm-sheet와 달리 backdrop·portal·스크롤 잠금 없이
 * 가장 가까운 positioned 조상을 기준으로 떠 있는 패널 표면만 책임집니다.
 * mm-sheet와 동일하게 열림 상태(open/close/toggle)와 외부 클릭·ESC 닫기를 스스로 소유하고,
 * 트리거는 aria-controls로 popover를 가리켜 클릭 시 toggle()만 호출하면 됩니다.
 * aria-controls로 연결된 트리거가 없으면(예: mm-select) 소비자가 open을 제어하는 표면으로만 동작합니다.
 * 좌표(placement)와 너비(width)도 popover 자신이 책임집니다.
 */
@customElement('mm-popover')
class Popover extends LitElement {
  static styles = [
    scrollbarStyles,
    css`
      :host {
        --popover-padding: var(--space-1);
        --popover-border: var(--border);
        --popover-border-radius: var(--radius);
        --popover-background-color: var(--color-background);
        --popover-shadow: var(--shadow);
        --popover-max-height: none;
        --popover-width: auto;
        --popover-offset: var(--space-1);
        --popover-transition-duration: 180ms;

        display: flex;
        flex-direction: column;
        width: var(--popover-width);
        max-height: var(--popover-max-height);
        padding: var(--popover-padding);
        border: var(--popover-border);
        border-radius: var(--popover-border-radius);
        background: var(--popover-background-color);
        box-shadow: var(--popover-shadow);
        box-sizing: border-box;
        overflow-y: auto;
        overflow-x: hidden;
        position: absolute;
        top: calc(100% + var(--popover-offset));
        left: 0;
        right: 0;
        z-index: var(--zindex-popover);

        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transform: translateY(var(--space-1-minus));
        transition: opacity var(--popover-transition-duration) ease,
          transform var(--popover-transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1),
          visibility 0s linear var(--popover-transition-duration);
      }

      :host([placement='bottom-right']),
      :host([placement='top-right']) {
        left: auto;
        right: 0;
      }

      :host([placement='top-left']),
      :host([placement='top-right']) {
        top: auto;
        bottom: calc(100% + var(--popover-offset));
      }

      :host([open]) {
        opacity: 1;
        visibility: visible;
        pointer-events: auto;
        transform: translateY(0);
        transition: opacity var(--popover-transition-duration) ease,
          transform var(--popover-transition-duration) cubic-bezier(0.2, 0.8, 0.2, 1), visibility 0s;
      }
    `,
  ]

  @property({ type: Boolean, reflect: true, attribute: 'open' }) isOpen = false
  @property({ type: String, reflect: true }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: String }) width = ''
  @property({ type: String }) padding = ''

  // 자기 상태를 소유한 트리거만 바깥 클릭으로 닫고, 트리거 자신의 클릭은 예외로 둔다.
  private outsideClick = new OutsideClickController(this, () => this.dismiss(), {
    isActive: () => this.isOpen && !!this.trigger,
    getSafeElements: () => [this.trigger],
  })

  private get trigger() {
    if (!this.id) return undefined
    const root = this.getRootNode() as Document | ShadowRoot
    return root.querySelector<HTMLElement>(`[aria-controls="${this.id}"]`) ?? undefined
  }

  connectedCallback() {
    super.connectedCallback()
    document.addEventListener('keydown', this.handleKeydown)
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this.handleKeydown)
    super.disconnectedCallback()
  }

  render() {
    return html`
      <slot></slot>
    `
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('isOpen')) this.syncTriggerExpanded()
    if (changedProperties.has('width')) this.syncWidth()
    if (changedProperties.has('padding')) this.syncPadding()
  }

  open() {
    this.isOpen = true
  }

  close() {
    this.isOpen = false
  }

  toggle() {
    this.isOpen = !this.isOpen
  }

  // 스스로 닫으면서 소비자가 포커스 복원 등에 반응할 수 있도록 close 이벤트를 알린다.
  private dismiss() {
    this.close()
    emit(this, 'popoverclose')
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || !this.isOpen || !this.trigger) return
    this.dismiss()
  }

  private syncTriggerExpanded() {
    const trigger = this.trigger
    if (!trigger) return

    trigger.setAttribute('aria-expanded', String(this.isOpen))
    trigger.setAttribute('aria-haspopup', this.getAttribute('role') ?? 'true')
  }

  private syncWidth() {
    if (!this.width) {
      this.style.removeProperty('--popover-width')
      return
    }

    this.style.setProperty('--popover-width', this.width)
  }

  private syncPadding() {
    if (!this.padding) {
      this.style.removeProperty('--popover-padding')
      return
    }

    this.style.setProperty('--popover-padding', this.padding)
  }
}

export default Popover
