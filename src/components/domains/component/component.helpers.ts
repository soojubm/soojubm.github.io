import { html, type TemplateResult } from 'lit'

import type { ComponentPropItemData } from '@/components/domains/component/component-props'

/** 문서 문장 안의 컴포넌트명·코드 식별자를 mm-code로 감싼다. */
// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
export const code = (name: string) => html`<mm-code>${name}</mm-code>`

/** 여러 식별자를 쉼표로 이어 mm-code로 감싼다. */
// prettier-ignore
export const codeList = (names: string[]) => names.map((name, index) => html`${index ? ', ' : ''}${code(name)}`)

/** 규칙 목록 항목. 해야 할 일을 굵은 한 줄로 먼저 두고 설명을 잇는다. */
export const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
`

/** 표 칸의 예·아니오 표시. 이모지만으로는 뜻이 읽히지 않으므로 이름을 함께 단다. */
export const yes = html`
  <span role="img" aria-label="예">✅</span>
`
export const no = html`
  <span role="img" aria-label="아니오">❌</span>
`

/** withOpenState를 쓰는 표면이 함께 갖는 공개 메서드. 선언에서 읽을 수 없어 문서에 따로 적는다. */
export const openStateMethods: ComponentPropItemData[] = [
  { name: 'show()', type: 'method' },
  { name: 'close()', type: 'method' },
  { name: 'toggle()', type: 'method' },
]
