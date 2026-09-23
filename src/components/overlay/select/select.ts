import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { OptionItem } from '@/types'

import '@/components/common'
import '@/components/indicators/expand-indicator/expand-indicator'
import '@/components/overlay/popover/popover'
import '@/components/overlay/select/select-listbox'
import '@/components/overlay/select/select-option'
import '@/components/overlay/sheet'
import { MEDIA_QUERY } from '@/constants'
import { MediaQueryController } from '@/controllers/media-query-controller'
import { emit } from '@/utils'

/**
 * popover를 프리미티브로 하는 선택 입력.
 * 좁은 화면에서는 목록을 트리거에 앵커하지 않고 sheet로 올린다. 두 표면은 backdrop·portal·
 * 스크롤 잠금을 쥐는 방식이 달라 CSS로 갈아입힐 수 없으므로 표면 컴포넌트 자체를 갈아 끼운다.
 * 그래서 열림 상태는 두 표면이 나눠 갖지 않고 select가 소유한다.
 */
@customElement('mm-select')
export class Select extends LitElement {
  static styles = css`
    :host {
      --select-width: auto;
      display: block;
      width: var(--select-width);
    }

    :host([width='100%']) mm-popover {
      display: block;
    }
  `
  @property({ attribute: false }) options: OptionItem[] = []
  @property({ type: String }) value = ''
  @property({ type: String }) placement: PopoverPlacement = 'bottom-left'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  /** 호스트 폭. 기본은 트리거 콘텐츠 폭(auto)이며, `240px`·`100%` 등 임의 CSS 폭 값을 받는다. */
  @property({ type: String, reflect: true }) width = 'auto'
  @state() private open = false
  private compact = new MediaQueryController(this, MEDIA_QUERY.compact)
  private wasCompact = this.compact.matches

  render() {
    return html`
      ${this.renderPopover()} ${this.renderSheet()}
    `
  }

  // 좁은 화면에서는 sheet가 목록을 맡으므로 popover 없이 트리거만 남긴다.
  private renderPopover() {
    if (this.compact.matches) return this.renderTrigger()

    return html`
      <mm-popover
        placement=${this.placement}
        ?open=${this.open}
        @popover-toggle=${this.handlePopoverToggle}
      >
        ${this.renderTrigger()} ${this.renderOptionList()}
      </mm-popover>
    `
  }

  /**
   * sheet는 연결되는 순간 portal 컨테이너로 자리를 옮겨 Lit의 템플릿 범위를 벗어나므로,
   * 넓은 화면에서 조건부로 걷어내면 그 자리에 남는다. 표면은 늘 마운트해 두고 목록만 넣고 뺀다.
   */
  private renderSheet() {
    return html`
      <mm-sheet
        aria-label=${this.ariaLabel || nothing}
        ?open=${this.compact.matches && this.open}
        @sheet-close=${this.handleSheetClose}
      >
        <mm-sheet-header heading=${this.ariaLabel}></mm-sheet-header>
        <mm-sheet-body>${this.compact.matches ? this.renderOptionList() : nothing}</mm-sheet-body>
      </mm-sheet>
    `
  }

  /**
   * popover는 슬롯으로 품은 트리거의 클릭과 aria-expanded를 스스로 배선하지만,
   * portal로 옮겨진 sheet는 다른 트리 아래의 트리거를 찾을 수 없어 select가 직접 배선한다.
   */
  private renderTrigger() {
    if (this.compact.matches) {
      return html`
        <mm-button
          aria-haspopup="dialog"
          aria-expanded=${this.open ? 'true' : 'false'}
          aria-label=${this.triggerLabel || nothing}
          @click=${this.handleTriggerClick}
        >
          ${this.renderTriggerContent()}
        </mm-button>
      `
    }

    return html`
      <mm-button slot="trigger" aria-haspopup="listbox" aria-label=${this.triggerLabel || nothing}>
        ${this.renderTriggerContent()}
      </mm-button>
    `
  }

  private renderTriggerContent() {
    return html`
      ${this.currentLabel}
      <mm-expand-indicator ?expanded=${this.open}></mm-expand-indicator>
    `
  }

  private renderOptionList() {
    return html`
      <mm-select-listbox aria-label=${this.ariaLabel || nothing} @input=${this.handleOptionInput}>
        ${repeat(
          this.options,
          option => option.value,
          option => this.renderOption(option),
        )}
      </mm-select-listbox>
    `
  }

  // 옵션: 선택 시 닫히며 현재 선택된 옵션은 aria-selected로 강조
  private renderOption(option: OptionItem) {
    return html`
      <mm-select-option
        .value=${option.value}
        label=${option.label}
        icon=${ifDefined(option.icon)}
        ?disabled=${option.disabled}
        ?selected=${option.value === this.value}
      ></mm-select-option>
    `
  }

  private get currentLabel() {
    return this.options.find(option => option.value === this.value)?.label ?? ''
  }

  // aria-label은 버튼 콘텐츠를 대체하므로, 컨트롤 이름에 현재 값을 이어 붙여 선택값이 함께 읽히게 한다.
  private get triggerLabel() {
    if (!this.ariaLabel) return ''

    return `${this.ariaLabel}, ${this.currentLabel}`
  }

  protected willUpdate() {
    this.closeOnSurfaceChange()
    this.fillEmptyValue()
  }

  // 표면이 갈리면 트리거 배선도 새 표면으로 옮겨가므로, 열린 채로 넘어가지 않게 닫는다.
  private closeOnSurfaceChange() {
    if (this.compact.matches === this.wasCompact) return

    this.wasCompact = this.compact.matches
    this.open = false
  }

  // 네이티브 select처럼 value가 비어 있으면 첫 번째 활성 옵션으로 채운다.
  private fillEmptyValue() {
    if (this.value) return

    this.value = this.options.find(option => !option.disabled)?.value ?? ''
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('width')) this.style.setProperty('--select-width', this.width)
  }

  private handleTriggerClick() {
    this.open = !this.open
  }

  // popover는 열림을 스스로 토글하므로, 트리거가 아니라 popover가 알려 오는 상태를 받아 적는다.
  private handlePopoverToggle(event: CustomEvent<{ open: boolean }>) {
    this.open = event.detail.open
  }

  private handleSheetClose() {
    this.open = false
  }

  // 옵션 활성화 시: 값 반영 후 목록 닫기
  private handleOptionInput(event: CustomEvent<{ value: string }>) {
    this.open = false
    if (event.detail.value === this.value) return

    this.value = event.detail.value
    emit(this, 'change', { value: this.value })
  }
}
