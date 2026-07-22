import '@/components/pagination'
import '@/components/table'
import { html } from 'lit'

import type { TableColumn } from '@/components/table'
import { renderLayout } from '../../../layouts/base-layouts'

const columns: TableColumn[] = [
  { label: '', width: 'var(--col-checkbox)' },
  { label: 'Name', width: '80px', sortable: true },
  { label: 'Title', width: '240px' },
  { label: 'Link', width: '80px' },
  { label: 'Status', width: '80px' },
  { label: 'Age', width: '80px', textAlign: 'right' },
  { label: '', width: '160px', textAlign: 'right' },
]

const statusFilterOptions = [
  { label: 'All', value: 'apple' },
  { label: 'Draft', value: 'banana' },
  { label: 'Cherry', value: 'cherry' },
]

const publishFilterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

const guideTexts = [
  '첫 페이지와 마지막 페이지에 더블 화살표 아이콘을 사용하지 마세요. 최초 페이지와 최종 페이지 넘버를 제공하면 사용자는 대략적인 콘텐츠 수량을 파악할 수 있습니다.',
  '서버에서 offset을 0으로 줄 때도 있었고 1로 줄 때도 있다.',
  '모든 행이 DOM에 존재하는 경우 aria-rowindex 불필요',
]

const rows = html`
  <tr>
    <td><mm-checkbox></mm-checkbox></td>
    <th scope="row">
      <mm-flex align-items="center" gap="2">
        <mm-avatar variant="secondary" size="32"></mm-avatar>
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
        <mm-avatar variant="secondary" size="32"></mm-avatar>
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

const main = html`
  <main class="page" aria-label="site">
    <mm-page-header heading="Table" description="표와 관련된 컴포넌트 및 패턴들."></mm-page-header>
    <mm-component-example>
      <header
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) 0;
        "
      >
        <mm-text size="24">Products</mm-text>
        <mm-button-group>
          <mm-button icon="import">가져오기</mm-button>
          <mm-button variant="primary">추가하기</mm-button>
        </mm-button-group>
      </header>

      <mm-flex gap="2" wrap="wrap">
        <mm-toggle-button-group
          id="button-list"
          .options=${statusFilterOptions}
        ></mm-toggle-button-group>
        <mm-toggle-button-group .options=${publishFilterOptions}></mm-toggle-button-group>
      </mm-flex>

      <menu role="menubar" style="margin: var(--space-3) 0">
        <mm-flex align-items="center" gap="4">
          <mm-searchfield
            size="small"
            hidden-label
            placeholder="검색꾸"
            value="유저"
          ></mm-searchfield>
          <mm-checkbox name="test1">28 selected</mm-checkbox>
        </mm-flex>
      </menu>
      <mm-table
        id="product-table"
        caption="히라가나 오십음도"
        .columns=${columns}
        .rows=${rows}
      ></mm-table>
      <mm-pagination current-page="7" page-count="50"></mm-pagination>
      <!-- <div>
        <style>
          [role='columnheader'],
          [role='cell'] {
            /* width: 25%; */
          }
          [role='row'] {
            display: flex;
            border-top: var(--border);
          }
        </style>
      </div>

      <div
        role="table"
        aria-label="Semantic Elements"
        aria-describedby="semantic_elements_table_desc"
        aria-rowcount="81"
      >
        <header role="rowgroup">
          <div role="row">
            <span role="columnheader" aria-sort="none">#</span>
          </div>
        </header>
        <div role="rowgroup">
          <div role="row" aria-rowindex="11"></div>
        </div>
      </div> -->
    </mm-component-example>

    <mm-component-props>
      <mm-prop name="caption" type="string"></mm-prop>
      <mm-prop name="rows" type="TemplateResult" optional></mm-prop>
      <mm-prop
        name="columns"
        type="{ label: string; width?: string; sortable?: boolean; textAlign?: 'left' | 'center' | 'right' }[] = []"
      ></mm-prop>
    </mm-component-props>

    <mm-component-tokens>
      <mm-token name="table-row-border" default="var(--border)"></mm-token>
      <mm-token name="table-cell-padding" default="var(--space-2) 0"></mm-token>
      <mm-token name="table-cell-padding-inline" default="var(--space-2)"></mm-token>
      <mm-token name="table-cell-background" default="var(--background-color)"></mm-token>
      <mm-token
        name="table-cell-background-hover"
        default="var(--background-subtle-color)"
      ></mm-token>
      <mm-token name="col-checkbox" default="32px"></mm-token>
    </mm-component-tokens>

    <mm-component-guide>
      <mm-component-feature-list>
        <mm-feature
          heading="Structural"
          description="행과 열의 격자로 데이터의 구조를 잡아 값을 비교하고 탐색하기 쉽게 만듭니다."
        ></mm-feature>
      </mm-component-feature-list>
      <mm-text-list .texts=${guideTexts}></mm-text-list>
    </mm-component-guide>

    <!-- <mm-component-section heading="Paginations" description="">
      <div>
        <div role="status">
            숙소 300개 이상 중
            <b>281 – 300</b>
            (airbnb)
        </div>

        <mm-flex>
          <mm-text>page</mm-text>
          <mm-button size="small">
            <mm-icon size="tiny" name="nav-arrow-down"></mm-icon>
          </mm-button>
          <mm-text>of 22</mm-text>
        </mm-flex>
        <mm-pagination current-page="2" page-count="22" sibling-count="2"></mm-pagination>
      </div>
    </mm-component-section> -->

    <!-- <mm-paragraph>pagination vs more load vs infinite scroll. 느린 탐색 경험이 필요할 때. 게시판이나 상품 목록의 탐색에서 이전에 탐색한 상품의 위치를 찾기 편리함. 최근 본 목록이나 섬네일에서 북마크를 제공한다면?</mm-paragraph> -->
    <mm-component-related>
      <mm-button-group>
        <mm-hashtag-link href="list-item.html">List Item</mm-hashtag-link>
        <mm-hashtag-link href="surface.html">Surface</mm-hashtag-link>
      </mm-button-group>
    </mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderLayout(main)
})
