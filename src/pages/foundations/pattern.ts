import '@/components/common'
import { html } from 'lit'

import type { SearchField } from '@/components/common/input/semantics/searchfield'
import type { ComponentReferenceItemData } from '@/components/domains/component'
import type { SearchResult, SearchResultSegment } from '@/components/domains/search'
import type { MenuOptionItem, OptionItem } from '@/types'

import { ICON_NAMES } from '@/components/common'
import '@/components/common/text/semantics/read-more-paragraph'
import '@/components/domains/faq'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import '@/components/layouts/app-sidebar/sidebar-section'
import '@/components/domains/component/component-notice'
import { code } from '@/components/domains/component'
import './pattern.css'
import { renderPage } from '@/components/layouts/base-layouts'

const disclosureReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/',
    label: 'WAI-ARIA APG - Disclosure Pattern',
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/components/layout-and-organization/disclosure-controls',
    label: 'Apple HIG - Disclosure Controls',
    external: true,
  },
]

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

const conversationReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://pair.withgoogle.com/guidebook/',
    label: 'Google PAIR - People + AI Guidebook',
    external: true,
  },
  {
    href: 'https://www.microsoft.com/en-us/haxtoolkit/',
    label: 'Microsoft - HAX Toolkit',
    external: true,
  },
  {
    href: 'https://www.w3.org/TR/wai-aria-1.2/#log',
    label: 'WAI-ARIA 1.2 - log role',
    external: true,
  },
]

// 데모라 동작은 연결하지 않는다. 이벤트를 구독해야 중단·재전송·닫기 버튼이 나타난다.
const handleGenerationStop = () => {}
const handleMessageRetry = () => {}
const handleFeedbackDismiss = () => {}

const commerceSizes = ['S', 'M', 'L', 'XL']

const commerceColors = [
  { value: 'black', label: '블랙', color: 'var(--gray800)' },
  { value: 'gray', label: '그레이', color: 'var(--gray400)' },
  { value: 'white', label: '화이트', color: 'var(--gray0)' },
  { value: 'green', label: '그린', color: 'var(--green800)' },
]

const commerceRatingShares = [
  { label: '5점', share: 50, value: '50%' },
  { label: '4점', share: 17, value: '17%' },
  { label: '3점', share: 17, value: '17%' },
  { label: '2점', share: 17, value: '17%' },
  { label: '1점', share: 0, value: '0%' },
]

type PressedItem = HTMLElement & { pressed: boolean; value: string }

// 칩은 각자 토글이지만 옵션은 하나만 고르므로, 눌린 칩 하나만 남기고 선택값을 라벨 옆에 보인다.
const handleOptionChange = (event: Event) => {
  const group = event.currentTarget as HTMLElement
  const selected = event.target as PressedItem
  const valueText = group.parentElement?.querySelector('[data-option-value]')
  if (!valueText) return

  Array.from(group.children).forEach(item => {
    ;(item as PressedItem).pressed = item === selected
  })
  valueText.textContent = selected.getAttribute('aria-label') ?? selected.textContent?.trim() ?? ''
}

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

const collectionOptions: MenuOptionItem[] = [
  { value: 'euljiro', label: '을지로 맛집', description: '장소 12개', emoji: '🍜' },
  { value: 'seongsu', label: '성수 카페', description: '장소 8개', emoji: '☕' },
]

const visibilityOptions: OptionItem[] = [
  { label: '공개', value: 'public' },
  { label: '비공개', value: 'private' },
]

