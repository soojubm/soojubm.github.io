import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { renderTag } from '../tag'

@customElement('mm-keyword-tag')
export class KeywordTag extends LitElement {
  @property({ type: String }) icon = ''

  render() {
    return renderTag('default', undefined, this.icon)
  }
}

export default KeywordTag
