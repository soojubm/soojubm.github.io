import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'
import '@/components/common/text/semantics/textList'
import { resetStyles } from '@/stylesheets/shared.styles'
import { arrayAttributeConverter } from '@/utils'

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
        --component-anatomy-stage-width: auto;
        --component-anatomy-stage-padding: 0;

        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-top: var(--space-section);
      }
      .component-content-frame {
        display: flex;
        justify-content: center;
      }

      /* 슬롯된 시연 대상과 번호 마커가 함께 앉는 무대.
         마커는 각 시연에 맞춰 직접 배치되므로, 무대는 그 기준이 되는 위치 맥락만 소유한다. */
      .stage {
        width: var(--component-anatomy-stage-width);
        padding: var(--component-anatomy-stage-padding);
        position: relative;
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
        <div class="stage">
          <slot></slot>
        </div>
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