const main = html`
  <fff-main>
    <fff-page-header
      heading="Pattern"
      description="여러 컴포넌트가 이어져 하나의 흐름을 이루는 방식을 정합니다. 같은 흐름은 같은 규칙으로 조립하므로, 사용자는 어느 화면에서든 같은 흐름을 경험합니다."
    ></fff-page-header>

    <fff-page-body>
      <fff-tab-list value="disclosure" variant="text" search-param="tab">
        <fff-tab value="disclosure">Disclosure</fff-tab>
        <fff-tab value="search">Search</fff-tab>
        <fff-tab value="collection">Collection</fff-tab>
        <fff-tab value="conversation">Conversation</fff-tab>
        <fff-tab value="commerce">Commerce</fff-tab>
      </fff-tab-list>

      <fff-tab-panel value="disclosure">
        <fff-content-section-list>
          <fff-paragraph-group>
            <fff-paragraph>
              부차적인 정보를 접어 두었다가 트리거를 눌렀을 때만 펼칩니다. 첫 화면이 제목만으로 짧게
              유지되므로, 사용자는 긴 정보 더미를 훑고 관심 있는 것만 골라 읽습니다.
            </fff-paragraph>
            <fff-paragraph>
              트리거 바로 아래에서 펼쳐지며 뒤의 콘텐츠를 밀어냅니다. 같은 흐름 안의 부가 공개라
              트리거와 내용이 세로로 이어지고, 레이어로 전환하지 않아 사용자는 읽던 자리를 그대로
              유지합니다.
            </fff-paragraph>
            <fff-text-list
              variant="check"
              .texts=${[
                '훑어서 고르는 목록을 접는다. 자주 묻는 질문, 커리큘럼, 필터처럼 항목이 많고 사용자가 그중 일부만 읽는 콘텐츠가 여기에 해당한다',
                '반드시 읽어야 하는 정보는 접은 상태로 제공하지 않는다. 약관·경고·오류처럼 읽지 않으면 사용자가 손해를 보는 정보가 여기에 해당한다. 접는 것 자체가 목적이 되지 않게 한다',
              ]}
            ></fff-text-list>
          </fff-paragraph-group>


          <fff-content-section heading-level="3" heading="펼침 단서">
            <fff-grid columns="3" gap="6">
              <fff-figure-card description="질문·섹션 이름·고른 값처럼 레이블이 내용을 가리키는 트리거 옆에 붙어, 패널 본문·하위 페이지 링크·옵션 목록이 펼쳐진다고 알립니다.">
                <fff-flex slot="figure" align-items="center" gap="6"><fff-flex direction="column" gap="2" align-items="center"><fff-expand-indicator></fff-expand-indicator><fff-caption>접힘</fff-caption></fff-flex><fff-flex direction="column" gap="2" align-items="center"><fff-expand-indicator expanded></fff-expand-indicator><fff-caption>펼침</fff-caption></fff-flex></fff-flex>
                <fff-code-tag slot="tags" tone="blue">fff-expand-indicator</fff-code-tag>
                <fff-code-tag slot="tags">fff-faq-item</fff-code-tag>
                <fff-code-tag slot="tags">fff-sidebar-section</fff-code-tag>
                <fff-code-tag slot="tags">fff-select</fff-code-tag>
<fff-code-tag slot="tags">fff-chat-source</fff-code-tag>
              </fff-figure-card>
              <fff-figure-card description="잘린 텍스트를 펼치는 트리거는 레이블이 상태에 따라 바뀌어 펼침을 알립니다. 문단과 함께 있을 때 사용하며, 문단과 구별하려고 볼드체를 쓰되 행동을 유발하는 버튼처럼 보이게 하지 않습니다.">
                <fff-flex slot="figure" align-items="center" gap="6"><fff-text weight="bold">더 보기</fff-text><fff-text weight="bold">접기</fff-text></fff-flex>
                <fff-code-tag slot="tags" tone="blue">레이블</fff-code-tag>
                <fff-code-tag slot="tags">fff-read-more-button</fff-code-tag>
              </fff-figure-card>
              <fff-figure-card description="아이콘만 있는 트리거는 그 아이콘이 내비게이션 메뉴·오버플로 메뉴·검색 패널이 펼쳐진다고 알립니다.">
                <fff-flex slot="figure" align-items="center" gap="6"><fff-hamburger-button></fff-hamburger-button><fff-more-button></fff-more-button></fff-flex>
                <fff-code-tag slot="tags" tone="blue">아이콘</fff-code-tag>
                <fff-code-tag slot="tags">fff-hamburger-button</fff-code-tag>
                <fff-code-tag slot="tags">fff-more-button</fff-code-tag>
              </fff-figure-card>
            </fff-grid>
          </fff-content-section>

          <fff-content-section heading-level="3" heading="접근성" .texts=${[
            '훑어서 고르는 목록의 트리거는 heading으로 감싼다. 스크린리더가 제목 단위로 질문을 건너뛸 수 있다. heading은 문서 구조만 맡고 트리거의 타이포그래피는 그대로 두며, 레벨은 그 목록이 놓이는 자리에 맞춘다',
            html`
              접힌 내용은 포커스되지 않도록 한다. 시각적으로만 숨기면 화면에 없는 내용이 탭 순서에
              남는다. ${code('inert')}로 포커스와 접근성 트리에서 함께 뺀다
            `,
          ]}></fff-content-section>

          <fff-content-section heading-level="3" heading="컴포넌트 예시">
            <fff-flex direction="column" gap="6">
              <fff-faq-list>
                <fff-faq-item question="서비스를 탈퇴하고 싶어요." open>
                  <fff-paragraph>
                    마이페이지 → 계정 설정 → 회원 탈퇴 순서로 진행하시면 됩니다. 탈퇴 후 30일간
                    데이터가 보관되며 이후 완전히 삭제됩니다.
                  </fff-paragraph>
                </fff-faq-item>
                <fff-faq-item question="결제 영수증은 어디서 확인하나요?">
                  <fff-paragraph>
                    마이페이지 → 결제 내역에서 영수증을 확인하고 다운로드할 수 있습니다.
                  </fff-paragraph>
                </fff-faq-item>
              </fff-faq-list>
              <fff-read-more-paragraph
                max-length="80"
                content="접힌 자리에 앞부분이 남아 있어, 사용자는 이 문단을 계속 읽을지 여기서 멈출지 본문을 보고 정합니다. 훑어 고르는 목록과 달리 문장이 이어지므로 트리거는 문단 끝에 이어 붙습니다."
              ></fff-read-more-paragraph>
              <div role="list">
                <fff-sidebar-section icon=${ICON_NAMES.PALETTE} label="Foundations" open>
                  <fff-sidebar-page-link emoji="#" label="Interaction"></fff-sidebar-page-link>
                  <fff-sidebar-page-link emoji="#" label="Disclosure"></fff-sidebar-page-link>
                </fff-sidebar-section>
              </div>
            </fff-flex>
          </fff-content-section>

          <fff-component-references .items=${disclosureReferences}></fff-component-references>
        </fff-content-section-list>
      </fff-tab-panel>

      <fff-tab-panel value="search">
        <fff-content-section-list>
          <fff-paragraph>
            키워드로 콘텐츠를 찾는 흐름입니다. 진입·포커스·입력·제출 단계마다 최근 검색어와
            추천·자동완성, 결과를 알맞은 때에 보여주므로, 사용자는 검색어를 다 쓰기 전에도 원하는
            것에 닿을 수 있습니다.
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
            </fff-flex direction="column" gap="2">
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
              <fff-search-result-list heading="검색 결과" .results=${searchResults}></fff-search-result-list>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section heading-level="3" heading="검색 결과 없음" description="제출한 검색에 일치하는 결과가 없으면 결과 없음 상태로 추천 검색어를 제안하여 새 검색을 유도한다.">

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

          <fff-content-section heading-level="3" heading="최근 검색어" .texts=${[
            '전체 삭제를 제공하지 않는다. 사용자 데이터를 실수로 한꺼번에 날릴 수 있으므로 항목마다 삭제 버튼을 두고 하나씩만 지우게 한다',
            '어떤 검색 기록을 모으고 어디까지 지울 수 있는지 함께 정한다. 최근 검색어와 맞춤 추천은 모아 둔 기록으로 만들어진다. 최근 검색어만 지우는 것인지, 지금까지의 모든 활동 기록까지 지우는 것인지 사용자에게 알려 준다',
          ]}>
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

          <fff-content-section heading-level="3" heading="추천 검색어" description="검색어를 입력하지 않아도, 사용자가 관심을 가질 만한 키워드를 추천하여 검색을 유도한다.">
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

          <fff-content-section heading-level="3" heading="접근성" .texts=${[
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
          ]}></fff-content-section>

          <fff-component-references .items=${searchReferences}></fff-component-references>
        </fff-content-section-list>
      </fff-tab-panel>

      <fff-tab-panel value="collection">
        <fff-content-section-list>
          <fff-paragraph>
            사용자가 만든 컬렉션에 항목을 담고, 컬렉션을 만들고 함께 관리하는 흐름입니다. 담는 흐름
            안에서 새 컬렉션을 바로 만들 수 있으므로, 사용자는 화면을 벗어나지 않고 항목을 모아 둘 수
            있습니다.
          </fff-paragraph>

          <fff-content-section
            heading-level="3"
            heading="컬렉션에 추가"
            description="항목을 담을 컬렉션을 고르는 화면입니다." .texts=${[
              '한 항목을 여러 컬렉션에 동시에 담게 한다. 이미 담긴 컬렉션은 선택된 채로 열려, 이 항목이 어디에 있는지 바로 보인다',
              '담는 흐름 안에서 새 컬렉션을 바로 만들게 한다. 새 컬렉션을 만든 뒤에는 방금 담으려던 항목이 그 컬렉션에 담긴 채로 돌아온다',
            ]}>
            <fff-component-example width="narrow">
              <fff-flex direction="column" gap="3">
                <fff-top-bar nav="close" heading="컬렉션에 추가">
                  <fff-button slot="action" variant="tertiary">완료</fff-button>
                </fff-top-bar>
                <fff-menu-item-checkbox-group
                  aria-label="컬렉션 선택"
                  gap="1"
                  .options=${collectionOptions}
                  .values=${['euljiro']}
                ></fff-menu-item-checkbox-group>
                <fff-add-button label="새 컬렉션 만들기"></fff-add-button>
              </fff-flex>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="새 컬렉션"
            description="컬렉션의 이름과 공개 범위를 받는 화면입니다."
          >
            <fff-component-example width="narrow">
              <fff-flex direction="column" gap="3">
                <fff-top-bar heading="새 컬렉션">
                  <fff-button slot="action" variant="tertiary">완료</fff-button>
                </fff-top-bar>
                <fff-textfield label="컬렉션 이름" placeholder="컬렉션 이름"></fff-textfield>
                <fff-toggle-button-group
                  .options=${visibilityOptions}
                  value="public"
                ></fff-toggle-button-group>
                <fff-add-button label="이 컬렉션에 멤버 추가"></fff-add-button>
              </fff-flex>
            </fff-component-example>
            <fff-component-notice heading="새 컬렉션 화면의 규칙을 정한다">
              이름과 공개 범위를 받는 기준, 멤버 추가로 이어지는 흐름의 규칙은 아직 정하지 않았다
            </fff-component-notice>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="멤버 추가"
            description="컬렉션을 함께 관리할 멤버를 찾는 화면입니다."
          >
            <fff-component-example width="narrow">
              <fff-flex direction="column" gap="3">
                <fff-top-bar heading="멤버 추가">
                  <fff-button slot="action" variant="tertiary">완료</fff-button>
                </fff-top-bar>
                <fff-textfield label="멤버 검색" placeholder="멤버 이름"></fff-textfield>
              </fff-flex>
            </fff-component-example>
            <fff-component-notice heading="멤버 검색 결과와 선택 방식을 정한다">
              검색 결과를 보여 주고 멤버를 고르는 단계는 아직 정하지 않았다
            </fff-component-notice>
          </fff-content-section>
        </fff-content-section-list>
      </fff-tab-panel>

      <fff-tab-panel value="conversation">
        <fff-content-section-list>
          <fff-paragraph>
            AI와 질문과 답을 주고받는 흐름입니다. 답을 만드는 동안의 진행, 근거, 승인, 평가, 다음
            질문을 정해진 자리에 놓으므로, 사용자는 답을 기다리는 동안에도 지금 무슨 일이 일어나는지
            알 수 있습니다.
          </fff-paragraph>

          <fff-text-block
            level="3"
            heading="응답의 단계"
            description="한 번의 응답은 생성 중, 응답 완료, 다음 입력 순서로 진행하며 단계마다 보이는 요소가 바뀝니다."
          >
            <fff-flex direction="column" gap="2">
              <fff-tag-group>
                <fff-code-tag tone="gold">생성 중</fff-code-tag>
                <fff-code-tag>fff-process-status-list</fff-code-tag>
                <fff-code-tag>fff-prompt-input</fff-code-tag>
              </fff-tag-group>
              <fff-tag-group>
                <fff-code-tag tone="cyan">응답 완료</fff-code-tag>
                <fff-code-tag>fff-ai-chat-bubble</fff-code-tag>
                <fff-code-tag>fff-chat-source</fff-code-tag>
                <fff-code-tag>fff-chat-attachment</fff-code-tag>
                <fff-code-tag>fff-chat-confirmation</fff-code-tag>
              </fff-tag-group>
              <fff-tag-group>
                <fff-code-tag tone="blue">다음 입력</fff-code-tag>
                <fff-code-tag>fff-chat-feedback</fff-code-tag>
                <fff-code-tag>fff-chat-suggestions</fff-code-tag>
                <fff-code-tag>fff-prompt-input</fff-code-tag>
              </fff-tag-group>
            </fff-flex>
          </fff-text-block>

          <fff-content-section
            heading-level="3"
            heading="생성 중"
            description="답이 나오기 전의 기다림을 채우는 단계입니다." .texts=${[
              '진행 단계를 목록으로 보여준다. 아무 변화가 없으면 사용자는 멈춘 것인지 기다려야 하는 것인지 알 수 없다. 끝낸 단계, 진행 중인 단계, 남은 단계를 한 목록에 두어 지금 위치를 알린다',
              html`
                생성을 중단할 수 있게 한다. 잘못 보낸 질문이나 긴 답을 끝까지 기다리게 하면 사용자는
                아무것도 할 수 없다. ${code('fff-prompt-input')}은 ${code('loading')} 동안 전송을
                막고, ${code('stop')} 이벤트를 구독하면 중단 버튼을 보여준다
              `,
            ]}>
            <fff-component-example width="narrow">
              <fff-flex direction="column" gap="4">
                <fff-process-status-list>
                  <fff-process-status variant="success" label="요청을 확인함"></fff-process-status>
                  <fff-process-status label="관련 자료를 탐색함"></fff-process-status>
                  <fff-process-status variant="pending" label="답변 문장 다듬기"></fff-process-status>
                </fff-process-status-list>
                <fff-prompt-input
                  loading
                  placeholder="메시지를 입력하세요..."
                  @stop=${handleGenerationStop}
                ></fff-prompt-input>
              </fff-flex>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="출처"
            description="답변이 어디에 근거하는지 밝히는 자료입니다." .texts=${[
              '근거 자료는 답변 아래에 출처로 붙인다. 답변만 있으면 사용자는 그 내용을 믿어도 되는지 판단할 수 없다. 출처 이름과 설명이 있어야 자료를 열기 전에 어떤 자료인지 알 수 있다',
            ]}>
            <fff-component-example width="narrow">
              <fff-button-group>
                <fff-chat-source
                  href="https://atlassian.design/foundations/design-tokens"
                  heading="Design Tokens – Atlassian Design System"
                  description="Atlassian이 글로벌·앨리어스·컴포넌트 토큰을 어떻게 분리했는지 다룹니다."
                  icon=${ICON_NAMES.BOOK}
                ></fff-chat-source>
                <fff-chat-source
                  href="https://github.com/amzn/style-dictionary"
                  heading="Style Dictionary – Amazon"
                  description="토큰을 플랫폼별 변수로 변환하는 오픈소스 빌드 시스템입니다."
                  label="GitHub"
                  icon=${ICON_NAMES.GITHUB}
                ></fff-chat-source>
              </fff-button-group>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="승인 요청"
            description="AI가 사용자의 데이터를 바꾸는 일을 하기 전에 허락을 구하는 단계입니다." .texts=${[
              '되돌릴 수 없는 작업은 실행하기 전에 승인을 받는다. 삭제처럼 결과를 돌릴 수 없는 일을 사용자 모르게 실행하면 피해를 복구할 수 없다. 승인과 거부를 한 쌍으로 두어 어느 쪽이든 고를 수 있게 한다',
              '요청 문장에 작업의 대상을 구체적으로 적는다. "이 작업" 같은 말로 쓰면 사용자는 무엇을 승인하는지 모른 채 누르게 된다',
            ]}>
            <fff-component-example width="narrow">
              <fff-chat-confirmation
                message="example.txt 파일을 삭제하려고 합니다. 이 작업을 승인하시겠어요?"
              ></fff-chat-confirmation>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="전송 실패"
            description="사용자의 메시지가 전달되지 못했을 때의 단계입니다." .texts=${[
              html`
                실패한 메시지는 그 자리에서 다시 보낸다. 긴 질문을 처음부터 다시 쓰게 하면 사용자는
                보내기를 포기한다. ${code('fff-my-chat-message')}는 ${code('retry')} 이벤트를
                구독하면 실패한 말풍선 곁에 재전송 버튼을 보여준다
              `,
            ]}>
            <fff-component-example width="narrow">
              <fff-my-chat-message @retry=${handleMessageRetry}>
                <fff-my-chat-bubble status="failed">
                  네트워크 오류로 전송에 실패한 메시지입니다.
                </fff-my-chat-bubble>
              </fff-my-chat-message>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="평가"
            description="답이 도움이 되었는지 사용자에게 묻는 단계입니다." .texts=${[
              html`
                평가는 닫을 수 있게 한다. 평가 요청이 남아 있으면 사용자가 답을 읽는 자리를 계속
                차지한다. ${code('dismiss')} 이벤트를 구독하면 닫기 버튼을 보여준다
              `,
            ]}>
            <fff-component-example width="narrow">
              <fff-chat-feedback
                question="이번 대화는 어떤가요?"
                @dismiss=${handleFeedbackDismiss}
              ></fff-chat-feedback>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="다음 질문"
            description="답에 이어서 사용자가 물을 만한 말을 미리 내놓는 단계입니다." .texts=${[
              '다음 질문은 제안 버튼으로 줄여 준다. 빈 입력창 앞에서는 무엇을 물어야 할지 막힌다. 답에 이어질 말을 버튼으로 두면 한 번 눌러 대화를 이어 간다',
            ]}>
            <fff-component-example width="narrow">
              <fff-chat-suggestions>
                <fff-chat-suggestion>다시 설명해 주세요</fff-chat-suggestion>
                <fff-chat-suggestion icon=${ICON_NAMES.DATE}>일정 잡기</fff-chat-suggestion>
                <fff-chat-suggestion>나중에 할게요</fff-chat-suggestion>
              </fff-chat-suggestions>
            </fff-component-example>
          </fff-content-section>

          <fff-component-notice heading="새 메시지의 자동 스크롤 규칙을 정한다">
            바닥에 있으면 따라 내려가고, 위로 올려 둔 상태에서는 새 메시지를 알리는 방식은 아직
            정하지 않았다
          </fff-component-notice>

          <fff-content-section heading-level="3" heading="접근성" .texts=${[
            html`
              대화 영역은 ${code('role="log"')}로 알린다. 스크린리더가 새 메시지를 따로 찾지 않고도
              읽어 준다. ${code('fff-chat-feed')}가 ${code('role="log"')}와 ${code('aria-label')}을
              직접 갖는다
            `,
            html`
              전송 실패는 ${code('role="alert"')}로 즉시 알린다. 화면을 보지 못하는 사용자도
              메시지가 전달되지 않았다는 사실을 바로 알아야 다시 보낼 수 있다
            `,
            html`
              장식 이모지는 ${code('aria-hidden')}으로 가린다. 스크린리더가 이모지 이름을 읽으면
              문장이 끊겨 들린다
            `,
          ]}></fff-content-section>

          <fff-component-references .items=${conversationReferences}></fff-component-references>
        </fff-content-section-list>
      </fff-tab-panel>

      <fff-tab-panel value="commerce">
        <fff-content-section-list>
          <fff-paragraph>
            상품을 살펴보고, 옵션을 고르고, 장바구니에 담아 결제하기까지의 흐름입니다. 구매의 단계마다
            사용자가 판단할 정보를 정해진 자리에 놓으므로, 사용자는 어느 상품에서든 같은 순서로
            확인하고 고를 수 있습니다.
          </fff-paragraph>

          <fff-text-block
            level="3"
            heading="구매의 단계"
            description="구매는 탐색, 선택, 담기, 결제 순서로 진행하며 단계마다 쓰이는 컴포넌트가 달라집니다."
          >
            <fff-flex direction="column" gap="2">
              <fff-tag-group>
                <fff-code-tag tone="gold">탐색</fff-code-tag>
                <fff-code-tag>fff-product-image</fff-code-tag>
                <fff-code-tag>fff-product-price</fff-code-tag>
                <fff-code-tag>fff-review-summary</fff-code-tag>
                <fff-code-tag>fff-review-item</fff-code-tag>
              </fff-tag-group>
              <fff-tag-group>
                <fff-code-tag tone="cyan">선택</fff-code-tag>
                <fff-code-tag>fff-toggle-button</fff-code-tag>
                <fff-code-tag>fff-color-chip</fff-code-tag>
                <fff-code-tag>fff-quantity-field</fff-code-tag>
              </fff-tag-group>
              <fff-tag-group>
                <fff-code-tag tone="blue">담기</fff-code-tag>
                <fff-code-tag>fff-product-purchase-bar</fff-code-tag>
                <fff-code-tag>fff-sheet</fff-code-tag>
              </fff-tag-group>
              <fff-tag-group>
                <fff-code-tag tone="orange">결제</fff-code-tag>
                <fff-code-tag>fff-order-price-summary</fff-code-tag>
              </fff-tag-group>
            </fff-flex>
          </fff-text-block>

          <fff-content-section
            heading-level="3"
            heading="가격"
            description="상품 이름 바로 아래에서 사용자가 가장 먼저 비교하는 정보입니다." .texts=${[
              '정가, 할인가, 할인율을 함께 보여준다. 할인가만 있으면 사용자는 얼마나 싸졌는지 알 수 없다. 정가는 취소선으로 물러나게 하고 할인가를 굵게 두어, 지금 내는 금액이 먼저 읽힌다',
            ]}>
            <fff-component-example width="narrow">
              <fff-product-price
                size="large"
                original-price="₩ 25,000"
                discount="36% 할인"
                price="₩ 16,000"
              ></fff-product-price>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="옵션 선택"
            description="사이즈와 색상처럼 주문에 반영되는 값을 고르는 단계입니다." .texts=${[
              '고른 옵션의 이름을 레이블 옆에 보여준다. 색상 칩은 색만 보여서, 눌러도 어떤 옵션을 골랐는지 확신하기 어렵다',
              '사이즈·색상은 하나만 고르게 한다. 칩 하나하나는 토글이지만 옵션은 하나만 고르는 값이다. 눌린 칩이 둘이면 어느 쪽이 주문되는지 알 수 없으므로 눌린 칩 하나만 남긴다',
            ]}>
            <fff-component-example width="narrow">
              <fff-flex direction="column" gap="4">
                <fff-flex direction="column" gap="2">
                  <fff-flex gap="2">
                    <fff-text>사이즈</fff-text>
                    <fff-text data-option-value>M</fff-text>
                  </fff-flex>
                  <fff-scroll gap="2" hide-scrollbar @change=${handleOptionChange}>
                    ${commerceSizes.map(
                      size => html`
                        <fff-toggle-button value=${size} .pressed=${size === 'M'}>
                          ${size}
                        </fff-toggle-button>
                      `,
                    )}
                  </fff-scroll>
                </fff-flex>
                <fff-flex direction="column" gap="2">
                  <fff-flex gap="2">
                    <fff-text>색상</fff-text>
                    <fff-text data-option-value>블랙</fff-text>
                  </fff-flex>
                  <fff-scroll gap="2" hide-scrollbar @change=${handleOptionChange}>
                    ${commerceColors.map(
                      option => html`
                        <fff-color-chip
                          value=${option.value}
                          color=${option.color}
                          aria-label=${option.label}
                          .pressed=${option.value === 'black'}
                        ></fff-color-chip>
                      `,
                    )}
                  </fff-scroll>
                </fff-flex>
                <fff-quantity-field value="1" min="1" max="99" label="수량"></fff-quantity-field>
              </fff-flex>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="구매 바"
            description="긴 상품 페이지를 읽는 동안에도 구매 버튼이 손 닿는 곳에 있게 하는 고정 영역입니다." .texts=${[
              '본문의 구매 버튼이 보이는 동안에는 구매 바를 숨긴다. 같은 동작이 한 화면에 둘이면 어느 쪽을 눌러야 할지 헷갈리고, 화면 아래 공간만 줄어든다',
              '구매 버튼이 시야를 벗어나면 구매 바로 이어 준다. 긴 상세 설명을 읽다가 구매하려고 맨 위까지 되돌아 올라가지 않아도 된다',
            ]}>
            <fff-component-example width="narrow">
              <fff-product-purchase-bar
                image-src="/src/images/cake_gosum.jpg"
                name="뉴닉이 풀어 쓴 경제상식사전"
                price="₩ 16,000"
                original-price="₩ 25,000"
                discount="36% 할인"
              >
                <fff-button slot="action" variant="primary" size="large">장바구니 추가</fff-button>
              </fff-product-purchase-bar>
            </fff-component-example>
            <fff-component-notice heading="장바구니에 담는 방식을 정한다">
              시트에서 옵션과 수량을 정한 뒤 결제로 이어지는 흐름의 규칙은 아직 정하지 않았다
            </fff-component-notice>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="구간 이동"
            description="상세, 리뷰, 상품정보처럼 길게 이어지는 구간으로 바로 가는 버튼입니다." .texts=${[
              '스크롤 위치에 따라 현재 구간의 버튼을 눌린 상태로 둔다. 구간이 길면 사용자는 지금 어디를 읽는지 잃는다. 버튼이 현재 위치를 알려 주고, 누르면 그 구간으로 이동한다',
            ]}>
            <fff-component-example width="narrow">
              <fff-toggle-button-group
                value="detail"
                .options=${[
                  { value: 'detail', label: '상세' },
                  { value: 'review', label: '리뷰' },
                  { value: 'info', label: '상품정보' },
                ]}
              ></fff-toggle-button-group>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="리뷰"
            description="구매한 사람들의 평가로 상품을 판단하게 하는 구획입니다." .texts=${[
              '요약과 목록은 같은 데이터에서 계산한다. 평균 별점·개수가 아래 목록과 맞지 않으면 사용자는 리뷰 전체를 믿지 못한다',
              '별점 분포의 점수를 눌러 그 점수의 리뷰만 걸러 본다. 낮은 점수부터 확인하려는 사용자가 목록 전체를 넘겨 보지 않아도 된다. 걸러진 결과는 "3점 리뷰 1개"처럼 개수와 범위를 함께 적고, 해당하는 리뷰가 없으면 없다고 알린다',
            ]}>
            <fff-component-example width="narrow">
              <fff-flex direction="column" gap="4">
                <fff-review-summary rating="4" review-count="6"></fff-review-summary>
                <fff-chart-column
                  selectable
                  style="--chart-column-width: var(--size-32)"
                  .items=${commerceRatingShares}
                ></fff-chart-column>
                <fff-review-item
                  rating="5"
                  content="포장이 꼼꼼하고 배송도 빨랐어요. 음질이 기대 이상입니다."
                  author="Beach House"
                  datetime="2021년 2월 14일"
                ></fff-review-item>
              </fff-flex>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section
            heading-level="3"
            heading="Summary"
            description="결제 금액이 어떻게 만들어졌는지 항목별로 보여주는 요약입니다." .texts=${[
              '합계에 이르는 항목을 하나씩 풀어 적는다. 상품금액에 배송료와 할인이 더해진 합계만 보이면 사용자는 왜 그 금액인지 확인할 수 없다',
              '최종 결제 금액을 가장 크게 둔다. 항목이 여러 줄이면 마지막에 내는 돈을 놓치기 쉬우므로 합계의 값만 크기로 구별한다',
            ]}>
            <fff-component-example width="narrow">
              <fff-order-price-summary
                subtotal="₩ 31,900"
                shipping="₩ 3,000"
                discount="-₩ 2,000"
                total="₩ 32,900"
              ></fff-order-price-summary>
            </fff-component-example>
          </fff-content-section>

          <fff-content-section heading-level="3" heading="접근성" .texts=${[
            html`
              정가와 할인가는 ${code('del')}·${code('ins')}로 구분한다. 스크린리더가 어느 금액이
              정가이고 어느 금액이 실제 가격인지 구별해 읽는다. 취소선만으로는 소리로 전달되지
              않는다
            `,
            html`
              별점은 숫자로 읽히게 한다. 별 아이콘은 읽히지 않으므로 ${code('fff-review-summary')}는
              "5점 만점에 4점"을, ${code('fff-review-item')}은 "5점"을 ${code('role="img"')}의
              이름으로 준다
            `,
            html`
              색상 칩에는 색의 이름을 준다. 색만 보이는 칩은 소리로 구별할 수 없으므로
              ${code('aria-label')}로 "블랙"처럼 이름을 붙인다
            `,
            html`
              시트를 여는 버튼은 시트를 가리키고 팝업임을 알린다. ${code('aria-controls')}로 시트를
              가리키고 ${code('aria-haspopup="dialog"')}로 누르면 대화상자가 열린다고 알린다
            `,
          ]}></fff-content-section>
        </fff-content-section-list>
      </fff-tab-panel>
    </fff-page-body>
  </fff-main>
`

renderPage(main)
