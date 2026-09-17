import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/text'

type SpinnerVariant = 'element' | 'section'

@customElement('mm-spinner')
export class Spinner extends LitElement {
  static styles = css`
    :host {
      --spinner-size: 1em;
      --spinner-track-color: transparent;
      --spinner-indicator-color: currentColor;

      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
    }

    :host([variant='section']) {
      --spinner-size: var(--size-32);
      --spinner-track-color: var(--border-color);
      --spinner-indicator-color: var(--primary-color);

      flex-direction: column;
    }

    .spinner {
      width: var(--spinner-size);
      height: var(--spinner-size);
      flex-shrink: 0;
      border: 2px solid var(--spinner-track-color);
      border-top-color: var(--spinner-indicator-color);
      border-radius: 50%;
      box-sizing: border-box;
      animation: spin 0.8s linear infinite;
    }

    .label {
      font-size: var(--font-size-14);
      color: var(--foreground-subtle-color);
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  `
  @property({ type: String, reflect: true }) variant: SpinnerVariant = 'element'
  @property({ type: String }) label = '로딩 중'

  render() {
    return html`
      <span class="spinner" role="status" aria-label=${this.label}></span>
      ${this.renderLabel()}
    `
  }

  private renderLabel() {
    if (this.variant !== 'section') return nothing

    return html`
      <mm-text class="label" aria-hidden="true">${this.label}</mm-text>
    `
  }
}
