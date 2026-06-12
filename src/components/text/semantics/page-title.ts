import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../text'

/**
 * <mm-page-title>
 * 페이지의 최상위 제목을 담당하는 시멘틱 컴포넌트입니다.
 */
@customElement('mm-page-title')
export class PageTitle extends LitElement {
  render() {
    return html`<mm-text as="h1" size="32" weight="bold" color="var(--color-foreground)"><slot></slot></mm-text>`
  }
}
