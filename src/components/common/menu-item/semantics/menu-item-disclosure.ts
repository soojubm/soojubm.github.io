import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/indicators/expand-indicator/expand-indicator'
import { menuItemStyles } from '@/components/common/menu-item/menu-item.styles'
import {
  renderMenuItemContent,
  withMenuItemPresentation,
} from '@/components/common/menu-item/menu-item.utils'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { emit, uniqueId } from '@/utils'

/**
 * 하위 항목을 접었다 펴는 부모 메뉴 항목.
 * 트리거는 role=menuitem, 펼쳐지는 패널은 role=menu이며, 열림 상태는 DisclosureController가 소유한다.
 */
@customElement('mm-menu-item-disclosure')
export class MenuItemDisclosure extends withMenuItemPresentation(LitElement) {
  static styles = [
    menuItemStyles,
    css`
      :host {
        display: block;
      }

      /* grid trick: 0fr → 1fr 로 패널 높이를 접는다 */
      .panel {
        display: grid;
        grid-template-rows: 0fr;
      }

      [role='menu'] {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      :host([open]) .panel {
        grid-template-rows: 1fr;
      }

      /* 트리거와 하위 메뉴 간격. 닫힐 때 패널이 완전히 접히도록 열림 상태에서만 준다 */
      :host([open]) [role='menu'] {
        padding-top: var(--space-1);
      }
    `,
  ]

  @property({ type: Boolean, reflect: true }) open = false

  private readonly panelId = uniqueId('menu-item-disclosure-panel')

  private disclosure = new DisclosureController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
      emit(this, 'toggle', { open })
    },
    hasPopup: () => 'menu',
    getTrigger: () => this.shadowRoot?.querySelector('button') ?? undefined,
  })

  render() {
    return html`
      <button type="button" role="menuitem" aria-controls=${this.panelId}>
        ${renderMenuItemContent(this, this.renderIndicator())}
      </button>

      <div id=${this.panelId} class="panel" aria-hidden=${this.open ? 'false' : 'true'}>
        <div role="menu">
          <slot></slot>
        </div>
      </div>
    `
  }

  private renderIndicator() {
    return html`
      <mm-expand-indicator slot="trailing" ?expanded=${this.open}></mm-expand-indicator>
    `
  }
}
