import '@/components/pagination'
import '@/components/table'
import { html } from 'lit'

import main from './index.html'
import { renderLayout } from '../../../layouts/base-layouts'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)

  const table = document.querySelector<HTMLElementTagNameMap['mm-table']>('mm-table#product-table')
  if (!table) return

  table.rows = html`
    <tr>
      <td><mm-checkbox></mm-checkbox></td>
      <th scope="row">
        <mm-flex align-items="center" gap="2">
          <mm-avatar variant="secondary" default="true"></mm-avatar>
          Gabriel
        </mm-flex>
      </th>
      <td>
        <mm-flex align-items="center" gap="2">
          <mm-tag>Male</mm-tag>
          <mm-text>타이틀</mm-text>
        </mm-flex>
      </td>
      <td><mm-link external>External link</mm-link></td>
      <td><mm-category-tag category="music">유저리서치</mm-category-tag></td>
      <td style="text-align: right">13</td>
      <td>
        <mm-flex justify-content="flex-end" gap="2">
          <mm-button>액션</mm-button>
          <mm-more-button></mm-more-button>
        </mm-flex>
      </td>
    </tr>
    <tr>
      <td><mm-checkbox checked></mm-checkbox></td>
      <th scope="row">
        <mm-flex align-items="center" gap="2">
          <mm-avatar variant="secondary" default="true"></mm-avatar>
          Ella
        </mm-flex>
      </th>
      <td>
        <mm-flex align-items="center" gap="2">
          <mm-tag>Female</mm-tag>
          <mm-text class="table-cell-ellipsis">
            You can't compress the program without quantifying the open-source SSD pixel!
          </mm-text>
        </mm-flex>
      </td>
      <td><mm-link external>External link</mm-link></td>
      <td><mm-category-tag category="finance">유저플로우</mm-category-tag></td>
      <td style="text-align: right">8</td>
      <td>
        <mm-flex justify-content="flex-end" gap="2">
          <mm-button>액션</mm-button>
          <mm-more-button></mm-more-button>
        </mm-flex>
      </td>
    </tr>
  `
})
