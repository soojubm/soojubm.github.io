import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '@/components/toggle-button/semantics/toggle-button-group'

const SQUARE_CLASS = 'shape-square'
const COLOR_CLASSES = ['color-black', 'color-green']

type Shape = 'circle' | 'square'
type Color = 'green' | 'black'

const SHAPE_OPTIONS = [
  { value: 'circle', label: 'Circle' },
  { value: 'square', label: 'Square' },
]

const COLOR_OPTIONS = [
  { value: 'green', label: 'Green' },
  { value: 'black', label: 'Black' },
]

@customElement('mm-radius-picker')
export class RadiusPicker extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .bar {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding: var(--space-1);
    }
  `

  @state() private shape: Shape = 'circle'
  @state() private color: Color = 'green'

  private handleShapeChange(e: CustomEvent) {
    this.shape = e.detail.value as Shape
    document.documentElement.classList.toggle(SQUARE_CLASS, this.shape === 'square')
  }

  private handleColorChange(e: CustomEvent) {
    this.color = e.detail.value as Color
    COLOR_CLASSES.forEach(c => document.documentElement.classList.remove(c))
    document.documentElement.classList.add(`color-${this.color}`)
  }

  render() {
    return html`
      <div class="bar">
        <mm-toggle-button-group
          stretch
          .options=${SHAPE_OPTIONS}
          .selectedIndex=${this.shape === 'square' ? 1 : 0}
          @change=${this.handleShapeChange}
        ></mm-toggle-button-group>

        <mm-toggle-button-group
          stretch
          .options=${COLOR_OPTIONS}
          .selectedIndex=${this.color === 'black' ? 1 : 0}
          @change=${this.handleColorChange}
        ></mm-toggle-button-group>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-radius-picker': RadiusPicker
  }
}
