import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

/** 페이지 최상단의 제목과 설명. 기본 slot에 넣은 배너·이미지는 설명 아래에 놓인다. */
@customElement('mm-page-header')
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
  `
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  @property({ type: Boolean }) centered = false

  render() {
    return html`
      <header>
        <mm-text-block
          heading=${this.heading}
          description=${this.description}
          ?centered=${this.centered}
        ></mm-text-block>
        <slot></slot>
      </header>
    `
  }
}
