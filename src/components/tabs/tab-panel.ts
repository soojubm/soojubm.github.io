import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

const FOCUSABLE_SELECTOR =
  'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), audio[controls], video[controls]'

@customElement('mm-tab-panel')
export default class TabPanel extends LitElement {
  static styles = css`
    :host {
      display: none;
    }
    :host([active]) {
      display: block;
    }
  `

  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) active = false
  @property({ type: String, reflect: true }) role = 'tabpanel'

  render() {
    return html`
      <slot @slotchange=${this.updateFocusability}></slot>
    `
  }

  // 내부에 포커스 가능한 요소가 없을 때만 패널 자체를 탭 스톱으로 만든다 (ARIA APG tabpanel).
  private updateFocusability() {
    requestAnimationFrame(() => {
      this.tabIndex = this.hasFocusableContent(this) ? -1 : 0
    })
  }

  private hasFocusableContent(root: ParentNode): boolean {
    for (const element of root.querySelectorAll('*')) {
      if (element.matches(FOCUSABLE_SELECTOR)) return true
      if (element.shadowRoot && this.hasFocusableContent(element.shadowRoot)) return true
    }
    return false
  }
}
