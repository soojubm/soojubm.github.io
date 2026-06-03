import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import '../../text/semantics/textList'

/**
 * 컴포넌트 해부도(Anatomy) 섹션.
 * 슬롯에 시연 대상을 넣고, parts 배열로 번호 매긴 구성요소 범례를 표시합니다.
 *
 * <mm-component-anatomy parts='["컨테이너", "옵션 버튼", "선택 인디케이터"]'>
 *   < 시연 마크업 />
 * </mm-component-anatomy>
 */
@customElement('mm-component-anatomy')
export class ComponentAnatomy extends LitElement {
  @property({ type: String }) title = 'Anatomy'
  @property({
    type: Array,
    converter: value => {
      try {
        return JSON.parse(value || '[]')
      } catch {
        return []
      }
    },
  })
  parts: string[] = []

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-top: 4rem;
      }
      .stage {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-4);
        flex-wrap: wrap;
        padding: 3rem 2rem;
        border: var(--border-stronger);
        border-radius: var(--radius-large);
        background: var(--color-background-subtle);
      }
      .stage slot {
        display: block;
        position: relative;
      }
    `,
  ]

  render() {
    return html`
      <mm-text size="24" weight="bold" as="h3">${this.title}</mm-text>
      <div class="stage">
        <slot></slot>
      </div>
      ${this.parts.length
        ? html`<mm-text-list variant="number" texts=${JSON.stringify(this.parts)}></mm-text-list>`
        : nothing}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-component-anatomy': ComponentAnatomy
  }
}
