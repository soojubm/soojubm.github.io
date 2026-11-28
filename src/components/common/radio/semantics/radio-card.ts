import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { inputVisuallyHiddenStyles } from '@/components/common/input/input.styles'
import { radioCardStyles, radioStyles } from '@/components/common/radio/radio.styles'
import { renderRadioInput } from '@/components/common/radio/radio.utils'
import { resetStyles } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'

@customElement('fff-radio-card')
export class RadioCard extends LitElement {
  static styles = [resetStyles, inputVisuallyHiddenStyles, radioStyles, radioCardStyles]
  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean }) disabled = false
  // shadow 안에서만 쓰는 label 연결용 id라 컴포넌트의 id와 섞지 않는다.
  private inputId = uniqueId('radio-card')

  render() {
    return html`
      ${renderRadioInput(
        this,
        this.inputId,
        html`
          <slot></slot>
        `,
      )}
    `
  }
}
