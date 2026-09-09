import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/common/button/semantics/read-more-button'
import '@/components/domains/component/component-prop-item'
import { componentPropsStyles } from '@/components/domains/component/component.styles'
import { uniqueId } from '@/utils'
import '@/components/common/text'

export interface ComponentPropItemData {
  name: string
  type: string
  kind?: 'event'
  optional?: boolean
}

/**
 * 컴포넌트 prop 목록. 전체 레이아웃 외곽 틀을 책임지고
 * 각 prop은 mm-component-prop-item으로 렌더합니다.
 * 접힌 상태에서 아무 곳이나 누르면 펼쳐지며, 펼침 여부는 open으로 드러납니다.
 */
@customElement('mm-component-props')
export class ComponentProps extends LitElement {
  static styles = componentPropsStyles

  @property({ attribute: false }) props: ComponentPropItemData[] = []

  @property({ type: Boolean, reflect: true }) open = false

  private readonly propsId = uniqueId('component-props')

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

  private handleClick() {
    this.open = true
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-component-props': ComponentProps
  }
}
