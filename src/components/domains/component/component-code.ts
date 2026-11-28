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

      /* 코드 하이라이터 색은 토큰 정의와 별개라 에디터 팔레트 값을 그대로 쓴다. */
      fff-code-block {
        --code-block-tag-text-color: #d73a49;
        --code-block-attr-name-text-color: #b08800;
        --code-block-attr-value-text-color: #22863a;
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
