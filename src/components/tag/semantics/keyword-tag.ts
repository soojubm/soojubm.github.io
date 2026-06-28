import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import { renderTag } from '@/components/tag/tag'

@customElement('mm-keyword-tag')
export class KeywordTag extends LitElement {
  @property({ type: String }) icon?: IconName

  render() {
    return renderTag('default', undefined, this.icon)
  }
}

export default KeywordTag
