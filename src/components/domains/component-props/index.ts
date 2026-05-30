import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { state } from 'lit/decorators/state.js'
import { resetStyles } from '../../shared/reset.styles'

/**
 * 1. 자식 컴포넌트: <mm-prop>
 * 개별 dt와 dd 태그 및 스타일을 완전히 책임집니다.
 */
@customElement('mm-prop')
export class Prop extends LitElement {
  @property({ type: String }) name = ''
  @property({ type: String }) type = ''
  @property({ type: Boolean }) optional = false

  static styles = [
    resetStyles,
    css`
      :host {
        /* 💡 핵심: 자신(껍데기)을 레이아웃에서 숨겨,
           자식인 dt와 dd가 부모 <dl>의 Grid 서브트랙에 바로 참여하게 만듭니다. */
        display: contents;
      }
      dt {
        color: var(--color-foreground-light);
        line-height: 20px;
      }
      attr {
        color: var(--color-foreground-light);
        font-weight: var(--font-weight-normal);
        margin-left: 0.125rem;
      }

      dd {
        font-style: normal;
        font-weight: var(--font-weight-normal);
        font-size: var(--font-size-14);
      }
      :host(:not(:first-child)) dt {
        margin-top: var(--space-3);
      }
    `,
  ]

  render() {
    return html`
      <dt>${this.name}${this.optional ? html`<attr>?</attr>` : null}</dt>
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

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
      .component-props {
        height: 12rem;
        overflow: hidden;
        margin: 0 0 0 calc(-5vw + 1rem);
        padding: 1.5rem calc(var(--grid-margin) - 1rem);
        background-color: var(--color-background-subtle);
        /* border-radius: 0 0 var(--radius-large) var(--radius-large); */
        border-radius: var(--radius-large);
        position: relative;
        cursor: pointer;
      }
      .component-props::after {
        content: '...펼쳐서 더보기';
        display: block;
        padding: 0.75rem 2rem 1rem calc(var(--grid-margin) - 1rem);
        font-weight: bold;
        background-color: inherit;
        /* background: linear-gradient(to bottom, rgba(255,255,255,0), var(--color-background-subtle), var(--color-background-subtle)); */
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
      }
      ::slotted(mm-text[size='18']) {
        display: none;
      }
      .component-props.is-opened {
        height: auto;
        cursor: default;
      }
      .component-props.is-opened::after {
        display: none;
      }

      @media (max-width: 1100px) {
        .component-props {
          max-width: 100%;
          margin-inline: calc(var(--grid-margin) * -1);
          padding-inline: var(--grid-margin);
          border-inline: 0;
          border-radius: 0;
        }
        .component-props::after {
          padding-inline: var(--grid-margin);
        }
      }
    `,
  ]

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
        <dl>
          <slot></slot>
        </dl>
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
