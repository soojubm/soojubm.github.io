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
    ></mm-page-header>

    <mm-flex direction="column" gap="16">
      <!-- <mm-page-header
        heading="Signifier"
        description="기표는 사용자가 UI를 보고 해당 요소의 역할, 상태, 가능한 행동을 이해할 수 있도록 하는 시각적 단서입니다. 이 페이지는 디자인 시스템 안에서 특정 시각 표현이 특정 의미에만 사용되도록 제한하는 공통 계약을 정의합니다."
      ></mm-page-header> -->

      <mm-text-block
        level="2"
        heading="Component Level"
        description="Level은 디자인 시스템 전반에서 요소의 구조적 위계를 정의하는 파운데이션으로, spacing을 비롯한 여러 속성값이 element, group, section 등 단계에 따라 다른 기준을 갖도록 하기 위해 사용합니다. 특정 컴포넌트에 종속되지 않고, spacing 토큰 체계 자체의 축으로 기능합니다."
      >

      <mm-paragraph size="large">What are design tokens?</mm-paragraph>
      <mm-surface variant="elevated" padding="16">
              <mm-caption>Section</mm-caption>


          <div style="display:flex;align-items:center;justify-content:center;width:200px;height:200px;border-radius:50%;background-color:#bbb;">
            <mm-caption>Group</mm-caption>
            <div style="display:flex;align-items:center;justify-content:center;width:100px;height:100px;border-radius:50%;background-color:#ccc;"><mm-caption>Element</mm-caption></div>
            <div style="display:flex;align-items:center;justify-content:center;width:100px;height:100px;border-radius:50%;background-color:#ccc;"><mm-caption>Element</mm-caption></div>
          </div>

          <div>overlay</div>
        </mm-surface>
        <mm-grid columns="3">
          <div>
            <h3>Element</h3>
            <p> 단일 UI 유닛 내부/사이의 가장 좁은
        간격 (예: 아이콘-텍스트, 버튼 padding).</p>
          </div>
          <div>
            <h3>Group</h3>
            <p> 관련 요소들을 묶는 중간 단위 사이의 간격 (예: 폼 필드 그룹, 버튼 그룹).</p>
          </div>
          <div>
            <h3>Section</h3>
            <p>카드, 블록, 페이지 구획 등 최상위 레이아웃 단위 사이의 간격.</p>
          </div>
        </mm-grid>

        <mm-text weight="bold">왜 사용하나요?</mm-text>

        "이 간격이 얼마나 넓어야 하는가"를 개별 컴포넌트마다 판단하지 않고, 소속된 구조적
        단계(level)에 따라 일관되게 결정하기 위함입니다. 적용 방식: spacing 토큰은 --spacing-{level}-{size} 구조를 따르며 (예:
        --spacing-element-md), 컴포넌트는 자신이 속한 level에 맞는 토큰만 참조합니다. 
      </mm-text-block>

      ├── Spatial Structure
