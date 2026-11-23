import { html } from 'lit'

import { ICON_CATALOG } from '@/components/common'
import { code, rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'
import './content.css'

/** 한 카드로 묶어 보여 줄 짝. 뜻이 서로 맞서는 역할은 나란히 놓아야 대비가 읽힌다. */
const ROLE_PAIRS = [
  ['GRID_VIEW', 'LIST_VIEW'],
  ['HIDE', 'VIEW'],
  ['LIGHT_MODE', 'DARK_MODE'],
  ['COPY', 'COPY_SUCCESS'],
  ['BACK', 'FORWARD'],
  ['PREVIOUS', 'NEXT'],
  ['SCROLL_TOP', 'SCROLL_BOTTOM'],
  ['BOOKMARK', 'BOOKMARK_SELECTED'],
  ['FAVORITE', 'FAVORITE_SELECTED'],
  ['LIKE', 'LIKE_SELECTED'],
  ['TREND_UP', 'TREND_DOWN'],
]

/** 역할 하나 이상을 도형으로, 이름을 code-tag로 단다. */
const renderRoleCard = (roles: [string, string][]) => html`
  <mm-figure-card>
    <mm-flex slot="figure" align-items="center" gap="4">
      ${roles.map(
        ([, name]) =>
          html`
            <mm-icon name=${name}></mm-icon>
          `,
      )}
    </mm-flex>
    ${roles.map(
      ([key]) =>
        html`
          <mm-code-tag slot="tags">${key}</mm-code-tag>
        `,
    )}
  </mm-figure-card>
`

/** 카테고리의 역할을 카드 단위로 묶는다. 짝의 뒤쪽 역할은 앞쪽 카드에 합쳐진다. */
const groupRoles = (icons: Record<string, string>) => {
  const paired = new Set(ROLE_PAIRS.flat())

  return Object.entries(icons)
    .filter(([key]) => !paired.has(key) || ROLE_PAIRS.some(([first]) => first === key))
    .map(([key, name]): [string, string][] => {
      const pair = ROLE_PAIRS.find(([first]) => first === key)
      if (!pair) return [[key, name]]

      return pair.map((role): [string, string] => [role, icons[role]])
    })
}

const renderIconCatalog = () =>
  Object.entries(ICON_CATALOG)
    .filter(([, icons]) => Object.keys(icons).length > 0)
    .map(
      ([category, icons]) => html`
        <mm-content-section heading-level="4" heading=${category}>
          <mm-grid columns="6" column-min-width="4rem" gap="6">
            ${groupRoles(icons).map(renderRoleCard)}
          </mm-grid>
        </mm-content-section>
      `,
    )

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
          <mm-content-section heading-level="3" heading="콜 투 액션">
            <mm-content-section-list size="small">
              <mm-surface>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="트리거 버튼 레이블은 다이얼로그 제목의 동사와 페어링합니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center" gap="2">
                      <mm-heading level="5">저장하지 않고 나갈까요?</mm-heading>
                      <mm-button>나가기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="버튼과 제목의 동사가 다르면 무엇이 열릴지 다시 해석해야 합니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center" gap="2">
                      <mm-heading level="5">저장하지 않고 나갈까요?</mm-heading>
                      <mm-button>닫기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
              </mm-surface>
              <mm-surface>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="실행 결과를 예측할 수 있는 레이블을 씁니다."
                  >
                    <mm-flex slot="figure" align-items="center" gap="3">
                      <mm-button>장바구니에 담기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="레이블만으로 결과가 전해지지 않으면 눌러 보기 전에는 알 수 없습니다."
                  >
                    <mm-flex slot="figure" align-items="center" gap="3">
                      <mm-button>확인</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
              </mm-surface>
              <mm-surface>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="질문은 부정어로 만들지 않고, 실행 레이블은 사용자 시점의 동사로 씁니다."
                  >
                    <mm-flex slot="figure" align-items="center" gap="3">
                      <mm-heading level="5">변경 사항을 저장할까요?</mm-heading>
                      <mm-button>저장</mm-button>
                      <mm-button>취소</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="부정어 질문에 예·아니오로 답하게 하면 어느 쪽이 실행인지 헷갈립니다."
                  >
                    <mm-flex slot="figure" align-items="center" gap="3">
                      <mm-heading level="5">저장하지 않고 나갈까요?</mm-heading>
                      <mm-button>예</mm-button>
                      <mm-button>아니오</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
              </mm-surface>
              <mm-surface>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="사용자가 하는 일의 관점에서 받는 쪽으로 이름 짓습니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center">
                      <mm-caption>쿠폰</mm-caption>
                      <mm-button>받기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="시스템이 하는 일의 관점에서 보내는 쪽으로 이름 지으면 사용자가 하는 일이 가려집니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center">
                      <mm-caption>쿠폰</mm-caption>
                      <mm-button>보내기</mm-button>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
              </mm-surface>
              <mm-component-notice heading="어조 규칙을 정한다">
                말하는 쪽에 따라 어조를 나눈다는 원칙만 있다. 시스템이 말하는 문구와 사용자 행동을
                가리키는 문구를 각각 어떤 어미로 쓰는지 정하지 않았다
              </mm-component-notice>
            </mm-content-section-list>
          </mm-content-section>

          <mm-content-section heading-level="3" heading="제목">
            <mm-text-list
              variant="check"
              .texts=${[
                '텍스트는 짧게 유지하고 훑어볼 수 있는 덩어리로 나눈다',
                '간결한 문구는 사용자가 서비스를 이해하고 다룰 수 있다는 신뢰를 만든다',
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

          <mm-content-section heading-level="3" heading="분류명">
            <mm-content-section-list size="small">
              <mm-surface>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="나열되는 값은 tag로 끊어, 훑는 것만으로 구분됩니다."
                  >
                    <mm-keyword-tag-group
                      slot="figure"
                      .keywords=${['무선', '블루투스', '방수']}
                    ></mm-keyword-tag-group>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="문장·쉼표·슬래시로 이으면 값의 경계가 흐려져 하나씩 읽어야 구분됩니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center" gap="1">
                      <mm-paragraph>무선이고 블루투스를 지원하며 방수가 됩니다</mm-paragraph>
                      <mm-paragraph>무선, 블루투스, 방수</mm-paragraph>
                      <mm-paragraph>무선/블루투스/방수</mm-paragraph>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
              </mm-surface>
              <mm-surface>
                <mm-flex justify-content="center" wrap="wrap" gap="6">
                  <mm-figure-card
                    class="do-dont-card"
                    description="분류명은 제목 위 캡션으로 나눠, 제목만 훑어도 핵심이 보입니다."
                  >
                    <mm-flex slot="figure" direction="column" align-items="center">
                      <mm-caption>결제</mm-caption>
                      <mm-heading level="4">카드 간편결제</mm-heading>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="green">Do</mm-code-tag>
                  </mm-figure-card>

                  <mm-figure-card
                    class="do-dont-card"
                    description="대시로 이으면 두 이름이 한 덩어리로 읽혀 핵심이 묻힙니다."
                  >
                    <mm-flex slot="figure" align-items="center">
                      <mm-heading level="4">결제 - 카드 간편결제</mm-heading>
                    </mm-flex>
                    <mm-code-tag slot="tags" tone="red">Don't</mm-code-tag>
                  </mm-figure-card>
                </mm-flex>
              </mm-surface>
            </mm-content-section-list>
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
          <mm-content-section-list size="small">
            <mm-paragraph>
              아이콘은 장식으로 쓰지 않습니다. 좁은 공간에서 레이블을 대신하거나 인접한 시각 정보
              더미에서 상태와 행동 가능성을 분명히 할 때 사용합니다.
            </mm-paragraph>

            <mm-content-section heading-level="3" heading="하나의 아이콘, 하나의 의미">
              <mm-paragraph>
                같은 아이콘을 맥락마다 다른 뜻으로 재사용하지 않습니다. 의미가 흔들리면 사용자가
                매번 다시 해석해야 합니다.
              </mm-paragraph>
            </mm-content-section>

            <mm-content-section heading-level="3" heading="중복 표현하지 않기">
              <mm-paragraph>
                보이는 레이블이 이미 가리키는 것을 아이콘으로 되풀이하지 않습니다. 남는 아이콘은
                뜻을 지니면 대체 텍스트를 주고, 순수한 장식이면 접근성 트리에서 숨깁니다.
              </mm-paragraph>
            </mm-content-section>

            <mm-content-section heading-level="3" heading="대비가 필요할 때 쓰기">
              <mm-paragraph>
                형제 항목 목록에서 대비가 필요하거나 사용자의 실수를 막을 수 있을 때 아이콘을
                사용합니다.
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
          </mm-content-section-list>

          <mm-content-section heading-level="3" heading="쓰이는 아이콘">
            <mm-paragraph>
              역할은 ${code('icon-names.ts')}의 ${code('ICON_CATALOG')} 한 곳에서만 정의합니다.
              아이콘이 필요한 곳은 이를 펼친 맵 ${code('ICON_NAMES')}에서 가져옵니다. 파일 이름을
              코드에 직접 적지 않고, 여러 역할이 같은 파일을 써도 합치지 않으며 역할이 갈라지면 그
              역할의 값만 바꿉니다.
            </mm-paragraph>
            <mm-content-section-list>${renderIconCatalog()}</mm-content-section-list>
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
