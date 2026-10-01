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

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="writing" variant="text" search-param="tab">
        <mm-tab value="writing">Writing</mm-tab>
        <mm-tab value="iconography">Iconography</mm-tab>
      </mm-tab-list>

      <mm-tab-panel value="writing">
        <mm-content-section-list>
          <mm-content-section heading-level="3" heading="훑어 읽기">
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
                  '문구를 말하는 쪽에 따라 이름과 어조를 맞춘다',
                  '시스템이 안내하는 문구인지, 사용자가 누르는 행동인지로 나눈다. 실행 레이블은 사용자 시점의 동사로 쓴다',
                ),
                rule(
                  '레이블이 잘리면 말줄임표 대신 문구를 다시 쓴다',
                  '말줄임표로 감추거나 글자를 줄여 표시하지 않고, 더 짧은 문구로 고쳐 전체가 보이게 한다',
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
              사용자가 전체 제목을 확인하는 방법을 정하지 않았다
            </mm-component-notice>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="주목이 필요한 콘텐츠">
            <mm-text-list
              variant="check"
              .texts=${[
                rule(
                  '상태 변화·결과·맥락 전환을 전달하는 콘텐츠 모듈은 가운데 정렬한다',
                  '주변 콘텐츠와 대비를 만들어 사용자의 주의를 끌어온다',
                ),
              ]}
            ></mm-text-list>
            <mm-paragraph>
              완료·오류·빈 상태를 보여 주는 ${code('mm-result')}가 이 규칙을 따릅니다.
            </mm-paragraph>
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
              아이콘은 장식으로 쓰지 않고 레이블을 보완하거나, 좁은 공간에서 레이블을 대신하거나,
              상태와 행동 가능성을 분명히 할 때 사용합니다. 널리 통용되는 기호만 쓰고 새 의미를
              임의로 붙이지 않습니다.
            </mm-paragraph>

            <mm-content-section heading-level="4" heading="하나의 아이콘, 하나의 의미">
              <mm-paragraph>
                같은 아이콘을 맥락마다 다른 뜻으로 재사용하지 않습니다. 의미가 흔들리면 사용자가
                매번 다시 해석해야 합니다. 뜻은 컴포넌트가 아니라 제품 전체에서 일관합니다.
              </mm-paragraph>
            </mm-content-section>

            <mm-content-section heading-level="4" heading="중복 표현하지 않기">
              <mm-paragraph>
                보이는 레이블이 이미 온전히 가리키는 것을 아이콘으로 되풀이하지 않습니다. 레이블이
                붙은 텍스트필드에는 뜻이 겹치는 장식 아이콘을 더하지 않습니다. 아이콘이 여는 방식을
                암시하는 자리도, 값의 형식을 글로 보이면(날짜 필드의 YYYY. MM. DD.) 그 글이 더
                명료해 아이콘은 다시 중복이 됩니다. 남는 아이콘은 뜻을 지니면 대체 텍스트를 주고,
                순수한 장식이면 접근성 트리에서 숨깁니다.
              </mm-paragraph>
            </mm-content-section>
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
    </mm-flex>
  </mm-main>
`

renderPage(main)
