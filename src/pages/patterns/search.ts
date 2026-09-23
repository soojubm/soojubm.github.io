import { html } from 'lit'

import type { ComponentReferenceItemData } from '@/components/domains/component'
import type { ActionConfig } from '@/types'
import type { TemplateResult } from 'lit'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.apple.com/documentation/uikit/uisearchbar',
    label: 'Apple Developer - UISearchBar',
    external: true,
  },
  {
    href: 'https://material.io/design/navigation/search.html',
    label: 'Material Design - Search',
    external: true,
  },
  {
    href: 'https://developer.android.com/reference/android/widget/SearchView',
    label: 'Android - SearchView',
    external: true,
  },
]

const noResultPrimaryAction: ActionConfig = { label: '검색어 제공' }
const noResultSecondaryAction: ActionConfig = { label: '애옹' }

// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
const code = (name: string) => html`<mm-code>${name}</mm-code>`

// 목록 항목은 해야 할 일을 굵은 한 줄로 먼저 두고 설명을 잇는다.
const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
`

const flowRows = html`
  <tr>
    <th scope="row">진입</th>
    <td>검색 필드를 보기 전</td>
    <td>
      키워드 입력 필드, 해시태그·카테고리로 제안하는 인기·추천 키워드, 검색 화면으로 이동하는 검색
      필드 모양의 버튼
    </td>
  </tr>
  <tr>
    <th scope="row">포커스</th>
    <td>입력한 키워드가 없을 때</td>
    <td>최근 검색 내역, 추천·인기·개인화 큐레이션 제안</td>
  </tr>
  <tr>
    <th scope="row">입력</th>
    <td>키워드가 바뀔 때마다</td>
    <td>추천, 자동완성, 필터링</td>
  </tr>
  <tr>
    <th scope="row">제출</th>
    <td>Enter 키나 검색 버튼을 누를 때</td>
    <td>본문 전체 결과. 입력과 일치하는 결과나 바로가기는 최상단에 둔다</td>
  </tr>
`

const flowTableColumns = [
  { label: '단계', width: '100px' },
  { label: '시점', width: '200px' },
  { label: '보여줄 것' },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Search"
        description="키워드로 콘텐츠를 찾는 흐름에서 단계마다 보여줄 것과 결과를 다루는 방식입니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="흐름">
        <mm-table
          .rows=${flowRows}
          caption="검색 단계별 시점과 보여줄 콘텐츠"
          .columns=${flowTableColumns}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="결과">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '입력 중에는 일치하는 결과가 없어도 유사·추천 콘텐츠로 하나 이상의 결과를 보여준다',
              '빈 목록 대신 다음에 고를 것을 남겨 검색을 이어가게 한다',
            ),
            rule(
              '제출한 검색에 일치하는 결과가 없으면 결과 없음 상태로 새 검색을 유도한다',
              html`
                ${code('mm-result')}로 검색어를 밝히고 다음 행동을 제안한다
              `,
            ),
          ]}
        ></mm-text-list>
        <mm-component-example>
          <mm-surface>
            <mm-menu-item-group aria-label="검색 제안">
              <mm-menu-item-action icon=${ICON_NAMES.SEARCH} label="자동완성"></mm-menu-item-action>
              <mm-menu-item-action
                icon=${ICON_NAMES.SEARCH}
                label="자동완성유아이"
              ></mm-menu-item-action>
            </mm-menu-item-group>
          </mm-surface>
        </mm-component-example>
        <mm-component-example>
          <mm-result
            heading="'[키워드]'와(과) 일치하는 내용이 없습니다."
            .primaryAction=${noResultPrimaryAction}
            .secondaryAction=${noResultSecondaryAction}
          ></mm-result>
        </mm-component-example>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="검색 내역">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '최근 검색 내역은 항목마다 삭제 버튼을 둔다',
              '금방 바뀌는 정보라서 편집 모드 없이 개별 삭제만으로 충분하다',
            ),
            rule(
              '내역을 지우면 개인화 콘텐츠에 미치는 영향을 함께 정한다',
              '최근 검색 내역과 전체 활동 로그를 구분해 삭제 범위를 드러낸다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="모바일 검색 화면">
        <mm-paragraph>
          검색 화면은 ${code('mm-searchfield')} 옆에 화면을 빠져나가는 액션을 둡니다. iOS는 필드
          뒤에 취소 버튼을, Android는 필드 앞에 뒤로 버튼을 둡니다.
        </mm-paragraph>
        <mm-component-example>
          <mm-flex direction="column" gap="3" style="max-width: var(--layout-width-narrow)">
            <mm-flex align-items="center" gap="2">
              <mm-searchfield placeholder="iOS pattern" style="flex: 1"></mm-searchfield>
              <mm-button variant="tertiary">취소</mm-button>
            </mm-flex>
            <mm-flex align-items="center" gap="2">
              <mm-icon-button icon=${ICON_NAMES.BACK} aria-label="뒤로"></mm-icon-button>
              <mm-searchfield placeholder="Android pattern" style="flex: 1"></mm-searchfield>
            </mm-flex>
          </mm-flex>
        </mm-component-example>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="설계 체크리스트">
        <mm-text-list
          variant="check"
          .texts=${[
            rule('검색 범위를 정한다', '서비스 전체를 찾는지, 현재 맥락 안에서 찾는지 정한다'),
            rule(
              '제안 개수는 모바일 키보드가 가리는 높이를 고려해 정한다',
              '키보드 위에 남는 영역을 넘는 제안은 화면에 드러나지 않는다',
            ),
            rule(
              '결과 페이지는 URL로 공유할 수 있게 한다',
              '같은 URL로 같은 검색 결과를 다시 열 수 있다',
            ),
            rule(
              '수집할 검색 데이터를 정한다',
              '최근 검색 내역과 개인화 콘텐츠가 수집한 범위 안에서 만들어진다',
            ),
            rule(
              '포커스는 뒤로 버튼에서 검색 필드로 이어진다',
              '화면에 놓인 순서와 포커스 순서가 같아 키보드 사용자가 흐름을 그대로 따라간다',
            ),
          ]}
        ></mm-text-list>
      </mm-content-section>
      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
