import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { arrayAttributeConverter } from '@/utils/property-converters'
import { focusRing } from '@/stylesheets/shared/focus-ring.styles'
import '@/components/text/text'

interface BreadcrumbItem {
  label: string
  href?: string
}

/**
 * 현재 위치를 계층 구조로 보여주는 내비게이션.
 * items를 JSON 문자열로 받아 링크/현재 페이지·구분자를 렌더한다.
 * 마지막 항목은 현재 페이지(aria-current="page")로 처리한다.
 */
@customElement('mm-breadcrumb')
export class Breadcrumb extends LitElement {
  static styles = css`
    :host {
      display: block;

      --breadcrumb-item-text-color: var(--color-primary);
      --breadcrumb-item-text-color-current: var(--foreground-color);
      --breadcrumb-divider-text-color: var(--border-color);
      --breadcrumb-divider-space: var(--space-3);
    }

    .breadcrumb {
      display: flex;
      align-items: center;
      width: 100%;
      /* 가로만 잘라 긴 경로를 truncate하고, focus 링이 위아래로 잘리지 않게 세로는 연다. */
      overflow-x: clip;
      overflow-y: visible;
    }

    .breadcrumb-divider {
      margin: 0 var(--breadcrumb-divider-space);
      color: var(--breadcrumb-divider-text-color);
      font-style: normal;
    }

    .breadcrumb-item {
      border-radius: var(--radius);
      color: var(--breadcrumb-item-text-color);
      text-decoration: none;
      white-space: nowrap;

      &[aria-current='page'] {
        color: var(--breadcrumb-item-text-color-current);
      }

      &:focus-visible {
        ${focusRing}
      }
    }
  `

  @property({
    attribute: 'items',
    converter: arrayAttributeConverter<BreadcrumbItem>(),
  })
  items: BreadcrumbItem[] = []
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = 'breadcrumb'
  @property({ type: String }) divider = '/'

  render() {
    return html`
      <nav class="breadcrumb" aria-label=${this.ariaLabel}>${this.renderItems()}</nav>
    `
  }

  private renderItems() {
    return this.items.map((item, index) => this.renderListItem(item, index))
  }

  private renderListItem(item: BreadcrumbItem, index: number) {
    const isLast = index === this.items.length - 1

    return [this.renderItem(item, isLast), this.renderDivider(isLast)]
  }

  private renderItem(item: BreadcrumbItem, isLast: boolean) {
    if (item.href && !isLast) {
      return html`
        <a class="breadcrumb-item" href=${item.href}>${item.label}</a>
      `
    }

    return html`
      <mm-text class="breadcrumb-item" aria-current=${ifDefined(isLast ? 'page' : undefined)}>
        ${item.label}
      </mm-text>
    `
  }

  private renderDivider(isLast: boolean) {
    if (isLast) return nothing

    return html`
      <i class="breadcrumb-divider" aria-hidden="true">${this.divider}</i>
    `
  }
}

export default Breadcrumb
