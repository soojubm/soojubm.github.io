import { LitElement, html } from 'lit'
import { state } from 'lit/decorators/state.js'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/common/button/semantics/read-more-button'
import {
  componentPropItemStyles,
  componentPropsStyles,
} from '@/components/domains/component/component-props.styles'
import { arrayAttributeConverter } from '@/utils/property-converters'
import { uniqueId } from '@/utils/unique-id'

export interface ComponentPropItemData {
  name: string
  type: string
  kind?: 'event'
  optional?: boolean
}

/**
 * 1. 자식 컴포넌트: <mm-component-prop-item>
 * mm-meta-item으로 name/type을 표시합니다.
 */
@customElement('mm-component-prop-item')
export class ComponentPropItem extends LitElement {
  static styles = componentPropItemStyles

  @property({ type: String }) name = ''
  @property({ type: String }) type = ''
  @property({ type: Boolean }) optional = false

  render() {
    return html`
      <mm-meta-item layout="stacked" label=${this.formatLabel()} value=${this.type}></mm-meta-item>
    `
  }

  private formatLabel() {
    return `${this.name}${this.optional ? '?' : ''}`
  }
}

/**
 * 2. 부모 컴포넌트: <mm-component-props>
 * 전체 레이아웃 외곽 틀만 책임집니다.
 */
@customElement('mm-component-props')
export class ComponentProps extends LitElement {
  static styles = componentPropsStyles

  @state() private isOpened = false

  private readonly propsId = uniqueId('component-props')

  @property({
    attribute: 'props',
    converter: arrayAttributeConverter<ComponentPropItemData>(),
  })
  props: ComponentPropItemData[] = []

  render() {
    return html`
      <section
        class=${classMap({
          'component-props': true,
          'component-content-frame': true,
          'is-opened': this.isOpened,
        })}
        @click=${this.handleClick}
      >
        <div hidden><mm-text as="h2">Props</mm-text></div>
        <div id=${this.propsId}>${this.props.map(prop => this.renderPropItem(prop))}</div>
        <div class="component-props-more" aria-hidden=${this.isOpened ? 'true' : 'false'}>
          <mm-read-more-button
            more-label="...펼쳐서 더보기"
            aria-controls=${this.propsId}
            aria-expanded=${this.isOpened ? 'true' : 'false'}
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
    this.isOpened = true
  }
}
