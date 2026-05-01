import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'
import { textStyles } from './text.styles'

const textVariants = {
  display: {
    fontSize: '64px',
    lineHeight: '1',
    fontWeight: 'var(--font-weight-bold)',
  },
  title: {
    fontSize: 'var(--font-size-32)',
    lineHeight: 'var(--font-line-height-40)',
    fontWeight: 'var(--font-weight-bold)',
  },
  heading2: {
    fontSize: '1.5rem',
    lineHeight: '2.25rem',
    fontWeight: 'var(--font-weight-bold)',
  },
  subhead: {
    fontSize: 'var(--font-size-18)',
    lineHeight: 'var(--font-line-height-24)',
    fontWeight: 'var(--font-weight-bold)',
  },
  heading4: {
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--font-line-height-24)',
    fontWeight: 'var(--font-weight-bold)',
  },
  subheading: {
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--font-line-height-24)',
    fontWeight: 'var(--font-weight-normal)',
    color: 'var(--color-foreground-light)',
  },
  body: {
    fontSize: 'var(--font-size-14)',
    lineHeight: 'var(--font-line-height-24)',
    fontWeight: 'var(--font-weight-normal)',
  },
  'body-large': {
    fontSize: 'var(--font-size-18)',
    lineHeight: 'var(--font-line-height-32)',
    fontWeight: 'var(--font-weight-normal)',
  },
  caption: {
    fontSize: 'var(--font-size-12)',
    lineHeight: 'var(--font-line-height-16)',
  },
} as const

type TextVariant = keyof typeof textVariants

@customElement('mm-text')
class Text extends LitElement {
  @property({ type: String }) variant: TextVariant = 'body'
  @property({ type: Boolean, reflect: true }) center = false
  @property({ type: Boolean, reflect: true }) truncated = false

  static styles = [textStyles]

  render() {
    const variantStyle = textVariants[this.variant]

    return html`
      <p
        style=${styleMap(variantStyle)}
        ?data-center=${this.center}
        ?data-truncated=${this.truncated}
      >
        <slot></slot>
      </p>
    `
  }
}

export default Text
