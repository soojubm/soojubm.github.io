import { css } from 'lit'

import { interactiveRowStyles } from '@/components/common/list-item/list-item.styles'
import { interactiveElement } from '@/stylesheets/shared.styles'

export const menuItemStyles = [
  interactiveRowStyles,
  css`
    /* tone=danger: color를 행에 지정하면 list-item 내부 텍스트·아이콘이 상속받는다 */
    :host([tone='danger']) ${interactiveElement} {
      color: var(--danger-color);
    }
  `,
]
