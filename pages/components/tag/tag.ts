import { html } from 'lit'
import { renderDocumentLayout } from '../../../layouts/document-layout'

const main = html`
  <main class="page">
    <mm-page-header
      heading="Tag"
      description="인접 요소나 부모 요소를 부연하는 시각 정보입니다. 상태, 카테고리, 키워드로 강조된 시각 정보는 사용자가 복잡한 정보 더미에서 중요한 정보를 우선적으로 파악하도록 돕습니다."
    ></mm-page-header>

    <mm-component-aka
      items='["Badge", "Label", "Keyword", "Flag", "activity bar counter (vs code)", "Counter badge (quantity)", "Health", "Status Pill"]'
    ></mm-component-aka>

    <mm-component-example>
      <mm-tag-group>
        <mm-tag tone="default">default</mm-tag>
        <mm-tag tone="green">green</mm-tag>
        <mm-tag tone="yellow">yellow</mm-tag>
        <mm-tag tone="red">red</mm-tag>
        <mm-tag tone="blue">blue</mm-tag>
        <mm-tag tone="purple">purple</mm-tag>
        <mm-tag tone="pink">pink</mm-tag>
        <mm-tag tone="orange">orange</mm-tag>
        <mm-tag tone="cyan">cyan</mm-tag>
      </mm-tag-group>
    </mm-component-example>

    <mm-component-props>
      <mm-prop
        name="tone"
        type="'default' | 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'pink' | 'orange' | 'cyan' = 'default'"
      ></mm-prop>
      <mm-prop name="icon" type="IconName" optional></mm-prop>
    </mm-component-props>

    <mm-component-tokens>
      <mm-token name="tag-height" default="var(--size-24)"></mm-token>
      <mm-token name="tag-padding-inline" default="var(--space-2)"></mm-token>
      <mm-token name="tag-gap" default="var(--space-1)"></mm-token>
      <mm-token name="tag-text-size" default="var(--font-size-12)"></mm-token>
      <mm-token name="tag-border-radius" default="var(--radius)"></mm-token>
    </mm-component-tokens>

    <mm-component-anatomy
      parts='[
      "컨테이너 — tone으로 배경·글자 색상을 정의하는 배지 형태입니다.",
      "아이콘 — 분류나 상태를 보조하는 선택적 메타포입니다.",
      "레이블 — 분류·상태를 나타내는 짧은 텍스트."
    ]'
    >
      <div style="position: relative; display: inline-block">
        <mm-tag tone="green" icon="check-circle">승인됨</mm-tag>

        <mm-list-marker
          variant="number"
          value="1"
          style="position: absolute; left: -1.75rem; top: 50%; transform: translateY(-50%)"
        ></mm-list-marker>
        <mm-list-marker
          variant="number"
          value="2"
          style="position: absolute; left: 0.75rem; bottom: -1.75rem; transform: translateX(-50%)"
        ></mm-list-marker>
        <mm-list-marker
          variant="number"
          value="3"
          style="position: absolute; right: 0.75rem; bottom: -1.75rem; transform: translateX(50%)"
        ></mm-list-marker>
      </div>
    </mm-component-anatomy>

    <mm-component-guide>
      <mm-component-feature-list>
        <mm-feature
          heading="Glanceable"
          subtitle="notification, status, informational"
          description="클릭이나 삭제 같은 인터랙션 없이(Read-only), 컬러·아이콘 등의 시각적 단서로 상태·긴급도나 부가 메타 정보를 화면을 훑는 것만으로 한눈에 파악하게 합니다. (e.g., 진행 중, 승인 대기, 배송비 무료, NEW)"
        ></mm-feature>
        <mm-feature
          heading="Groupable"
          description="여러 태그는 tag-group으로 묶어 나열합니다. 간격과 줄바꿈은 그룹이 소유합니다."
        ></mm-feature>
      </mm-component-feature-list>
    </mm-component-guide>

    <mm-component-section heading="MostPopularTag" description="구체 레벨. 가장 인기있는 태그">
      <mm-tag>🔥 Most Popular</mm-tag>
    </mm-component-section>

    <mm-component-section heading="KeywordTagGroup" description="">
      <mm-keyword-tag-group keywords='["keyword1", "keyword2", "keyword3"]'></mm-keyword-tag-group>
    </mm-component-section>

    <mm-component-section
      heading="AccentTag"
      description="단일 엘리먼트에 시각적 강조를 부여하는 작은 라벨형 컴포넌트입니다. 리스트나 카드 안에서 특정 항목 하나를 다른 항목들과 구분 짓거나(New, Beta, Featured 등) 콘텐츠의 상태·속성을 짧은 텍스트로 표시할 때 사용합니다."
    >
      <mm-paragraph>
        Badge/Chip과의 구분: Badge는 보통 카운트나 상태를 나타내는 인디케이터, Chip은 입력값이나
        필터처럼 상호작용 가능한(삭제·선택) 단위인 반면, AccentTag는 순수하게 시각적 강조 표시이며
        기본적으로 비인터랙티브합니다.
      </mm-paragraph>
      <mm-paragraph>
        기본적으로 비인터랙티브합니다. 클릭/삭제 등의 액션이 필요하다면 이는 Chip의 책임이지
        AccentTag의 책임이 아닙니다. 단일성: 이름 그대로 "하나의 엘리먼트"를 강조하는 용도이므로,
        여러 개를 리스트처럼 나열해 필터링하거나 다중 선택하는 시나리오에는 적합하지 않습니다. 그런
        경우엔 Chip Group 같은 별도 패턴을 쓰는 게 맞습니다. 기본적으로 비인터랙티브합니다.
      </mm-paragraph>
      <mm-paragraph>
        콘텐츠: 짧은 텍스트(1~2단어) 또는 텍스트+아이콘 조합만 지원하며, 긴 문장이나 복잡한
        레이아웃은 담지 않습니다.
      </mm-paragraph>
      <mm-tag-group>
        <mm-accent-tag>Featured</mm-accent-tag>
      </mm-tag-group>
    </mm-component-section>

    <mm-component-section heading="CategoryTag" description="">
      <mm-tag-group>
        <mm-category-tag category="music">Jazz</mm-category-tag>
        <mm-category-tag category="finance">Stocks</mm-category-tag>
        <mm-category-tag category="design">UI Design</mm-category-tag>
        <mm-category-tag category="engineering">Frontend</mm-category-tag>
        <mm-category-tag category="marketing">Branding</mm-category-tag>
        <mm-category-tag category="news">Breaking</mm-category-tag>
        <mm-category-tag category="lifestyle">Wellness</mm-category-tag>
        <mm-category-tag category="sports" icon="graph-up">Football</mm-category-tag>
      </mm-tag-group>
    </mm-component-section>

    <mm-component-section heading="StatusTag" description="">
      <mm-tag-group>
        <mm-status-tag variant="neutral">neutral</mm-status-tag>
        <mm-status-tag variant="success">success</mm-status-tag>
        <mm-status-tag variant="warning">warning</mm-status-tag>
        <mm-status-tag variant="error">error</mm-status-tag>
        <mm-status-tag variant="info">info</mm-status-tag>
      </mm-tag-group>
    </mm-component-section>
    <mm-component-section
      heading="Dot"
      description="텍스트 없이 색상만으로 상태를 표시하는 최소 단위의 인디케이터입니다. tag와 같은 컬러 팔레트를 공유합니다."
    >
      <mm-flex gap="2" align-items="center">
        <mm-dot tone="default"></mm-dot>
        <mm-dot tone="green"></mm-dot>
        <mm-dot tone="yellow"></mm-dot>
        <mm-dot tone="red"></mm-dot>
        <mm-dot tone="blue"></mm-dot>
        <mm-dot tone="purple"></mm-dot>
        <mm-dot tone="pink"></mm-dot>
        <mm-dot tone="orange"></mm-dot>
        <mm-dot tone="cyan"></mm-dot>
        <mm-dot tone="gold"></mm-dot>
      </mm-flex>

      <mm-flex gap="4" align-items="center">
        <mm-flex gap="1" align-items="center">
          <mm-dot variant="live"></mm-dot>
          <mm-paragraph>live</mm-paragraph>
        </mm-flex>
        <mm-flex gap="1" align-items="center">
          <mm-dot variant="new"></mm-dot>
          <mm-paragraph>new</mm-paragraph>
        </mm-flex>
        <mm-flex gap="1" align-items="center">
          <mm-dot variant="unread"></mm-dot>
          <mm-paragraph>unread</mm-paragraph>
        </mm-flex>
      </mm-flex>

      <mm-component-props>
        <mm-prop
          name="tone"
          type="'default' | 'green' | 'yellow' | 'red' | 'blue' | 'purple' | 'pink' | 'orange' | 'cyan' | 'gold' = 'default'"
        ></mm-prop>
        <mm-prop name="variant" type="'live' | 'new' | 'unread'" optional></mm-prop>
      </mm-component-props>
    </mm-component-section>

    <mm-component-related>
      <mm-button-group>
        <mm-hashtag-link href="text.html">Text</mm-hashtag-link>
        <mm-hashtag-link href="button.html">Button</mm-hashtag-link>
      </mm-button-group>
    </mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
