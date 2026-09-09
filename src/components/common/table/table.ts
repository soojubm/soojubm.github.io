import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { styleMap } from 'lit/directives/style-map.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { resetStyles } from '@/stylesheets/shared.styles'
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

      table {
        --table-row-border: var(--border);
        --table-cell-padding: var(--space-2) 0;
        --table-cell-padding-inline: var(--space-2);
        --table-cell-background-color: var(--background-color);

        border-collapse: collapse;
        border-spacing: 0;
        border-left-style: hidden;
        border-right-style: hidden;
        font-size: inherit;

        width: max-content;
        min-width: 100%;
        table-layout: fixed;

        background: var(--table-cell-background-color);

        --col-checkbox: 32px;
      }
      table caption {
        padding: 0.5rem 0;
        font-size: var(--font-size-12);
        text-align: left;
      }
      table thead tr th {
        padding: var(--space-1) 0;
        padding-inline: var(--table-cell-padding-inline);
        font-size: var(--font-size-12);
        color: var(--foreground-subtle-color);
        text-align: left;
      }
      table tbody tr {
        border-bottom: var(--table-row-border);
        background: var(--table-cell-background-color);
        position: relative;
      }
      table tbody tr:hover {
        --table-cell-background-color: var(--interaction-hover-background-color);
      }
      table tbody tr th {
        padding-inline: var(--table-cell-padding-inline);
        text-align: left;
      }
      table tbody tr td {
        padding: var(--table-cell-padding);
        padding-inline: var(--table-cell-padding-inline);
      }
      table .table-cell-ellipsis {
        flex: 1;
        width: 0;
        min-width: 0;
        max-width: 240px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      table .right {
        text-align: right;
      }
      table tbody[role='rowgroup'] tr th {
        width: 25%;
      }
      table tbody[role='rowgroup'] tr th + th {
        width: auto;
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

  @property({ attribute: false }) columns: TableColumn[] = []

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
