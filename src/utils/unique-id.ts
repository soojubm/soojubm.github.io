/**
 * prefix 기반 고유 ID를 생성한다.
 * crypto.randomUUID를 우선 쓰고, 미지원 환경에서는 Math.random으로 폴백한다.
 */
export const uniqueId = (prefix: string): string =>
  `${prefix}-${crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)}`
