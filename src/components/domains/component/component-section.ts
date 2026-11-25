import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

import {
  componentContentFrameStyles,
  exampleWidthTokens,
} from '@/components/domains/component/component.styles'
import { buildAttributeRules } from '@/utils'

@customElement('mm-component-section')
export class ComponentSection extends LitElement {
  static styles = [
    componentContentFrameStyles,
    css`
      ${unsafeCSS(buildAttributeRules('width', exampleWidthTokens))}

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
  @property({ attribute: false }) checks: string[] = []
  @property({ type: String, reflect: true }) width: 'narrow' | '' = ''
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <mm-text-block level="2" heading=${this.heading} description=${this.description}>
        ${this.renderChecks()}
      </mm-text-block>
      <div class="example">
        <div class="component-content-frame">
          <slot></slot>
        </div>
        ${this.renderCode()}
      </div>
    `
  }

  private renderChecks() {
    if (!this.checks.length) return nothing

    return html`
      <mm-text-list .texts=${this.checks}></mm-text-list>
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
