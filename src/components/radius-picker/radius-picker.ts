import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '../toggle-button/semantics/toggle-button-group'

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
  @state() private shape: Shape = 'circle'
  @state() private color: Color = 'green'

  static styles = css`
    :host {
      position: fixed;
      bottom: 1.5rem;
      left: 0;
      width: 100vw;
      display: flex;
      justify-content: center;
      pointer-events: none;
      z-index: 9999;
    }

    .bar {
      pointer-events: auto;
      display: inline-flex;
      align-items: center;
      gap: var(--space-3);
      padding: var(--space-2) var(--space-3);
      background: var(--color-background);
      border: var(--border);
      border-radius: var(--radius-large);
      box-shadow: var(--shadow);
    }

    .divider {
      width: 1px;
      height: 1.25rem;
      background: var(--color-border);
    }

    .label {
      font-size: var(--font-size-12);
      color: var(--color-foreground-light);
      white-space: nowrap;
    }
  `

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
          .options=${SHAPE_OPTIONS}
          .selectedIndex=${this.shape === 'square' ? 1 : 0}
          @change=${this.handleShapeChange}
        ></mm-toggle-button-group>

        <div class="divider"></div>

        <mm-toggle-button-group
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
