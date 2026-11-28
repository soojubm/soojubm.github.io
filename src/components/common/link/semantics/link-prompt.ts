import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'
import '@/components/common/text/semantics/paragraph'
import '@/components/common/link/link'
import '@/components/common/icon'

@customElement('fff-link-prompt')
export class LinkPrompt extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      flex-wrap: wrap;
      align-items: center;
      gap: var(--space-1);
    }

    :host([centered]) {
      justify-content: center;
    }
  `
  @property({ type: String }) icon?: IconName
  @property({ type: String }) message = ''
  @property({ type: String, attribute: 'link-label' }) linkLabel = ''
  @property({ type: String }) href = ''
  @property({ type: Boolean }) external = false
  @property({ type: Boolean, reflect: true }) centered = false

  render() {
    return html`
      ${this.renderIcon()}
      <fff-paragraph>
        ${this.message}
        <fff-link href=${this.href} ?external=${this.external}>${this.linkLabel}</fff-link>
      </fff-paragraph>
    `
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <fff-icon name=${this.icon} aria-hidden="true"></fff-icon>
    `
  }
}
