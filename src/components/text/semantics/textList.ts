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
    const tag = this.variant === 'number' ? 'ol' : 'ul'
    const list = this.texts.map(
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
