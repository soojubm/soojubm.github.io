import { LitElement, html, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { listMarkerStyles } from '@/components/indicators/list-marker/list-marker.styles'

type Variant = 'number' | 'check'

@customElement('mm-list-marker')
export class ListMarker extends LitElement {
  static styles = listMarkerStyles
  @property({ type: String }) variant: Variant = 'number'
  @property({ type: Number }) value = 1

  render() {
    if (this.variant === 'check') return this.renderCheck()
    return html`
      ${this.value}
    `
  }

  private renderCheck() {
    return svg`
      <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.5 5L4 7.5L8.5 2.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `
  }
}
