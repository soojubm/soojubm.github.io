import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-portfolio-item')
export class PortfolioItem extends LitElement {
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ type: String }) src = ''
  @property({ type: String }) alt = ''
  @property({ type: String }) badge = ''
  @property({ type: String }) modal = ''
  @property({ type: String }) date = ''
  @property({
    type: Array,
    converter: value => {
      if (!value) return []
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    },
  })
  keywords: string[] = []

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
        top: var(--space-2);
        z-index: 1;
      }

      .badge {
        left: var(--space-2);
      }

      .action {
        right: var(--space-2);
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
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
        width: 120px;
        flex: none;
      }
    `,
  ]

  private open() {
    if (!this.modal) return

    this.dispatchEvent(
      new CustomEvent('portfolio-item-open', {
        detail: { modal: this.modal },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    this.open()
  }

  private get formattedDate() {
    if (!this.date) return ''
    return this.date.replaceAll('-', '. ')
  }

  render() {
    return html`
      <article
        class="card"
        role=${this.modal ? 'button' : 'article'}
        tabindex=${this.modal ? '0' : '-1'}
        @click=${this.open}
        @keydown=${this.handleKeyDown}
      >
        ${this.badge ? html`<mm-accent-tag class="badge">${this.badge}</mm-accent-tag>` : nothing}
        <mm-icon-button class="action" variant="navigator" icon="more-vert"></mm-icon-button>
        ${this.src ? html`<mm-thumbnail src=${this.src} alt=${this.alt}></mm-thumbnail>` : nothing}
        <div class="content">
          ${this.label ? html`<mm-text size="18" weight="bold">${this.label}</mm-text>` : nothing}
          ${this.description ? html`<mm-text size="14">${this.description}</mm-text>` : nothing}
          ${this.date
            ? html`<time hidden datetime=${this.date}>${this.formattedDate}</time>`
            : nothing}
          ${this.keywords.length
            ? html`<mm-flex gap="1" style="margin-top: var(--space-2);">
                ${this.keywords.map(k => html`<mm-keyword-tag>${k}</mm-keyword-tag>`)}
              </mm-flex>`
            : nothing}
          <slot></slot>
        </div>
      </article>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-portfolio-item': PortfolioItem
  }
}
