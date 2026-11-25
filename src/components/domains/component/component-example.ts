import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  componentContentFrameStyles,
  exampleWidthTokens,
} from '@/components/domains/component/component.styles'
import { buildAttributeRules } from '@/utils'

@customElement('mm-component-example')
export class ComponentExample extends LitElement {
  static styles = [
    componentContentFrameStyles,
    css`
      :host {
        display: block;
      }

      ${unsafeCSS(buildAttributeRules('width', exampleWidthTokens))}

      .component-example {
        --component-content-margin: 0 0 0 var(--component-content-margin-inline-start);

        box-sizing: border-box;
        border-left-color: var(--foreground-color);
      }
    `,
  ]

  @property({ type: String, reflect: true }) width: 'narrow' | '' = ''
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <section class="component-example component-content-frame">
        <slot></slot>
      </section>
    `
  }
}
