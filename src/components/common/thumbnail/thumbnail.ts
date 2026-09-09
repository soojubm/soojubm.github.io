import { LitElement, html, css, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import '@/components/common/text/semantics/caption'
import { focusRing, interactiveElement } from '@/stylesheets/shared.styles'

@customElement('mm-thumbnail')
export class Thumbnail extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      --thumbnail-border: var(--border-transparent);
      --thumbnail-border-radius: var(--radius);
      --thumbnail-background-color-empty: var(--background-subtle-color);
    }

    figure {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      width: 100%;
      padding: 0;
      margin: 0;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    ${interactiveElement}:hover .image-wrapper {
      --thumbnail-border: var(--border);
    }
    /* a:focus-visible {
      ${focusRing}
    } */

    .image-wrapper {
      width: 100%;
      position: relative;
      aspect-ratio: 16 / 9;
      border: var(--thumbnail-border);
      border-radius: var(--thumbnail-border-radius);
      background-color: var(--thumbnail-background-color-empty);
      overflow: hidden;
    }

    :host([ratio='1:1']) .image-wrapper {
      aspect-ratio: 1 / 1;
    }

    :host([ratio='4:3']) .image-wrapper {
      aspect-ratio: 4 / 3;
    }

    :host([ratio='full']) .image-wrapper {
      aspect-ratio: auto;
    }
    :host([ratio='full']) img {
      height: auto;
    }

    a {
      display: block;
      width: 100%;
      padding: 0;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      transition: all var(--transition-duration) var(--transition-easing);
    }
  `

  @property({ type: String }) src = ''
  @property({ type: String }) alt = ''
  @property({ type: String, reflect: true }) ratio: '1:1' | '16:9' | '4:3' | 'full' = '16:9'
  @property({ type: String }) loading: 'eager' | 'lazy' = 'lazy'
  @property({ type: String, attribute: 'fetchpriority' }) fetchPriority: 'high' | 'low' | 'auto' =
    'auto'

  @property({ type: String }) href = ''
  @property({ type: String }) caption = ''

  @state() private hasError = false
  private fallbackImage =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Crect width='300' height='300' fill='%23e0e0e0'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E"

  render() {
    return html`
      <figure>${this.renderImage()} ${this.renderCaption()}</figure>
    `
  }

  private renderImage() {
    const displaySrc = this.hasError ? this.fallbackImage : this.src || this.fallbackImage
    const image = html`
      <div class="image-wrapper">
        <img
          src=${displaySrc}
          alt=${this.alt}
          loading=${this.loading}
          decoding="async"
          fetchpriority=${this.fetchPriority}
          @error=${this.handleImageError}
        />
      </div>
    `

    if (this.href) {
      return html`
        <a href=${this.href}>${image}</a>
      `
    }

    return image
  }

  private renderCaption() {
    if (!this.caption) return nothing

    // figcaption은 figure의 자식일 때만 캡션으로 매핑된다. mm-caption의 shadow 안쪽에서는
    // 평탄화 트리상 figure의 자손이 되어버리므로, 같은 shadow root에서 직접 세운다.
    return html`
      <figcaption><mm-caption>${this.caption}</mm-caption></figcaption>
    `
  }

  private handleImageError() {
    this.hasError = true
  }
}
