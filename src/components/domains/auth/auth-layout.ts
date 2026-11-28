import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/text-block'

@customElement('fff-auth-layout')
export class AuthLayout extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      <fff-text-block
        level="2"
        heading=${this.heading}
        description=${this.description}
        ?centered=${this.centered}
      ></fff-text-block>
      <div>
        <slot></slot>
      </div>
    `
  }
}
