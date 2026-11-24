import '@/components/common'
import { html } from 'lit'

import type { SearchField } from '@/components/common/input/semantics/searchfield'
import type { MenuOptionItem, OptionItem } from '@/types'

import { ICON_NAMES } from '@/components/common'
import '@/components/common/text/semantics/read-more-paragraph'
import '@/components/domains/faq'
import '@/components/layouts/app-sidebar/sidebar-page-link'
import '@/components/layouts/app-sidebar/sidebar-section'
import '@/components/domains/component/component-notice'
import { code, rule } from '@/components/domains/component'
import './pattern.css'
import { renderPage } from '@/components/layouts/base-layouts'

const recentSearchKeywords = ['고슴도치', '로얄 테넌바움', '이탈리아 여행']

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
  <mm-main>
    <mm-page-header
      heading="Pattern"
      description="여러 컴포넌트가 이어져 하나의 흐름을 이루는 방식을 정합니다. 펼치고, 찾고, 모으는 흐름을 같은 규칙으로 조립하므로, 사용자는 어느 화면에서든 같은 방식으로 정보를 다룹니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-tab-list value="disclosure" variant="text" search-param="tab">
        <mm-tab value="disclosure">Disclosure</mm-tab>
        <mm-tab value="search">Search</mm-tab>
        <mm-tab value="collection">Collection</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="disclosure">
        <mm-content-section-list>
          <mm-paragraph-group>
            <mm-paragraph>
              부차적인 정보를 접어 두었다가 트리거를 눌렀을 때만 펼칩니다. 첫 화면이 제목만으로 짧게
              유지되므로, 사용자는 긴 정보 더미를 훑고 관심 있는 것만 골라 읽습니다.
            </mm-paragraph>
            <mm-paragraph>
              트리거 바로 아래에서 펼쳐지며 뒤의 콘텐츠를 밀어냅니다. 같은 흐름 안의 부가 공개라
              트리거와 내용이 세로로 이어지고, 레이어로 전환하지 않아 사용자는 읽던 자리를 그대로
              유지합니다.
            </mm-paragraph>
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '훑어서 고르는 목록을 접는다',
                  '자주 묻는 질문, 커리큘럼, 필터처럼 항목이 많고 사용자가 그중 일부만 읽는 콘텐츠가 여기에 해당한다',
                ),
                rule(
                  '반드시 읽어야 하는 정보는 접은 상태로 제공하지 않는다',
                  '약관·경고·오류처럼 읽지 않으면 사용자가 손해를 보는 정보가 여기에 해당한다. 접는 것 자체가 목적이 되지 않게 한다',
                ),
              ]}
            ></mm-text-list>
          </mm-paragraph-group>


          <mm-content-section heading-level="3" heading="펼침 단서">
            <mm-grid columns="3" gap="6">
              <mm-figure-card description="질문·섹션 이름·고른 값처럼 레이블이 내용을 가리키는 트리거 옆에 붙어, 패널 본문·하위 페이지 링크·옵션 목록이 펼쳐진다고 알립니다.">
                <mm-flex slot="figure" align-items="center" gap="6"><mm-flex direction="column" gap="2" align-items="center"><mm-expand-indicator></mm-expand-indicator><mm-caption>접힘</mm-caption></mm-flex><mm-flex direction="column" gap="2" align-items="center"><mm-expand-indicator expanded></mm-expand-indicator><mm-caption>펼침</mm-caption></mm-flex></mm-flex>
                <mm-code-tag slot="tags" tone="blue">mm-expand-indicator</mm-code-tag>
                <mm-code-tag slot="tags">mm-faq-item</mm-code-tag>
                <mm-code-tag slot="tags">mm-sidebar-section</mm-code-tag>
                <mm-code-tag slot="tags">mm-select</mm-code-tag>
