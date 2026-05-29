import { customElement, property } from 'lit/decorators.js'
import { Tag } from './tag'
import type { TagTone } from './tag.styles'

@customElement('mm-accent-tag')
export class AccentTag extends Tag {
  @property({ type: String }) override tone: TagTone = 'blue'
}

export default AccentTag
