import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'
import '@/components/common/toggle-button/toggle-button-group'

const SQUARE_CLASS = 'shape-square'

type Shape = 'circle' | 'square'

const SHAPE_OPTIONS = [
  { value: 'circle', label: 'Circle' },
  { value: 'square', label: 'Square' },
]

@customElement('mm-radius-picker')
export class RadiusPicker extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @state() private shape: Shape = 'circle'

  render() {
    return html`
      <mm-toggle-button-group
        stretch
        .options=${SHAPE_OPTIONS}
        .value=${this.shape}
        @change=${this.handleShapeChange}
      ></mm-toggle-button-group>
    `
  }

  private handleShapeChange(e: CustomEvent) {
    this.shape = e.detail.value as Shape
    document.documentElement.classList.toggle(SQUARE_CLASS, this.shape === 'square')
  }
}
