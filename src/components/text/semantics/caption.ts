import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../text'

/**
 * <mm-caption>
 * 보조 설명, 메타 정보, 이미지 캡션처럼 본문보다 낮은 위계의 텍스트입니다.
 */
@customElement('mm-caption')
export class Caption extends LitElement {
  render() {
    return html`
      <mm-text as="span" size="12" weight="medium" color="var(--color-foreground-light)">
        <slot></slot>
      </mm-text>
    `
  }
}
