import { css, unsafeCSS } from 'lit'

import { tagToneStyles, type TagTone } from '@/components/common/tag/tag.styles'

/** 점이 갖는 크기 단계. 점을 조합하는 컴포넌트도 이 안에서만 크기를 고른다. */
export const dotSizes = {
  '16': 'var(--size-16)',
  '12': '12px',
  '8': '8px',
  '6': '6px',
} as const

export type DotSize = keyof typeof dotSizes

export const dotSizeTokens = Object.fromEntries(
  Object.entries(dotSizes).map(([size, value]) => [size, { '--dot-size': value }]),
)

/**
 * 점의 모양과 크기. 점을 그리는 선택자 안에 펼쳐 쓴다.
 * 색은 --dot-background-color 하나로 모이므로, 상태별로 달라질 때도 이 변수에 값을 다시 할당한다.
 */
export const dotStyles = css`
  --dot-size: ${unsafeCSS(dotSizes['8'])};
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

const tagToneColors = Object.fromEntries(
  Object.entries(tagToneStyles).map(([tone, { borderColor }]) => [tone, borderColor]),
) as Record<TagTone, string>

/**
 * 점은 면이 작아 배경 틴트로는 색이 드러나지 않는다. tag의 tone은 테두리로 쓰는 값을 채우고,
 * gray는 tag에 없는 점 전용 tone으로 진한 회색을 채운다.
 */
export const dotToneColors = {
  ...tagToneColors,
  gray: 'var(--background-strong-color)',
}

export type DotTone = keyof typeof dotToneColors

export const dotToneColor = (tone: DotTone) => dotToneColors[tone]

export const dotToneTokens = (tone: DotTone) => ({ '--dot-background-color': dotToneColor(tone) })
