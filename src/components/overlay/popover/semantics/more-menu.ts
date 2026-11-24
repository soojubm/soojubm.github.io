import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { OptionItem } from '@/types'

import '@/components/common'
import '@/components/overlay/popover/popover'
import '@/components/overlay/sheet'
import { AdaptiveOverlay } from '@/controllers/adaptive-overlay'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { emit } from '@/utils'
import { withOpenState } from '@/utils/open-state'

// onClick은 항목마다 할 일이 정해진 경우에 쓰고, action 이벤트는 onClick 유무와 상관없이 늘 알린다.
export type MoreMenuAction = OptionItem & { destructive?: boolean; onClick?: () => void }

@customElement('mm-more-menu')
export class MoreMenu extends withOpenState(LitElement) {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `
  @property({ attribute: false }) actions: MoreMenuAction[] = []
  @property({ type: String }) placement: PopoverPlacement = 'bottom-end'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '더보기'
  @query('mm-more-button') private triggerElement?: HTMLElement
  private overlay = new AdaptiveOverlay(this)
  private disclosure = new DisclosureController(this, {
    getTrigger: () => this.triggerElement ?? undefined,
  })

  render() {
    return html`
      ${this.renderTrigger()} ${this.renderPopover()} ${this.renderSheet()}
    `
  }

  // popover·sheet는 portal로 옮겨져 조건부로 걷어낼 수 없으므로 늘 마운트해 두고 목록만 넣고 뺀다.
  private renderPopover() {
    return html`
      <mm-popover
        placement=${this.placement}
        .anchor=${this.disclosure.trigger}
        ?open=${this.overlay.popoverOpen}
        @toggle=${this.overlay.handlePopoverToggle}
      >
        ${this.overlay.isViewportCompact ? nothing : this.renderActionList()}
      </mm-popover>
    `
  }

  private renderSheet() {
    return html`
      <mm-sheet
        aria-label=${this.ariaLabel}
        ?open=${this.overlay.sheetOpen}
        @toggle=${this.overlay.handleSheetToggle}
      >
        <mm-sheet-header heading=${this.ariaLabel}></mm-sheet-header>
        <mm-sheet-body>
          ${this.overlay.isViewportCompact ? this.renderActionList() : nothing}
        </mm-sheet-body>
      </mm-sheet>
    `
  }

  // 열 표면이 화면 폭에 따라 갈리므로 aria-controls를 걸지 않는다(걸면 표면이 같은 클릭을 또 토글한다).
  // 클릭 토글과 aria-expanded는 DisclosureController가 getTrigger로 받은 이 버튼에 배선한다.
  private renderTrigger() {
    return html`
      <mm-more-button
        aria-label=${this.ariaLabel}
        aria-haspopup=${this.overlay.isViewportCompact ? 'dialog' : 'menu'}
      ></mm-more-button>
    `
  }

  private renderActionList() {
    return html`
      <mm-menu-item-group aria-label=${this.ariaLabel}>
        ${repeat(
          this.actions,
          action => action.value,
          action => this.renderAction(action),
        )}
      </mm-menu-item-group>
    `
  }

  private renderAction(action: MoreMenuAction) {
    return html`
      <mm-menu-item-action
        label=${action.label}
        icon=${ifDefined(action.icon)}
        ?destructive=${action.destructive}
        ?disabled=${action.disabled}
        @click=${() => this.handleActionClick(action)}
      ></mm-menu-item-action>
    `
  }

  // 명령을 누르면 목록을 닫고 항목의 onClick을 실행한 뒤 어떤 명령인지 알린다.
  private handleActionClick(action: MoreMenuAction) {
    if (action.disabled) return

    this.close()
    action.onClick?.()
    emit(this, 'action', { value: action.value })
  }
}
