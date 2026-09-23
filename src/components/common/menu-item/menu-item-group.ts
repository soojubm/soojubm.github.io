import { LitElement, css, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { RovingFocusController } from '@/controllers/roving-focus-controller'

export type MenuItemGroupSize = '' | 'large'

// 각 항목이 shadow 안에 렌더하는 포커스 대상. 행 조립 규칙은 menu-item 계열이 소유한다.
const ITEM_SELECTOR = '[role^="menuitem"], [role="radio"]'

@customElement('mm-menu-item-group')
export class MenuItemGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    :host([size='large']) {
      gap: var(--space-2);
    }
  `
  @property({ type: String, reflect: true }) role = 'menu'
  @property({ type: String, reflect: true }) size: MenuItemGroupSize = ''
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
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  // 목록 표면이 열릴 때 선택된 항목(없으면 첫 항목)으로 포커스를 옮긴다.
  focus() {
    this.rovingFocus.focusTabStop()
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
