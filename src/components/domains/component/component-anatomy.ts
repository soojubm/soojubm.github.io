import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'
import '@/components/common/code/code'
import '@/components/common/text/semantics/heading'
import '@/components/common/text/semantics/text-list'
import '@/components/indicators/list-marker/list-marker'
import { resetStyles } from '@/stylesheets/shared.styles'

export type AnatomyMarkerPlacement = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

export interface AnatomyMarkerData {
  /** 마커가 붙는 무대의 변. */
  placement: AnatomyMarkerPlacement
  /** 그 변을 따라가는 위치. block-*는 왼쪽부터, inline-*는 위쪽부터의 좌표. 기본은 가운데. */
  offset?: string
  /** 무대 바깥 여백이 아니라 안쪽 가장자리에 앉힌다. 시연 대상 위를 가리킬 때 사용. */
  inset?: boolean
}

/**
 * 컴포넌트 해부도(Anatomy) 섹션.
 * 슬롯에 시연 대상을 넣고, code에 조립 마크업을 넘기면 제목 바로 아래에 코드 블록으로 보여줍니다.
 * parts 배열을 넘기면 번호 매긴 구성요소 범례를 덧붙이고, markers에 같은 순서로 위치를 넘기면
 * 무대 위에 그 번호를 찍습니다. 번호는 배열 순서에서 나오므로 범례와 어긋날 수 없습니다.
 * 나눌 구성요소가 없는 단일 요소 컴포넌트는 parts 없이 시연과 코드만 전시합니다.
 *
 * code의 바인딩 표현식 안에 `/`나 `>`가 들어가면 하이라이터가 여는 태그를 못 읽고 색을 잃으므로,
 * 데이터와 핸들러는 값을 펼치지 말고 이름으로 참조합니다.
 *
 * <mm-component-anatomy
 *   .parts=${["컨테이너", "옵션 버튼", "선택 인디케이터"]}
 *   .markers=${[{ placement: 'inline-start' }, { placement: 'block-end', offset: '25%' }]}
 *   .code=${'<mm-select> … </mm-select>'}
 * >
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

      /* 프레임은 가장자리까지 흘리고, 코드와 시연은 그 안에서 같은 폭의
         measure로 묶여 가운데로 모인다. 둘 다 measure의 시작점에서 뻗으므로
         폭이 달라도 시작점은 나란히 맞는다. */
      .measure {
        display: flex;
        flex-direction: column;
        align-items: start;
        max-width: var(--layout-width-small);
      }

      /* 시연 대상 없이 코드만 전시할 때는 빈 무대 프레임을 걷어낸다. */
      :host(:empty) .component-content-frame:has(.stage) {
        display: none;
      }

      /* 슬롯된 시연 대상과 번호 마커가 함께 앉는 무대. */
      .stage {
        width: var(--component-anatomy-stage-width);
        padding: var(--component-anatomy-stage-padding);
        position: relative;
      }

      /* 마커는 무대의 한 변을 기준으로 앉는다. 변 바깥으로 나가는 거리는
         마커 지름과 무대와의 간격의 합이고, inset이면 변 위로 들어온다. */
      mm-list-marker {
        --component-anatomy-marker-gutter: calc((var(--size-16) + var(--space-3)) * -1);

        margin-top: 0;
        position: absolute;
      }

      mm-list-marker[inset] {
        --component-anatomy-marker-gutter: 0px;
      }

      mm-list-marker[placement='inline-start'],
      mm-list-marker[placement='inline-end'] {
        top: var(--component-anatomy-marker-offset);
        transform: translateY(-50%);
      }

      mm-list-marker[placement='block-start'],
      mm-list-marker[placement='block-end'] {
        left: var(--component-anatomy-marker-offset);
        transform: translateX(-50%);
      }

      mm-list-marker[placement='inline-start'] {
        left: var(--component-anatomy-marker-gutter);
      }

      mm-list-marker[placement='inline-end'] {
        right: var(--component-anatomy-marker-gutter);
      }

      mm-list-marker[placement='block-start'] {
        top: var(--component-anatomy-marker-gutter);
      }

      mm-list-marker[placement='block-end'] {
        bottom: var(--component-anatomy-marker-gutter);
      }
    `,
  ]

  @property({ type: String }) heading = 'Anatomy'
  @property({ attribute: false }) parts: string[] = []
  @property({ attribute: false }) markers: AnatomyMarkerData[] = []
  @property({ type: String }) code = ''

  render() {
    return html`
      <mm-heading level="2">${this.heading}</mm-heading>
      ${this.renderCode()}
      <div class="component-content-frame">
        <div class="measure">
          <div class="stage">
            <slot></slot>
            ${this.renderMarkers()}
          </div>
        </div>
      </div>
      ${this.renderParts()}
    `
  }

  private renderMarkers() {
    return this.markers.map(
      (marker, index) => html`
        <mm-list-marker
          variant="number"
          value=${index + 1}
          placement=${marker.placement}
          ?inset=${marker.inset}
          style=${styleMap({ '--component-anatomy-marker-offset': marker.offset ?? '50%' })}
        ></mm-list-marker>
      `,
    )
  }

  private renderParts() {
    if (!this.parts.length) return nothing

    return html`
      <mm-text-list variant="number" .texts=${this.parts}></mm-text-list>
    `
  }

  private renderCode() {
    if (!this.code) return nothing

    return html`
      <div class="component-content-frame">
        <div class="measure"><mm-code .code=${this.code}></mm-code></div>
      </div>
    `
  }
}
