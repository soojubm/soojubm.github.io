import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { tableStyles } from './table.styles'

export interface TableColumn {
  label: string
  width?: string
  sortable?: boolean
  textAlign?: 'left' | 'center' | 'right'
}

@customElement('mm-table')
export class Table extends LitElement {
  @property({
    type: Array,
    converter: value => {
      if (!value) return []

      try {
        const columns = JSON.parse(value)
        return Array.isArray(columns) ? columns : []
      } catch {
        return []
      }
    },
  })
  columns: TableColumn[] = []

  static styles = tableStyles

  protected updated() {
    this.syncTable()
  }

  private syncTable() {
    const table = this.querySelector(':scope > table')
    if (!table) return

    table.querySelectorAll(':scope > colgroup, :scope > thead').forEach(element => element.remove())

    const colgroup = document.createElement('colgroup')
    this.columns.forEach(column => {
      const col = document.createElement('col')
      if (column.width) col.style.width = column.width
      colgroup.append(col)
    })

    const thead = document.createElement('thead')
    const row = document.createElement('tr')
    this.columns.forEach(column => {
      const header = document.createElement('th')
      header.scope = 'col'
      if (column.textAlign) header.style.textAlign = column.textAlign

      if (column.sortable) {
        header.ariaSort = 'none'

        const content = document.createElement('mm-flex')
        content.setAttribute('align-items', 'center')
        content.setAttribute('gap', '1')
        if (column.textAlign === 'center') content.setAttribute('justify-content', 'center')
        if (column.textAlign === 'right') content.setAttribute('justify-content', 'flex-end')
        content.append(document.createTextNode(column.label))

        const icon = document.createElement('mm-icon')
        icon.setAttribute('name', 'arrow-separate-vertical')
        icon.setAttribute('size', 'tiny')
        content.append(icon)
        header.append(content)
      } else {
        header.textContent = column.label
      }

      row.append(header)
    })
    thead.append(row)

    const body = table.querySelector(':scope > tbody, :scope > tfoot')
    table.insertBefore(colgroup, body)
    table.insertBefore(thead, body)
  }

  render() {
    return html`
      <slot @slotchange=${this.syncTable}></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-table': Table
  }
}
