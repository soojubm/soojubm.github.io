import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { FilterOption } from '@/components/common'

import { emit } from '@/utils'
import '@/components/common'

@customElement('mm-media-filter')
export class MediaFilter extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: baseline;
      gap: var(--space-3);
    }

    mm-text {
      min-width: var(--size-32);
    }

    mm-filter-button-group {
      flex: 1;
    }
  `
  @property({ type: String }) label = ''
  @property({ attribute: false }) options: FilterOption[] = []

  render() {
    return html`
      <mm-text size="12" color="light" aria-hidden="true">${this.label}</mm-text>
      <mm-filter-button-group
        mode="single"
        aria-label=${this.label}
        .options=${this.options}
        @change=${this.handleGroupChange}
      ></mm-filter-button-group>
    `
  }

  private handleGroupChange(e: CustomEvent<{ values: string[] }>) {
    e.stopPropagation()
    emit(this, 'change', { values: e.detail.values })
  }
}
