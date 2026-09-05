import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { styleMap } from 'lit/directives/style-map.js'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared.styles'
import { arrayAttributeConverter } from '@/utils'
import '@/components/common/icon'

export interface TableColumn {
  label: string
  width?: string
  sortable?: boolean
  textAlign?: 'left' | 'center' | 'right'
}

@customElement('mm-table')
export class Table extends LitElement {
  static styles = [
    resetStyles,
    css`
      .header-label {
        display: flex;
        align-items: center;
        gap: var(--space-1);
      }

      :host {
        --table-height: 320px;
        --table-width: 100%;

        display: block;
        width: var(--table-width);
        height: var(--table-height);
        background-color: var(--background-subtle-color);
        overflow-x: auto;
      }

      th.align-center {
        text-align: center;
      }

      th.align-right {
        text-align: right;
      }
    `,
  ]

  @property({ type: String }) caption = ''

  @property({ attribute: false }) rows: unknown = nothing

  @property({
    attribute: 'columns',
    converter: arrayAttributeConverter<TableColumn>(),
  })
  columns: TableColumn[] = []

  render() {
    return html`
      <table>
        <caption hidden>${this.caption}</caption>
        <colgroup>${this.renderColumns()}</colgroup>
        <thead>
          <tr>${this.renderHeaders()}</tr>
        </thead>
        <tbody>${this.rows}</tbody>
      </table>
    `
  }

  private renderColumns() {
    return this.columns.map(column => this.renderColumn(column))
  }

  private renderHeaders() {
    return this.columns.map(column => this.renderHeader(column))
  }

  private renderHeader(column: TableColumn) {
    return html`
      <th
        class=${classMap({
          'align-center': column.textAlign === 'center',
          'align-right': column.textAlign === 'right',
        })}
        scope="col"
        aria-sort=${ifDefined(column.sortable ? 'none' : undefined)}
      >
        ${this.renderHeaderContent(column)}
      </th>
    `
  }

  private renderHeaderContent(column: TableColumn) {
    if (!column.sortable) return column.label

    return html`
      <span
        class="header-label"
        style=${styleMap({ justifyContent: this.getHeaderJustifyContent(column) })}
      >
        ${column.label}
        <mm-icon name=${ICON_NAMES.SORT} size="tiny"></mm-icon>
      </span>
    `
  }

  private renderColumn(column: TableColumn) {
    return html`
      <col style=${styleMap(column.width ? { width: column.width } : {})} />
    `
  }

  private getHeaderJustifyContent(column: TableColumn) {
    if (column.textAlign === 'center') return 'center'
    if (column.textAlign === 'right') return 'flex-end'
    return 'flex-start'
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-table': Table
  }
}
