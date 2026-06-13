import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textStyles } from '../text.styles'
import '../../domains/indicators/list-marker'

type Variant = 'check' | 'number'

@customElement('mm-text-list')
class TextList extends LitElement {
  @property({ type: String }) texts = '[]'
  @property({ type: String }) variant: Variant = 'check'

  static styles = [
    textStyles,
    css`
      .list {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        margin: 0;
        padding-left: 0;
      }

      .list li {
        display: flex;
        align-items: flex-start;
        gap: var(--space-2);
        list-style: none;
        margin-left: 0;
        padding-left: 0;
      }
    `,
  ]

  private _parseTexts() {
    try {
      const parsed = JSON.parse(this.texts)
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  }

  render() {
    const items = this._parseTexts()
    const tag = this.variant === 'number' ? 'ol' : 'ul'
    const list = items.map(
      (text: string, index: number) => html`
        <li>
          <mm-list-marker variant=${this.variant} value=${index + 1}></mm-list-marker>
          ${text}
        </li>
      `,
    )

    return tag === 'ol'
      ? html`
          <ol class="list">
            ${list}
          </ol>
        `
      : html`
          <ul class="list">
            ${list}
          </ul>
        `
  }
}

export default TextList
