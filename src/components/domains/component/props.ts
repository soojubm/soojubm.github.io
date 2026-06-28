import { LitElement, html } from 'lit'
import { state } from 'lit/decorators/state.js'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

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

  // 💡 1. 컴포넌트 내부에서만 사용할 '열림 상태' 변수를 정의합니다.
  @state() private isOpened = false

  private readonly propsId = uniqueId('component-props')

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
        <dl id=${this.propsId}>
          <slot></slot>
        </dl>
        <div
          class="component-props-more component-content-responsive-padding-inline"
          aria-hidden=${this.isOpened ? 'true' : 'false'}
        >
          <mm-read-more-button
            more-label="...펼쳐서 더보기"
            aria-controls=${this.propsId}
            aria-expanded=${this.isOpened ? 'true' : 'false'}
          ></mm-read-more-button>
        </div>
      </section>
    `
  }

  // 💡 3. 클릭되었을 때 상태를 true로 바꾸는 핸들러 함수
  private handleClick() {
    this.isOpened = true
    // 만약 클릭할 때마다 열고 닫히는 '토글'을 원하시면 아래처럼 작성하세요.
    // this.isOpened = !this.isOpened;
  }
}

// // 타입 확장 등록
// declare global {
//   interface HTMLElementTagNameMap {
//     'mm-component-props': MmComponentProps
//     'mm-prop': MmProp
//   }
// }
