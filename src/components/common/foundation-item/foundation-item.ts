import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common/icon/icon-names'

import '@/components/common/avatar/avatar'
import '@/components/common/link/link'
import { surfaceBaseStyles, surfaceFilledStyles } from '@/components/common/surface/surface.styles'
import '@/components/common/text/semantics/text-block'
import { resetStyles } from '@/stylesheets/shared.styles'

export type FoundationItemLink = {
  href: string
  label: string
}

@customElement('mm-foundation-item')
export class FoundationItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .item {
        ${surfaceBaseStyles};
        ${surfaceFilledStyles};
        --surface-height: 100%;
        --surface-border-radius: var(--border-radius-large);

        gap: var(--space-3);
      }

      .title {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-3);
        color: inherit;
      }

      .title:focus-visible {
        outline: var(--interaction-focus-outline);
        outline-offset: 2px;
      }

      ul {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2) var(--space-3);
        margin: 0;
        padding: 0;
        list-style: none;
      }
    `,
  ]
  @property({ type: String }) href = ''
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: String }) icon?: IconName
  @property({ type: Array }) links: FoundationItemLink[] = []

  render() {
    return html`
      <div class="item">
        <a class="title" href=${this.href}>
          ${this.renderIcon()}
          <mm-text-block
            level="3"
            heading=${this.heading}
            description=${this.description}
          ></mm-text-block>
        </a>
        ${this.renderLinks()}
      </div>
    `
  }

  private renderIcon() {
    if (!this.icon) return nothing

    return html`
      <mm-avatar variant="secondary" size="40" icon=${this.icon}></mm-avatar>
    `
  }

  private renderLinks() {
    if (!this.links.length) return nothing

    return html`
      <nav aria-label=${`${this.heading} 탭`}>
        <ul>
          ${this.links.map(
            ({ href, label }) => html`
              <li><mm-link href=${href}>${label}</mm-link></li>
            `,
          )}
        </ul>
      </nav>
    `
  }
}
