import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import type { ButtonVariant } from '@/components/common/button/button'
import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { OptionItem } from '@/types'

import '@/components/common'
import '@/components/indicators/expand-indicator/expand-indicator'
import '@/components/overlay/select/select-listbox'
import '@/components/overlay/select/select-option'
import { renderAdaptiveOverlay } from '@/components/overlay/adaptive-overlay.helpers'
import { AdaptiveOverlay } from '@/controllers/adaptive-overlay'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { emit } from '@/utils'
import { withOpenState } from '@/utils/open-state'

export type SelectVariant = Extract<ButtonVariant, 'secondary' | 'tertiary'>

// 옵션 5개까지 보이고 나머지는 스크롤한다. 옵션 행은 small list-item 높이이고, 패널의 padding·border를 더한다.
const POPOVER_MAX_HEIGHT =
  'min(400px, calc(5 * var(--size-32) + 2 * (var(--overlay-panel-padding) + var(--border-width))))'

@customElement('fff-select')
export class Select extends withOpenState(LitElement) {
  static styles = css`
    /* 트리거 콘텐츠 폭을 따른다. 패널은 트리거 폭에 맞춰 늘어나므로, 컴포넌트가 부모를 채우면 놓인 자리마다 목록 폭이 달라진다 */
    :host {
      display: inline-flex;
    }

    /* 시각보정: indicator는 아이콘보다 큰 박스라 트리거 끝 여백이 padding보다 넓어 보인다. 그 차이만큼 바깥으로 당긴다 */
    fff-expand-indicator {
      margin-inline-end: calc(-1 * var(--space-1));
    }
  `
  @property({ attribute: false }) options: OptionItem[] = []
  @property({ type: String }) value = ''
  /** 트리거 버튼의 variant. 배경 없이 본문에 얹을 때 tertiary를 쓴다. */
  @property({ type: String }) variant: SelectVariant = 'secondary'
  @property({ type: String }) placement: PopoverPlacement = 'bottom-start'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @query('fff-button[aria-haspopup]') private triggerElement?: HTMLElement
  private overlay = new AdaptiveOverlay(this)
  private disclosure = new DisclosureController(this, {
    getTrigger: () => this.triggerElement ?? undefined,
  })

  render() {
    return html`
      ${this.renderTrigger()}
      ${renderAdaptiveOverlay(this.overlay, this.renderOptionList(), {
        label: this.ariaLabel,
        placement: this.placement,
        anchor: this.disclosure.trigger,
        popoverStyle: { '--overlay-panel-max-height': POPOVER_MAX_HEIGHT },
      })}
    `
  }

  /**
   * 열 표면이 화면 폭에 따라 갈리므로 트리거는 aria-controls로 표면을 가리키지 않는다(걸면 표면이 같은 클릭을 또 토글한다).
   * 클릭 토글과 aria-expanded는 DisclosureController가 getTrigger로 받은 이 버튼에 배선하고, 여기서는 열린 표면의 종류만 aria-haspopup으로 알린다.
   */
  private renderTrigger() {
    return html`
      <fff-button
        variant=${this.variant}
        aria-haspopup=${this.overlay.isViewportCompact ? 'dialog' : 'listbox'}
        aria-label=${this.triggerLabel || nothing}
      >
        ${this.currentLabel}
        <fff-expand-indicator ?expanded=${this.open}></fff-expand-indicator>
      </fff-button>
    `
  }

  private renderOptionList() {
    return html`
      <fff-select-listbox aria-label=${this.ariaLabel || nothing} @input=${this.handleOptionInput}>
        ${repeat(
          this.options,
          option => option.value,
          option => this.renderOption(option),
        )}
      </fff-select-listbox>
    `
  }

  // 옵션: 선택 시 닫히며 현재 선택된 옵션은 aria-selected로 강조
  private renderOption(option: OptionItem) {
    return html`
      <fff-select-option
        .value=${option.value}
        label=${option.label}
        icon=${ifDefined(option.icon)}
        ?disabled=${option.disabled}
        ?selected=${option.value === this.value}
      ></fff-select-option>
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
    this.close()
    if (event.detail.value === this.value) return

    this.value = event.detail.value
    emit(this, 'change', { value: this.value })
  }
}
