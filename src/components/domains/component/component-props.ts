import { LitElement, type PropertyValues, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/common'
import '@/components/domains/component/component-prop-item'
import { componentPropsStyles } from '@/components/domains/component/component.styles'
import { uniqueId } from '@/utils'

export interface ComponentPropItemData {
  name: string
  type: string
  kind?: 'event'
  optional?: boolean
}

/**
 * 문자열 union prop의 문서 표기('a' | 'b' = 'a')를 만든다.
 * 값을 prop 타입의 Record 키로 받아, 타입과 어긋나면(값이 빠지거나 남으면) 컴파일 에러가 난다.
 * 정수처럼 보이는 키('80' 등)는 객체 규칙에 따라 오름차순으로 나열된다.
 */
export const unionTypeLabel = <Value extends string>(
  values: Record<Value, true>,
  defaultValue?: Value,
) => {
  const quoted = Object.keys(values).map(value => `'${value}'`)
  const union = quoted.join(' | ')
  if (defaultValue === undefined) return union
  return `${union} = '${defaultValue}'`
}

// 이보다 적은 prop은 접어도 가릴 내용이 없어 처음부터 펼쳐 둔다.
const COLLAPSIBLE_PROP_COUNT = 3

/**
 * 컴포넌트 prop 목록. 전체 레이아웃 외곽 틀을 책임지고
 * 각 prop은 mm-component-prop-item으로 렌더합니다.
 * 접힌 상태에서 아무 곳이나 누르면 펼쳐지며, 펼침 여부는 open으로 드러납니다.
 * prop이 3개 미만이면 처음부터 펼쳐져 더보기 버튼을 노출하지 않습니다.
 */
@customElement('mm-component-props')
export class ComponentProps extends LitElement {
  static styles = componentPropsStyles
  @property({ attribute: false }) props: ComponentPropItemData[] = []
  @property({ type: Boolean, reflect: true }) open = false
  private readonly propsId = uniqueId('component-props')

  willUpdate(changed: PropertyValues<this>) {
    if (!changed.has('props')) return
    this.open = this.props.length < COLLAPSIBLE_PROP_COUNT
  }

  /* eslint-disable lit-a11y/click-events-have-key-events -- 키보드로 펼치는 경로는 안쪽
     mm-read-more-button이 갖고, 그 click이 올라와 이 핸들러에 닿는다. section의 click은
     포인터 전용 단축이라 section 자체를 포커스 대상으로 만들지 않는다. */
  render() {
    return html`
      <section class="component-props component-content-frame" @click=${this.handleClick}>
        <div hidden><mm-text as="h2">Props</mm-text></div>
        <div class="component-props-list" id=${this.propsId}>
          ${this.props.map(prop => this.renderPropItem(prop))}
        </div>
        <div class="component-props-more" aria-hidden=${this.open}>
          <mm-read-more-button
            more-label="...펼쳐서 더보기"
            aria-controls=${this.propsId}
            aria-expanded=${this.open}
          ></mm-read-more-button>
        </div>
      </section>
    `
  }

  private renderPropItem(prop: ComponentPropItemData) {
    return html`
      <mm-component-prop-item
        name=${prop.name}
        type=${prop.type}
        kind=${ifDefined(prop.kind)}
        ?optional=${prop.optional}
      ></mm-component-prop-item>
    `
  }

  /* eslint-enable lit-a11y/click-events-have-key-events */

  private handleClick() {
    this.open = true
  }
}
