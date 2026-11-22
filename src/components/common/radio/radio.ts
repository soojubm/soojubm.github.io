import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { ComponentSize } from '@/stylesheets/shared.types'

import { inputVisuallyHiddenStyles } from '@/components/common/input/input.styles'
import { radioStyles } from '@/components/common/radio/radio.styles'
import { renderRadioInput } from '@/components/common/radio/radio.utils'
import { resetStyles } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'
import '@/components/common/text/semantics/paragraph'

export type RadioSize = Extract<ComponentSize, 'medium' | 'large'>

@customElement('mm-radio')
export class Radio extends LitElement {
  static styles = [resetStyles, inputVisuallyHiddenStyles, radioStyles]
  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: String, reflect: true }) size: RadioSize = 'medium'
  @property({ type: Boolean }) checked = false
  @property({ type: Boolean }) disabled = false
  // shadow 안에서만 쓰는 label 연결용 id라 컴포넌트의 id와 섞지 않는다.
  private inputId = uniqueId('radio')

  render() {
    return html`
      <div>
        ${renderRadioInput(
          this,
          this.inputId,
          html`
            <mm-paragraph><slot></slot></mm-paragraph>
          `,
        )}
      </div>
    `
  }
}
