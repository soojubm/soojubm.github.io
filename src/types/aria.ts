// ARIA 상태 속성은 스펙이 허용하는 토큰만 받도록 좁혀 lit-analyzer 바인딩 검사를 통과시킨다.
export type AriaBoolean = 'true' | 'false' | null
export type AriaTriState = 'true' | 'false' | 'mixed' | null
export type AriaHasPopup = 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | null
export type AriaCurrent = 'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time' | null
export type AriaInvalid = 'true' | 'false' | 'grammar' | 'spelling' | null

// IDREF 계열 속성은 토큰 열거가 아니라 요소 id를 참조하므로 자유 문자열로 둔다.
export type AriaIdRef = string | null
