import { css } from 'lit'
import { customElement } from 'lit/decorators.js'
import { Tag } from './tag'

@customElement('mm-keyword-tag')
export class KeywordTag extends Tag {
  static styles = [
    ...Tag.styles,
    css`
      span {
        background: transparent !important;
        border-color: transparent;
      }
    `,
  ]
}

export default KeywordTag
