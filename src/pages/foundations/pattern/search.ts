import '@/components/common'
import { html } from 'lit'

import type { SearchField } from '@/components/common/input/semantics/searchfield'
import type { ComponentReferenceItemData } from '@/components/domains/component'
import type { SearchResult, SearchResultSegment } from '@/components/domains/search'

import { ICON_NAMES } from '@/components/common'
import { code } from '@/components/domains/component'
import '@/components/domains/component/component-notice'

const searchReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.android.com/reference/android/widget/SearchView',
    label: 'Android - SearchView',
    external: true,
  },
  {
    href: 'https://developer.apple.com/documentation/uikit/uisearchbar',
    label: 'Apple Developer - UISearchBar',
    external: true,
  },
  {
    href: 'https://material.io/design/navigation/search.html',
    label: 'Material Design 2 - Search',
    external: true,
  },
]

const recentSearchKeywords = ['고슴도치', '로얄 테넌바움', '이탈리아 여행']

const searchKeyword = '버튼'

const toSegments = (text: string, keyword: string): SearchResultSegment[] =>
  text
    .split(keyword)
    .flatMap((part, index) =>
      index === 0 ? [{ text: part }] : [{ text: keyword, match: true }, { text: part }],
    )
    .filter(segment => segment.text)

const searchResults: SearchResult[] = [
  {
    href: 'button.html',
    label: 'Button',
    description: toSegments(
      '양식 제출이나 저장처럼 사용자 여정의 핵심 과업을 실행하는 컨트롤입니다. 레이블로 수행할 행동을 드러내고 누르는 즉시 작업을 실행하므로, 사용자는 지금 무엇을 할 수 있는지 알고 망설임 없이 다음 단계로 나아갈 수 있습니다.',
      searchKeyword,
    ),
  },
  {
    href: 'icon-button.html',
    label: 'Icon Button',
    description: toSegments(
      '레이블 없이 메타포 아이콘 하나로 행동을 나타내는 간결한 버튼입니다. 좁은 공간에 반복되는 보조 액션을 담고 용도를 툴팁으로 알려 주므로, 사용자는 화면을 복잡하게 만들지 않고도 자주 쓰는 기능에 바로 닿을 수 있습니다.',
      searchKeyword,
    ),
  },
  {
    href: 'toggle-button.html',
    label: 'ToggleButton',
    description: toSegments(
      '누를 때마다 켜짐과 꺼짐이 바뀌는 버튼입니다. 눌린 상태를 버튼 스스로 표시하고, 여러 개를 묶으면 그중 하나만 선택되는 세그먼트로 동작하므로, 사용자는 현재 적용된 설정을 한눈에 보고 한 번의 클릭으로 전환할 수 있습니다.',
      searchKeyword,
    ),
  },
]

const suggestionKeywords = [
  '버튼',
  '버튼 그룹',
  '아이콘 버튼',
  '토글 버튼',
  '필터 버튼',
  '태그',
  '팝오버',
  '시트',
  '토스트',
]

const handleSuggestionSelect = (event: CustomEvent<{ value: string }>) => {
  const searchField = document.querySelector<SearchField>('#suggestion-search-field')
  if (!searchField) return

  searchField.value = event.detail.value
}

const handleRecentSearchSelect = (event: CustomEvent<{ value: string }>) => {
  const searchField = document.querySelector<SearchField>('#recent-search-field')
  if (!searchField) return

  searchField.value = event.detail.value
}

