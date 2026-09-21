import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { TemplateResult } from 'lit'

import { textStyles } from '@/components/common/text/text.styles'
import '@/components/indicators/list-marker/list-marker'
import { resetStyles } from '@/stylesheets/shared.styles'

type Variant = 'check' | 'number'

@customElement('mm-text-list')
export class TextList extends LitElement {
  static styles = [
    resetStyles,
    textStyles,
    css`
      .list {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .list li {
        display: flex;
        align-items: flex-start;
        gap: var(--space-2);
        list-style: none;
      }

      /* 마커는 항목 첫 줄의 글자 가운데에 맞춘다. */
      .list li mm-list-marker {
        margin-top: var(--space-1);
      }
    `,
  ]
  // 인라인 code처럼 마크업이 필요한 항목은 템플릿으로 넘긴다.
  @property({ attribute: false }) texts: Array<string | TemplateResult> = []
  @property({ type: String }) variant: Variant = 'check'

  render() {
    const items = this.renderItems()

    if (this.variant === 'number') {
      return html`
        <ol class="list">
          ${items}
        </ol>
      `
    }

    return html`
      <ul class="list">
        ${items}
      </ul>
    `
  }

  private renderItems() {
    return this.texts.map((text, index) => this.renderItem(text, index))
  }

  private renderItem(text: string | TemplateResult, index: number) {
    return html`
      <li>
        <mm-list-marker variant=${this.variant} value=${index + 1}></mm-list-marker>
        <span>${text}</span>
      </li>
    `
  }
}
