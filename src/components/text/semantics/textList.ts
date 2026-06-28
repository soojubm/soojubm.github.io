import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { textStyles } from '@/components/text/text.styles'
import '@/components/domains/indicators/list-marker'
import { arrayAttributeConverter } from '@/utils/property-converters'

type Variant = 'check' | 'number'

@customElement('mm-text-list')
class TextList extends LitElement {
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

  @property({
    attribute: 'texts',
    converter: arrayAttributeConverter<string>(),
  })
  texts: string[] = []
  @property({ type: String }) variant: Variant = 'check'

  render() {
    return this.renderList(this.renderItems())
  }

  private renderItems() {
    return this.texts.map((text, index) => this.renderItem(text, index))
  }

  private renderItem(text: string, index: number) {
    return html`
      <li>
        <mm-list-marker variant=${this.variant} value=${index + 1}></mm-list-marker>
        ${text}
      </li>
    `
  }

  private renderList(list: unknown[]) {
    if (this.variant === 'number') {
      return html`
        <ol class="list">
          ${list}
        </ol>
      `
    }

    return html`
      <ul class="list">
        ${list}
      </ul>
    `
  }
}

export default TextList
