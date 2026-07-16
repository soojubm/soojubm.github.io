import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { PopoverPlacement } from '@/components/popover/popover'

import { PopupController } from '@/controllers/popup-controller'
import { MEDIA_QUERY } from '@/stylesheets/shared/breakpoints'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/menuitem/semantics/menu-item-action'
import '@/components/menuitem/semantics/menu-item-group'
import '@/components/popover/popover'
import '@/components/sheet/sheet'
import '@/components/sheet/semantics/sheet-body'
import { emit } from '@/utils/emit'

export interface SelectOption {
  label: string
  value: string
  selected: boolean
  icon?: IconName
}

/**
 * popover를 프리미티브로 하는 선택 입력.
 * phone 뷰포트에서는 같은 옵션 목록을 bottom sheet(mm-sheet)로 전환해 표시한다.
 */
@customElement('mm-select')
export class Select extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        --select-min-width: auto;
        display: block;
        position: relative;
        width: var(--select-width, auto);
      }

      mm-popover {
        --popover-max-height: var(--select-max-height);
      }

      mm-popover::part(panel) {
        min-width: var(--select-min-width);
      }

      /* full(100%)이 아니면 호스트가 트리거 폭이므로, 좌측 placement는 트리거 왼쪽에 앵커해 오른쪽으로 자란다. */
      :host(:not([width='100%'])) mm-popover[placement='bottom-left']::part(panel),
      :host(:not([width='100%'])) mm-popover[placement='top-left']::part(panel) {
        right: auto;
      }

      mm-menu-item-action[aria-current='true'] {
        color: var(--selection-foreground);
      }
    `,
  ]

  @property({ type: String }) value = ''
  @property({ type: String }) placement: PopoverPlacement = 'bottom-left'
  /** 호스트 폭. 기본은 트리거 콘텐츠 폭(auto)이며, `240px`·`100%` 등 임의 CSS 폭 값을 받는다. */
  @property({ type: String, reflect: true }) width = 'auto'
  @state() private options: SelectOption[] = []
  @state() private isPhoneViewport = false

  @queryAssignedElements({ selector: 'option', flatten: true })
  private optionElements!: HTMLOptionElement[]
  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private triggerElements!: HTMLElement[]

  private phoneMedia = window.matchMedia(MEDIA_QUERY.compact)

  private popup = new PopupController(this, {
    event: 'click',
    getTrigger: () => this.triggerElements[0],
  })

  render() {
    return html`
      ${this.renderTrigger()} ${this.renderPopoverList()} ${this.renderSheetList()}
      <slot hidden @slotchange=${this.syncOptions}></slot>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.phoneMedia.addEventListener('change', this.syncViewport)
    this.syncViewport()
  }

  disconnectedCallback() {
    this.phoneMedia.removeEventListener('change', this.syncViewport)
    super.disconnectedCallback()
  }

  firstUpdated() {
    this.syncOptions()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width')) this.style.setProperty('--select-width', this.width)
  }

  private syncViewport = () => {
    this.isPhoneViewport = this.phoneMedia.matches
  }

  // 네이티브 select처럼 value가 비어 있으면 selected 옵션에서 초기값을 채운다.
  private syncOptions() {
    this.options = this.parseLightDomOptions()
    if (!this.value) this.value = this.options.find(option => option.selected)?.value ?? ''
  }

  // light DOM의 <option> 요소를 SelectOption 데이터로 변환
  private parseLightDomOptions(): SelectOption[] {
    return this.optionElements.map(option => ({
      label: option.textContent || '',
      value: option.value,
      selected: option.hasAttribute('selected'),
      icon: (option.getAttribute('icon') as IconName | null) ?? undefined,
    }))
  }

  // 옵션 클릭 시: 값 반영 후 목록 닫기
  private selectOption(option: SelectOption) {
    this.value = option.value
    this.popup.close()
    emit(this, 'change', { value: option.value })
  }

  // 트리거 스타일은 slot="trigger"로 들어온 외부 요소가 책임진다.
  private renderTrigger() {
    return html`
      <slot
        name="trigger"
        @click=${() => this.popup.toggle()}
        @slotchange=${this.popup.syncTrigger}
      ></slot>
    `
  }

  private renderPopoverList() {
    if (this.isPhoneViewport) return nothing

    return html`
      <mm-popover ?open=${this.popup.open} placement=${this.placement}>
        ${this.renderOptionList()}
      </mm-popover>
    `
  }

  // phone 뷰포트: 앵커 대신 bottom sheet로 같은 옵션 목록을 전시한다.
  // sheet는 열릴 때 body로 portal되어 host 바깥으로 나가므로,
  // 내부 pointerdown이 outside-click으로 오인되지 않게 전파를 끊는다.
  private renderSheetList() {
    if (!this.isPhoneViewport) return nothing

    return html`
      <mm-sheet
        variant="bottom"
        ?open=${this.popup.open}
        @sheetclose=${() => this.popup.close()}
        @pointerdown=${(e: Event) => e.stopPropagation()}
      >
        <mm-sheet-body>${this.renderOptionList()}</mm-sheet-body>
      </mm-sheet>
    `
  }

  // popover·sheet가 공유하는 옵션 목록. 그룹 시맨틱은 목록 전체에 한 번만 적용한다.
  private renderOptionList() {
    return html`
      <mm-menu-item-group>
        ${repeat(
          this.options,
          option => option.value,
          option => this.renderOption(option),
        )}
      </mm-menu-item-group>
    `
  }

  // 옵션: 선택 시 닫히며 현재 선택된 옵션은 aria-current로 강조
  private renderOption(option: SelectOption) {
    const isSelected = option.value === this.value

    return html`
      <mm-menu-item-action
        icon=${ifDefined(option.icon)}
        aria-current=${ifDefined(isSelected ? 'true' : undefined)}
        @click=${() => this.selectOption(option)}
      >
        ${option.label}
      </mm-menu-item-action>
    `
  }
}

export default Select
