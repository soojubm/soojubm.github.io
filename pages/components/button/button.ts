import '@/components/table'
import { html } from 'lit'

import main from './index.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)

  const table =
    document.querySelector<HTMLElementTagNameMap['mm-table']>('mm-table#chip-naming-table')
  if (!table) return

  table.rows = html`
    <tr>
      <th scope="row">Assist chip</th>
      <td colspan="2">Action chip</td>
      <td>M2의 Action chip은 toggle이 아님.</td>
    </tr>
    <tr>
      <th scope="row" rowspan="2">Filter chip</th>
      <td colspan="2">Choice chip</td>
      <td>M3에서도 Flutter는 single-select filter chip을 ChoiceChip으로 구현한다.</td>
    </tr>
    <tr>
      <td colspan="2">Filter chip</td>
      <td>M2에서는 checkbox 대안, M3/Flutter에서는 다중 선택 filter chip에 대응한다.</td>
    </tr>
    <tr>
      <th scope="row">Input chip</th>
      <td colspan="2">Input chip</td>
      <td>삭제 가능. TODO 필요하면 선택 또는 press 동작도 가질 수 있다.</td>
    </tr>
    <tr>
      <th scope="row">Suggestion chip</th>
      <td>Action chip에 가까움</td>
      <td>Action chip</td>
      <td>Flutter M3에서 ActionChip은 Assist/Suggestion chip으로 사용.</td>
    </tr>
    <tr>
      <th scope="row">-</th>
      <td>Chip</td>
      <td>Chip / RawChip</td>
      <td>RawChip은 Flutter의 위젯.</td>
    </tr>
  `
})
