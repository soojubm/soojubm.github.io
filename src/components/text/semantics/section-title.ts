import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../text'

/**
 * <mm-section-title>
 * 화면 안에서 주요 콘텐츠 묶음을 구분하는 섹션 제목입니다.
 */
@customElement('mm-section-title')
export class SectionTitle extends LitElement {
  render() {
    return html`<mm-text as="h2" size="18" weight="bold" color="var(--color-foreground)"><slot></slot></mm-text>`
  }
}
