import { html, nothing } from 'lit'

import { ICON_CATALOG } from '@/components/common'
import { code, rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

/** 브랜드 표기처럼 대소문자가 고정된 이름만 예외로 둔다. */
const ICON_LABELS: Record<string, string> = {
  GITHUB: 'GitHub',
}

const toIconLabel = (key: string) =>
  ICON_LABELS[key] ?? key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' ')

const renderIconGrid = (entries: [string, string][]) => html`
  <mm-grid columns="6" column-min-width="120px">
    ${entries.map(
      ([label, name]) => html`
        <mm-flex direction="column" align-items="center" gap="2">
          <mm-icon name=${name} size="large" aria-hidden="true"></mm-icon>
          <mm-text size="12">${label}</mm-text>
        </mm-flex>
      `,
    )}
  </mm-grid>
`

/**
 * 목록으로 전시하는 역할의 뜻. 같은 파일을 쓰는 역할(DISMISS·CLOSE 등)도 뜻이 다르면 따로 적고,
 * 쓰는 곳이 뜻을 가르는 역할에만 usage를 붙인다.
 */
const ROLE_DETAIL: Record<string, { description: string; usage?: string[] }> = {
  ADD: { description: '항목을 하나 더하거나 값을 하나 올립니다.' },
  ADD_CIRCLE: { description: '새 항목을 추가하는 흐름을 시작합니다.' },
  DISMISS: {
    description: '사용자가 띄운 부가 창을 걷어냅니다.',
    usage: ['배너', '알림', '토스트'],
  },
  CLOSE: {
    description: '열려 있던 창을 닫습니다.',
    usage: ['모달', '패널', '시트'],
  },
  COPY: { description: '내용을 클립보드에 복사합니다.' },
  COPY_SUCCESS: { description: '복사가 끝났음을 복사 버튼 자리에서 잠깐 알립니다.' },
  DELETE: { description: '항목을 삭제합니다.' },
  FILTER: { description: '목록을 걸러 볼 조건을 엽니다.' },
  IMPORT: { description: '파일이나 데이터를 가져옵니다.' },
  LOG_OUT: { description: '계정에서 로그아웃합니다.' },
  MORE_ACTIONS: { description: '항목에 걸린 추가 동작 메뉴를 엽니다.' },
  SHOW_MORE: { description: '가려진 나머지 항목을 더 보여 줍니다.' },
  REFRESH: { description: '최신 내용으로 다시 불러옵니다.' },
  RETRY: { description: '실패한 작업을 다시 시도합니다.' },
  SETTINGS: { description: '설정 화면을 엽니다.' },
  SUBMIT: { description: '입력한 내용을 보냅니다.' },
  SHARE: { description: '항목을 다른 곳으로 공유합니다.' },
  CAMERA: { description: '사진을 찍거나 이미지를 첨부합니다.' },
  HIDE: { description: '보이던 값을 가립니다.' },
  VIEW: { description: '가려진 값을 보여 줍니다.' },
  THUMBS_UP: { description: '응답이 좋았다고 평가합니다.' },
  DISLIKE: { description: '응답이 좋지 않았다고 평가합니다.' },
  GRID_VIEW: { description: '항목을 그리드로 펼쳐 보여 줍니다.' },
  LIST_VIEW: { description: '항목을 한 줄씩 목록으로 보여 줍니다.' },
  BACK: { description: '이전 화면으로 돌아갑니다.' },
  EXPAND: { description: '접힌 내용을 펼칩니다.' },
  FORWARD: { description: '다음 화면으로 넘어갑니다.' },
  HOME_PAGE: { description: '서비스의 첫 화면으로 이동합니다.' },
  MENU: { description: '내비게이션 메뉴를 엽니다.' },
  PREVIOUS: { description: '순서상 이전 항목으로 갑니다.' },
  NEXT: { description: '순서상 다음 항목으로 갑니다.' },
  SCROLL_TOP: { description: '페이지 맨 위로 올라갑니다.' },
  ERROR: { description: '오류나 수정이 필요한 상태를 나타냅니다.' },
  DONE: { description: '작업이 끝나 더 진행할 것이 없음을 나타냅니다.' },
  INFO: { description: '참고할 보조 정보를 나타냅니다.' },
  SUCCESS: { description: '작업이 성공했음을 나타냅니다.' },
  WARNING: { description: '진행 전에 주의가 필요함을 나타냅니다.' },
  FAILURE: { description: '데이터를 가져오지 못했음을 나타냅니다.' },
  IDLE: { description: '아직 아무 요청도 하지 않은 대기 상태를 나타냅니다.' },
  APPLE: { description: 'Apple 계정으로 로그인하는 흐름을 나타냅니다.' },
  FACEBOOK: { description: 'Facebook 계정이나 프로필 링크를 나타냅니다.' },
  FIGMA: { description: 'Figma에서 나온 자료를 나타냅니다.' },
  GITHUB: { description: 'GitHub 프로필이나 저장소를 나타냅니다.' },
  GOOGLE: { description: 'Google 계정으로 로그인하는 흐름을 나타냅니다.' },
  NOTION: { description: 'Notion 페이지나 워크스페이스를 나타냅니다.' },
  PINTEREST: { description: 'Pinterest 프로필이나 보드를 나타냅니다.' },
  BRUTAL_MODE: { description: '브루탈 테마를 고릅니다.' },
  DARK_MODE: { description: '어두운 테마를 고릅니다.' },
  GLASS_MODE: { description: '글래스 테마를 고릅니다.' },
  LIGHT_MODE: { description: '밝은 테마를 고릅니다.' },
  PALETTE: { description: '색 토큰과 팔레트를 나타냅니다.' },
}

