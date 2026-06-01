import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textStyles } from '../text.styles'

@customElement('mm-text-list')
class TextList extends LitElement {
  @property({ type: String }) texts = '[]'

  static styles = [textStyles]

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
    return html`
      <ul class="checklist">
        ${items.map((text: string) => html`<li>${text}</li>`)}
      </ul>
    `
  }
}

export default TextList
