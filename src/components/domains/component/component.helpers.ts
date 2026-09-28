import { html, type TemplateResult } from 'lit'

/** 문서 문장 안의 컴포넌트명·코드 식별자를 mm-code로 감싼다. */
// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
export const code = (name: string) => html`<mm-code>${name}</mm-code>`

/** 규칙 목록 항목. 해야 할 일을 굵은 한 줄로 먼저 두고 설명을 잇는다. */
export const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
`
