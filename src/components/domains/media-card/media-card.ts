import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/surface/surface'
import '@/components/common/text/text'
import '@/components/common/text/semantics/paragraph'

/**
 * 감상 기록 한 편을 담는 카드. films·books 목록이 공유한다.
 * 제목(원제 포함)과 감독, 발표 연도·국가를 한 장에 보여준다.
 */
@customElement('mm-media-card')
export class MediaCard extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
      }

      mm-surface {
        gap: var(--space-1);
      }

      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-2);
      }
    `,
  ]

  @property({ type: String }) title = ''
  @property({ type: String }) subtitle = ''
  @property({ type: String }) director = ''
  @property({ type: String }) country = ''
  @property({ type: String }) year = ''

  render() {
    return html`
      <mm-surface>
        <header>
          <mm-text as="time" size="12" color="light">${this.year}</mm-text>
          <mm-text size="12" color="light">${this.country}</mm-text>
        </header>
        <mm-text weight="bold">${this.title}</mm-text>
        <mm-paragraph size="small" color="light">${this.subtitle}</mm-paragraph>
        <mm-paragraph>${this.director}</mm-paragraph>
      </mm-surface>
    `
  }
}
