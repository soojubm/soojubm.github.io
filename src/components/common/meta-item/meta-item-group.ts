import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { MetaItemData, MetaItemLayout } from '@/components/common/meta-item/meta-item'

import type { FlexDirection } from '@/stylesheets/shared.types'

@customElement('fff-meta-item-group')
export class MetaItemGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: row;
      gap: var(--space-2);
    }

    :host([direction='column']) {
      flex-direction: column;
    }

    :host([layout='horizontal']) {
      gap: var(--space-1);
    }

    :host([layout='stacked'][align='center']) {
      justify-content: center;
      gap: var(--space-8);
    }
  `
  @property({ attribute: false }) items: MetaItemData[] = []
  @property({ type: String, reflect: true }) layout: MetaItemLayout = 'horizontal'
  @property({ type: String, reflect: true }) direction: FlexDirection = 'row'
  @property({ type: String, reflect: true }) align: 'start' | 'center' = 'start'

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`
      ${this.items.map(
        item => html`
          <fff-meta-item
            layout=${this.layout}
            align=${this.align}
            label=${item.label}
            value=${item.value}
            value-size=${item.valueSize ?? 'medium'}
          ></fff-meta-item>
        `,
      )}
      <slot></slot>
    `
  }
}
