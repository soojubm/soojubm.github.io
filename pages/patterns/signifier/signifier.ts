import { html } from 'lit'
import { renderDocumentLayout } from '../../../layouts/document-layout'

const main = html`
  <main class="page">
    <mm-flex direction="column" gap="16">
      <mm-page-header
        heading="Signifier"
        description="기표는 사용자가 UI를 보고 해당 요소의 역할, 상태, 가능한 행동을 이해할 수 있도록 하는 시각적 단서입니다. 이 페이지는 디자인 시스템 안에서 특정 시각 표현이 특정 의미에만 사용되도록 제한하는 공통 계약을 정의합니다."
      ></mm-page-header>

      <mm-text-block
        level="3"
        heading="Level"
        description="Level은 디자인 시스템 전반에서 요소의 구조적 위계를 정의하는 파운데이션으로, spacing을 비롯한 여러 속성값이 element, group, section 등 단계에 따라 다른 기준을 갖도록 하기 위해 사용합니다. 특정 컴포넌트에 종속되지 않고, spacing 토큰 체계 자체의 축으로 기능합니다."
      >
        목적: "이 간격이 얼마나 넓어야 하는가"를 개별 컴포넌트마다 판단하지 않고, 소속된 구조적
        단계(level)에 따라 일관되게 결정하기 위함입니다. Element: 단일 UI 유닛 내부/사이의 가장 좁은
        간격 (예: 아이콘-텍스트, 버튼 padding). Group: 관련 요소들을 묶는 중간 단위 사이의 간격 (예:
        폼 필드 그룹, 버튼 그룹). Section: 카드, 블록, 페이지 구획 등 최상위 레이아웃 단위 사이의
        간격. 적용 방식: spacing 토큰은 --spacing-{level}-{size} 구조를 따르며 (예:
        --spacing-element-md), 컴포넌트는 자신이 속한 level에 맞는 토큰만 참조합니다. 확장성: 현재는
        spacing에 적용하지만, 추후 radius, shadow 등 다른 파운데이션에도 동일 level 체계를 확장
        적용할 수 있습니다.
      </mm-text-block>

      <section>
        <mm-text-block
          level="3"
          heading="Depth"
          description="layer(z-index)와 surface는 같은 질문에서 출발한다"
        ></mm-text-block>

        <mm-flex direction="column" gap="2">
          <mm-paragraph>
            <strong>콘텐츠 레벨</strong>
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
            <strong>시스템 레벨</strong>
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
        </mm-flex>

        <mm-surface variant="filled" style="margin-top: var(--space-4)">
          <mm-paragraph>
            아직 확정 전. surface의 시스템 레벨(elevated)이 layer의 시스템 레벨(overlay 이상)과 항상
            짝을 이루는지, 아니면 elevated가 콘텐츠 안에서도 쓰일 수 있는지는 사용례가 더 쌓인 뒤
            판단한다.
          </mm-paragraph>
        </mm-surface>
      </section>

      <mm-flex direction="column" gap="4">
        <mm-text size="24" weight="bold" as="h2">Editorial</mm-text>

        <mm-paragraph>
          사용자는 디스크립션을 자세히 읽기를 원하지 않으므로, 필요한 내용을 빠르게 캐치할 수 있도록
          간결하게 쓰는 게 좋다. 한 줄에 50자, 세 줄 이하로 쓸 것을 권장하고 있다. 텍스트를 간결하게
          유지하고 전달할 내용을 스캐너블한 덩어리로 나누는 것은, 유저들이 그들의 이해도와 이
          서비스를 활용하는 능력에 대해 신뢰를 갖게 만든다. (Easy scanning)
        </mm-paragraph>

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
        </mm-text-block>
      </mm-flex>

      <!-- <mm-paragraph-group>
      <mm-paragraph>
        기본 본문은 왼끝 맞추기(left align)를 사용합니다. 오른끝 흘리기(ragged right)를 유지하여
        자연스러운 읽기 흐름과 가독성을 제공합니다.
      </mm-paragraph>
      <mm-heading level="3">Indentation</mm-heading>
      <mm-paragraph>
        단락 구분은 들여쓰기 대신 단락 간 간격으로 표현합니다. 작은 화면에서는 공간 효율과 스캔
        효율을 위해 좌측 들여쓰기를 사용하지 않습니다.
      </mm-paragraph>
      <div>
        <mm-heading level="3">Optical Alignment</mm-heading>
        <mm-text-list
          texts='["아이콘과 텍스트 baseline 조정", "버튼 내부 수직 정렬 보정", "숫자와 한글 혼합 시 line-height 보정(폰트마다 기준선, x-height, cap-height가 다름)", "배경 또는 테두리가 포함된 박스 안에서의 상하 간격 보정"]'
        ></mm-text-list>

        <mm-heading level="3">Emphasis</mm-heading>
        <div>
          <mm-text-list
            texts='["본문 강조를 위한 underline", "강조 문장을 primary color로 처리"]'
          ></mm-text-list>
        </div>

        <mm-keyword-tag-group
          heading="Visual Emphasis"
          keywords='["&lt;mark&gt;", "&lt;b&gt;", "&lt;em&gt;", "&lt;u&gt;"]'
        ></mm-keyword-tag-group>

        <mm-keyword-tag-group
          heading="Semantic Emphasis"
          keywords='["&lt;strong&gt;"]'
        ></mm-keyword-tag-group>

        <mm-text-list
          texts='["경고", "법률 문구", "개인정보처리방침", "파괴적 액션 안내"]'
        ></mm-text-list>
      </div>
    </mm-paragraph-group> -->

      <!-- <mm-paragraph-group>
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
        values='["action"]'
        options='[
          {"value":"action","label":"Actions"},
          {"value":"navigation","label":"Navigations"},
          {"value":"status","label":"Status"},
          {"value":"selection","label":"Selection"},
          {"value":"visibility","label":"Visibility"},
          {"value":"communication","label":"Communication"}
        ]'
      ></mm-filter-button-group>

      <div id="icon-section-action">
        <mm-grid columns="3">
          <mm-list-item
            icon="plus"
            size="48"
            label="Add"
            description="항목을 추가하거나 생성합니다."
          ></mm-list-item>
          <mm-list-item
            icon="xmark"
            size="48"
            label="Close"
            description="대화상자나 패널을 닫습니다."
          ></mm-list-item>
          <mm-list-item
            icon="copy"
            size="48"
            label="Copy"
            description="내용을 클립보드에 복사합니다."
          ></mm-list-item>
          <mm-list-item
            icon="check"
            size="48"
            label="Copy Success"
            description="복사 완료 상태를 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="trash"
            size="48"
            label="Delete"
            description="항목을 영구 삭제합니다."
          ></mm-list-item>
          <mm-list-item
            icon="xmark"
            size="48"
            label="Dismiss"
            description="알림이나 배너를 닫습니다."
          ></mm-list-item>
          <mm-list-item
            icon="filter"
            size="48"
            label="Filter"
            description="목록에 필터를 적용합니다."
          ></mm-list-item>
          <mm-list-item
            icon="plus"
            size="48"
            label="Increase"
            description="값이나 수량을 증가시킵니다."
          ></mm-list-item>
          <mm-list-item
            icon="import"
            size="48"
            label="Import"
            description="파일이나 데이터를 가져옵니다."
          ></mm-list-item>
          <mm-list-item
            icon="log-out"
            size="48"
            label="Log Out"
            description="로그아웃합니다."
          ></mm-list-item>
          <mm-list-item
            icon="more-vert"
            size="48"
            label="More Actions"
            description="추가 액션 메뉴를 표시합니다."
          ></mm-list-item>
          <mm-list-item
            icon="minus"
            size="48"
            label="Decrease"
            description="값이나 수량을 감소시킵니다."
          ></mm-list-item>
          <mm-list-item
            icon="refresh"
            size="48"
            label="Refresh"
            description="화면이나 데이터를 새로고침합니다."
          ></mm-list-item>
          <mm-list-item
            icon="refresh-double"
            size="48"
            label="Retry"
            description="실패한 작업을 재시도합니다."
          ></mm-list-item>
          <mm-list-item
            icon="send-diagonal"
            size="48"
            label="Send"
            description="메시지나 데이터를 전송합니다."
          ></mm-list-item>
          <mm-list-item
            icon="settings"
            size="48"
            label="Settings"
            description="설정 화면으로 이동합니다."
          ></mm-list-item>
          <mm-list-item
            icon="arrow-up-right"
            size="48"
            label="Share"
            description="콘텐츠를 외부로 공유합니다."
          ></mm-list-item>
        </mm-grid>
      </div>

      <div id="icon-section-navigation" hidden>
        <mm-grid columns="3">
          <mm-list-item
            icon="arrow-left"
            size="48"
            label="Back"
            description="이전 화면으로 돌아갑니다."
          ></mm-list-item>
          <mm-list-item
            icon="nav-arrow-up"
            size="48"
            label="Collapse"
            description="펼쳐진 영역을 접습니다."
          ></mm-list-item>
          <mm-list-item
            icon="nav-arrow-down"
            size="48"
            label="Expand"
            description="영역을 펼쳐 내용을 표시합니다."
          ></mm-list-item>
          <mm-list-item
            icon="arrow-right"
            size="48"
            label="Forward"
            description="다음 화면으로 이동합니다."
          ></mm-list-item>
          <mm-list-item
            icon="menu-scale"
            size="48"
            label="Menu"
            description="내비게이션 메뉴를 엽니다."
          ></mm-list-item>
          <mm-list-item
            icon="arrow-right"
            size="48"
            label="Next"
            description="다음 항목으로 이동합니다."
          ></mm-list-item>
          <mm-list-item
            icon="open-in-browser"
            size="48"
            label="Open External"
            description="외부 목적지로 이동합니다."
          ></mm-list-item>
          <mm-list-item
            icon="arrow-left"
            size="48"
            label="Previous"
            description="이전 항목으로 이동합니다."
          ></mm-list-item>
          <mm-list-item
            icon="arrow-up"
            size="48"
            label="Scroll Top"
            description="페이지 상단으로 스크롤합니다."
          ></mm-list-item>
          <mm-list-item
            icon="nav-arrow-right"
            size="48"
            label="Sitemap"
            description="하위 항목이 있음을 나타냅니다."
          ></mm-list-item>
        </mm-grid>
      </div>

      <div id="icon-section-status" hidden>
        <mm-grid columns="3">
          <mm-list-item
            icon="warning-circle"
            size="48"
            label="Danger"
            description="위험하거나 돌이킬 수 없는 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="check-circle-solid"
            size="48"
            label="Done"
            description="작업이 완전히 완료된 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="alert-circle"
            size="48"
            label="Error"
            description="오류 또는 실패 상태를 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="info-circle"
            size="48"
            label="Info"
            description="참고 가능한 보조 정보를 제공합니다."
          ></mm-list-item>
          <mm-list-item
            icon="check-circle"
            size="48"
            label="Success"
            description="작업이 성공적으로 완료되었습니다."
          ></mm-list-item>
          <mm-list-item
            icon="warning-triangle"
            size="48"
            label="Warning"
            description="진행 전에 주의가 필요한 상태입니다."
          ></mm-list-item>
        </mm-grid>
      </div>

      <div id="icon-section-selection" hidden>
        <mm-grid columns="3">
          <mm-list-item
            icon="bookmark"
            size="48"
            label="Bookmark"
            description="저장하지 않은 북마크 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="bookmark-solid"
            size="48"
            label="Bookmark Selected"
            description="북마크에 저장된 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="check"
            size="48"
            label="Check"
            description="선택됨, 완료됨, 확인됨을 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="star"
            size="48"
            label="Favorite"
            description="즐겨찾기에 추가되지 않은 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="star-solid"
            size="48"
            label="Favorite Selected"
            description="즐겨찾기에 추가된 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="heart"
            size="48"
            label="Like"
            description="좋아요를 누르지 않은 상태입니다."
          ></mm-list-item>
          <mm-list-item
            icon="heart-solid"
            size="48"
            label="Like Selected"
            description="좋아요를 누른 상태입니다."
          ></mm-list-item>
        </mm-grid>
      </div>

      <div id="icon-section-visibility" hidden>
        <mm-grid columns="3">
          <mm-list-item
            icon="eye-closed"
            size="48"
            label="Hide"
            description="내용을 숨깁니다."
          ></mm-list-item>
          <mm-list-item
            icon="eye-solid"
            size="48"
            label="Reveal"
            description="숨겨진 내용(예: 비밀번호)을 표시합니다."
          ></mm-list-item>
          <mm-list-item
            icon="xray-view"
            size="48"
            label="Xray"
            description="숨겨진 구조나 레이어를 투시합니다."
          ></mm-list-item>
        </mm-grid>
      </div>

      <div id="icon-section-communication" hidden>
        <mm-grid columns="3">
          <mm-list-item
            icon="megaphone"
            size="48"
            label="Announcement"
            description="공지사항이나 중요 메시지를 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="message"
            size="48"
            label="Comment"
            description="댓글이나 메모를 작성합니다."
          ></mm-list-item>
          <mm-list-item
            icon="thumbs-up"
            size="48"
            label="Like"
            description="긍정적인 반응을 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="thumbs-down"
            size="48"
            label="Dislike"
            description="부정적인 반응을 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="mail"
            size="48"
            label="Mail"
            description="이메일 또는 메시지를 보냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="mail-in"
            size="48"
            label="Mail In"
            description="받은 메시지를 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="bell"
            size="48"
            label="Notification"
            description="알림 또는 공지를 나타냅니다."
          ></mm-list-item>
          <mm-list-item
            icon="reply-to-message"
            size="48"
            label="Reply"
            description="메시지에 답장합니다."
          ></mm-list-item>
        </mm-grid>
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

        @media (max-width: 768px) {
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
    </mm-flex> -->
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
