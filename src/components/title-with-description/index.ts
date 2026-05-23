import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-title-with-description')
class TitleWithDescription extends LitElement {
  @property({ type: String }) title = ''
  @property({ type: String }) description = ''
  @property({ type: String }) level = '1'
  @property({ type: Boolean, reflect: true }) center = false

  static variants = {
    '1': {
      title: 'title',
      description: 'body-large',
      gap: 'var(--space-3)',
    },
    '2': {
      title: 'heading2',
      description: 'body',
      gap: 'var(--space-1)',
    },
    '3': {
      title: 'subhead',
      description: 'body',
      gap: 'var(--space-2)',
    },
    '4': {
      title: 'heading4',
      description: 'body',
      gap: 'var(--space-1)',
    },
  }

  static styles = css`
    :host > div {
      display: flex;
      flex-direction: column;
    }
    mm-text[variant='body-large'] {
      max-width: 720px;
    }
  `

  render() {
    const variant =
      TitleWithDescription.variants[this.level as keyof typeof TitleWithDescription.variants] ??
      TitleWithDescription.variants['1']
    return html`
      <div style="gap:${variant.gap}">
        <mm-text variant="${variant.title}" ?center="${this.center}">${this.title}</mm-text>
        <mm-text variant="${variant.description}" ?center="${this.center}"
          >${this.description}</mm-text
        >
      </div>
    `
  }
}

export default TitleWithDescription
