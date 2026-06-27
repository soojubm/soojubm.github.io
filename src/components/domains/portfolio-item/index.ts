import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/icon-button/semantics/more-button'
import '@/components/flex/flex'
import { emit } from '@/utils/emit'
import { arrayAttributeConverter } from '@/utils/property-converters'

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

      .card {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: var(--space-3);
        border-radius: var(--radius);
        position: relative;
      }

      .card:hover {
        background-color: var(--color-background-subtle);
        box-shadow: var(--shadow);
      }

      .badge,
      .action {
        position: absolute;
        z-index: 1;
      }

      .badge {
        top: calc(var(--space-1) * -1);
        left: calc(var(--space-1) * -1);
      }

      .action {
        top: var(--space-2);
        right: var(--space-2);
      }

      .keyword-tags {
        margin-top: var(--space-2);
      }

      time {
        color: var(--color-foreground-light);
        font-size: var(--font-size-12);
        line-height: var(--font-size-12);
      }

      :host-context(.list) .card {
        flex-direction: row;
      }

      :host-context(.list) mm-thumbnail {
        width: 156px;
        flex: none;
      }
    `,
  ]

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
        class="card"
        role=${this.modal ? 'button' : 'article'}
        tabindex=${this.modal ? '0' : '-1'}
        @click=${this.open}
        @keydown=${this.handleKeyDown}
      >
        ${this.badge
          ? html`
              <mm-accent-tag class="badge">${this.badge}</mm-accent-tag>
            `
          : nothing}
        <mm-more-button class="action"></mm-more-button>
        ${this.src
          ? html`
              <mm-thumbnail src=${this.src} alt=${this.alt}></mm-thumbnail>
            `
          : nothing}
        <mm-flex class="content" direction="column" gap="1">
          ${this.label
            ? html`
                <mm-heading level="3">${this.label}</mm-heading>
              `
            : nothing}
          ${this.description
            ? html`
                <mm-paragraph>${this.description}</mm-paragraph>
              `
            : nothing}
          ${this.datetime
            ? html`
                <time hidden datetime=${this.datetime}>${this.formattedDatetime}</time>
              `
            : nothing}
          ${this.keywords.length
            ? html`
                <mm-keyword-tag-group
                  class="keyword-tags"
                  .keywords=${this.keywords}
                ></mm-keyword-tag-group>
              `
            : nothing}
          <slot></slot>
        </mm-flex>
      </article>
    `
  }

  private open() {
    if (!this.modal) return

    emit(this, 'portfolio-item-open', { modal: this.modal })
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    this.open()
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
