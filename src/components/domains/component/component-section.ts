import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

import { componentExampleStyles } from '@/components/domains/component/component.styles'

@customElement('mm-component-section')
export class ComponentSection extends LitElement {
  static styles = [
    componentExampleStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-6);
        margin-top: var(--space-section);
      }

      /* 코드와 전시는 같은 예시의 두 면이라 설명과 떨어진 간격보다 좁게 붙인다. */
      .example {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
      }
    `,
  ]
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) code = ''
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <mm-text-block
        level="2"
        heading=${this.heading}
        description=${this.description}
      ></mm-text-block>
      <slot name="notice"></slot>
      <div class="example">
        ${this.renderCode()}
        <div class="component-content-frame">
          <slot></slot>
        </div>
      </div>
    `
  }

  private renderCode() {
    if (!this.code) return nothing

    return html`
      <div class="component-content-frame">
        <mm-code-block variant="plain" .code=${this.code}></mm-code-block>
      </div>
    `
  }
}
