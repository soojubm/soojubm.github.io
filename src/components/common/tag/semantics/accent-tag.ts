import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'

import '@/components/common/tag/tag'
import { renderTag } from '@/components/common/tag/tag.utils'

/** 항목 하나를 다른 항목과 구분 짓는 강조 라벨. 강조색은 gold 하나로 고정한다. */
@customElement('mm-accent-tag')
export class AccentTag extends LitElement {
  @property({ type: String }) icon?: IconName

  render() {
    return renderTag('gold', this.icon)
  }
}
