import { LitElement, css, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

/**
 * 같은 성격의 행을 세로로 묶어 하나의 목록으로 읽히게 하는 그룹.
 * 행 사이 간격과 list 의미를 그룹이 소유하고, 각 행은 자기 골격만 그린다.
 */
@customElement('mm-list-item-group')
export class ListItemGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }
  `
  @property({ type: String, reflect: true }) role = 'list'
  @queryAssignedElements({ flatten: true }) private slotElements!: HTMLElement[]

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  // list는 자식이 listitem일 때만 목록으로 읽힌다. 행은 표현 전용이라 자기 role을 갖지 않으므로 그룹이 채운다.
  private handleSlotChange() {
    if (this.role !== 'list') return

    this.slotElements.forEach(element => {
      if (element.hasAttribute('role')) return

      element.setAttribute('role', 'listitem')
    })
  }
}
