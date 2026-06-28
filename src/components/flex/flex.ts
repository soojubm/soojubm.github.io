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
 *
 * 기본(as="div")은 host 자체가 flex 컨테이너이며, 레이아웃은 reflect된 attribute를
 * 받는 :host 셀렉터로 적용한다(인라인 스타일 없음). gap만 임의 값이라 custom property로 넘긴다.
 * 시멘틱 랜드마크가 필요한 경우(as="section" 등)에만 내부 요소를 컨테이너로 사용한다.
 */
@customElement('mm-flex')
export class Flex extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: stretch;
        gap: var(--space-2);
      }

      /* 시멘틱 래퍼를 쓰는 경우 host는 단순 박스이고 내부 요소가 flex 컨테이너다. */
      :host([as='header']),
      :host([as='section']),
      :host([as='footer']),
      :host([as='nav']) {
        display: block;
      }

      :host([direction='column']) {
        flex-direction: column;
      }

      :host([wrap]) {
        flex-wrap: wrap;
      }

      :host([gap='0']) {
        gap: 0;
      }
      :host([gap='05']) {
        gap: var(--space-05);
      }
      :host([gap='1']) {
        gap: var(--space-1);
      }
      :host([gap='3']) {
        gap: var(--space-3);
      }
      :host([gap='4']) {
        gap: var(--space-4);
      }
      :host([gap='8']) {
        gap: var(--space-8);
      }
      :host([gap='12']) {
        gap: var(--space-12);
      }
      :host([gap='16']) {
        gap: var(--space-16);
      }
      :host([gap='section']) {
        gap: var(--space-section);
      }

      :host([justify-content='center']) {
        justify-content: center;
      }
      :host([justify-content='end']),
      :host([justify-content='flex-end']) {
        justify-content: flex-end;
      }
      :host([justify-content='between']),
      :host([justify-content='space-between']) {
        justify-content: space-between;
      }
      :host([justify-content='around']),
      :host([justify-content='space-around']) {
        justify-content: space-around;
      }

      :host([align-items='center']) {
        align-items: center;
      }
      :host([align-items='start']),
      :host([align-items='flex-start']) {
        align-items: flex-start;
      }
      :host([align-items='end']),
      :host([align-items='flex-end']) {
        align-items: flex-end;
      }
      :host([align-items='baseline']) {
        align-items: baseline;
      }

      :host([stretch]) ::slotted(*) {
        flex: 1;
      }

      .flex {
        display: flex;
        width: 100%;
      }
    `,
  ]

  @property({ type: String, reflect: true }) direction: Direction = 'row'
  @property({ type: String, attribute: 'justify-content', reflect: true })
  justifyContent: JustifyContent = 'flex-start'
  @property({ type: String, attribute: 'align-items', reflect: true }) alignItems: AlignItems =
    'stretch'
  @property({ type: String, reflect: true }) gap = '2'
  @property({ type: String, reflect: true }) as: FlexAs = 'div'
  @property({ type: Boolean, reflect: true }) wrap = false
  @property({ type: Boolean, reflect: true }) stretch = false

  render() {
    const content = html`
      <slot></slot>
    `

    if (this.as === 'div') return content

    const styles = styleMap(this.layoutStyles)

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

    return html`
      <nav class="flex" style=${styles}>${content}</nav>
    `
  }

  /** 기본 as="div"는 host가 flex 컨테이너이므로 group role을 host에 부여한다. */
  protected willUpdate() {
    if (this.as === 'div') {
      this.setAttribute('role', 'group')
    } else {
      this.removeAttribute('role')
    }
  }

  private get gapValue() {
    return (
      gapMap[this.gap as GapAlias] ??
      (/^\d+$/.test(this.gap) ? `var(--space-${this.gap})` : this.gap)
    )
  }

  /** 시멘틱 래퍼(as !== 'div')의 내부 flex 요소에만 사용하는 레이아웃 스타일. */
  private get layoutStyles() {
    return {
      flexDirection: this.direction,
      justifyContent: justifyMap[this.justifyContent as JustifyAlias] ?? this.justifyContent,
      alignItems: alignMap[this.alignItems as AlignAlias] ?? this.alignItems,
      gap: this.gapValue,
      flexWrap: this.wrap ? 'wrap' : 'nowrap',
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-flex': Flex
  }
}
