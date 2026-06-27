import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import { tooltipStyles } from './tooltip.styles'
import { uniqueId } from '../../utils/unique-id'

@customElement('mm-tooltip')
class Tooltip extends LitElement {
  static styles = [tooltipStyles]

  @property({ type: String }) content = ''
  @property({ type: String, reflect: true }) placement = ''
  @property({ type: Boolean, reflect: true }) open = false

  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private _triggerElements!: Element[]

  private readonly _contentId = uniqueId('tooltip')
  private _descriptionTargets = new Set<HTMLElement>()

  private show() {
    this._syncDescription()
    this.open = true
  }

  private hide() {
    this.open = false
  }

  disconnectedCallback() {
    this._clearDescriptionTargets()
    super.disconnectedCallback()
  }

  private _findDescriptionTarget(element: Element): HTMLElement | null {
    const focusableSelector =
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    if (element instanceof HTMLElement && element.matches(focusableSelector)) return element

    const roots = [element.shadowRoot, element].filter(Boolean) as (ShadowRoot | Element)[]
    for (const root of roots) {
      for (const child of root.children) {
        const target = this._findDescriptionTarget(child)
        if (target) return target
      }
    }

    return null
  }

  private _clearDescriptionTargets() {
    this._descriptionTargets.forEach(target => {
      const descriptions = (target.getAttribute('aria-describedby') || '')
        .split(/\s+/)
        .filter(id => id && id !== this._contentId)

      if (descriptions.length) {
        target.setAttribute('aria-describedby', descriptions.join(' '))
      } else {
        target.removeAttribute('aria-describedby')
      }
    })
    this._descriptionTargets.clear()
  }

  private _syncDescription() {
    this._clearDescriptionTargets()

    this._triggerElements.forEach(element => {
      const target = this._findDescriptionTarget(element)
      if (!target) return

      const descriptions = new Set(
        (target.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean),
      )
      descriptions.add(this._contentId)
      target.setAttribute('aria-describedby', [...descriptions].join(' '))
      this._descriptionTargets.add(target)
    })
  }

  render() {
    return html`
      <div
        class="tooltip"
        @mouseover="${this.show}"
        @mouseout="${this.hide}"
        @focusin="${this.show}"
        @focusout="${this.hide}"
      >
        <slot class="tooltip-trigger" name="trigger" @slotchange=${this._syncDescription}></slot>
        <div id=${this._contentId} class="tooltip-content" role="tooltip">${this.content}</div>
      </div>
    `
  }
}

export default Tooltip
