import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ScheduleController } from '@/controllers/schedule-controller'

const FOCUSABLE_SELECTOR =
  'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), audio[controls], video[controls]'

@customElement('mm-tab-panel')
export class TabPanel extends LitElement {
  static styles = css`
    :host {
      display: none;
    }
    :host([active]) {
      display: block;
    }
  `
  @property({ type: String }) value = ''
  /** @internal 선택 값을 소유한 mm-tab-list가 채운다. */
  @property({ type: Boolean, reflect: true }) active = false
  private tabStopFrame = new ScheduleController(this, () => this.syncTabStop())

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'tabpanel')
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  // 내부에 포커스 가능한 요소가 없을 때만 패널 자체를 탭 스톱으로 만든다 (ARIA APG tabpanel).
  private handleSlotChange() {
    this.tabStopFrame.request()
  }

  private syncTabStop() {
    this.tabIndex = this.hasFocusableContent(this) ? -1 : 0
  }

  private hasFocusableContent(root: ParentNode): boolean {
    for (const element of root.querySelectorAll('*')) {
      if (element.matches(FOCUSABLE_SELECTOR)) return true
      if (element.shadowRoot && this.hasFocusableContent(element.shadowRoot)) return true
    }
    return false
  }
}
