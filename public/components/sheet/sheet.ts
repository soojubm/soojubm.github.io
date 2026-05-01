import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
export type SheetType = 'center' | 'bottom' | 'left' | 'right' | 'anchor' | 'inline'
export type SheetSize = 'small' | 'medium' | 'large' | 'full'

@customElement('mm-sheet')
class Sheet extends LitElement {
  @property({ type: String }) type: SheetType = 'center'
  @property({ type: String }) size: SheetSize = 'medium'

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('sheetclose', () => this.close())
  }

  static styles = css`
    :host { display: none; position: fixed; inset: 0; justify-content: center; align-items: center; background: rgba(0,0,0,0.5); z-index: 1000; }
    .sheet {
      background: var(--color-background); border-radius: 12px; width: 100%; padding: 0 var(--space-4);
      max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; position: relative;
    }
    :host([type='bottom']) .sheet { margin-top:auto; margin-bottom:1rem; max-width:800px; border-bottom-left-radius:12px; border-bottom-right-radius:12px; }
    :host([type='left']) .sheet { margin-right:auto; max-width:400px; height:100%; max-height:100vh; border-top-right-radius:0; border-bottom-right-radius:0; }
    :host([type='right']) .sheet { margin-left:auto; max-width:400px; height:100%; max-height:100vh; border-top-left-radius:0; border-bottom-left-radius:0; }
    :host([type='anchor']) { position:absolute; background:transparent; }
    :host([type='inline']) { position:relative; background:transparent; }
  `

  render() {
    const maxWidth = this.type === 'center'
      ? { small: '320px', medium: '480px', large: '640px', full: '100%' }[this.size] || '480px'
      : '100%'
    return html`<aside class="" style="max-width:${maxWidth}"><slot></slot></aside>`
  }

  open() {
    this.style.display = 'flex'
  }
  close() {
    this.style.display = 'none'
  }
}
export default Sheet
