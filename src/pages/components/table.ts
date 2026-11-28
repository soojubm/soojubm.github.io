import '@/components/common'
import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES, type TableColumn } from '@/components/common'
import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import { CATEGORIES } from '@/pages/mocks'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'list-item.html', label: 'List Item' },
  { href: 'surface.html', label: 'Surface' },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-table')]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Structural',
    description: '행과 열의 격자로 데이터의 구조를 잡아 값을 비교하고 탐색하기 쉽게 만듭니다.',
  },
]

const columns: TableColumn[] = [
  { label: '', width: 'var(--table-checkbox-column-width)' },
  { label: 'Name', width: '80px', sortable: true },
  { label: 'Title', width: '280px' },
  { label: 'Link', width: '130px' },
  { label: 'Status', width: '80px' },
  { label: 'Progress', width: '100px' },
  { label: 'Age', width: '80px', textAlign: 'right' },
  { label: '', width: '140px', textAlign: 'right' },
]

const statusFilterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Draft', value: 'draft' },
  { label: 'Scheduled', value: 'scheduled' },
]

const publishFilterOptions = [
  { label: 'All', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Archived', value: 'archived' },
]

const guideTexts = [
  '첫 페이지와 마지막 페이지에 더블 화살표 아이콘을 사용하지 마세요. 최초 페이지와 최종 페이지 넘버를 제공하면 사용자는 대략적인 콘텐츠 수량을 파악할 수 있습니다.',
  'TODO 서버에서 offset을 0으로 줄 때도 있었고 1로 줄 때도 있다.',
  'TODO 모든 행이 DOM에 존재하는 경우 aria-rowindex 불필요',
]

const exampleCode = `<fff-table
  caption="히라가나 오십음도"
  height="320px"
  .columns=\${columns}
  .rows=\${rows}
></fff-table>`

const rows = html`
  <tr>
    <td><fff-checkbox></fff-checkbox></td>
    <th scope="row">
      <fff-flex align-items="center" gap="2">
        <fff-avatar variant="secondary" size="32"></fff-avatar>
        Gabriel
      </fff-flex>
    </th>
    <td>
      <fff-flex align-items="center" gap="2">
        <fff-tag>Male</fff-tag>
        <fff-text>타이틀</fff-text>
      </fff-flex>
    </td>
    <td><fff-link external>External link</fff-link></td>
    <td>
      <fff-category-tag tone=${CATEGORIES.product.tone}>
        ${CATEGORIES.product.label}
      </fff-category-tag>
    </td>
    <td><fff-progress-dot variant="in-progress">진행 중</fff-progress-dot></td>
    <td class="cell-align-right">13</td>
    <td>
      <fff-flex justify-content="flex-end" gap="2">
        <fff-button>액션</fff-button>
        <fff-more-button tooltip-placement="bottom-end"></fff-more-button>
      </fff-flex>
    </td>
  </tr>
  <tr>
    <td><fff-checkbox checked></fff-checkbox></td>
    <th scope="row">
      <fff-flex align-items="center" gap="2">
        <fff-avatar variant="secondary" size="32"></fff-avatar>
        Ella
      </fff-flex>
    </th>
    <td>
      <fff-flex align-items="center" gap="2">
        <fff-tag>Female</fff-tag>
        <fff-text class="table-cell-ellipsis">
          You can't compress the program without quantifying the open-source SSD pixel!
        </fff-text>
      </fff-flex>
    </td>
    <td><fff-link external>External link</fff-link></td>
    <td>
      <fff-category-tag tone=${CATEGORIES.design.tone}>${CATEGORIES.design.label}</fff-category-tag>
    </td>
    <td><fff-progress-dot variant="done">완료</fff-progress-dot></td>
    <td class="cell-align-right">8</td>
    <td>
      <fff-flex justify-content="flex-end" gap="2">
        <fff-button>액션</fff-button>
        <fff-more-button tooltip-placement="bottom-end"></fff-more-button>
      </fff-flex>
    </td>
  </tr>
`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Table"
      description="표와 관련된 컴포넌트 및 패턴들."
    ></fff-page-header>
    <fff-component-example full-width>
      <header
        style="
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--space-4) 0;
        "
      >
        <fff-text size="24">Products</fff-text>
        <fff-button-group>
          <fff-button icon=${ICON_NAMES.IMPORT}>가져오기</fff-button>
          <fff-button variant="primary">추가하기</fff-button>
        </fff-button-group>
      </header>

      <fff-button-group>
        <fff-toggle-button-group
          .options=${statusFilterOptions}
          value="all"
        ></fff-toggle-button-group>
        <fff-toggle-button-group
          .options=${publishFilterOptions}
          value="all"
        ></fff-toggle-button-group>
      </fff-button-group>

      <fff-flex align-items="center" gap="4" style="margin: var(--space-3) 0">
        <fff-searchfield
          size="small"
          hidden-label
          placeholder="검색꾸"
          value="유저"
        ></fff-searchfield>
        <fff-checkbox name="test1">28 selected</fff-checkbox>
      </fff-flex>
      <fff-table
        id="product-table"
        caption="히라가나 오십음도"
        height="320px"
        .columns=${columns}
        .rows=${rows}
      ></fff-table>
      <fff-pagination current-page="7" page-count="50"></fff-pagination>
    </fff-component-example>
    <fff-component-code .code=${exampleCode}></fff-component-code>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-table']}></fff-component-tokens>

    <fff-component-guide .features=${componentFeatures}>
      <fff-text-list .texts=${guideTexts}></fff-text-list>
    </fff-component-guide>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
