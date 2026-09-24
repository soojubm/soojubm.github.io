import { html } from 'lit'

import type { SearchField } from '@/components/common/input/semantics/searchfield'
import type { ComponentReferenceItemData } from '@/components/domains/component'
import type { SearchResult } from '@/components/domains/search-result-list'
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

const instantSearchResults: SearchResult[] = [
  { href: 'button.html', label: 'Button', description: '누르면 동작을 실행하는 버튼' },
  {
    href: 'icon-button.html',
    label: 'Icon Button',
    description: '아이콘만으로 동작을 알리는 버튼',
  },
]

const recentSearchKeywords = ['고슴도치', '로얄 테넌바움', '이탈리아 여행']

const handleRecentSearchSelect = (event: CustomEvent<{ value: string }>) => {
  const searchField = document.querySelector<SearchField>('#recent-search-field')
  if (!searchField) return

  searchField.value = event.detail.value
}

const overviewRows = html`
  <tr>
    <th scope="row">검색 결과</th>
    <td>O</td>
    <td>X</td>
  </tr>
  <tr>
    <th scope="row">최근 검색어</th>
    <td>X</td>
    <td>O</td>
  </tr>
  <tr>
    <th scope="row">추천 검색어</th>
    <td>O</td>
    <td>O</td>
  </tr>
  <tr>
    <th scope="row">검색 결과 페이지</th>
    <td>X</td>
    <td>O</td>
  </tr>
  <tr>
    <th scope="row">검색어 자동완성</th>
    <td>O</td>
    <td>O</td>
  </tr>
`

