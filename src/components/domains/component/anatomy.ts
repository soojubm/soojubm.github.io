import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'
import '@/components/text/semantics/textList'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { arrayAttributeConverter } from '@/utils/property-converters'

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
  static styles = [
    resetStyles,
    componentContentFrameStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-top: var(--space-section);
      }
      .component-content-frame {
        display: flex;
        justify-content: center;
      }
    `,
  ]

  @property({ type: String }) heading = 'Anatomy'
  @property({
    attribute: 'parts',
    converter: arrayAttributeConverter<string>(),
  })
  parts: string[] = []

  render() {
    return html`
      <mm-text size="24" weight="bold" as="h3">${this.heading}</mm-text>
      <div class="component-content-frame">
        <slot></slot>
      </div>
      ${this.renderParts()}
    `
  }

  private renderParts() {
    if (!this.normalizedParts.length) return nothing

    return html`
      <mm-text-list variant="number" .texts=${this.normalizedParts}></mm-text-list>
    `
  }

  private get normalizedParts() {
    return Array.isArray(this.parts) ? this.parts : []
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-component-anatomy': ComponentAnatomy
  }
}
