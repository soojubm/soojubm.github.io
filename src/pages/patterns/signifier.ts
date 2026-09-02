import { html } from 'lit'

import { renderDocumentLayout } from '@/components/layouts/document-layout'
/* Signifier 가이드·아이콘 카탈로그 초안. 되살릴 때 템플릿으로 되돌린다.
import type { FilterOption } from '@/components/common/button/semantics/filter-button-group'
import type { IconName } from '@/components/common/icon-button/semantics/icon-names'

interface IconListItem {
  icon: IconName
  label: string
  description: string
}

const renderIconListItems = (items: IconListItem[]) =>
  items.map(
    item => html`
      <mm-list-item
        icon=${item.icon}
        size="48"
        label=${item.label}
        description=${item.description}
      ></mm-list-item>
    `,
  )

const actionIconItems: IconListItem[] = [
  { icon: 'plus', label: 'Add', description: '항목을 추가하거나 생성합니다.' },
  { icon: 'xmark', label: 'Close', description: '대화상자나 패널을 닫습니다.' },
  { icon: 'copy', label: 'Copy', description: '내용을 클립보드에 복사합니다.' },
  { icon: 'check', label: 'Copy Success', description: '복사 완료 상태를 나타냅니다.' },
  { icon: 'trash', label: 'Delete', description: '항목을 영구 삭제합니다.' },
  { icon: 'xmark', label: 'Dismiss', description: '알림이나 배너를 닫습니다.' },
  { icon: 'filter', label: 'Filter', description: '목록에 필터를 적용합니다.' },
  { icon: 'plus', label: 'Increase', description: '값이나 수량을 증가시킵니다.' },
  { icon: 'import', label: 'Import', description: '파일이나 데이터를 가져옵니다.' },
  { icon: 'log-out', label: 'Log Out', description: '로그아웃합니다.' },
  { icon: 'more-vert', label: 'More Actions', description: '추가 액션 메뉴를 표시합니다.' },
  { icon: 'minus', label: 'Decrease', description: '값이나 수량을 감소시킵니다.' },
  { icon: 'refresh', label: 'Refresh', description: '화면이나 데이터를 새로고침합니다.' },
  { icon: 'refresh-double', label: 'Retry', description: '실패한 작업을 재시도합니다.' },
  { icon: 'send-diagonal', label: 'Send', description: '메시지나 데이터를 전송합니다.' },
  { icon: 'settings', label: 'Settings', description: '설정 화면으로 이동합니다.' },
  { icon: 'arrow-up-right', label: 'Share', description: '콘텐츠를 외부로 공유합니다.' },
]

const navigationIconItems: IconListItem[] = [
  { icon: 'arrow-left', label: 'Back', description: '이전 화면으로 돌아갑니다.' },
  { icon: 'nav-arrow-up', label: 'Collapse', description: '펼쳐진 영역을 접습니다.' },
  { icon: 'nav-arrow-down', label: 'Expand', description: '영역을 펼쳐 내용을 표시합니다.' },
  { icon: 'arrow-right', label: 'Forward', description: '다음 화면으로 이동합니다.' },
  { icon: 'menu-scale', label: 'Menu', description: '내비게이션 메뉴를 엽니다.' },
  { icon: 'arrow-right', label: 'Next', description: '다음 항목으로 이동합니다.' },
  { icon: 'open-in-browser', label: 'Open External', description: '외부 목적지로 이동합니다.' },
  { icon: 'arrow-left', label: 'Previous', description: '이전 항목으로 이동합니다.' },
  { icon: 'arrow-up', label: 'Scroll Top', description: '페이지 상단으로 스크롤합니다.' },
  { icon: 'nav-arrow-right', label: 'Sitemap', description: '하위 항목이 있음을 나타냅니다.' },
]

const statusIconItems: IconListItem[] = [
  { icon: 'warning-circle', label: 'Danger', description: '위험하거나 돌이킬 수 없는 상태입니다.' },
  { icon: 'check-circle-solid', label: 'Done', description: '작업이 완전히 완료된 상태입니다.' },
  { icon: 'alert-circle', label: 'Error', description: '오류 또는 실패 상태를 나타냅니다.' },
  { icon: 'info-circle', label: 'Info', description: '참고 가능한 보조 정보를 제공합니다.' },
  { icon: 'check-circle', label: 'Success', description: '작업이 성공적으로 완료되었습니다.' },
  {
    icon: 'warning-triangle',
    label: 'Warning',
    description: '진행 전에 주의가 필요한 상태입니다.',
  },
]

const selectionIconItems: IconListItem[] = [
  { icon: 'bookmark', label: 'Bookmark', description: '저장하지 않은 북마크 상태입니다.' },
  {
    icon: 'bookmark-solid',
    label: 'Bookmark Selected',
    description: '북마크에 저장된 상태입니다.',
  },
  { icon: 'check', label: 'Check', description: '선택됨, 완료됨, 확인됨을 나타냅니다.' },
  { icon: 'star', label: 'Favorite', description: '즐겨찾기에 추가되지 않은 상태입니다.' },
  { icon: 'star-solid', label: 'Favorite Selected', description: '즐겨찾기에 추가된 상태입니다.' },
  { icon: 'heart', label: 'Like', description: '좋아요를 누르지 않은 상태입니다.' },
  { icon: 'heart-solid', label: 'Like Selected', description: '좋아요를 누른 상태입니다.' },
]

const visibilityIconItems: IconListItem[] = [
  { icon: 'eye-closed', label: 'Hide', description: '내용을 숨깁니다.' },
  { icon: 'eye-solid', label: 'Reveal', description: '숨겨진 내용(예: 비밀번호)을 표시합니다.' },
  { icon: 'xray-view', label: 'Xray', description: '숨겨진 구조나 레이어를 투시합니다.' },
]

const communicationIconItems: IconListItem[] = [
  {
    icon: 'megaphone',
    label: 'Announcement',
    description: '공지사항이나 중요 메시지를 나타냅니다.',
  },
  { icon: 'message', label: 'Comment', description: '댓글이나 메모를 작성합니다.' },
  { icon: 'thumbs-up', label: 'Like', description: '긍정적인 반응을 나타냅니다.' },
  { icon: 'thumbs-down', label: 'Dislike', description: '부정적인 반응을 나타냅니다.' },
  { icon: 'mail', label: 'Mail', description: '이메일 또는 메시지를 보냅니다.' },
  { icon: 'mail-in', label: 'Mail In', description: '받은 메시지를 나타냅니다.' },
  { icon: 'bell', label: 'Notification', description: '알림 또는 공지를 나타냅니다.' },
  { icon: 'reply-to-message', label: 'Reply', description: '메시지에 답장합니다.' },
]

const iconCategoryValues = ['action']
const iconCategoryOptions: FilterOption[] = [
  { value: 'action', label: 'Actions' },
  { value: 'navigation', label: 'Navigations' },
  { value: 'status', label: 'Status' },
  { value: 'selection', label: 'Selection' },
  { value: 'visibility', label: 'Visibility' },
  { value: 'communication', label: 'Communication' },
]

 <mm-paragraph-group>
      <mm-caption>
        Signifier 페이지의 목적은 UI의 시각 표현이 어떤 의미, 상태, 행동 가능성을 나타내는지
        일관되게 정의하는 것입니다.
      </mm-caption>
      <mm-text-list
        texts='[
        "Do not over signify. 기표는 많을수록 좋은 게 아니라, 사용자의 판단을 도와야 할 때만 사용한다.",
        "상태를 표현하는 시각 언어는 컴포넌트에 종속되지 않고 제품 전체에 일관합니다.",
        "성공적인 상호작용 피드백은 장식적인 것이 아니라 정보를 제공하는 것입니다. 시각적 노이즈나 강렬한 색상 변화를 유발하는 정교한 전환을 피하세요. 주의를 산만하게 하는 애니메이션은 혼란을 야기하고 인터페이스를 사용하기 불편하게 만들 수 있습니다."
        ]'
      ></mm-text-list>
    </mm-paragraph-group>

    <mm-feature-group columns="4" column-max-width="400px">
      <mm-feature
        heading="One signifier, one primary meaning"
        description="하나의 시각적 단서는 하나의 주요 의미를 갖습니다. 시스템이 명시적으로 허용하지 않는 한 같은 단서를 다른 의미로 재사용하지 않습니다."
      ></mm-feature>
      <mm-feature
        heading="Do not use interaction cues as decoration"
        description="클릭 가능성을 암시하는 색상, 밑줄, 커서, 아이콘은 장식이나 일반 강조로 사용하지 않습니다. 사용자는 이러한 단서를 인터랙션 가능성으로 학습하기 때문입니다."
      ></mm-feature>
      <mm-feature
        heading="Do not rely on color alone"
        description="상태나 피드백은 색상만으로 전달하지 않습니다. 중요한 상태는 아이콘, 텍스트, 형태, 위치, ARIA 속성 등과 함께 제공해야 합니다."
      ></mm-feature>
    </mm-feature-group>

    <mm-flex direction="column" gap="3">
      <mm-text size="24" weight="bold" as="h3">Icon Signifiers</mm-text>
      <mm-paragraph>
        아이콘은 기표로 정의한 의미를 전달하는 기호입니다. 단순히 장식적인 용도로 사용하지 마세요.
        아이콘은 레이블을 보완하거나, 제한된 공간에서 레이블을 대체하거나, 상태와 행동 가능성을
        명확히 하기 위해 사용합니다.
      </mm-paragraph>
      <mm-text-list
        texts='[
        "Indicator Icons (Label) - Decorative Icon",
          "Use only universally recognized icons to represent actions or options."

      ]'
      ></mm-text-list>
      <mm-filter-button-group
        id="icon-category-picker"
        mode="single"
        .values=${iconCategoryValues}
        .options=${iconCategoryOptions}
      ></mm-filter-button-group>

      <div id="icon-section-action">
        <mm-grid columns="3">${renderIconListItems(actionIconItems)}</mm-grid>
      </div>

      <div id="icon-section-navigation" hidden>
        <mm-grid columns="3">${renderIconListItems(navigationIconItems)}</mm-grid>
      </div>

      <div id="icon-section-status" hidden>
        <mm-grid columns="3">${renderIconListItems(statusIconItems)}</mm-grid>
      </div>

      <div id="icon-section-selection" hidden>
        <mm-grid columns="3">${renderIconListItems(selectionIconItems)}</mm-grid>
      </div>

      <div id="icon-section-visibility" hidden>
        <mm-grid columns="3">${renderIconListItems(visibilityIconItems)}</mm-grid>
      </div>

      <div id="icon-section-communication" hidden>
        <mm-grid columns="3">${renderIconListItems(communicationIconItems)}</mm-grid>
      </div>
    </mm-flex>

    <mm-flex direction="column" gap="3">
      <style>
        :root {
          --layout-max-width: 1200px;
          --layout-side-padding: calc((100vw - var(--layout-max-width)) / 2);
          --item-min-width: 240px;
          --item-gap: calc(var(--space-4) + var(--space-1));
        }

        .scroll-outer {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
        }

        .scroll-inner {
          display: flex;
          gap: var(--item-gap);
          padding: var(--space-4) 0;
          padding-left: var(--layout-side-padding);
          padding-right: var(--layout-side-padding);
          min-width: 100vw;
        }

        .item {
          min-width: var(--item-min-width);
          height: 150px;
          background: var(--background-strong-color);
          flex-shrink: 0;
          scroll-snap-align: start;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          border-radius: var(--radius);
        }

        @media (max-width: 1200px) {
          :root {
            --layout-side-padding: var(--space-4);
            --item-min-width: 200px;
            --item-gap: var(--space-4);
          }
        }

        @media (max-width: 800px) {
          :root {
            --layout-side-padding: var(--space-3);
            --item-min-width: 180px;
            --item-gap: var(--space-3);
          }

          .item {
            height: 120px;
          }
        }
      </style>
      <div class="scroll-outer">
        <div class="scroll-inner">
          <div class="item">Item 1</div>
          <div class="item">Item 2</div>
          <div class="item">Item 3</div>
          <div class="item">Item 4</div>
          <div class="item">Item 5</div>
          <div class="item">Item 6</div>
          <div class="item">Item 7</div>
          <div class="item">Item 8</div>
          <div class="item">Item 9</div>
          <div class="item">Item 10</div>
          <div class="item">Item 11</div>
        </div>
      </div>
    </mm-flex> 
*/

