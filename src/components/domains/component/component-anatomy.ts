import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { componentContentFrameStyles } from '@/components/domains/component/component.styles'
import '@/components/common'
import '@/components/indicators/list-marker/list-marker'

export type AnatomyMarkerPlacement = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'

export interface AnatomyMarkerData {
  /** 마커가 붙는 무대의 변. */
  placement: AnatomyMarkerPlacement
  /** 그 변을 따라가는 위치. block-*는 왼쪽부터, inline-*는 위쪽부터의 좌표. 기본은 가운데. */
  offset?: string
  /** 무대 바깥 여백이 아니라 안쪽 가장자리에 앉힌다. 시연 대상 위를 가리킬 때 사용. */
  inset?: boolean
}

@customElement('fff-component-anatomy')
export class ComponentAnatomy extends LitElement {
  static styles = [
    componentContentFrameStyles,
    css`
      :host {
        --component-anatomy-width: fit-content;
        --component-anatomy-padding: 0;

        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        margin-top: var(--space-section);
      }

      /* 시연 대상 없이 코드만 전시할 때는 빈 무대 프레임을 걷어낸다. */
      :host(:empty) fff-example-stage {
        display: none;
      }

      /* 슬롯된 시연 대상과 번호 마커가 함께 앉는 무대. 내용 폭으로 줄어 프레임 안 가운데에 모인다. */
      .stage {
        width: var(--component-anatomy-width);
        max-width: var(--layout-width-small);
        margin-inline: auto;
        padding: var(--component-anatomy-padding);
        box-sizing: border-box;
        position: relative;
      }

      /* 마커는 무대의 한 변을 기준으로 앉는다. 변 바깥으로 나가는 거리는
         마커 지름과 무대와의 간격의 합이고, inset이면 변 위로 들어온다. */
      fff-list-marker {
        --component-anatomy-marker-offset: calc((var(--size-16) + var(--space-3)) * -1);

        position: absolute;
      }

      fff-list-marker[inset] {
        --component-anatomy-marker-offset: 0px;
      }

      fff-list-marker[placement='inline-start'],
      fff-list-marker[placement='inline-end'] {
        top: var(--component-anatomy-marker-offset);
        transform: translateY(-50%);
      }

      fff-list-marker[placement='block-start'],
      fff-list-marker[placement='block-end'] {
        left: var(--component-anatomy-marker-offset);
        transform: translateX(-50%);
      }

      fff-list-marker[placement='inline-start'] {
        left: var(--component-anatomy-marker-offset);
      }

      fff-list-marker[placement='inline-end'] {
        right: var(--component-anatomy-marker-offset);
      }

      fff-list-marker[placement='block-start'] {
        top: var(--component-anatomy-marker-offset);
      }

      fff-list-marker[placement='block-end'] {
        bottom: var(--component-anatomy-marker-offset);
      }
    `,
  ]
  @property({ type: String }) heading = 'Anatomy'
  @property({ attribute: false }) parts: string[] = []
  @property({ attribute: false }) markers: AnatomyMarkerData[] = []
  @property({ type: Boolean, attribute: 'full-width', reflect: true }) fullWidth = false

  render() {
    return html`
      <fff-heading level="2">${this.heading}</fff-heading>
      <fff-example-stage aligned>
        <div class="stage">
          <slot></slot>
          ${this.renderMarkers()}
        </div>
      </fff-example-stage>
      ${this.renderParts()}
    `
  }

  private renderMarkers() {
    return this.markers.map(
      (marker, index) => html`
        <fff-list-marker
          variant="number"
          value=${index + 1}
          placement=${marker.placement}
          ?inset=${marker.inset}
          style=${styleMap({ '--component-anatomy-marker-offset': marker.offset ?? '50%' })}
        ></fff-list-marker>
      `,
    )
  }

  private renderParts() {
    if (!this.parts.length) return nothing

    return html`
      <fff-text-list variant="number" .texts=${this.parts}></fff-text-list>
    `
  }
}
