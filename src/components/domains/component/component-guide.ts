import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/domains/component/component-feature-list'
import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'

@customElement('fff-component-guide')
export class ComponentGuide extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
    }
  `
  @property({ attribute: false }) features: ComponentFeatureItem[] = []

  render() {
    return html`
      ${this.renderFeatureList()}
      <slot></slot>
    `
  }

  private renderFeatureList() {
    if (!this.features.length) return nothing

    return html`
      <fff-component-feature-list .features=${this.features}></fff-component-feature-list>
    `
  }
}
