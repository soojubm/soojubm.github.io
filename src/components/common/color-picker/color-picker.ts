import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import { live } from 'lit/directives/live.js'
import '@/components/common/button/button-group'
import '@/components/common/toggle-button/semantics/color-chip'

const COLOR_CLASSES = ['color-black', 'color-green']

type Color = 'green' | 'black'

const COLOR_OPTIONS: { value: Color; label: string; color: string }[] = [
  { value: 'black', label: 'Black', color: 'var(--black800)' },
  { value: 'green', label: 'Green', color: 'var(--green800)' },
]

@customElement('mm-color-picker')
export class ColorPicker extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @state() private color: Color = 'black'

  render() {
    return html`
      <mm-button-group>
        ${COLOR_OPTIONS.map(option => this.renderColorChip(option))}
      </mm-button-group>
    `
  }

  // 칩은 각자 토글이지만 테마 색은 하나만 고르므로, 눌린 칩을 다시 눌러도 선택이 풀리지 않게 live로 상태를 되돌린다.
  private renderColorChip(option: (typeof COLOR_OPTIONS)[number]) {
    return html`
      <mm-color-chip
        value=${option.value}
        color=${option.color}
        aria-label=${option.label}
        .pressed=${live(this.color === option.value)}
        @change=${this.handleColorChange}
      ></mm-color-chip>
    `
  }

  private handleColorChange(e: CustomEvent<{ pressed: boolean; value: Color }>) {
    this.color = e.detail.value
    this.requestUpdate()
    COLOR_CLASSES.forEach(c => document.documentElement.classList.remove(c))
    document.documentElement.classList.add(`color-${this.color}`)
  }
}
