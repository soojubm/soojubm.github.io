import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'

@customElement('fff-component-code')
export class ComponentCode extends LitElement {
  static styles = [
    componentContentFrameStyles,
    css`
      :host {
        display: block;
      }

      .component-content-frame {
        --component-content-padding-block: var(--space-6);
        --component-content-margin: var(--space-4) 0 var(--space-4)
          var(--component-content-margin-inline-start);
      }
    `,
  ]
  @property({ type: String }) code = ''

  render() {
    return html`
      <div class="component-content-frame">
        <fff-code-block variant="plain" .code=${this.code}></fff-code-block>
      </div>
    `
  }
}
