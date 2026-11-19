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
        <mm-code-block variant="plain" .code=${this.indentedCode()}></mm-code-block>
      </div>
    `
  }

  // 예제 문자열은 2칸 들여쓰기로 적고, 문서에는 4칸으로 보여 준다(복사 값도 같다).
  private indentedCode() {
    return this.code.replace(/^ +/gm, spaces => spaces.repeat(2))
  }
}
