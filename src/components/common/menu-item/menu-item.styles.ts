import { css } from 'lit'

import { listItemInteractiveStyles } from '@/components/common/list-item/list-item.styles'

/** 눌리는 명령 행의 스킨. 선언만 담으므로 사용하는 컴포넌트가 자기 행 선택자 안에 펼친다. */
export const menuItemStyles = css`
  ${listItemInteractiveStyles}

  /* destructive: color를 행에 지정하면 list-item 내부 텍스트·아이콘이 상속받는다 */
  :host([destructive]) & {
    color: var(--foreground-danger-color);
  }
`
