import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/common'
import '@/components/common'

@customElement('mm-token-section')
export class TokenSection extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
    }

    slot {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
  `
  @property({ type: String }) heading = ''
  @property({ type: String }) description = ''
  /** 주면 제목을 아이콘이 붙은 큰 list-item으로 그린다. */
  @property({ type: String }) icon?: IconName

  render() {
    return html`
      ${this.renderHeader()}
      <slot></slot>
    `
  }

  // 아이콘이 있으면 설정 화면의 묶음 제목처럼 큰 list-item으로 제목을 그린다.
  private renderHeader() {
    if (this.icon) {
      return html`
        <mm-list-item
          size="large"
          avatar-variant="secondary"
          icon=${this.icon}
          label=${this.heading}
          description=${this.description}
        ></mm-list-item>
      `
    }

    return html`
      <mm-text-block
        level="2"
        heading=${this.heading}
        description=${this.description}
      ></mm-text-block>
    `
  }
}
