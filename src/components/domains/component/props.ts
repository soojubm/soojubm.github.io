import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { state } from 'lit/decorators/state.js'
import '../../button/semantics/read-more-button'
import { componentPropsStyles, propStyles } from './props.styles'

/**
 * 1. 자식 컴포넌트: <mm-prop>
 * 개별 dt와 dd 태그 및 스타일을 완전히 책임집니다.
 */
@customElement('mm-prop')
export class Prop extends LitElement {
  @property({ type: String }) name = ''
  @property({ type: String }) type = ''
  @property({ type: Boolean }) optional = false

  static styles = propStyles

  render() {
    return html`
      <dt>
        ${this.name}${this.optional
          ? html`
              <attr>?</attr>
            `
          : null}
      </dt>
      <dd>${this.type}</dd>
    `
  }
}

/**
 * 2. 부모 컴포넌트: <mm-component-props>
 * 전체 레이아웃 외곽 틀과 <dl> 그리드 구조만 책임집니다.
 */
@customElement('mm-component-props')
export class ComponentProps extends LitElement {
  // 💡 1. 컴포넌트 내부에서만 사용할 '열림 상태' 변수를 정의합니다.
  @state() private _isOpened = false

  static styles = componentPropsStyles

  // 💡 3. 클릭되었을 때 상태를 true로 바꾸는 핸들러 함수
  private _handleClick() {
    this._isOpened = true
    // 만약 클릭할 때마다 열고 닫히는 '토글'을 원하시면 아래처럼 작성하세요.
    // this._isOpened = !this._isOpened;
  }

  render() {
    return html`
      <section
        class="component-props ${this._isOpened ? 'is-opened' : ''}"
        @click=${this._handleClick}
      >
        <div hidden><mm-text as="h2">Props</mm-text></div>
        <dl>
          <slot></slot>
        </dl>
        <div class="component-props-more" aria-hidden=${this._isOpened ? 'true' : 'false'}>
          <mm-read-more-button more-label="...펼쳐서 더보기"></mm-read-more-button>
        </div>
      </section>
    `
  }
}

// // 타입 확장 등록
// declare global {
//   interface HTMLElementTagNameMap {
//     'mm-component-props': MmComponentProps
//     'mm-prop': MmProp
//   }
// }
