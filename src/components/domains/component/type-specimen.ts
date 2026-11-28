import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import { ThemeChangeController } from '@/controllers/theme-change-controller'
import '@/components/common'

/** 스펙시멘이 소개하는 속성. 값은 화면에서 재서 채운다. */
const METRICS = ['font-family', 'font-size', 'line-height'] as const

@customElement('fff-type-specimen')
export class TypeSpecimen extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  private themeChange = new ThemeChangeController(this)
  /** 소개할 fff-text의 size 단계 */
  @property({ type: String }) size = ''
  @state() private values: string[] = []
  @query('fff-text') private sample!: HTMLElement

  render() {
    return html`
      <fff-surface variant="outlined" radius="large">
        <fff-marquee gap="4" speed=${this.speed} pause-on-hover>
          ${METRICS.map(
            (metric, index) => html`
              <fff-text size=${this.size} weight="bold">
                ${metric}: ${this.values[index] ?? ''}
              </fff-text>
            `,
          )}
        </fff-marquee>
      </fff-surface>
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
    const ratio = Number((parseFloat(style.lineHeight) / parseFloat(style.fontSize)).toFixed(2))
    const measured = [style.fontFamily, style.fontSize, `${style.lineHeight} (${ratio})`]

    if (measured.join() === this.values.join()) return

    this.values = measured
  }
}
