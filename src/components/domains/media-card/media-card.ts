import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('fff-media-card')
export class MediaCard extends LitElement {
  static styles = css`
    :host {
      display: flex;
    }

    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
    }
  `
  @property({ type: String }) title = ''
  @property({ type: String }) subtitle = ''
  @property({ type: String }) director = ''
  @property({ type: String }) country = ''
  @property({ type: String }) year = ''

  render() {
    return html`
      <fff-surface>
        <header style="margin-bottom:var(--space-1);">
          <fff-text as="time" size="14">${this.year}</fff-text>
          <fff-text size="14">${this.country}</fff-text>
        </header>
        <fff-text weight="bold">${this.title}</fff-text>
        <fff-paragraph size="small">${this.subtitle}</fff-paragraph>
        <fff-paragraph style="margin-top:var(--space-2);">${this.director}</fff-paragraph>
      </fff-surface>
    `
  }
}
