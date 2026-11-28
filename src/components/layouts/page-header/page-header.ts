import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('fff-page-header')
export class PageHeader extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding-bottom: var(--space-8);
    }

    header {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
    }

    .title {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: var(--space-4);
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: Boolean }) centered = false

  render() {
    return html`
      <header>
        <div class="title">
          <fff-text-block
            heading=${this.heading}
            description=${this.description}
            ?centered=${this.centered}
          ></fff-text-block>
          <slot name="action"></slot>
        </div>
        <slot></slot>
      </header>
    `
  }
}
