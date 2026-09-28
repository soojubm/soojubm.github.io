import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { visuallyHiddenInputStyles } from '@/components/common/input/input.styles'
import { radioStyles } from '@/components/common/radio/radio.styles'
import { renderRadioInput } from '@/components/common/radio/radio.utils'
import { ToggleController } from '@/controllers/toggle-controller'
import { resetStyles, type ComponentSize } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'
import '@/components/common/text/semantics/paragraph'

export type RadioSize = Extract<ComponentSize, 'medium' | 'large'>

@customElement('mm-radio')
export class Radio extends LitElement {
  static styles = [resetStyles, visuallyHiddenInputStyles, radioStyles]
  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: String, reflect: true }) size: RadioSize = 'medium'
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean }) disabled = false
  // shadow 안에서만 쓰는 label 연결용 id라 호스트의 id와 섞지 않는다.
  private inputId = uniqueId('radio')
  private toggle = new ToggleController(this, 'checked')

  render() {
    return html`
      <div>
        ${renderRadioInput(
          this,
          this.inputId,
          this.toggle,
          html`
            <mm-paragraph><slot></slot></mm-paragraph>
          `,
        )}
      </div>
    `
  }
}
