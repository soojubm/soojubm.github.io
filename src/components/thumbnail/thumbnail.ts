import { LitElement, html, css, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import '@/components/text/semantics/caption'
import { focusRing } from '@/stylesheets/shared/focus-ring.styles'

@customElement('mm-thumbnail')
export class Thumbnail extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      --thumbnail-border-radius: var(--radius);
      --thumbnail-border: var(--border);
      --thumbnail-background-color-empty: var(--color-background-subtle);
    }

    figure {
      display: block;
      width: 100%;
      padding: 0;
      margin: 0;
    }

    :is(a, button).interactive {
      cursor: pointer;
      transition: all 0.3s ease-in-out;
    }
    :is(a, button).interactive:hover {
      transform: scale(1.03);
    }
    :is(a, button, div):focus-visible {
      ${focusRing}
    }

    .image-wrapper {
      display: block;
      position: relative;
      width: 100%;
      aspect-ratio: 16 / 9;
      background-color: var(--thumbnail-background-color-empty);
    }

    :host([ratio='1:1']) .image-wrapper {
      aspect-ratio: 1 / 1;
    }

    :host([ratio='4:3']) .image-wrapper {
      aspect-ratio: 4 / 3;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    :is(a, button, div) {
      display: block;
      width: 100%;
      padding: 0;
      border: var(--thumbnail-border, none);
      background: none;
      overflow: hidden;
      border-radius: var(--thumbnail-border-radius);
      text-decoration: none;
      color: inherit;
    }

    mm-caption {
      display: block;
      margin-top: var(--space-2, 8px);
    }
  `

  @property({ type: String }) src = ''
  @property({ type: String }) alt = ''
  @property({ type: String, reflect: true }) ratio: '1:1' | '16:9' | '4:3' = '16:9'
  @property({ type: String }) loading: 'eager' | 'lazy' = 'lazy'
  @property({ type: String, attribute: 'fetchpriority' }) fetchPriority: 'high' | 'low' | 'auto' =
    'auto'

  @property({ type: String }) href = ''
  @property({ type: Boolean }) clickable = false
  @property({ type: String }) caption = ''

  @state() private hasError = false
  private fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E"

  render() {
    return html`
      <figure>${this.renderMedia()} ${this.renderCaption()}</figure>
    `
  }

  private renderMedia() {
    if (this.href) {
      return html`
        <a href=${this.href} class="interactive">${this.renderImage()}</a>
      `
    }

    if (this.clickable) {
      return html`
        <button type="button" class="interactive">${this.renderImage()}</button>
      `
    }

    return html`
      ${this.renderImage()}
    `
  }

  private renderImage() {
    const displaySrc = this.hasError ? this.fallbackImage : this.src || this.fallbackImage

    return html`
      <span class="image-wrapper">
        <img
          src=${displaySrc}
          alt=${this.alt}
          loading=${this.loading}
          decoding="async"
          fetchpriority=${this.fetchPriority}
          @error=${this.handleImageError}
        />
      </span>
    `
  }

  private renderCaption() {
    if (!this.caption) return nothing

    return html`
      <mm-caption as="figcaption">${this.caption}</mm-caption>
    `
  }

  private handleImageError() {
    this.hasError = true
  }
}
