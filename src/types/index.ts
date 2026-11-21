import type { IconName } from '@/components/common/icon/icon-names'

// ARIA 상태 속성은 스펙이 허용하는 토큰만 받도록 좁혀 lit-analyzer 바인딩 검사를 통과시킨다.
export type AriaBoolean = 'true' | 'false' | null
export type AriaTriState = 'true' | 'false' | 'mixed' | null
export type AriaHasPopup = 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | null
export type AriaCurrent = 'true' | 'false' | 'page' | 'step' | 'location' | 'date' | 'time' | null
export type AriaInvalid = 'true' | 'false' | 'grammar' | 'spelling' | null

// IDREF 계열 속성은 토큰 열거가 아니라 요소 id를 참조하므로 자유 문자열로 둔다.
export type AriaIdRef = string | null

export type ActionConfig = {
  label: string
  onClick?: () => void
  disabled?: boolean
}

// 옵션 배열을 받는 선택 UI(radio-group·toggle-button-group·filter-button-group)가 공유하는 옵션 모양.
export type OptionItem = {
  value: string
  label: string
  icon?: IconName
  disabled?: boolean
}

// 메뉴 행으로 렌더되는 선택 그룹(menu-item-radio-group·menu-item-checkbox-group)의 옵션 모양.
// 행에 보조 설명이나 이모지가 붙으므로 OptionItem에 교차 타입으로 더한다.
export type MenuOptionItem = OptionItem & {
  description?: string
  emoji?: string
}
