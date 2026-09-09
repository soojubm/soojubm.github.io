import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/**
 * mm-accordion-item을 묶는 그룹 컨테이너.
 */
@customElement('mm-accordion')
export class Accordion extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
