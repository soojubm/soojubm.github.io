import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { DotTone } from '@/components/common/dot/dot.styles'

import '@/components/common/dot/dot'
import '@/components/common/text/text'

export const progressDotToneMap = {
  todo: 'default',
  'in-progress': 'blue',
  done: 'green',
  blocked: 'red',
} as const satisfies Record<string, DotTone>

export type ProgressDotVariant = keyof typeof progressDotToneMap

@customElement('mm-progress-dot')
export class ProgressDot extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      white-space: nowrap;
    }
  `
  @property({ type: String, reflect: true, useDefault: true }) variant: ProgressDotVariant = 'todo'

  render() {
    return html`
      <mm-dot tone=${progressDotToneMap[this.variant]}></mm-dot>
      <mm-text size="12">
        <slot>${this.variant}</slot>
      </mm-text>
    `
  }
}
