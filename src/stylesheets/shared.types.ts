import type { spaces } from '@/stylesheets/shared.styles'

export type Space = keyof typeof spaces

/**
 * 이름으로 고르는 컴포넌트 크기 단계. 각 컴포넌트는 지원하는 단계만 Extract로 고르고, 기본 단계도 빈 값이 아니라 이름으로 둔다.
 * 픽셀 값으로 고르는 단계(avatar·text·dot)는 따로 둔다.
 */
export type ComponentSize = 'small' | 'medium' | 'large'

/**
 * 이름으로 고르는 컴포넌트 위계 단계. 각 컴포넌트는 지원하는 단계만 Extract로 고르고, 단계별 스킨은 자기 Tokens로 둔다.
 * 재질을 고르는 surface의 variant는 이 위계가 아니라 따로 둔다.
 */
export type ComponentVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'

/** flex 컨테이너 컴포넌트의 direction prop 값. */
export type FlexDirection = 'row' | 'column'

/** flex 컨테이너 컴포넌트의 wrap prop 값. */
export type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse'

/** flex 컨테이너 컴포넌트(mm-flex·mm-button-group)의 justify-content prop 값. 기본값 flex-start는 각 :host가 선언한다. */
export type JustifyContent = 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'
