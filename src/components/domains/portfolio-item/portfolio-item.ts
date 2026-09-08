import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { focusRing, interactiveElement, resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/icon-button/semantics/more-button'
import { arrayAttributeConverter, emit } from '@/utils'
import '@/components/common/tag/semantics/accent-tag'
import '@/components/common/thumbnail'
import '@/components/common/text/semantics/heading'
import '@/components/common/text/semantics/paragraph'
import '@/components/common/tag/semantics/keyword-tag-group'

export type PortfolioItemLayout = 'grid' | 'list'

@customElement('mm-portfolio-item')
export class PortfolioItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        width: 100%;
        cursor: pointer;
      }

      article {
        --lift: none;

        display: flex;
        flex-direction: column;
        width: 100%;
        gap: var(--space-3);
        position: relative;
        transform: var(--lift);
        transition: transform var(--transition-duration) var(--transition-easing);
      }

      ${interactiveElement}:hover {
        --lift: var(--interaction-hover-lift);
      }

      ${interactiveElement}:focus-visible {
        ${focusRing}
      }

      .badge,
      .action {
        position: absolute;
        z-index: var(--material-zindex-raised);
      }

      .badge {
        top: calc(var(--space-1) * -1);
        left: calc(var(--space-1) * -1);
      }

      .action {
        top: var(--space-2);
        right: var(--space-2);
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }

      .keyword-tags {
        margin-top: var(--space-2);
      }

      time {
        color: var(--foreground-subtle-color);
        font-size: var(--font-size-12);
        line-height: var(--font-size-12);
      }

      :host([layout='list']) article {
        flex-direction: row;
      }

      :host([layout='list']) mm-thumbnail {
        width: 156px;
        flex: none;
      }
    `,
  ]

  @property({ type: String, reflect: true }) layout: PortfolioItemLayout = 'grid'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) src = ''
  @property({ type: String }) alt = ''
  @property({ type: String }) badge = ''
  @property({ type: String }) modal = ''
  @property({ type: String }) datetime = ''
  @property({
    attribute: 'keywords',
    converter: arrayAttributeConverter<string>(),
  })
  keywords: string[] = []

  render() {
    return html`
      <article
        role=${this.modal ? 'button' : 'article'}
        tabindex=${this.modal ? '0' : '-1'}
        @click=${this.handleCardClick}
        @keydown=${this.handleKeyDown}
      >
        ${this.renderBadge()}
        <mm-more-button class="action"></mm-more-button>
        ${this.renderThumbnail()}
        <div class="content">
          ${this.renderHeading()} ${this.renderDescription()} ${this.renderDatetime()}
          ${this.renderKeywords()}
          <slot></slot>
        </div>
      </article>
    `
  }

  private renderBadge() {
    if (!this.badge) return nothing

    return html`
      <mm-accent-tag class="badge">${this.badge}</mm-accent-tag>
    `
  }

  private renderThumbnail() {
    if (!this.src) return nothing

    return html`
      <mm-thumbnail src=${this.src} alt=${this.alt}></mm-thumbnail>
    `
  }

  private renderHeading() {
    if (!this.label) return nothing

    return html`
      <mm-heading level="3">${this.label}</mm-heading>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-paragraph>${this.description}</mm-paragraph>
    `
  }

  private renderDatetime() {
    if (!this.datetime) return nothing

    return html`
      <time hidden datetime=${this.datetime}>${this.formattedDatetime}</time>
    `
  }

  private renderKeywords() {
    if (!this.keywords.length) return nothing

    return html`
      <mm-keyword-tag-group class="keyword-tags" .keywords=${this.keywords}></mm-keyword-tag-group>
    `
  }

  private handleCardClick() {
    if (!this.modal) return

    emit(this, 'portfolio-item-open', { modal: this.modal })
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    this.handleCardClick()
  }

  private get formattedDatetime() {
    if (!this.datetime) return ''
    return this.datetime.replaceAll('-', '. ')
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-portfolio-item': PortfolioItem
  }
}
