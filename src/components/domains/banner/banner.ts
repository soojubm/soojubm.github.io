import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import '@/components/common'

/**
 * 페이지 흐름 사이에서 다음 행동 하나로 이끄는 배너. 가운데 정렬한 제목·설명과 버튼을 채운 표면에 담는다.
 * 버튼은 action 슬롯으로 받아 동작을 소비자가 정한다.
 * variant="primary"는 주변 콘텐츠 사이에서 눈에 띄어야 하는 자리에 브랜드 색을 옅게 깐 면을 쓴다.
 */
@customElement('mm-banner')
export class Banner extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      --surface-padding: var(--space-16) var(--space-6);
      --surface-border: var(--border-transparent);
      --surface-border-radius: var(--radius-large);
      --surface-background-color: var(--background-subtle-color);

      justify-content: center;
      align-items: center;
      gap: var(--space-6);
    }

    :host([variant='primary']) {
      --surface-background-color: var(--primary-subtle-color);
    }
  `
  @property({ type: String, reflect: true }) variant?: 'primary'
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''

  render() {
    return html`
      <mm-text-block
        level="2"
        centered
        heading=${this.heading}
        description=${this.description}
      ></mm-text-block>
      <slot name="action"></slot>
    `
  }
}
