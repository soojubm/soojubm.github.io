import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { MenuItemTone } from '@/components/common/menu-item/menu-item.utils'
import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { OptionItem } from '@/types'

import '@/components/common'
import '@/components/overlay/popover/popover'
import '@/components/overlay/sheet'
import { AdaptiveOverlayController } from '@/controllers/adaptive-overlay-controller'
import { emit } from '@/utils'

// onClick은 항목마다 할 일이 정해진 경우에 쓰고, action 이벤트는 onClick 유무와 상관없이 늘 알린다.
export type MoreMenuAction = OptionItem & { tone?: MenuItemTone; onClick?: () => void }

/**
 * 더보기 버튼으로 여는 명령 목록. 값을 고르는 mm-select와 달리 선택 상태를 남기지 않고, 누른 명령만 알린다.
 * 좁은 화면에서는 mm-select처럼 목록을 sheet로 올린다. sheet는 portal로 옮겨져 slot으로 받은 항목을
 * 투영할 수 없으므로, 항목은 actions 배열로 받아 어느 표면이든 직접 렌더한다.
 */
@customElement('mm-more-menu')
export class MoreMenu extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }
  `
  @property({ attribute: false }) actions: MoreMenuAction[] = []
  @property({ type: String }) placement: PopoverPlacement = 'bottom-end'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = '더보기'
  private overlay = new AdaptiveOverlayController(this)

  render() {
    return html`
      ${this.renderPopover()} ${this.renderSheet()}
    `
  }

  // 좁은 화면에서는 sheet가 목록을 맡으므로 popover 없이 트리거만 남긴다.
  private renderPopover() {
    if (this.overlay.compact) return this.renderTrigger()

    return html`
      <mm-popover
        placement=${this.placement}
        ?open=${this.overlay.open}
        @toggle=${this.overlay.handleOverlayToggle}
      >
        ${this.renderTrigger()} ${this.renderActionList()}
      </mm-popover>
    `
  }

  // sheet는 portal로 옮겨져 조건부로 걷어낼 수 없으므로 늘 마운트해 두고 목록만 넣고 뺀다.
  private renderSheet() {
    return html`
      <mm-sheet
        aria-label=${this.ariaLabel}
        ?open=${this.overlay.compact && this.overlay.open}
        @toggle=${this.overlay.handleOverlayToggle}
      >
        <mm-sheet-header heading=${this.ariaLabel}></mm-sheet-header>
        <mm-sheet-body>${this.overlay.compact ? this.renderActionList() : nothing}</mm-sheet-body>
      </mm-sheet>
    `
  }

  // popover는 slot=trigger의 클릭과 aria-expanded를 스스로 배선하지만, portal로 옮겨진 sheet는 직접 배선한다.
  private renderTrigger() {
    if (this.overlay.compact) {
      return html`
        <mm-more-button
          aria-label=${this.ariaLabel}
          aria-haspopup="dialog"
          aria-expanded=${this.overlay.open ? 'true' : 'false'}
          @click=${this.overlay.handleTriggerClick}
        ></mm-more-button>
      `
    }

    return html`
      <mm-more-button slot="trigger" aria-label=${this.ariaLabel}></mm-more-button>
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
        tone=${action.tone ?? ''}
        ?disabled=${action.disabled}
        @click=${() => this.handleActionClick(action)}
      ></mm-menu-item-action>
    `
  }

  // 명령을 누르면 목록을 닫고 항목의 onClick을 실행한 뒤 어떤 명령인지 알린다.
  private handleActionClick(action: MoreMenuAction) {
    if (action.disabled) return

    this.overlay.close()
    action.onClick?.()
    emit(this, 'action', { value: action.value })
  }
}
