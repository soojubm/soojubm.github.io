import { LitElement, html } from 'lit'
import { state } from 'lit/decorators/state.js'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import '@/components/button/semantics/read-more-button'
import { componentPropsStyles, propStyles } from '@/components/domains/component/props.styles'
import { uniqueId } from '@/utils/unique-id'

/**
 * 1. 자식 컴포넌트: <mm-prop>
 * 개별 dt와 dd 태그 및 스타일을 완전히 책임집니다.
 */
@customElement('mm-prop')
export class Prop extends LitElement {
  static styles = propStyles

  @property({ type: String }) name = ''
  @property({ type: String }) type = ''
  @property({ type: Boolean }) optional = false

  render() {
    return html`
      <dt>${this.name}${this.renderOptionalMarker()}</dt>
      <dd>${this.type}</dd>
    `
  }

  private renderOptionalMarker() {
    if (!this.optional) return null

    return html`
      <attr>?</attr>
    `
  }
}

/**
 * 2. 부모 컴포넌트: <mm-component-props>
 * 전체 레이아웃 외곽 틀과 <dl> 그리드 구조만 책임집니다.
 */
@customElement('mm-component-props')
export class ComponentProps extends LitElement {
  static styles = componentPropsStyles

  @state() private isOpened = false

  private readonly propsId = uniqueId('component-props')

  render() {
    return html`
      <section
        class="component-props"
        data-opened=${ifDefined(this.isOpened ? 'true' : undefined)}
        @click=${this.handleClick}
      >
        <div hidden><mm-text as="h2">Props</mm-text></div>
        <dl id=${this.propsId}>
          <slot></slot>
        </dl>
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

  private handleClick() {
    this.isOpened = true
  }
}
