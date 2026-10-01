import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaBoolean, AriaHasPopup, AriaIdRef } from '@/types'

import { focusRingStyles, interactiveElement } from '@/stylesheets/shared.styles'
import '@/components/common'

export type PortfolioItemLayout = 'grid' | 'list'

@customElement('mm-portfolio-item')
export class PortfolioItem extends LitElement {
  static styles = css`
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
      ${focusRingStyles};
    }

    .badge,
    .action {
      position: absolute;
      z-index: var(--material-zindex-elevated);
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
  `
  @property({ type: String, reflect: true }) layout: PortfolioItemLayout = 'grid'
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) src = ''
  @property({ type: String }) alt = ''
  @property({ type: String }) badge = ''
  @property({ type: String }) datetime = ''
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = null
  @property({ type: String, attribute: 'aria-haspopup' }) ariaHasPopup: AriaHasPopup = null
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null
  @property({ attribute: false }) keywords: string[] = []

  render() {
    return html`
      <article
        role=${this.ariaControls ? 'button' : 'article'}
        tabindex=${this.ariaControls ? '0' : '-1'}
        aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
        aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
        aria-controls=${ifDefined(this.ariaControls ?? undefined)}
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

  // 클릭은 호스트까지 올라가 aria-controls가 가리키는 표면이 받는다. 키보드는 네이티브 button처럼 클릭으로 바꿔 보낸다.
  private handleKeyDown(event: KeyboardEvent) {
    if (!this.ariaControls) return
    if (event.key !== 'Enter' && event.key !== ' ') return

    event.preventDefault()
    ;(event.currentTarget as HTMLElement).click()
  }

  private get formattedDatetime() {
    if (!this.datetime) return ''
    return this.datetime.replaceAll('-', '. ')
  }
}