const overviewTableColumns = [
  { label: '요소' },
  { label: '입력할 때 (onChange)' },
  { label: '제출할 때 (onSubmit)' },
]

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
    <td>추천, 자동완성</td>
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
      <mm-content-section heading-level="3" heading="Overview">
        <mm-table
          .rows=${overviewRows}
          caption="검색 실행 시점별로 보여주는 요소"
          .columns=${overviewTableColumns}
        ></mm-table>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="검색 범위">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '서비스 전체를 찾는 전역 검색은 기본 크기 검색 필드를 쓴다',
              'navbar의 검색 시트처럼 검색이 화면의 주 과제인 자리에 놓여 입력 영역이 먼저 눈에 들어온다',
            ),
            rule(
              html`
                현재 화면의 목록·표를 좁히는 지역 검색은 ${code('size="small"')} 검색 필드를 쓴다
              `,
              '대상 콘텐츠 바로 위 툴바에 다른 컨트롤과 나란히 놓여, 콘텐츠보다 앞서지 않는다',
            ),
          ]}
        ></mm-text-list>
        <mm-component-example>
          <mm-flex direction="column" gap="3" style="max-width: var(--layout-width-narrow)">
            <mm-searchfield size="small" value="버튼" placeholder="컴포넌트 찾기"></mm-searchfield>
            <mm-search-suggestions aria-label="추천 검색어">
              <mm-search-suggestion>버튼</mm-search-suggestion>
              <mm-search-suggestion>버튼 그룹</mm-search-suggestion>
              <mm-search-suggestion>아이콘 버튼</mm-search-suggestion>
            </mm-search-suggestions>
          </mm-flex>
        </mm-component-example>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="입력할 때 검색">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '결과를 바로 받을 수 있는 검색은 키워드가 바뀔 때마다 실행한다',
              '현재 화면의 목록을 좁히거나 미리 받아 둔 색인을 찾을 때처럼 응답이 빨라, 입력하는 동안 결과가 그 자리에서 좁혀진다',
            ),
            rule(
              '입력이 멈춘 뒤에 결과를 갱신한다',
              '글자마다 목록이 바뀌면 화면이 깜빡이고 요청이 쌓인다',
            ),
            rule(
              '일치하는 항목이 없으면 결과 자리에 빈 상태를 둔다',
              '키워드를 고치면 결과가 바로 돌아오므로 별도 결과 화면으로 이동하지 않는다',
            ),
          ]}
        ></mm-text-list>
        <mm-component-example>
          <mm-flex direction="column" gap="3" style="max-width: var(--layout-width-narrow)">
            <mm-searchfield value="버튼" placeholder="컴포넌트, 패턴을 검색하세요"></mm-searchfield>
            <mm-search-result-list
              heading="검색 결과"
              .results=${instantSearchResults}
            ></mm-search-result-list>
          </mm-flex>
        </mm-component-example>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="제출할 때 검색">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '요청마다 비용이 큰 검색은 Enter 키나 검색 버튼을 누를 때 실행한다',
              '서버에서 전체 결과를 모아 오므로, 입력 중에는 제안만 보여주고 결과는 별도 화면에 모은다',
            ),
          ]}
        ></mm-text-list>
        <mm-table
          .rows=${flowRows}
          caption="검색 단계별 시점과 보여줄 콘텐츠"
          .columns=${flowTableColumns}
        ></mm-table>
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '입력 중에는 키보드 위에 남는 높이 안에서 제안을 하나 이상 보여준다',
              '일치하는 제안이 없으면 유사·추천 콘텐츠로 채워 다음에 고를 것을 남기고, 키보드에 가린 제안은 화면에 드러나지 않으므로 개수를 그 높이에 맞춘다',
            ),
            rule(
              '제출한 검색에 일치하는 결과가 없으면 결과 없음 상태로 새 검색을 유도한다',
              html`
                ${code('mm-result')}로 검색어를 밝히고 추천 검색어를 제안한다
              `,
            ),
            rule(
              '결과 페이지는 URL로 공유할 수 있게 한다',
              '같은 URL로 같은 검색 결과를 다시 열 수 있다',
            ),
          ]}
        ></mm-text-list>
        <mm-component-example>
          <mm-result heading="'[키워드]'와(과) 일치하는 내용이 없습니다.">
            <mm-search-suggestions aria-label="추천 검색어">
              <mm-search-suggestion>버튼</mm-search-suggestion>
              <mm-search-suggestion>버튼 그룹</mm-search-suggestion>
              <mm-search-suggestion>아이콘 버튼</mm-search-suggestion>
            </mm-search-suggestions>
          </mm-result>
        </mm-component-example>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="최근 검색">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '최근 검색어를 누르면 그 검색어로 바로 검색한다',
              '검색 필드에 다시 입력하지 않고 이전 검색을 이어간다',
            ),
            rule(
              '최근 검색 내역은 항목마다 삭제 버튼을 둔다',
              '금방 바뀌는 정보라서 편집 모드 없이 개별 삭제만으로 충분하다',
            ),
            rule(
              '수집할 검색 데이터와 지울 수 있는 범위를 함께 정한다',
              '최근 검색 내역과 개인화 콘텐츠는 수집한 범위 안에서 만들어지므로, 내역만 지우는지 전체 활동 로그까지 지우는지 드러낸다',
            ),
          ]}
        ></mm-text-list>
        <mm-component-example>
          <mm-flex direction="column" gap="3" style="max-width: var(--layout-width-narrow)">
            <mm-searchfield
              id="recent-search-field"
              placeholder="컴포넌트, 패턴을 검색하세요"
            ></mm-searchfield>
            <mm-recent-search-list
              heading="최근 검색어"
              .keywords=${recentSearchKeywords}
              @recent-search-select=${handleRecentSearchSelect}
            ></mm-recent-search-list>
          </mm-flex>
        </mm-component-example>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="검색 바 패턴">
        <mm-paragraph>
          검색 바는 ${code('mm-searchfield')} 옆에 검색을 빠져나가는 액션을 둡니다. iOS는 필드 뒤에
          취소 버튼을, Android는 필드 앞에 뒤로 버튼을 둡니다.
        </mm-paragraph>
        <mm-component-example>
          <mm-flex direction="column" gap="3" style="max-width: var(--layout-width-narrow)">
            <mm-flex align-items="center" gap="2">
              <mm-searchfield
                size="small"
                placeholder="iOS pattern"
                style="flex: 1"
              ></mm-searchfield>
              <mm-button variant="tertiary">취소</mm-button>
            </mm-flex>
            <mm-flex align-items="center" gap="2">
              <mm-icon-button icon=${ICON_NAMES.BACK} aria-label="뒤로"></mm-icon-button>
              <mm-searchfield
                size="small"
                placeholder="Android pattern"
                style="flex: 1"
              ></mm-searchfield>
            </mm-flex>
          </mm-flex>
        </mm-component-example>
      </mm-content-section>
      <mm-component-references .items=${componentReferences}></mm-component-references>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