<mm-code-tag slot="tags">mm-chat-source</mm-code-tag>
              </mm-figure-card>
              <mm-figure-card description="잘린 텍스트를 펼치는 트리거는 레이블이 상태에 따라 바뀌어 펼침을 알립니다. 문단과 함께 있을 때 사용하며, 문단과 구별하려고 볼드체를 쓰되 행동을 유발하는 버튼처럼 보이게 하지 않습니다.">
                <mm-flex slot="figure" align-items="center" gap="6"><mm-text weight="bold">더 보기</mm-text><mm-text weight="bold">접기</mm-text></mm-flex>
                <mm-code-tag slot="tags" tone="blue">레이블</mm-code-tag>
                <mm-code-tag slot="tags">mm-read-more-button</mm-code-tag>
              </mm-figure-card>
              <mm-figure-card description="아이콘만 있는 트리거는 그 아이콘이 내비게이션 메뉴·오버플로 메뉴·검색 패널이 펼쳐진다고 알립니다.">
                <mm-flex slot="figure" align-items="center" gap="6"><mm-hamburger-button></mm-hamburger-button><mm-more-button></mm-more-button></mm-flex>
                <mm-code-tag slot="tags" tone="blue">아이콘</mm-code-tag>
                <mm-code-tag slot="tags">mm-hamburger-button</mm-code-tag>
                <mm-code-tag slot="tags">mm-more-button</mm-code-tag>
              </mm-figure-card>
            </mm-grid>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="접근성">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '훑어서 고르는 목록의 트리거는 heading으로 감싼다',
                  '스크린리더가 제목 단위로 질문을 건너뛸 수 있다. heading은 문서 구조만 맡고 트리거의 타이포그래피는 그대로 두며, 레벨은 그 목록이 놓이는 자리에 맞춘다',
                ),
                rule(
                  '접힌 내용은 포커스되지 않도록 한다',
                  html`
                    시각적으로만 숨기면 화면에 없는 내용이 탭 순서에 남는다. ${code('inert')}로
                    포커스와 접근성 트리에서 함께 뺀다
                  `,
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="컴포넌트 예시">
            <mm-flex direction="column" gap="6">
              <mm-faq-list>
                <mm-faq-item question="서비스를 탈퇴하고 싶어요." open>
                  <mm-paragraph>
                    마이페이지 → 계정 설정 → 회원 탈퇴 순서로 진행하시면 됩니다. 탈퇴 후 30일간
                    데이터가 보관되며 이후 완전히 삭제됩니다.
                  </mm-paragraph>
                </mm-faq-item>
                <mm-faq-item question="결제 영수증은 어디서 확인하나요?">
                  <mm-paragraph>
                    마이페이지 → 결제 내역에서 영수증을 확인하고 다운로드할 수 있습니다.
                  </mm-paragraph>
                </mm-faq-item>
              </mm-faq-list>
              <mm-read-more-paragraph
                max-length="80"
                content="접힌 자리에 앞부분이 남아 있어, 사용자는 이 문단을 계속 읽을지 여기서 멈출지 본문을 보고 정합니다. 훑어 고르는 목록과 달리 문장이 이어지므로 트리거는 문단 끝에 이어 붙습니다."
              ></mm-read-more-paragraph>
              <div role="list">
                <mm-sidebar-section icon=${ICON_NAMES.PALETTE} label="Foundations" open>
                  <mm-sidebar-page-link emoji="#" label="Interaction"></mm-sidebar-page-link>
                  <mm-sidebar-page-link emoji="#" label="Disclosure"></mm-sidebar-page-link>
                </mm-sidebar-section>
              </div>
            </mm-flex>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="search">
        <mm-content-section-list>
          <mm-paragraph>
            키워드로 콘텐츠를 찾는 흐름입니다. 진입·포커스·입력·제출 단계마다 최근 검색어와
            추천·자동완성, 결과를 알맞은 때에 보여주므로, 사용자는 검색어를 다 쓰기 전에도 원하는
            것에 닿을 수 있습니다.
          </mm-paragraph>
          <mm-content-section heading-level="3" heading="전역 검색 × 지역 검색">
            <mm-surface>
              <mm-flex justify-content="center" wrap="wrap" gap="6">
                <mm-figure-card
                  class="do-dont-card"
                  description="서비스 전체를 찾는 전역 검색은 기본 크기 검색 필드를 쓴다. navbar의 검색 시트처럼 검색이 화면의 주 과제인 자리에 놓여 입력 영역이 먼저 눈에 들어온다."
                >
                  <mm-flex slot="figure" stretch class="search-figure">
                    <mm-searchfield placeholder="컴포넌트, 패턴을 검색하세요"></mm-searchfield>
                  </mm-flex>
                  <mm-code-tag slot="tags">전역 검색</mm-code-tag>
                </mm-figure-card>
                <mm-figure-card
                  class="do-dont-card"
                  description='현재 화면의 목록·표를 좁히는 지역 검색은 size="small" 검색 필드를 쓴다. 대상 콘텐츠 바로 위 툴바에 다른 컨트롤과 나란히 놓여, 콘텐츠보다 앞서지 않는다.'
                >
                  <mm-flex slot="figure" stretch class="search-figure">
                    <mm-searchfield size="small" placeholder="컴포넌트 찾기"></mm-searchfield>
                  </mm-flex>
                  <mm-code-tag slot="tags">지역 검색</mm-code-tag>
                </mm-figure-card>
              </mm-flex>
            </mm-surface>
          </mm-content-section>

          <mm-text-block
            level="3"
            heading="입력할 때 검색"
            description="결과를 바로 받을 수 있는 검색은 키워드가 바뀔 때마다 실행합니다. 현재 화면의 목록을 좁히거나 미리 받아 둔 색인을 찾을 때처럼 응답이 빨라, 입력하는 동안 결과가 그 자리에서 좁혀집니다."
          >
            <mm-flex direction="column" gap="2">
              <mm-tag-group>
                <mm-code-tag tone="gold">기본</mm-code-tag>
                <mm-code-tag>Suggested Searches</mm-code-tag>
              </mm-tag-group>
              <mm-tag-group>
                <mm-code-tag tone="cyan">onFocus</mm-code-tag>
                <mm-code-tag>Recent Searches</mm-code-tag>
                <mm-code-tag>Suggested Searches</mm-code-tag>
              </mm-tag-group>
              <mm-tag-group>
                <mm-code-tag tone="orange">onChange</mm-code-tag>
                <mm-code-tag>Search Results</mm-code-tag>
                <mm-code-tag>Suggested Searches</mm-code-tag>
                <mm-code-tag>Search Autocomplete</mm-code-tag>
              </mm-tag-group>
            </mm-flex>

            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '입력이 멈춘 뒤에 결과를 갱신한다',
                  '글자마다 목록이 바뀌면 화면이 깜빡이고 요청이 쌓인다',
                ),
                rule(
                  html`
                    일치하는 항목이 없으면
                    <mm-code-tag>Search Results</mm-code-tag>
                    자리에 빈 상태를 둔다
                  `,
                  '키워드를 고치면 결과가 바로 돌아오므로 별도 결과 화면으로 이동하지 않는다',
                ),
              ]}
            ></mm-text-list>
          </mm-text-block>

          <mm-text-block
            level="3"
            heading="제출할 때 검색"
            description="요청마다 비용이 큰 검색은 Enter 키나 검색 버튼을 누를 때 실행합니다. 서버에서 전체 결과를 모아 오므로, 입력 중에는 제안만 보여주고 결과는 별도 화면에 모읍니다."
          >
            <mm-flex direction="column" gap="2">
              <mm-tag-group>
                <mm-code-tag tone="orange">onChange</mm-code-tag>
                <mm-code-tag>Search Results</mm-code-tag>
                <mm-code-tag>Suggested Searches</mm-code-tag>
                <mm-code-tag>Search Autocomplete</mm-code-tag>
              </mm-tag-group>
              <mm-tag-group>
                <mm-code-tag tone="blue">onSubmit</mm-code-tag>
                <mm-code-tag>Suggested Searches</mm-code-tag>
                <mm-code-tag>Search Autocomplete</mm-code-tag>
                <mm-code-tag>Search Results Page</mm-code-tag>
              </mm-tag-group>
            </mm-flex direction="column" gap="2">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '입력 중에는 키보드 위에 남는 높이 안에서 제안을 하나 이상 보여준다',
                  '일치하는 제안이 없으면 유사·추천 콘텐츠로 채워 다음에 고를 것을 남기고, 키보드에 가린 제안은 화면에 드러나지 않으므로 개수를 그 높이에 맞춘다',
                ),
                rule(
                  '결과 페이지는 URL로 공유할 수 있게 한다',
                  '같은 URL로 같은 검색 결과를 다시 열 수 있다',
                ),
              ]}
            ></mm-text-list>
          </mm-text-block>

          <mm-content-section heading-level="3" heading="검색 결과 없음" description="제출한 검색에 일치하는 결과가 없으면 결과 없음 상태로 추천 검색어를 제안하여 새 검색을 유도한다.">

            <mm-component-example>
              <mm-result heading="'[키워드]'와(과) 일치하는 내용이 없습니다.">
                <mm-flex justify-content="center">
                <mm-search-suggestion-group aria-label="추천 검색어">
                  <mm-search-suggestion>버튼</mm-search-suggestion>
                  <mm-search-suggestion>버튼 그룹</mm-search-suggestion>
                  <mm-search-suggestion>아이콘 버튼</mm-search-suggestion>
                </mm-search-suggestion-group>
                </mm-flex>
              </mm-result>
            </mm-component-example>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="최근 검색어">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '전체 삭제를 제공하지 않는다',
                  '사용자 데이터를 실수로 한꺼번에 날릴 수 있으므로 항목마다 삭제 버튼을 두고 하나씩만 지우게 한다',
                ),
                rule(
                  '어떤 검색 기록을 모으고 어디까지 지울 수 있는지 함께 정한다',
                  '최근 검색어와 맞춤 추천은 모아 둔 기록으로 만들어진다. 최근 검색어만 지우는 것인지, 지금까지의 모든 활동 기록까지 지우는 것인지 사용자에게 알려 준다',
                ),
              ]}
            ></mm-text-list>
            <mm-component-example width="narrow">
              <mm-flex direction="column" gap="4">
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

          <mm-content-section heading-level="3" heading="추천 검색어" description="검색어를 입력하지 않아도, 사용자가 관심을 가질 만한 키워드를 추천하여 검색을 유도한다.">
            <mm-component-example width="narrow">
              <mm-flex direction="column" gap="3">
                <mm-searchfield
                  id="suggestion-search-field"
                  placeholder="컴포넌트, 패턴을 검색하세요"
                ></mm-searchfield>
                <mm-search-suggestion-group
                  aria-label="추천 검색어"
                  @search-suggestion-select=${handleSuggestionSelect}
                >
                  ${suggestionKeywords.map(
                    keyword => html`
                      <mm-search-suggestion>${keyword}</mm-search-suggestion>
                    `,
                  )}
                </mm-search-suggestion-group>
              </mm-flex>
            </mm-component-example>
            <mm-component-notice heading="검색어 자동완성의 규칙을 정한다">
               추천 검색어와 어떻게 나뉘는지, 키보드로 제안을 고르는 방식을 정하지 않았다
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="검색 바 패턴">
            <mm-component-example width="narrow">
              <mm-flex direction="column" gap="3">
                <mm-flex align-items="center" gap="2">
                  <mm-searchfield
                    size="small"
                    placeholder="iOS pattern"
                    style="flex: 1"
                  ></mm-searchfield>
                  <mm-button variant="secondary">취소</mm-button>
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

          <mm-content-section heading-level="3" heading="접근성">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  html`
                    검색 영역은 ${code('role="search"')}로 감싼다
                  `,
                  '스크린리더 사용자가 랜드마크 이동으로 검색에 바로 닿는다',
                ),
                rule(
                  '검색 필드에는 보이는 레이블이 없어도 이름을 준다',
                  html`
                    ${code('mm-searchfield')}는 ${code('placeholder')}를 입력 요소의
                    ${code('aria-label')}로 옮기고, 지우기 버튼에도 이름을 붙인다
                  `,
                ),
                rule(
                  '추천·최근 검색어 묶음에는 묶음의 이름을 붙인다',
                  html`
                    추천 검색어는 ${code('aria-label')}로, 최근 검색어는 제목으로 이름을 준다. 삭제
                    버튼은 어느 검색어를 지우는지 이름으로 알린다
                  `,
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="collection">
        <mm-content-section-list>
          <mm-paragraph>
            사용자가 만든 컬렉션에 항목을 담고, 컬렉션을 만들고 함께 관리하는 흐름입니다. 담는 흐름
            안에서 새 컬렉션을 바로 만들 수 있으므로, 사용자는 화면을 벗어나지 않고 항목을 모아 둘 수
            있습니다.
          </mm-paragraph>

          <mm-content-section
            heading-level="3"
            heading="컬렉션에 추가"
            description="항목을 담을 컬렉션을 고르는 화면입니다."
          >
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '한 항목을 여러 컬렉션에 동시에 담게 한다',
                  '이미 담긴 컬렉션은 선택된 채로 열려, 이 항목이 어디에 있는지 바로 보인다',
                ),
                rule(
                  '담는 흐름 안에서 새 컬렉션을 바로 만들게 한다',
                  '새 컬렉션을 만든 뒤에는 방금 담으려던 항목이 그 컬렉션에 담긴 채로 돌아온다',
                ),
              ]}
            ></mm-text-list>
            <mm-component-example width="narrow">
              <mm-flex direction="column" gap="3">
                <mm-top-bar nav="close" heading="컬렉션에 추가">
                  <mm-button slot="action" variant="tertiary">완료</mm-button>
                </mm-top-bar>
                <mm-menu-item-checkbox-group
                  aria-label="컬렉션 선택"
                  gap="1"
                  .options=${collectionOptions}
                  .values=${['euljiro']}
                ></mm-menu-item-checkbox-group>
                <mm-add-button label="새 컬렉션 만들기"></mm-add-button>
              </mm-flex>
            </mm-component-example>
          </mm-content-section>

          <mm-content-section
            heading-level="3"
            heading="새 컬렉션"
            description="컬렉션의 이름과 공개 범위를 받는 화면입니다."
          >
            <mm-component-example width="narrow">
              <mm-flex direction="column" gap="3">
                <mm-top-bar heading="새 컬렉션">
                  <mm-button slot="action" variant="tertiary">완료</mm-button>
                </mm-top-bar>
                <mm-textfield label="컬렉션 이름" placeholder="컬렉션 이름"></mm-textfield>
                <mm-toggle-button-group
                  .options=${visibilityOptions}
                  value="public"
                ></mm-toggle-button-group>
                <mm-add-button label="이 컬렉션에 멤버 추가"></mm-add-button>
              </mm-flex>
            </mm-component-example>
            <mm-component-notice heading="새 컬렉션 화면의 규칙을 정한다">
              이름과 공개 범위를 받는 기준, 멤버 추가로 이어지는 흐름의 규칙은 아직 정하지 않았다
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section
            heading-level="3"
            heading="멤버 추가"
            description="컬렉션을 함께 관리할 멤버를 찾는 화면입니다."
          >
            <mm-component-example width="narrow">
              <mm-flex direction="column" gap="3">
                <mm-top-bar heading="멤버 추가">
                  <mm-button slot="action" variant="tertiary">완료</mm-button>
                </mm-top-bar>
                <mm-textfield label="멤버 검색" placeholder="멤버 이름"></mm-textfield>
              </mm-flex>
            </mm-component-example>
            <mm-component-notice heading="멤버 검색 결과와 선택 방식을 정한다">
              검색 결과를 보여 주고 멤버를 고르는 단계는 아직 정하지 않았다
            </mm-component-notice>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
