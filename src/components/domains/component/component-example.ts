import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  componentContentFrameStyles,
  exampleWidthTokens,
} from '@/components/domains/component/component.styles'
import { buildAttributeRules } from '@/utils'

@customElement('fff-component-example')
export class ComponentExample extends LitElement {
  static styles = [
    componentContentFrameStyles,
    css`
      :host {
        display: block;
      }

      ${unsafeCSS(buildAttributeRules('width', exampleWidthTokens))}

      fff-example-stage {
        border-left-color: var(--foreground-color);
      }
    `,
  ]

  @property({ type: String, reflect: true }) width: 'narrow' | '' = ''
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <fff-example-stage aligned>
        <slot></slot>
      </fff-example-stage>
    `
  }
}