│   ├── Page / Layout
│   ├── Surface
│   └── Overlay



    <mm-text-block level="2" heading="Overlay" description="시각적 형태(Dialog, Sheet 등)가 아니라 행동 계약으로 Fixed Sheet와 Anchored Sheet로 나뉜다.">
    

    <article class="table" role="table" aria-label="Apple News+ vs Apple News">
      <div class="row plans-features" role="row">
        <div class="visuallyhidden title" role="columnheader"><span hidden>Feaures</span></div>
        <div class="column column-newsplus " role="columnheader">
          <div role="text">
            <mm-caption>Anchored</mm-caption>
            <p class="plans-table-columnheader header-price typography-plans-price" aria-label="$12.99 per month">
              $12.99/mo.</p>
          </div>
        </div>
        <div class="column column-news large-2 medium-2 small-2" role="columnheader">
          <div role="text">
            <mm-caption>Floating</mm-caption>
            <p class="plans-table-columnheader header-price typography-plans-price">Always free</p>
          </div>
        </div>
      </div>
       <div role="row" class="row">
        <div class="column title" role="rowheader">
          <mm-paragraph size="large">닫기 버튼을 제공하나요?</mm-paragraph>
        </div>
        <div class="column large-2 medium-3 small-3 column-newsplus" role="cell">
          <i role="presentation" class="icon icon-check" aria-hidden="true"></i>
          <!-- <span role="text" class="visuallyhidden">included</span> -->
        </div>
        <div class="column large-2 medium-2 small-2 column-news" role="cell">
          <!-- <span role="text" class="visuallyhidden">not included</span> -->
        </div>
      </div>
      <div role="row" class="row">
        <div class="column title" role="rowheader">
          <mm-paragraph size="large">ESC로 닫을 수 있나요?</mm-paragraph>
        </div>
        <div class="column large-2 medium-3 small-3 column-newsplus" role="cell">
          <i role="presentation" class="icon icon-check" aria-hidden="true"></i>
          <!-- <span role="text" class="visuallyhidden">included</span> -->
        </div>
        <div class="column large-2 medium-2 small-2 column-news" role="cell">
          <!-- <span role="text" class="visuallyhidden">not included</span> -->
        </div>
      </div>
            <div role="row" class="row">
        <div class="column title" role="rowheader">
          <mm-paragraph size="large">modality? 배경을 클릭할 수 있나요?</mm-paragraph>
        </div>
        <div class="column large-2 medium-3 small-3 column-newsplus" role="cell">
          <i role="presentation" class="icon icon-check" aria-hidden="true"></i>
          <!-- <span role="text" class="visuallyhidden">included</span> -->
        </div>
        <div class="column large-2 medium-2 small-2 column-news" role="cell">
          <!-- <span role="text" class="visuallyhidden">not included</span> -->
        </div>
      </div>
    </article>

    <style>
      .table {
        width: 100%;
      }
      .row {
        display: flex;
        width: 100%;
        border-bottom: var(--border);
      }
      .row .title {
        width: 66.66667%;
      }

      .row .column-newsplus, .row .column-news {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 16.66667%;
      }

      .icon-check:before {
        content: '✔';
      }
    </style>  
    
    <p>행동(modality·dismiss·reference)은 컨트롤러가 책임지는 별도 관심사고, 외형(elevation·
        background·radius·width·placement)은 컨트롤러와 무관하게 구현체가 조합한다.</p>
      <mm-text-list
        texts=${JSON.stringify([
          'surface — elevation·background·radius.',
          'width — 패널 너비.',
          'placement — 패널 위치. mm-sheet는 center/bottom/left/right, mm-popover는 top-left/top-right/bottom-left/bottom-right.',
        ])}
      ></mm-text-list>

      <mm-grid columns="2">
          <mm-paragraph>
            <strong>Surface</strong>
            —
            <code>ghost</code>
            <code>outlined</code>
            <code>filled</code>
            (내부에 클릭 가능한 액션이 있을 때 배경으로 강조)까지 페이지 본문 안에 놓인다. —
            <code>--material-zindex-base</code>
            (문서, 리스트, 배경),
            <code>--material-zindex-raised</code>
            (카드, 패널)처럼 페이지 본문 안에서 쌓이는 요소.
          </mm-paragraph>
          <mm-paragraph>
            <strong>Overlay</strong>
            —
            <code>elevated</code>
            는 화면 위에 떠 있는 요소를 그림자로 강조한다. layer의 overlay·modal·chrome처럼 콘텐츠
            바깥에서 동작하는 표면과 짝을 이룬다. —
            <code>--material-zindex-overlay</code>
            (드롭다운, 툴팁, 팝오버),
            <code>--material-zindex-modal</code>
            (모달, 시트),
            <code>--material-zindex-chrome</code>
            (내비게이션, 툴바),
            <code>--material-zindex-toast</code>
            (알림)처럼 콘텐츠 위로 떠서 화면 전체 기준으로 쌓이는 요소.
          </mm-paragraph>
        </mm-grid>


    <mm-text-block
      level="2"
      heading-level="2"
      heading="Anchored Overlay / Popover"
      description="트리거에 앵커되어 뜨는 비모달 패널 프리미티브입니다. popover 자신은 role을 갖지 않고, 안에 무엇을 담는지에 따라 Menu·ListBox 같은 접근성 패턴의 컨테이너가 됩니다. 열림·닫힘과 바깥 클릭·ESC 닫힘은 popover가 소유하고, 좌표는 placement, 폭은 width로 정합니다."
    >
    </mm-text-block>



    <mm-text-list
      texts=${JSON.stringify([
        'mm-popover — 앵커 패널. 위치·크기·닫힘만 책임진다.',
        'reference — 트리거.',
        'modality — 배경 클릭 가능·스크롤 가능.',
        'dismiss — 외부 클릭 또는 ESC. 포커스 트랩 없음.',
        '용례: Dropdown, Tooltip, 사이드 패널, Select.',
      ])}
    ></mm-text-list>

    <mm-text-block
      level="3"
      heading-level="3"
      heading="Menu"
      description="트리거를 누르면 뜨는 행동 목록입니다. 누르면 즉시 실행되거나 닫히며, 실행형 액션과 체크박스·라디오형 옵션을 함께 담을 수 있습니다."
    >
      <mm-text-list
        variant="number"
        texts='[
              "mm-popover — 패널",
              "mm-menu-item-group (role=menu, 기본값)",
              "mm-menu-item-action · mm-menu-item-link — role=menuitem",
              "mm-menu-item-checkbox-group(role=group) &gt; mm-menu-item-checkbox — role=menuitemcheckbox",
              "mm-menu-item-radio-group(role=radiogroup) &gt; mm-menu-item-radio — role=menuitemradio"
            ]'
      ></mm-text-list>

      <mm-text-block
        level="3"
        heading-level="3"
        heading="ListBox"
        description="여러 값 중 하나 또는 여러 개를 고르고 그 선택 상태를 유지하는 목록입니다. 고르면 닫히는 Menu와 달리, 지금 무엇이 선택되어 있는지가 핵심입니다."
      >
        <mm-text-list
          variant="number"
          texts='[
              "mm-popover — 패널",
              "mm-menu-item-group role=\\"listbox\\" — Menu와 같은 컨테이너, role만 override",
              "mm-select-option — role=option, 선택 상태는 aria-selected로 유지"
            ]'
        ></mm-text-list>
        <mm-paragraph size="small" color="light">
          mm-select가 이 조합을 씁니다. 실행형 항목(mm-menu-item-action, role=menuitem)과 선택형
          항목(mm-select-option, role=option)은 별도 컴포넌트라 role이 섞이지 않습니다.
        </mm-paragraph>
      </mm-text-block>
    </mm-text-block>



    <!-- TODO dismissable  -->


        

      <mm-text-block level="2" heading="Fixed Overlay">
        <mm-paragraph>
          viewport를 reference로 삼아 화면 중앙·가장자리에 위치하며, 배경과의 상호작용을 차단하는
          modal 행동 계약. Backdrop(dim)이 뒤를 덮고, 포커스는 시트 내부에 갇힌다(focus trap).
          닫기는 명시적인 버튼 액션으로만 허용하는 것이 원칙이며, 배경 클릭·ESC로 닫는 기능은
          중요도가 낮은 작업에서만 예외적으로 허용한다.
        </mm-paragraph>
        <mm-text-list
          texts=${JSON.stringify([
            'reference — viewport.',
            'modality — 배경 클릭 불가·스크롤 불가.',
            'dismiss — 명시 버튼 우선, 배경 클릭·ESC는 예외적으로만 허용. 포커스 트랩, aria-modal="true".',
            '구현: mm-sheet, mm-dialog(mm-sheet와 SheetController 배관 공유).',
            '용례: 삭제 확인, 중요 정보 입력, 오류 처리, 결제 흐름, bottom sheet/drawer.',
          ])}
        ></mm-text-list>
      </mm-text-block>



      <br />


        <mm-text-block heading="Editorial" description="사용자는 디스크립션을 자세히 읽기를 원하지 않으므로, 필요한 내용을 빠르게 캐치할 수 있도록
          간결하게 쓰는 게 좋다. 한 줄에 50자, 세 줄 이하로 쓸 것을 권장하고 있다. 텍스트를 간결하게
          유지하고 전달할 내용을 스캐너블한 덩어리로 나누는 것은, 유저들이 그들의 이해도와 이
          서비스를 활용하는 능력에 대해 신뢰를 갖게 만든다. (Easy scanning)">
        
        
        <mm-text-block
          level="4"
          heading="Message / Description"
          description="같은 텍스트 슬롯이라도 관점에 따라 이름을 구분합니다. message는 사용자의 관점에서, description은 시스템을 주어로 서술합니다."
        >
          예: 다이얼로그의 상태 메시지는 message("확인 후 진행해주세요")로, 컴포넌트 문서의 설명은
          description("이 컴포넌트는 ~를 수행합니다")으로 표기합니다.

          <mm-paragraph>
            사용자의 주목이 필요한 경우 콘텐츠 모듈을 가운데 정렬합니다. 이는 상태 변화, 결과, 맥락
            전환 등의 의미를 전달하기 위한 표현입니다. 고민 지점: 상위 레이어를 생성하는 팝업 자체가
            이미 높은 주목도를 가진다. 여기에서 콘텐츠 모듈을 가운데 정렬하는 것은 컨텐츠 정렬의
            일관성을 해치지 않는지?
          </mm-paragraph>

          <mm-keyword-tag-group
            keywords='["Result component", "Empty state", "Success message"]'
          ></mm-keyword-tag-group>
        </mm-text-block>

        <mm-text-block level="4" heading="Interaction Label">
          <mm-text-list
            texts='[
          "동사가 포함된 2자~8자 한글(!). 레이블 줄임(truncated) 불가. 사용자 시점으로 작성한다 (예: 보내기 → 받기).",
          "기타"
        ]'
          ></mm-text-list>
        </mm-text-block></mm-text-block>


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
