import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { RovingFocusController } from '@/controllers/roving-focus-controller'
import '@/components/common/text/semantics/heading'

export type MenuItemGroupSize = '' | 'large'

// 각 항목이 shadow 안에 렌더하는 포커스 대상. 행 조립 규칙은 menu-item 계열이 소유한다.
const ITEM_SELECTOR = '[role^="menuitem"], [role="radio"]'

/**
 * menu-item 계열 행을 묶어 방향키로 순회하는 목록. heading을 주면 목록 위에 소제목을 함께 보여준다.
 * menu·radiogroup은 항목 역할만 자식으로 가질 수 있어 소제목을 제목 요소로 읽히게 두지 않고,
 * 화면에만 그린 뒤 같은 문구를 목록의 aria-label로 옮긴다(mm-form-field의 label과 같은 방식).
 */
@customElement('mm-menu-item-group')
export class MenuItemGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .items {
      display: flex;
      flex-direction: column;
    }

    :host([size='large']) .items {
      gap: var(--space-2);
    }
  `
  @property({ type: String, reflect: true }) role = 'menu'
  @property({ type: String, reflect: true }) size: MenuItemGroupSize = ''
  @property({ type: String }) heading?: string
  @queryAssignedElements({ flatten: true }) private slotElements!: HTMLElement[]
  private rovingFocus = new RovingFocusController(this, {
    getItems: () => this.items,
    orientation: 'vertical',
    getActiveIndex: () =>
      this.items.findIndex(item => item.getAttribute('aria-checked') === 'true'),
    onFocusMove: index => this.selectFocusedRadio(index),
  })

  render() {
    return html`
      ${this.renderHeading()}
      <div class="items"><slot @slotchange=${this.handleSlotChange}></slot></div>
    `
  }

  protected willUpdate(changed: Map<string, unknown>) {
    if (!changed.has('heading')) return

    if (this.heading) {
      this.setAttribute('aria-label', this.heading)
      return
    }

    this.removeAttribute('aria-label')
  }

  // 목록 표면이 열릴 때 선택된 항목(없으면 첫 항목)으로 포커스를 옮긴다.
  focus() {
    this.rovingFocus.focusTabStop()
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <mm-heading level="5" aria-hidden="true">${this.heading}</mm-heading>
    `
  }

  // radiogroup은 방향키로 포커스를 옮기면 그 항목이 곧 선택된다. 선택은 행의 활성화 경로를 그대로 탄다.
  private selectFocusedRadio(index: number) {
    if (this.role !== 'radiogroup') return

    this.items[index]?.click()
  }

  private get items() {
    return this.slotElements
      .map(element => element.shadowRoot?.querySelector<HTMLElement>(ITEM_SELECTOR))
      .filter((item): item is HTMLElement => !!item)
  }

  // 항목은 자기 shadow를 렌더한 뒤에야 포커스 대상이 생기므로, 렌더가 끝난 뒤 tab stop을 다시 맞춘다.
  private async handleSlotChange() {
    await Promise.all(
      this.slotElements.map(element => (element as Partial<LitElement>).updateComplete),
    )
    this.requestUpdate()
  }
}
