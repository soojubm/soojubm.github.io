import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { TooltipPlacement } from '@/components/overlay/tooltip/tooltip'

import { tooltipBubbleStyles } from '@/components/overlay/tooltip/tooltip.styles'
import '@/components/common'
import { AnchorController } from '@/controllers/anchor-controller'
import { PortalController } from '@/controllers/portal-controller'

@customElement('fff-tooltip-bubble')
export class TooltipBubble extends LitElement {
  static styles = tooltipBubbleStyles
  /** @internal 말풍선을 소유한 fff-tooltip이 채운다. */
  @property({ type: String }) content = ''
  /** @internal 말풍선을 소유한 fff-tooltip이 채운다. */
  @property({ type: String, reflect: true }) placement: TooltipPlacement = 'bottom-start'
  /** @internal 말풍선을 소유한 fff-tooltip이 채운다. */
  @property({ type: Boolean, reflect: true }) open = false
  /** @internal 위치를 재는 기준 요소. 말풍선을 소유한 fff-tooltip이 채운다. */
  @property({ attribute: false }) anchor?: HTMLElement
  private portal = new PortalController(this)
  private anchorPosition = new AnchorController(this, {
    getAnchor: () => this.anchor,
    open: () => this.open,
    variables: {
      left: '--tooltip-bubble-anchor-left',
      right: '--tooltip-bubble-anchor-right',
      bottom: '--tooltip-bubble-anchor-bottom',
    },
  })

  render() {
    return html`
      <fff-text size="12">${this.content}</fff-text>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'tooltip')
  }
}
