/** 계산된 스타일이 돌려주는 `rgb(...)`/`rgba(...)` 문자열에서 채널 값을 읽는다. */
const channels = (color: string) => (color.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number)

const WEIGHTS = [0.2126, 0.7152, 0.0722]

const relativeLuminance = (color: string) =>
  channels(color)
    .map(channel => channel / 255)
    .map(ratio => (ratio <= 0.03928 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4))
    .reduce((sum, value, index) => sum + value * WEIGHTS[index], 0)

/**
 * 두 색의 WCAG 명도 대비를 `11.7:1` 꼴로 반환한다.
 * 문서에 손으로 적은 수치는 색이 바뀌어도 남으므로, 화면에서 실제로 쓰인 색을 재서 만든다.
 * 계산된 스타일에서 읽은 불투명 색을 넘긴다.
 */
export function contrastRatio(foreground: string, background: string) {
  const [light, dark] = [relativeLuminance(foreground), relativeLuminance(background)].sort(
    (a, b) => b - a,
  )

  return `${((light + 0.05) / (dark + 0.05)).toFixed(1)}:1`
}
