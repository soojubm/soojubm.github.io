import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/text'

export type SpinnerVariant = 'element' | 'section'

@customElement('fff-spinner')
export class Spinner extends LitElement {
  static styles = css`
    :host {
      --spinner-width: 1em;
      --spinner-height: 1em;
      --spinner-track-color: transparent;
      --spinner-indicator-color: currentColor;

      display: inline-flex;
      align-items: center;
      gap: var(--space-2);
    }

    :host([variant='section']) {
      --spinner-width: var(--size-32);
      --spinner-height: var(--size-32);
      --spinner-track-color: var(--border-color);
      --spinner-indicator-color: var(--primary-color);

      flex-direction: column;
    }

    .spinner {
      width: var(--spinner-width);
      height: var(--spinner-height);
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
      <fff-text class="label" aria-hidden="true">${this.label}</fff-text>
    `
  }
}