const renderUsage = (usage: string[]) => {
  if (usage.length === 1) {
    return html`
      <mm-keyword-tag slot="trailing">${usage[0]}</mm-keyword-tag>
    `
  }

  return html`
    <mm-keyword-tag-group slot="trailing" .keywords=${usage}></mm-keyword-tag-group>
  `
}

const renderRoleItem = ([key, name]: [string, string]) => {
  const detail = ROLE_DETAIL[key]

  return html`
    <mm-list-item
      icon=${name}
      size="medium"
      label=${key.toLowerCase().replace(/_/g, ' ')}
      description=${detail?.description ?? ''}
    >
      ${detail?.usage ? renderUsage(detail.usage) : nothing}
    </mm-list-item>
  `
}

const renderRoleList = (icons: Record<string, string>) => html`
  <mm-list-item-group>${Object.entries(icons).map(renderRoleItem)}</mm-list-item-group>
`

/** 역할을 목록으로 전시하는 그룹. 나머지는 아이콘 그리드로 둔다. */
const ROLE_LIST_CATEGORIES = ['actions', 'navigations', 'status', 'brand', 'theme']

const renderIconCatalog = () => [
  ...Object.entries(ICON_CATALOG)
    .filter(([, icons]) => Object.keys(icons).length > 0)
    .map(
      ([category, icons]) => html`
        <mm-surface>
          <mm-content-section heading-level="4" heading=${category}>
            ${ROLE_LIST_CATEGORIES.includes(category)
              ? renderRoleList(icons)
              : renderIconGrid(
                  Object.entries(icons).map(([key, name]) => [toIconLabel(key), name]),
                )}
          </mm-content-section>
        </mm-surface>
      `,
    ),
]

