import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

type Direction = 'row' | 'column'
type Justify = 'start' | 'center' | 'end' | 'between' | 'around'
type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline'

const justifyMap: Record<Justify, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
}

const alignMap: Record<Align, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  stretch: 'stretch',
  baseline: 'baseline',
}

@customElement('mm-button-group')
export class ButtonGroup extends LitElement {
  @property({ type: String }) direction: Direction = 'row'
  @property({ type: String, attribute: 'justify-content' }) justifyContent: Justify = 'start'
  @property({ type: String }) align: Align = 'center'
  @property({ type: Boolean }) wrap = false
  @property({ type: Boolean, reflect: true }) stretch = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;

        --button-group-gap: var(--space-2);
      }

      .flex {
        display: flex;
        width: 100%;
        gap: var(--button-group-gap);
      }

      :host([stretch]) slot::slotted(*) {
        flex: 1;
        --button-width: 100%;
      }
    `,
  ]

  render() {
    const styles = [
      `flex-direction: ${this.direction}`,
      `justify-content: ${justifyMap[this.justifyContent] ?? 'flex-start'}`,
      `align-items: ${alignMap[this.align] ?? 'center'}`,
      `flex-wrap: ${this.wrap ? 'wrap' : 'nowrap'}`,
    ].join('; ')

    return html`
      <div class="flex" role="group" style=${styles}>
        <slot></slot>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-button-group': ButtonGroup
  }
}
