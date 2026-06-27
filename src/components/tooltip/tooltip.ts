import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import { tooltipStyles } from '@/components/tooltip/tooltip.styles'
import { uniqueId } from '@/utils/unique-id'

@customElement('mm-tooltip')
class Tooltip extends LitElement {
  static styles = [tooltipStyles]

  @property({ type: String }) content = ''
  @property({ type: String, reflect: true }) placement = ''
  @property({ type: Boolean, reflect: true }) open = false

  @queryAssignedElements({ slot: 'trigger', flatten: true })
  private triggerElements!: Element[]

  private readonly contentId = uniqueId('tooltip')
  private descriptionTargets = new Set<HTMLElement>()

  private show = () => {
    this.syncDescription()
    this.open = true
  }

  private hide = () => {
    this.open = false
  }

  render() {
    return html`
      <div
        class="tooltip"
        @mouseover=${this.show}
        @mouseout=${this.hide}
        @focusin=${this.show}
        @focusout=${this.hide}
      >
        <slot class="tooltip-trigger" name="trigger" @slotchange=${this.syncDescription}></slot>
        <div id=${this.contentId} class="tooltip-content" role="tooltip">${this.content}</div>
      </div>
    `
  }

  disconnectedCallback() {
    this.clearDescriptionTargets()
    super.disconnectedCallback()
  }

  private findDescriptionTarget(element: Element): HTMLElement | null {
    const focusableSelector =
      'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

    if (element instanceof HTMLElement && element.matches(focusableSelector)) return element

    const roots = [element.shadowRoot, element].filter(Boolean) as (ShadowRoot | Element)[]
    for (const root of roots) {
      for (const child of root.children) {
        const target = this.findDescriptionTarget(child)
        if (target) return target
      }
    }

    return null
  }

  private clearDescriptionTargets() {
    this.descriptionTargets.forEach(target => {
      const descriptions = (target.getAttribute('aria-describedby') || '')
        .split(/\s+/)
        .filter(id => id && id !== this.contentId)

      if (descriptions.length) {
        target.setAttribute('aria-describedby', descriptions.join(' '))
      } else {
        target.removeAttribute('aria-describedby')
      }
    })
    this.descriptionTargets.clear()
  }

  private syncDescription = () => {
    this.clearDescriptionTargets()

    this.triggerElements.forEach(element => {
      const target = this.findDescriptionTarget(element)
      if (!target) return

      const descriptions = new Set(
        (target.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean),
      )
      descriptions.add(this.contentId)
      target.setAttribute('aria-describedby', [...descriptions].join(' '))
      this.descriptionTargets.add(target)
    })
  }
}

export default Tooltip