export const searchPanel = html`
  <fff-tab-panel value="search">
    <fff-content-section-list>
      <fff-paragraph>
        키워드로 콘텐츠를 찾는 흐름입니다. 진입·포커스·입력·제출 단계마다 최근 검색어와
        추천·자동완성, 결과를 알맞은 때에 보여주므로, 사용자는 검색어를 다 쓰기 전에도 원하는 것에
        닿을 수 있습니다.
      </fff-paragraph>
      <fff-content-section heading-level="3" heading="전역 검색 × 지역 검색">
        <fff-surface>
          <fff-flex justify-content="center" wrap="wrap" gap="6">
            <fff-figure-card
              class="do-dont-card"
              description="서비스 전체를 찾는 전역 검색은 기본 크기 검색 필드를 쓴다. navbar의 검색 시트처럼 검색이 화면의 주 과제인 자리에 놓여 입력 영역이 먼저 눈에 들어온다."
            >
              <fff-flex slot="figure" stretch class="search-figure">
                <fff-searchfield placeholder="컴포넌트, 패턴을 검색하세요"></fff-searchfield>
              </fff-flex>
              <fff-code-tag slot="tags">전역 검색</fff-code-tag>
            </fff-figure-card>
            <fff-figure-card
              class="do-dont-card"
              description='현재 화면의 목록·표를 좁히는 지역 검색은 size="small" 검색 필드를 쓴다. 대상 콘텐츠 바로 위 툴바에 다른 컨트롤과 나란히 놓여, 콘텐츠보다 앞서지 않는다.'
            >
              <fff-flex slot="figure" stretch class="search-figure">
                <fff-searchfield size="small" placeholder="컴포넌트 찾기"></fff-searchfield>
              </fff-flex>
              <fff-code-tag slot="tags">지역 검색</fff-code-tag>
            </fff-figure-card>
          </fff-flex>
        </fff-surface>
      </fff-content-section>

      <fff-text-block
        level="3"
        heading="입력할 때 검색"
        description="결과를 바로 받을 수 있는 검색은 키워드가 바뀔 때마다 실행합니다. 현재 화면의 목록을 좁히거나 미리 받아 둔 색인을 찾을 때처럼 응답이 빨라, 입력하는 동안 결과가 그 자리에서 좁혀집니다."
      >
        <fff-flex direction="column" gap="2">
          <fff-tag-group>
            <fff-code-tag tone="gold">기본</fff-code-tag>
            <fff-code-tag>Suggested Searches</fff-code-tag>
          </fff-tag-group>
          <fff-tag-group>
            <fff-code-tag tone="cyan">onFocus</fff-code-tag>
            <fff-code-tag>Recent Searches</fff-code-tag>
            <fff-code-tag>Suggested Searches</fff-code-tag>
          </fff-tag-group>
          <fff-tag-group>
            <fff-code-tag tone="orange">onChange</fff-code-tag>
            <fff-code-tag>Search Results</fff-code-tag>
            <fff-code-tag>Suggested Searches</fff-code-tag>
            <fff-code-tag>Search Autocomplete</fff-code-tag>
          </fff-tag-group>
        </fff-flex>

        <fff-text-list
          variant="check"
          .texts=${[
            '입력이 멈춘 뒤에 결과를 갱신한다. 글자마다 목록이 바뀌면 화면이 깜빡이고 요청이 쌓인다',
            html`
              일치하는 항목이 없으면
              <fff-code-tag>Search Results</fff-code-tag>
              자리에 빈 상태를 둔다. 키워드를 고치면 결과가 바로 돌아오므로 별도 결과 화면으로
              이동하지 않는다
            `,
          ]}
        ></fff-text-list>
      </fff-text-block>

      <fff-text-block
        level="3"
        heading="제출할 때 검색"
        description="요청마다 비용이 큰 검색은 Enter 키나 검색 버튼을 누를 때 실행합니다. 서버에서 전체 결과를 모아 오므로, 입력 중에는 제안만 보여주고 결과는 별도 화면에 모읍니다."
      >
        <fff-flex direction="column" gap="2">
          <fff-tag-group>
            <fff-code-tag tone="orange">onChange</fff-code-tag>
            <fff-code-tag>Search Results</fff-code-tag>
            <fff-code-tag>Suggested Searches</fff-code-tag>
            <fff-code-tag>Search Autocomplete</fff-code-tag>
          </fff-tag-group>
          <fff-tag-group>
            <fff-code-tag tone="blue">onSubmit</fff-code-tag>
            <fff-code-tag>Suggested Searches</fff-code-tag>
            <fff-code-tag>Search Autocomplete</fff-code-tag>
            <fff-code-tag>Search Results Page</fff-code-tag>
          </fff-tag-group>
        </fff-flex>
        <fff-text-list
          variant="check"
          .texts=${[
            '입력 중에는 키보드 위에 남는 높이 안에서 제안을 하나 이상 보여준다. 일치하는 제안이 없으면 유사·추천 콘텐츠로 채워 다음에 고를 것을 남기고, 키보드에 가린 제안은 화면에 드러나지 않으므로 개수를 그 높이에 맞춘다',
            '결과 페이지는 URL로 공유할 수 있게 한다. 같은 URL로 같은 검색 결과를 다시 열 수 있다',
          ]}
        ></fff-text-list>
      </fff-text-block>

      <fff-content-section
        heading-level="3"
        heading="검색 결과"
        description="일치하는 결과는 이름과 설명을 한 행에 보여 주고 행 전체를 링크로 둔다. 사용자는 페이지에 들어가기 전에 찾던 것인지 가려낼 수 있다."
      >
        <fff-component-example>
          <fff-search-result-list
            heading="검색 결과"
            .results=${searchResults}
          ></fff-search-result-list>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="검색 결과 없음"
        description="제출한 검색에 일치하는 결과가 없으면 결과 없음 상태로 추천 검색어를 제안하여 새 검색을 유도한다."
      >
        <fff-component-example>
          <fff-search-result-empty query="[키워드]">
            <fff-flex justify-content="center">
              <fff-search-suggestion-group aria-label="추천 검색어">
                <fff-search-suggestion>버튼</fff-search-suggestion>
                <fff-search-suggestion>버튼 그룹</fff-search-suggestion>
                <fff-search-suggestion>아이콘 버튼</fff-search-suggestion>
              </fff-search-suggestion-group>
            </fff-flex>
          </fff-search-result-empty>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="최근 검색어"
        .texts=${[
          '전체 삭제를 제공하지 않는다. 사용자 데이터를 실수로 한꺼번에 날릴 수 있으므로 항목마다 삭제 버튼을 두고 하나씩만 지우게 한다',
          '어떤 검색 기록을 모으고 어디까지 지울 수 있는지 함께 정한다. 최근 검색어와 맞춤 추천은 모아 둔 기록으로 만들어진다. 최근 검색어만 지우는 것인지, 지금까지의 모든 활동 기록까지 지우는 것인지 사용자에게 알려 준다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="4">
            <fff-searchfield
              id="recent-search-field"
              placeholder="컴포넌트, 패턴을 검색하세요"
            ></fff-searchfield>
            <fff-recent-search-list
              heading="최근 검색어"
              .keywords=${recentSearchKeywords}
              @recent-search-select=${handleRecentSearchSelect}
            ></fff-recent-search-list>
          </fff-flex>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="추천 검색어"
        description="검색어를 입력하지 않아도, 사용자가 관심을 가질 만한 키워드를 추천하여 검색을 유도한다."
      >
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="3">
            <fff-searchfield
              id="suggestion-search-field"
              placeholder="컴포넌트, 패턴을 검색하세요"
            ></fff-searchfield>
            <fff-search-suggestion-group
              aria-label="추천 검색어"
              @search-suggestion-select=${handleSuggestionSelect}
            >
              ${suggestionKeywords.map(
                keyword => html`
                  <fff-search-suggestion>${keyword}</fff-search-suggestion>
                `,
              )}
            </fff-search-suggestion-group>
          </fff-flex>
        </fff-component-example>
        <fff-component-notice heading="검색어 자동완성의 규칙을 정한다">
          추천 검색어와 어떻게 나뉘는지, 키보드로 제안을 고르는 방식을 정하지 않았다
        </fff-component-notice>
      </fff-content-section>

      <fff-content-section heading-level="3" heading="검색 바 패턴">
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="3">
            <fff-flex align-items="center" gap="2">
              <fff-searchfield
                size="small"
                placeholder="iOS pattern"
                style="flex: 1"
              ></fff-searchfield>
              <fff-button variant="secondary">취소</fff-button>
            </fff-flex>
            <fff-flex align-items="center" gap="2">
              <fff-icon-button icon=${ICON_NAMES.BACK} aria-label="뒤로"></fff-icon-button>
              <fff-searchfield
                size="small"
                placeholder="Android pattern"
                style="flex: 1"
              ></fff-searchfield>
            </fff-flex>
          </fff-flex>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="접근성"
        .texts=${[
          html`
            검색 영역은 ${code('role="search"')}로 감싼다. 스크린리더 사용자가 랜드마크 이동으로
            검색에 바로 닿는다
          `,
          html`
            검색 필드에는 보이는 레이블이 없어도 이름을 준다. ${code('fff-searchfield')}는
            ${code('placeholder')}를 입력 요소의 ${code('aria-label')}로 옮기고, 지우기 버튼에도
            이름을 붙인다
          `,
          html`
            추천·최근 검색어 묶음에는 묶음의 이름을 붙인다. 추천 검색어는 ${code('aria-label')}로,
            최근 검색어는 제목으로 이름을 준다. 삭제 버튼은 어느 검색어를 지우는지 이름으로 알린다
          `,
        ]}
      ></fff-content-section>

      <fff-component-references .items=${searchReferences}></fff-component-references>
    </fff-content-section-list>
  </fff-tab-panel>
`
