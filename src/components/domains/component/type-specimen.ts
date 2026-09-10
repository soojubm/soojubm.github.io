import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { ThemeChangeController } from '@/controllers/theme-change-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/marquee/marquee'
import '@/components/common/surface/surface'
import '@/components/common/text/text'

/** 스펙시멘이 소개하는 속성. 값은 화면에서 재서 채운다. */
const METRICS = ['font-family', 'font-size', 'line-height'] as const

/**
 * 한 size 단계의 타이포그래피 스펙시멘.
 * 값을 옮겨 적지 않고 자기가 그린 mm-text에서 실제로 먹은 스타일을 재므로,
 * 토큰이 바뀌거나 크기와 행간의 짝이 바뀌어도 문서가 따라온다.
 */
@customElement('mm-type-specimen')
export class TypeSpecimen extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
    `,
  ]

  private themeChange = new ThemeChangeController(this)

  /** 소개할 mm-text의 size 단계 */
  @property({ type: String }) size = ''

  @state() private values: string[] = []

  @query('mm-text') private sample!: HTMLElement

  render() {
    return html`
      <mm-surface variant="outlined" radius="large">
        <mm-marquee gap="4" speed=${this.speed} pause-on-hover>
          ${METRICS.map(
            (metric, index) => html`
              <mm-text size=${this.size} weight="bold">
                ${metric}: ${this.values[index] ?? ''}
              </mm-text>
            `,
          )}
        </mm-marquee>
      </mm-surface>
    `
  }

  updated() {
    this.measure()
  }

  /** 큰 글자는 한 바퀴가 길어 같은 속도로는 느리게 읽힌다. 가장 큰 단계만 속도를 올린다. */
  private get speed() {
    return this.size === '32' ? '80' : '64'
  }

  private measure() {
    const style = getComputedStyle(this.sample)
    const measured = [style.fontFamily, style.fontSize, style.lineHeight]

    if (measured.join() === this.values.join()) return

    this.values = measured
  }
}
