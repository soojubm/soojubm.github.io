import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/** 컴포넌트 문서에서 특성 목록과 설명 산문을 함께 담는 가이드 영역. */
@customElement('mm-component-guide')
class ComponentGuide extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      padding: var(--space-section) 0 0;
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}

export default ComponentGuide
