import { css } from 'lit'

import { tagToneStyles, type TagTone } from '@/components/common/tag/tag.styles'

/**
 * 점의 모양과 크기. 점을 그리는 선택자 안에 펼쳐 쓴다.
 * 색은 --dot-background-color 하나로 모이므로, 상태별로 달라질 때도 이 변수에 값을 다시 할당한다.
 */
export const dotStyles = css`
  --dot-size: 8px;
  --dot-background-color: var(--foreground-subtle-color);

  display: inline-block;
  flex-shrink: 0;
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  background-color: var(--dot-background-color);
`

/**
 * 가로로 늘어선 항목에서 현재 위치를 가리키는 점을 항목 아래 가운데에 띄운다. 점 선택자 안에 펼쳐 쓴다.
 * 흐름 밖에 두어 현재 항목만 높이가 달라지지 않게 하며, 항목이 position 기준이 된다.
 */
export const dotBelowStyles = css`
  position: absolute;
  top: 100%;
  left: 50%;
  translate: -50% 0;
`

/** 점은 면이 작아 배경 틴트로는 색이 드러나지 않는다. tone이 테두리로 쓰는 값을 채운다. */
export const dotToneColor = (tone: TagTone) => tagToneStyles[tone].borderColor

export const dotToneTokens = (tone: TagTone) => ({ '--dot-background-color': dotToneColor(tone) })
