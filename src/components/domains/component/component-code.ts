import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'

@customElement('mm-component-code')
export class ComponentCode extends LitElement {
  static styles = [
    componentContentFrameStyles,
    css`
      :host {
        display: block;
      }

      .component-content-frame {
        --component-content-padding-block: var(--space-6);
        --component-content-frame-margin: 0 0 var(--space-4)
          var(--component-content-offset-inline-start);
      }
    `,
  ]
  @property({ type: String }) code = ''

  render() {
    return html`
      <div class="component-content-frame">
        <mm-code-block variant="plain" .code=${this.code}></mm-code-block>
      </div>
    `
  }
}
