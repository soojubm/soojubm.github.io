import { html, type TemplateResult } from 'lit'

import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { OptionItem } from '@/types'

import { ICON_NAMES } from '@/components/common/icon/icon-names'

/** 문서 문장 안의 컴포넌트명·코드 식별자를 fff-code로 감싼다. */
// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
export const code = (name: string) => html`<fff-code>${name}</fff-code>`

/** 여러 식별자를 쉼표로 이어 fff-code로 감싼다. */
// prettier-ignore
export const codeList = (names: string[]) => names.map((name, index) => html`${index ? ', ' : ''}${code(name)}`)

/** 표 칸의 예·아니오 표시. 아이콘만으로는 뜻이 읽히지 않으므로 이름을 함께 단다. */
export const yes = html`
  <span role="img" aria-label="예">
    <fff-icon name=${ICON_NAMES.CHECK} size="small"></fff-icon>
  </span>
`
export const no = html`
  <span role="img" aria-label="아니오">
    <fff-icon name=${ICON_NAMES.CLOSE} size="small"></fff-icon>
  </span>
`

/** withOpenState를 쓰는 표면이 함께 갖는 공개 메서드. 선언에서 읽을 수 없어 문서에 따로 적는다. */
export const openStateMethods: ComponentPropItemData[] = [
  { name: 'show()', type: 'method' },
  { name: 'close()', type: 'method' },
  { name: 'toggle()', type: 'method' },
]

/** flex·grid 미리보기가 고르는 gap 단계. */
export const GAP_OPTIONS: OptionItem[] = [
  { value: '1', label: 'gap 1' },
  { value: '2', label: 'gap 2' },
  { value: '4', label: 'gap 4' },
]