const main = html`
  <main class="page">
    <mm-page-header
      heading="Foundations"
      description="제품 전체가 공유하는 시각 언어의 기본 축입니다. 각 문서가 하나의 축을 정의합니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="16">
      <mm-grid columns="3" gap="8">
        <mm-foundation-item
          href="./layout.html"
          heading="Layout"
          description="컨테이너 너비와 대비로 페이지의 성격과 작업 맥락을 담습니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./interaction.html"
          heading="Interaction"
          description="상호작용할 수 있는 요소와 그 반응 상태를 정의합니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./overlay.html"
          heading="Overlay"
          description="화면 위로 뜨는 표면의 행동 계약과 겹침 순서를 정의합니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./content.html"
          heading="Content"
          description="텍스트 슬롯의 이름과 어조, 스캔 가능한 문구 원칙입니다."
        ></mm-foundation-item>
        <mm-foundation-item
          href="./elevation.html"
          heading="Elevation"
          description="표면이 배경에서 얼마나 떠 있는지를 그림자 단계로 나타냅니다."
        ></mm-foundation-item>
      </mm-grid>

      <mm-content-section heading-level="3" heading="공통 원칙">
        <mm-paragraph>
          각 컴포넌트 문서가 되풀이하는 규칙은 여기서 한 번에 봅니다. 세부 판단 기준은 위 축 문서에
          있습니다.
        </mm-paragraph>
        <mm-text-list
          texts='[
            "상호작용 가능성은 형태로 드러낸다. 색·밑줄·표면 같은 기표는 장식이나 일반 강조로 쓰지 않는다. — Interaction",
            "선택·피드백·오류 상태는 색상만으로 전달하지 않고 아이콘·텍스트·형태·ARIA를 함께 준다. — Interaction",
            "열기·선택·검증 같은 상호작용 상태와 그 닫힘 처리는 컴포넌트가 소유하고, 트리거는 표준 attribute로 대상을 가리키기만 한다. — Interaction",
            "동종 항목은 계열 그룹 컴포넌트로 묶고 역할·간격·정렬은 그룹이 소유한다. — Component Level",
            "같은 텍스트 슬롯도 사용자 시점의 message와 시스템 시점의 description으로 이름을 나누고, 실행 레이블은 동사형으로 줄이지 않고 쓴다. — Content",
            "화면 위로 뜨는 표면은 외형이 아니라 modality·dismiss·앵커 기준으로 구분하고, 겹침 순서는 그룹 토큰으로 정한다. — Overlay"
          ]'
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Component Feature">
        <mm-paragraph>
          각 컴포넌트 문서는 아래 특성 중 해당하는 것으로 성격을 설명합니다. 같은 특성은 컴포넌트가
          달라도 같은 규칙을 따릅니다.
        </mm-paragraph>
        <mm-text-list
          texts='[
            "Groupable — 동종 항목을 계열 그룹으로 묶고, 역할·간격·정렬은 그룹이 소유한다.",
            "Interactive - action — 누르면 이동하거나 실행되는 최종 상호작용. 결과는 페이지 이동·정보 구조 변화로도 드러나므로 중복해서 알리지 않는다.",
            "Interactive - selection — 선택 여부를 상태로 유지한다. 미리 선택된 기본값은 편향된 응답을 부를 수 있어 피한다.",
            "Immediate — 조작 즉시 반영된다. 저장 버튼과 함께 두거나 콘텐츠 전환·필터 맥락에 쓰지 않는다.",
            "Anchored — 화면 좌표가 아니라 트리거 요소가 위치를 정하고, 방향과 정렬은 placement 하나로 지정한다.",
            "Structural — 상호작용 없이 반복되는 구조와 경계를 잡는다.",
            "Representative — 사용자·브랜드·객체를 대표하는 시각 정보. 원본이 없거나 실패해도 대체 표현과 대체 텍스트로 형태와 정체성을 유지한다.",
            "Glanceable — 훑는 것만으로 뜻을 파악하게 한다. 레이블은 짧게, 줄여 표시하지 않는다.",
            "Statusful — 의미 상태를 톤으로 구분하되 색상만으로 전달하지 않고 아이콘·텍스트를 함께 준다.",
            "Feedback — 사용자 행동이나 시스템 상태의 결과를 알린다. 사용자 귀책이 아닌 실패는 책임 소재를 문구에 드러낸다.",
            "Validatable — 입력 규칙 검증과 오류 표시를 소유한다. 오류는 해당 필드와 연결하고, 그룹은 legend로 맥락을 준다.",
            "Transient — 역할이 끝나면 사라진다. 시스템이 스스로 걷거나(로딩·토스트) 사용자가 확인하고 닫으며(배너·알림), 그 자리는 결과 콘텐츠가 대신한다.",
            "Persistent — 스크롤과 화면 이동에도 자리를 지킨다.",
            "Freeform — 제한된 선택지가 아니라 자유 형식 값을 받는다.",
            "Disclosure — 부차적인 정보를 접어 두고 필요할 때만 펼친다. 없을수록 좋으며, 약관·경고처럼 반드시 읽어야 하는 정보는 감추지 않는다.",
            "Modality — 배경 상호작용 차단 여부로 레이어를 규정한다. 레이어는 겹쳐 쌓지 않는다."
          ]'
        ></mm-text-list>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="Component Level">
        <mm-paragraph>
          간격을 비롯한 값은 요소가 속한 구조적 단계에 따라 다른 기준을 갖습니다. 컴포넌트마다
          간격을 따로 판단하지 않고, 소속된 단계에 맞는 토큰만 참조합니다.
        </mm-paragraph>

        <mm-flex direction="column" gap="3">
          <mm-list-item
            icon="circle"
            size="small"
            label="Element"
            description="단일 UI 유닛 안의 간격. --space-1 ~ --space-2."
          ></mm-list-item>
          <mm-list-item
            icon="group"
            size="small"
            label="Group"
            description="묶음 안 항목 사이의 간격. 기본 --space-2, 조밀한 태그는 --space-1, 이어지는 묶음은 0."
          ></mm-list-item>
          <mm-list-item
            icon="table-rows"
            size="small"
            label="Section"
            description="제목과 본문 사이 --space-3. 구획끼리의 바깥 간격은 페이지가 --space-section으로 정한다."
          ></mm-list-item>
        </mm-flex>

        <mm-keyword-tag-group
          heading="Group 컴포넌트"
          keywords='[
            "mm-button-group",
            "mm-filter-button-group",
            "mm-toggle-button-group",
            "mm-radio-group",
            "mm-checkbox-group",
            "mm-avatar-group",
            "mm-tag-group",
            "mm-keyword-tag-group",
            "mm-menu-item-group",
            "mm-menu-item-radio-group",
            "mm-menu-item-checkbox-group",
            "mm-meta-item-group",
            "mm-feature-group",
            "mm-paragraph-group"
          ]'
        ></mm-keyword-tag-group>
        <mm-keyword-tag-group
          heading="Section 컴포넌트"
          keywords='["mm-content-section", "mm-page-header"]'
        ></mm-keyword-tag-group>

        <mm-paragraph>
          구획을 세로로 쌓는 페이지 조립 레이아웃(mm-flex)은 element·group·section 계층 밖의 별도
          층입니다. 이 컨테이너의 gap은 컴포넌트가 아니라 페이지가 소유합니다.
        </mm-paragraph>
      </mm-content-section>
    </mm-flex>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
  initIconIndicators()
})

function initIconIndicators() {
  const picker = document.getElementById('icon-category-picker')
  if (!picker) return

  picker.addEventListener('change', (e: Event) => {
    const detail = (e as CustomEvent).detail
    const category = detail?.values?.[0]
    if (!category) return

    document.querySelectorAll<HTMLElement>('[id^="icon-section-"]').forEach(el => {
      el.hidden = true
    })

    const section = document.getElementById(`icon-section-${category}`)
    if (section) section.hidden = false
  })
}
