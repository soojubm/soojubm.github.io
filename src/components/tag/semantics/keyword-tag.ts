import { customElement } from 'lit/decorators.js'
import { Tag } from '../tag'

@customElement('mm-keyword-tag')
export class KeywordTag extends Tag {
  static styles = Tag.styles
}

export default KeywordTag
