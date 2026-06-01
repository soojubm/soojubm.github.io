import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

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
        display: block;
        margin-top: 4rem;
      }

      .stage {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-4);
        flex-wrap: wrap;
        padding: 3rem 2rem;
        margin-top: var(--space-3);
        border: var(--border-stronger);
        border-radius: var(--radius-large);
        background: var(--color-background-subtle);
      }

      ol {
        list-style: none;
        margin: var(--space-4) 0 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      li {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        font-size: var(--font-size-14);
        color: var(--color-foreground);
      }

      .marker {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        flex-shrink: 0;
        border-radius: var(--radius-round);
        background: var(--color-foreground);
        color: var(--color-background);
        font-size: var(--font-size-12);
        font-weight: var(--font-weight-bold);
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
        ? html`
            <ol>
              ${this.parts.map(
                (part, i) => html`
                  <li>
                    <span class="marker">${i + 1}</span>
                    <span>${part}</span>
                  </li>
                `,
              )}
            </ol>
          `
        : nothing}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-component-anatomy': ComponentAnatomy
  }
}
