import { LitElement, css, html, type PropertyValues } from 'lit'
import { customElement, property, state as internalState } from 'lit/decorators.js'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import { componentTokenValue, displayTokenValue } from '@/components/domains/component/token-values'
import { ThemeChangeController } from '@/controllers/theme-change-controller'
import '@/components/common'

@customElement('fff-token-item')
export class TokenItem extends LitElement {
  static styles = css`
    /* 토큰 묶음 안에서 줄바꿈으로 흐르므로 표면 기본 폭(100%) 대신 내용 폭을 갖는다. */
    :host {
      ${surfaceBaseStyles};
      --surface-padding: var(--space-3) var(--space-4);

      width: auto;
    }
  `
  private themeChange = new ThemeChangeController(this)
  @property({ type: String }) key = ''
  @property({ type: String }) element = ''
  /** `element`의 variant·size처럼 값을 바꾸는 속성과 그 값. */
  @property({ attribute: false }) state: Record<string, string> = {}

  @internalState() private value = ''

  // 값을 먼저 읽어 두어야 render가 순수하게 유지되고, 이전 값과 비교해 바뀐 칸을 가려낼 수 있다. 테마 변경도 이 경로로 다시 읽는다.
  protected willUpdate() {
    this.value = this.renderValue()
  }

  protected updated(changed: PropertyValues) {
    const previous = changed.get('value')
    if (!previous || previous === this.value) return

    this.highlightChange()
  }

  render() {
    return html`
      <fff-meta-item code layout="stacked" label=${this.key} value=${this.value}></fff-meta-item>
    `
  }

  private highlightChange() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

    this.animate([{ backgroundColor: 'var(--primary-subtle-color)' }], {
      duration: 600,
      easing: 'ease-out',
    })
  }

  private renderValue() {
    if (this.element) return componentTokenValue(this.element, this.key, this.state)

    return displayTokenValue(this.key, this)
  }
}
