import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'
import { styleMap } from 'lit/directives/style-map.js'

import type { ButtonVariant } from '@/components/common/button/button'
import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { OptionItem } from '@/types'

import '@/components/common'
import '@/components/indicators/expand-indicator/expand-indicator'
import '@/components/overlay/popover/popover'
import '@/components/overlay/select/select-listbox'
import '@/components/overlay/select/select-option'
import '@/components/overlay/sheet'
import { AdaptiveOverlayController } from '@/controllers/adaptive-overlay-controller'
import { emit } from '@/utils'

export type SelectVariant = Extract<ButtonVariant, 'tertiary' | 'ghost'>

// 옵션 5개까지 보이고 나머지는 스크롤한다. 옵션 행은 small list-item 높이이고, 패널의 padding·border를 더한다.
// popover는 portal로 옮겨져 이 컴포넌트의 shadow 스타일이 닿지 않으므로 인라인으로 싣는다.
const POPOVER_MAX_HEIGHT =
  'min(400px, calc(5 * var(--size-32) + 2 * (var(--overlay-panel-padding-block) + var(--border-width))))'

/**
 * popover를 프리미티브로 하는 선택 입력.
 * 좁은 화면에서는 목록을 트리거에 앵커하지 않고 sheet로 올린다. 두 표면은 backdrop·스크롤 잠금·
 * 포커스 가두기를 쥐는 방식이 달라 CSS로 갈아입힐 수 없으므로 표면 컴포넌트 자체를 갈아 끼운다.
 * 그래서 열림 상태는 두 표면이 나눠 갖지 않고 AdaptiveOverlayController가 소유한다.
 */
@customElement('mm-select')
export class Select extends LitElement {
  static styles = css`
    /* 트리거 콘텐츠 폭을 따른다. 패널은 트리거 폭에 맞춰 늘어나므로, 호스트가 부모를 채우면 놓인 자리마다 목록 폭이 달라진다 */
    :host {
      display: inline-flex;
    }

    /* 시각보정: indicator는 아이콘보다 큰 박스라 트리거 끝 여백이 padding보다 넓어 보인다. 그 차이만큼 바깥으로 당긴다 */
    mm-expand-indicator {
      margin-inline-end: calc(-1 * var(--space-1));
    }
  `
  @property({ attribute: false }) options: OptionItem[] = []
  @property({ type: String }) value = ''
  /** 트리거 버튼의 variant. 배경 없이 본문에 얹을 때 ghost를 쓴다. */
  @property({ type: String }) variant: SelectVariant = 'tertiary'
  @property({ type: String }) placement: PopoverPlacement = 'bottom-start'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  private overlay = new AdaptiveOverlayController(this)

  render() {
    return html`
      ${this.renderTrigger()} ${this.renderPopover()} ${this.renderSheet()}
    `
  }

  /**
   * popover·sheet는 연결되는 순간 portal 컨테이너로 자리를 옮겨 Lit의 템플릿 범위를 벗어나므로,
   * 조건부로 걷어내면 그 자리에 남는다. 표면은 늘 마운트해 두고 목록만 넣고 뺀다.
   */
  private renderPopover() {
    return html`
      <mm-popover
        placement=${this.placement}
        .anchor=${this.overlay.trigger}
        ?open=${!this.overlay.compact && this.overlay.open}
        style=${styleMap({ '--overlay-panel-max-height': POPOVER_MAX_HEIGHT })}
        @toggle=${this.overlay.handleOverlayToggle}
      >
        ${this.overlay.compact ? nothing : this.renderOptionList()}
      </mm-popover>
    `
  }

  private renderSheet() {
    return html`
      <mm-sheet
        aria-label=${this.ariaLabel || nothing}
        ?open=${this.overlay.compact && this.overlay.open}
        @toggle=${this.overlay.handleOverlayToggle}
      >
        <mm-sheet-header heading=${this.ariaLabel}></mm-sheet-header>
        <mm-sheet-body>${this.overlay.compact ? this.renderOptionList() : nothing}</mm-sheet-body>
      </mm-sheet>
    `
  }

  /**
   * 두 표면은 portal로 옮겨져 다른 트리 아래의 트리거를 찾을 수 없어, select가 클릭과 aria-expanded를 직접 배선한다.
   * 열린 표면의 종류만 aria-haspopup으로 알린다.
   */
  private renderTrigger() {
    return html`
      <mm-button
        variant=${this.variant}
        aria-haspopup=${this.overlay.compact ? 'dialog' : 'listbox'}
        aria-expanded=${this.overlay.open ? 'true' : 'false'}
        aria-label=${this.triggerLabel || nothing}
        @click=${this.overlay.handleTriggerClick}
      >
        ${this.currentLabel}
        <mm-expand-indicator ?expanded=${this.overlay.open}></mm-expand-indicator>
      </mm-button>
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
    this.fillEmptyValue()
  }

  // 네이티브 select처럼 value가 비어 있으면 첫 번째 활성 옵션으로 채운다.
  private fillEmptyValue() {
    if (this.value) return

    this.value = this.options.find(option => !option.disabled)?.value ?? ''
  }

  // 옵션 활성화 시: 값 반영 후 목록 닫기
  private handleOptionInput(event: CustomEvent<{ value: string }>) {
    this.overlay.close()
    if (event.detail.value === this.value) return

    this.value = event.detail.value
    emit(this, 'change', { value: this.value })
  }
}
