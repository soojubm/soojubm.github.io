import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-component-references')
export class ComponentReferences extends LitElement {
  @property({ type: String }) heading = 'References'

  // 기존 마크업에서 hidden 처리가 되어 있었으므로, 기본값을 true로 설정하거나
  // 필요에 따라 노출할 수 있도록 Boolean 속성으로 관리합니다.
  @property({ type: Boolean }) hideHeading = true

  static styles = css`
    :host {
      display: block;
    }

    .component-references {
      display: flex;
      flex-direction: column;
      padding: 4rem 0;
      gap: var(--space-3);
      /* border-top: 2px dashed var(--color-border); */
    }
  `

  render() {
    return html`
      <section class="component-references">
        <mm-paragraph size="large" weight="bold" ?hidden=${this.hideHeading}>
          ${this.heading}
        </mm-paragraph>
        <slot></slot>
      </section>
    `
  }
}

export default ComponentReferences
