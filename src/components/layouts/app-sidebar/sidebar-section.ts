import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/common/icon/icon-names'

import '@/components/common/list-item/list-item'
import { interactiveRowStyles } from '@/components/common/list-item/list-item.styles'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit, uniqueId } from '@/utils'
import '@/components/indicators/expand-indicator/expand-indicator'

/**
 * 사이드바에서 하위 페이지 링크를 접었다 펴는 섹션.
 * 명령이 아니라 탐색이므로 menu가 아닌 list로 읽히고, 열림 상태는 DisclosureController가 소유한다.
 */
@customElement('mm-sidebar-section')
export class SidebarSection extends LitElement {
  static styles = [
    resetStyles,
    interactiveRowStyles,
    css`
      :host {
        display: block;
      }

      /* grid trick: 0fr → 1fr 로 패널 높이를 접는다 */
      .panel {
        display: grid;
        grid-template-rows: 0fr;
      }

      [role='list'] {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      :host([open]) .panel {
        grid-template-rows: 1fr;
      }

      /* 트리거와 하위 링크 간격. 닫힐 때 패널이 완전히 접히도록 열림 상태에서만 준다 */
      :host([open]) [role='list'] {
        padding-top: var(--space-1);
      }
    `,
  ]
  @property({ type: String }) label = ''
  @property({ type: String }) icon?: IconName
  @property({ type: Boolean, reflect: true }) open = false
  @query('button') private trigger?: HTMLElement
  private readonly panelId = uniqueId('sidebar-section-panel')
  private disclosure = new DisclosureController(this, {
    isOpen: () => this.open,
    setOpen: open => {
      this.open = open
      emit(this, 'toggle', { open })
    },
    getTrigger: () => this.trigger ?? undefined,
  })

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'listitem')
  }

  render() {
    return html`
      <button type="button" aria-controls=${this.panelId}>
        <mm-list-item avatar-variant="tertiary" label=${this.label} icon=${ifDefined(this.icon)}>
          <mm-expand-indicator slot="trailing" ?expanded=${this.open}></mm-expand-indicator>
        </mm-list-item>
      </button>

      <div id=${this.panelId} class="panel" ?inert=${!this.open}>
        <div role="list"><slot></slot></div>
      </div>
    `
  }
}
