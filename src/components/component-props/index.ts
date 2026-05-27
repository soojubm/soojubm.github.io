import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * 1. 자식 컴포넌트: <mm-prop>
 * 개별 dt와 dd 태그 및 스타일을 완전히 책임집니다.
 */
@customElement('mm-prop')
export class Prop extends LitElement {
  @property({ type: String }) name = ''
  @property({ type: String }) type = ''

  static styles = css`
    :host {
      /* 💡 핵심: 자신(껍데기)을 레이아웃에서 숨겨, 
         자식인 dt와 dd가 부모 <dl>의 Grid 서브트랙에 바로 참여하게 만듭니다. */
      display: contents;
    }
    dt {
      font-weight: 600;
      color: #0f172a;
    }
    dd {
      color: #64748b;
    }
  `

  render() {
    return html`
      <dt>${this.name}</dt>
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
  static styles = css`
    :host {
    }
    .component-props {
    }
    dl {
      display: grid;
      /* 자식들이 보낸 dt, dd가 순서대로 2열 격자로 배치됩니다 */
      grid-template-columns: max-content 1fr;
      gap: 12px 24px;
    }
  `

  render() {
    return html`
      <section class="component-props">
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
