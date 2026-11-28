import { LitElement, css, html, nothing, type PropertyValues } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import '@/components/common/file-uploader/semantics/attachment-item'
import '@/components/common/text/semantics/paragraph'

@customElement('fff-attachment-item-list')
export class AttachmentItemList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .items {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
  `
  @property({ type: String }) heading?: string
  @queryAssignedElements({ flatten: true }) private slotElements!: HTMLElement[]

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
  }

  // 화면에 보이는 제목은 목록의 이름으로 한 번만 읽히도록 host의 aria-label로 옮긴다.
  willUpdate(changedProperties: PropertyValues<this>) {
    if (!changedProperties.has('heading')) return

    if (this.heading) this.setAttribute('aria-label', this.heading)
    else this.removeAttribute('aria-label')
  }

  render() {
    return html`
      ${this.renderHeading()}
      <div class="items">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <fff-paragraph color="light" aria-hidden="true">${this.heading}</fff-paragraph>
    `
  }

  private handleSlotChange() {
    this.slotElements.forEach(element => element.setAttribute('role', 'listitem'))
  }
}
