import { html } from 'lit'

export const worksSheet = html`
  <mm-sheet id="sheet-etc-works" placement="bottom" width="large" height="90vh">
    <mm-sheet-header heading="스터디움 프로모션 웹사이트"></mm-sheet-header>
    <mm-sheet-body>
      <mm-flex direction="column" gap="3">
        <mm-thumbnail
          ratio="full"
          src="/src/images/work-studium.jpg"
          alt="스터디움 프로모션 웹사이트 화면"
        ></mm-thumbnail>
        <mm-paragraph size="large">페이머스 프로덕트 디자인</mm-paragraph>
        <mm-thumbnail
          ratio="full"
          src="/src/images/work-famus.jpg"
          alt="페이머스 프로덕트 디자인 화면"
        ></mm-thumbnail>
        <mm-paragraph size="large">한국문화예술위원회 창작산실 - 올해의 신작 2018</mm-paragraph>
        <mm-paragraph>보름 남짓한 일정. 워드프레스로 개발.</mm-paragraph>
        <mm-thumbnail
          ratio="full"
          src="/src/images/arko-main.jpg"
          alt="올해의 신작 2018 메인 화면"
        ></mm-thumbnail>
        <mm-thumbnail
          ratio="full"
          src="/src/images/arko-sub.jpg"
          alt="올해의 신작 2018 서브 화면"
        ></mm-thumbnail>
      </mm-flex>
    </mm-sheet-body>
  </mm-sheet>
`

export const letteringSheet = html`
  <mm-sheet id="sheet-lettering" placement="bottom" width="large" height="90vh">
    <mm-sheet-header heading="레터링"></mm-sheet-header>
    <mm-sheet-body>
      <mm-flex direction="column" gap="3">
        <mm-thumbnail
          ratio="full"
          src="/src/images/budha.png"
          alt="부처를 모티브로 한 레터링 작업"
        ></mm-thumbnail>
        <mm-thumbnail
          ratio="full"
          src="/src/images/lettering.png"
          alt="레터링 작업물"
        ></mm-thumbnail>
      </mm-flex>
    </mm-sheet-body>
  </mm-sheet>
`

export const flatSitemapSheet = html`
  <mm-sheet id="sheet-flat_sitemap" placement="bottom" width="large" height="90vh">
    <mm-sheet-header heading='"Flat" Site Architecture'></mm-sheet-header>
    <mm-sheet-body>
      <mm-flex direction="column" gap="3">
        <mm-flex direction="column" gap="2">
          <mm-heading level="3">사이트맵을 만들고 유지하는 이유는 무엇일까요?</mm-heading>
          <mm-paragraph-group>
            <mm-paragraph>필요 이상으로 사이트가 복잡해지지 않도록 하기 위해서에요.</mm-paragraph>
            <mm-paragraph>
              A Flat Architecture means that users (and search engine crawlers) can reach any page
              on your site in 4 clicks or less.
            </mm-paragraph>
          </mm-paragraph-group>
        </mm-flex>
        <mm-keyword-tag-group
          .keywords=${['URL Structure', 'Category Pages']}
        ></mm-keyword-tag-group>
        <mm-text-list
          .texts=${[
            '프로젝트에 참여하는 모든 사람이 액세스 할 수 있는 형식으로 사이트 맵 유지',
            '웹 사이트 구조에서 일어나는 모든 변화를 반영하는 살아있는 문서. 변경이 쉬워야 한다.',
            '멘탈 모델은 뭔가 현실 세계에서 작동하는 방법에 대한 다른 사람의 생각에 대한 설명입니다.',
          ]}
        ></mm-text-list>
      </mm-flex>
    </mm-sheet-body>
  </mm-sheet>
`
