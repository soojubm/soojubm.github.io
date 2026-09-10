import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/domains/component/component-feature-list'
import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'

/** 컴포넌트 문서에서 특성 목록과 설명 산문을 함께 담는 가이드 영역. */
@customElement('mm-component-guide')
export class ComponentGuide extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-8);
      padding: var(--space-section) 0 0;
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
      <mm-component-feature-list .features=${this.features}></mm-component-feature-list>
    `
  }
}
