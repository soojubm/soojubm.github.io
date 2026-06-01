import { customElement } from 'lit/decorators.js'
import { Paragraph } from '../../text/semantics/paragraph'

@customElement('mm-textfield-validation')
export class TextfieldValidation extends Paragraph {
  override color = 'var(--color-danger)'
}
