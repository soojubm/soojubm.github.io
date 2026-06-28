import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'

type Direction = 'row' | 'column'
type JustifyAlias = 'start' | 'center' | 'end' | 'between' | 'around'
type AlignAlias = 'start' | 'center' | 'end' | 'stretch' | 'baseline'
type GapAlias = 'section'
type JustifyContent = JustifyAlias | 'flex-start' | 'flex-end' | 'space-between' | 'space-around'
type AlignItems = AlignAlias | 'flex-start' | 'flex-end'
type FlexAs = 'div' | 'header' | 'section' | 'footer' | 'nav'

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

  @property({ type: String }) direction: Direction = 'row'
  @property({ type: String, attribute: 'justify-content' }) justifyContent: JustifyContent =
    'flex-start'
  @property({ type: String, attribute: 'align-items' }) alignItems: AlignItems = 'stretch'
  @property({ type: String }) gap = '2'
  @property({ type: String }) as: FlexAs = 'div'
  @property({ type: Boolean }) wrap = false
  @property({ type: Boolean, reflect: true }) stretch = false

  render() {
    const styles = styleMap(this.styles)
    const content = html`
      <slot></slot>
    `

    if (this.as === 'header') {
      return html`
        <header class="flex" style=${styles}>${content}</header>
      `
    }

    if (this.as === 'section') {
      return html`
        <section class="flex" style=${styles}>${content}</section>
      `
    }

    if (this.as === 'footer') {
      return html`
        <footer class="flex" style=${styles}>${content}</footer>
      `
    }

    if (this.as === 'nav') {
      return html`
        <nav class="flex" style=${styles}>${content}</nav>
      `
    }

    return html`
      <div class="flex" role="group" style=${styles}>${content}</div>
    `
  }

  private get styles() {
    const gap =
      gapMap[this.gap as GapAlias] ??
      (/^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap)

    return {
      flexDirection: this.direction,
      justifyContent: justifyMap[this.justifyContent as JustifyAlias] ?? this.justifyContent,
      alignItems: alignMap[this.alignItems as AlignAlias] ?? this.alignItems,
      gap,
      flexWrap: this.wrap ? 'wrap' : 'nowrap',
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-flex': Flex
  }
}
