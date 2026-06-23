import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

type Direction = 'row' | 'column'
type JustifyAlias = 'start' | 'center' | 'end' | 'between' | 'around'
type AlignAlias = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type GapAlias = 'section'
type JustifyContent = JustifyAlias | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'
type AlignItems = AlignAlias | 'flex-start' | 'flex-end'

const justifyMap: Record<JustifyAlias, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

const alignMap: Record<AlignAlias, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}

const gapMap: Record<GapAlias, string> = {
  section: 'var(--space-section)',
}

/**
 * 범용 flexbox 레이아웃 프리미티브.
 * 의미별 그룹핑(button/tag/avatar 등)은 각 시멘틱 컴포넌트가 담당하고,
 * mm-flex 는 순수 레이아웃만 책임진다.
 */
@customElement('mm-flex')
export class Flex extends LitElement {
  @property({ type: String }) direction: Direction = 'row'
  @property({ type: String, attribute: 'justify-content' }) justifyContent: JustifyContent =
    'flex-start'
  @property({ type: String, attribute: 'align-items' }) alignItems: AlignItems = 'stretch'
  /** @deprecated align-items를 사용하세요. */
  @property({ type: String }) align?: AlignItems
  @property({ type: String }) gap = '2'
  @property({ type: Boolean }) wrap = false
  @property({ type: Boolean, reflect: true }) stretch = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
      }

      .flex {
        display: flex;
        width: 100%;
      }

      :host([stretch]) .flex ::slotted(*) {
        flex: 1;
      }
    `,
  ]

  render() {
    const gap =
      gapMap[this.gap as GapAlias] ??
      (/^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap)
    const alignItems = this.align ?? this.alignItems
    const styles = [
      `flex-direction: ${this.direction}`,
      `justify-content: ${justifyMap[this.justifyContent as JustifyAlias] ?? this.justifyContent}`,
      `align-items: ${alignMap[alignItems as AlignAlias] ?? alignItems}`,
      `gap: ${gap}`,
      `flex-wrap: ${this.wrap ? 'wrap' : 'nowrap'}`,
    ].join('; ')

    return html`
      <div class="flex" role="group" style=${styles}>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-flex': Flex
  }
}