const termRows = html`
  <tr>
    <th scope="row">Message</th>
    <td>사용자의 관점에서 다음에 할 일을 알려주는 문구</td>
    <td>"확인 후 진행해주세요"</td>
  </tr>
  <tr>
    <th scope="row">Description</th>
    <td>시스템을 주어로 대상이 무엇을 하는지 서술하는 설명</td>
    <td>"이 컴포넌트는 ~를 수행합니다"</td>
  </tr>
  <tr>
    <th scope="row">Label</th>
    <td>
      대상을 가리키는 이름. 화면에서의 위치가 아니라 대상이 이미 갖고 있는 이름을 그대로 쓰고, 추가
      설명은 ${code('description')}으로 나눈다
    </td>
    <td>목록 행의 사람 이름, 설정 항목의 이름</td>
  </tr>
  <tr>
    <th scope="row">Heading</th>
    <td>구획·표면·메시지의 제목. 아래에 오는 내용을 한 구로 가리킨다</td>
    <td>섹션 제목, 다이얼로그 제목</td>
  </tr>
  <tr>
    <th scope="row">Placeholder</th>
    <td>값을 입력하기 전 필드 안에 보이는 안내</td>
    <td>"컴포넌트, 패턴을 검색하세요"</td>
  </tr>
  <tr>
    <th scope="row">Validation text</th>
    <td>입력값이 규칙을 어긴 이유를 필드 아래에서 알리는 문구</td>
    <td>"이미 등록된 이메일입니다."</td>
  </tr>
  <tr>
    <th scope="row">Interaction Label</th>
    <td>동작을 가리키는 짧은 한글 레이블</td>
    <td>보내기 → 받기</td>
  </tr>
`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Content"
      description="텍스트의 이름과 어조, 아이콘의 뜻을 정합니다. 훑어 읽는 콘텐츠를 한 곳에서 정하므로, 사용자는 어디서든 같은 말과 기호를 같은 뜻으로 읽습니다."
    ></mm-page-header>

    <mm-page-body>
      <mm-tab-list value="writing" variant="text" search-param="tab">
        <mm-tab value="writing">Writing</mm-tab>
        <mm-tab value="iconography">Iconography</mm-tab>
        <mm-tab value="accessibility">Accessibility</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="writing">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="Overview" data-kr="개요/훑어읽기">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '텍스트는 짧게 유지하고 훑어볼 수 있는 덩어리로 나눈다',
                  '간결한 문구는 사용자가 서비스를 이해하고 다룰 수 있다는 신뢰를 만든다',
                ),
                rule(
                  '분류·속성·키워드처럼 나열되는 값은 tag로 끊어 보인다',
                  '문장으로 풀지 않아 훑는 것만으로 구분된다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="관점에 맞는 이름">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '어조는 화자에 맞춘다',
                  '시스템이 안내하는 문구인지, 사용자가 누르는 행동인지로 나눈다. 실행 레이블은 사용자 시점의 동사로 쓴다',
                ),
                rule('레이블을 말줄임표로 줄이지 않고 고쳐 쓴다'),
                rule('트리거 버튼 레이블은 다이얼로그 제목의 동사와 페어링한다'),
                rule('질문은 부정어로 만들지 않는다'),
                rule(
                  '실행 결과를 예측할 수 있는 레이블을 쓴다',
                  '레이블만으로 결과가 전해지면 툴팁이나 보조 텍스트 같은 별도 안내가 필요하지 않다',
                ),
              ]}
            ></mm-text-list>
            <mm-component-notice heading="어조 규칙을 정한다">
              말하는 쪽에 따라 어조를 나눈다는 원칙만 있다. 시스템이 말하는 문구와 사용자 행동을
              가리키는 문구를 각각 어떤 어미로 쓰는지 정하지 않았다
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="작은 화면의 행갈이">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '태그라인의 행갈이는 작성 단계에서 정한다',
                  '글자 또는 단어의 수를 제한하고 개행 조건을 정의해, 작은 화면에서도 인상을 남긴다',
                ),
              ]}
            ></mm-text-list>
            <mm-component-notice heading="잘린 제목의 전체를 보여주는 방법을 정한다">
              폴더블·워치처럼 화면이 점점 작아져 제목이 잘릴 수 있다. 자를지 여부보다, 잘렸을 때
              사용자가 전체 제목을 확인하는 방법이 필요하다.
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="제목과 분류명">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '핵심 이름은 제목으로, 분류명은 제목 위 캡션으로 둔다',
                  '괄호나 대시로 이으면 두 이름이 한 덩어리로 읽혀 무엇이 핵심인지 훑는 눈이 멈춘다. 캡션으로 나누면 분류는 맥락으로 읽히고 제목만 훑어도 핵심이 보인다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="용어">
            <mm-content-section heading-level="4" heading="텍스트 단위">
              <mm-paragraph>
                단어(word) → 구(phrase) → 문장(sentence) → 문단(paragraph)
              </mm-paragraph>
            </mm-content-section>

            <mm-table
              .rows=${termRows}
              caption="텍스트 용어의 뜻과 예"
              .columns=${[
                { label: '용어', width: '150px' },
                { label: '뜻', width: '340px' },
                { label: '예', width: '200px' },
              ]}
            ></mm-table>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="iconography">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="원칙">
            <mm-paragraph>
              아이콘은 장식으로 쓰지 않습니다. 좁은 공간에서 레이블을 대신하거나 인접한 시각 정보
              더미에서 상태와 행동 가능성을 분명히 할 때 사용합니다.
            </mm-paragraph>

            <mm-content-section heading-level="4" heading="하나의 아이콘, 하나의 의미">
              <mm-paragraph>
                같은 아이콘을 맥락마다 다른 뜻으로 재사용하지 않습니다. 의미가 흔들리면 사용자가
                매번 다시 해석해야 합니다.
              </mm-paragraph>
            </mm-content-section>

            <mm-content-section heading-level="4" heading="중복 표현하지 않기">
              <mm-paragraph>
                보이는 레이블이 이미 온전히 가리키는 것을 아이콘으로 되풀이하지 않습니다. 레이블이
                붙은 텍스트필드에는 뜻이 겹치는 장식 아이콘을 더하지 않습니다. 아이콘이 여는 방식을
                암시하는 자리도, 값의 형식을 글로 보이면(날짜 필드의 YYYY. MM. DD.) 그 글이 더
                명료해 아이콘은 다시 중복이 됩니다. 남는 아이콘은 뜻을 지니면 대체 텍스트를 주고,
                순수한 장식이면 접근성 트리에서 숨깁니다. 다만 형제 항목 목록에서 대비가 필요하거나
                사용자의 실수를 막을 수 있을 때는 예외로 둡니다.
              </mm-paragraph>
            </mm-content-section>

            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '널리 통용되는 기호를 쓴다',
                  '낯선 기호는 사용자가 뜻을 매번 다시 해석해야 한다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="쓰이는 아이콘">
            <mm-paragraph>
              역할은 ${code('icon-names.ts')}의 ${code('ICON_CATALOG')} 한 곳에서만 정의합니다. 키가
              역할이고 값이 그 역할이 지금 쓰는 iconoir 아이콘 이름이며, 아이콘이 필요한 곳은 이를
              펼친 ${code('ICON_NAMES')}로 가져옵니다. 파일 이름을 코드에 직접 적지 않고, 여러
              역할이 같은 파일을 써도 합치지 않으며 역할이 갈라지면 그 역할의 값만 바꿉니다. 역할이
              없는 이모지나 문자 기호는 이 맵에 넣지 않고 ${code('emoji')}로 넘깁니다.
            </mm-paragraph>
            ${renderIconCatalog()}
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>

      <mm-tab-panel value="accessibility">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="이름">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '화면에 글자가 없어도 버튼의 이름을 들을 수 있게 한다',
                  '아이콘만 보이는 버튼은 보조기술 사용자에게 이름이 전해지지 않으면 무엇을 하는 버튼인지 알 수 없다',
                ),
                rule(
                  '묶음 전체에 항상 이름을 준다',
                  "옵션 레이블만으로는 무엇에 대한 선택인지 알 수 없어서, 이름이 없으면 보조기술 사용자는 '왼쪽·가운데·오른쪽'을 듣고도 무엇을 고르는지 알 수 없다. '텍스트 정렬'처럼 선택의 주제를 이름으로 적는다",
                ),
                rule(
                  html`
                    아이콘만 보여줄 때는 그룹에 ${code('hidden-label')}을 켠다
                  `,
                  html`
                    ${code('label')}이 화면 텍스트 대신 ${code('aria-label')}로 옮겨진다
                  `,
                ),
                rule(
                  '레이블에는 선택지 이름만 쓴다',
                  html`
                    선택 여부는 ${code('aria-pressed')} · ${code('checked')} ·
                    ${code('aria-selected')}가 전달한다
                  `,
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="팝업을 여는 트리거">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '트리거는 어떤 패널이 열리는지 미리 알린다',
                  html`
                    누르기 전에 스크린리더가 열릴 패널을 안내해야, 사용자가 열린 뒤의 조작을 예상할
                    수 있다. 열리는 내용에 맞는 값을 ${code('aria-haspopup')}으로 준다
                  `,
                ),
                rule(
                  '메뉴를 여는 트리거는 menu로 둔다',
                  html`
                    ${code('aria-haspopup="menu"')}
                  `,
                ),
                rule(
                  '옵션 목록을 여는 트리거는 listbox로 둔다',
                  html`
                    ${code('aria-haspopup="listbox"')}
                  `,
                ),
                rule(
                  '설정 컨트롤을 넣은 패널은 열림 여부만 알린다',
                  html`
                    토글·슬라이더 같은 컨트롤을 넣은 패널은 menu·listbox 어느 쪽에도 맞지 않는다.
                    ${code('aria-haspopup')}을 빼고 ${code('aria-expanded')}만 둔다
                  `,
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="팝업의 포커스">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '열 때 포커스를 overlay 안으로 옮긴다',
                  '포커스가 밖에 남으면 키보드·스크린리더 사용자는 overlay가 열린 줄 모르고 뒤 화면을 헤맨다',
                ),
                rule(
                  '닫을 때 포커스를 열기 직전 자리로 되돌린다',
                  '하던 자리에서 이어 갈 수 있고, 닫힌 overlay에 포커스가 남아 사라지는 일도 없다',
                ),
                rule(
                  '비모달은 바깥을 눌러 닫을 때 포커스를 되돌리지 않는다',
                  '눌린 요소가 이미 포커스를 받았는데 트리거로 되돌리면 사용자가 방금 고른 곳에서 포커스를 빼앗는다',
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="선택 그룹의 키보드">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '그룹은 Tab 한 번으로 들어가고 화살표 키로 항목 사이를 옮긴다',
                  html`
                    Tab으로 그룹에 들어오면 선택된 항목에 포커스가 놓이고, 끝 항목에서 화살표를 더
                    눌러도 멈춘다. ${code('RovingFocusController')}가 이 동작을 맡으며
                    ${code('mm-toggle-button-group')} · ${code('mm-filter-button-group')} ·
                    ${code('mm-menu-item-group')} · ${code('mm-select')}의 옵션 목록이 같은 방식을
                    쓴다. ${code('mm-tab-list')}만 끝에서 반대편 끝으로 이어진다
                  `,
                ),
                rule(
                  '버튼 그룹은 Space·Enter가 선택을 확정한다',
                  html`
                    화살표 키는 포커스만 옮기고, Space·Enter가 버튼을 눌러 선택을 바꾼다.
                    ${code('mm-toggle-button-group')} · ${code('mm-filter-button-group')}이 이
                    방식을 따른다
                  `,
                ),
                rule(
                  'radio 목록은 포커스를 옮기면 곧 선택된다',
                  html`
                    ${code('mm-menu-item-radio-group')}과 네이티브 radio는 이동이 선택이다.
                    ${code('mm-tab-list')}도 이동이 선택이라 Enter·Space 없이 방향키만으로 탭이
                    바뀐다
                  `,
                ),
              ]}
            ></mm-text-list>
          </mm-content-section>
        </mm-content-section-list>
      </mm-tab-panel>
    </mm-page-body>
  </mm-main>
`

renderPage(main)
