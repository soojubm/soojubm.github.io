import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { ComponentSize } from '@/stylesheets/shared.types'

import { RovingFocusController } from '@/controllers/roving-focus-controller'
import { spaces } from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'
import '@/components/common/text/semantics/heading'

export type MenuItemGroupSize = Extract<ComponentSize, 'medium' | 'large'>
/** 행 사이 간격은 기본(size가 정함) 외에 space 1만 고를 수 있다. */
export type MenuItemGroupGap = '1'
export type MenuItemGroupRole = 'menu' | 'radiogroup' | 'group'

// 각 항목이 shadow 안에 렌더하는 포커스 대상. 행 조립 규칙은 menu-item 계열이 소유한다.
const ITEM_SELECTOR = '[role^="menuitem"], [role="radio"]'

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

    ${unsafeCSS(buildAttributeRules('gap', { '1': { gap: spaces['1'] } }, '.items'))}
  `
  @property({ type: String, reflect: true }) role: MenuItemGroupRole = 'menu'
  @property({ type: String, reflect: true }) size: MenuItemGroupSize = 'medium'
  @property({ type: String }) heading?: string
  @property({ type: String, reflect: true }) gap?: MenuItemGroupGap
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
