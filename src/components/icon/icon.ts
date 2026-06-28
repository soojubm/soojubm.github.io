import { LitElement, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { iconStyles } from '@/components/icon/icon.styles'

const ICONOIR_STYLESHEET_URL =
  'https://cdn.jsdelivr.net/gh/iconoir-icons/iconoir@main/css/iconoir.css'

// mm-icon은 shadow DOM 안에서 렌더되므로 document의 전역 Iconoir CSS를 직접 사용할 수 없다.
// 각 인스턴스가 <link>를 만들지 않도록 CSS를 한 번만 가져와 공유 stylesheet로 재사용한다.
let iconoirStylesheetPromise: Promise<CSSStyleSheet | null> | null = null

const loadIconoirStylesheet = () => {
  if (iconoirStylesheetPromise) return iconoirStylesheetPromise

  iconoirStylesheetPromise = (async () => {
    if (!('adoptedStyleSheets' in Document.prototype) || !('CSSStyleSheet' in window)) return null

    try {
      const response = await fetch(ICONOIR_STYLESHEET_URL)
      if (!response.ok) return null

      const stylesheet = new CSSStyleSheet()
      await stylesheet.replace(await response.text())
      return stylesheet
    } catch {
      return null
    }
  })()

  return iconoirStylesheetPromise
}

@customElement('mm-icon')
class Icon extends LitElement {
  static styles = [iconStyles]

  @property({ type: String }) name = ''
  @property({ type: String, reflect: true }) size = ''
  @property({ type: String }) color = ''

  @state() private useStylesheetLink = false

  render() {
    const iconStyle = {
      color: this.color || null,
    }

    return html`
      ${this.renderStylesheetLink()}
      <i class=${this.iconClassName} style=${styleMap(iconStyle)}></i>
    `
  }

  private get iconClassName() {
    if (!this.name) return 'icon'

    return `icon iconoir-${this.name}`
  }

  private renderStylesheetLink() {
    if (!this.useStylesheetLink) return ''

    return html`
      <link rel="stylesheet" href=${ICONOIR_STYLESHEET_URL} />
    `
  }

  protected firstUpdated() {
    void this.adoptIconoirStylesheet()
  }

  private async adoptIconoirStylesheet() {
    const stylesheet = await loadIconoirStylesheet()

    // constructable stylesheet를 쓸 수 없거나 CDN fetch가 실패하면 기존 link 방식으로 돌아간다.
    if (!stylesheet || !(this.renderRoot instanceof ShadowRoot)) {
      this.useStylesheetLink = true
      return
    }

    if (this.renderRoot.adoptedStyleSheets.includes(stylesheet)) return

    this.renderRoot.adoptedStyleSheets = [...this.renderRoot.adoptedStyleSheets, stylesheet]
  }
}

export default Icon
