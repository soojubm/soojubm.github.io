import { html } from 'lit'

import type { ComponentFeatureItem } from '@/components/domains/component/component-feature-list'
import type { ComponentPropItemData } from '@/components/domains/component/component-props'
import type { ComponentRelatedItemData } from '@/components/domains/component/component-related'
import type { ComponentTokenItemData } from '@/components/domains/component/component-tokens'

import { renderDocumentLayout } from '@/components/layouts/document-layout'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'button.html', label: 'Button' },
  { href: 'breadcrumb.html', label: 'Breadcrumb' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'href', type: 'string' },
  { name: 'target', type: 'string', optional: true },
  { name: 'external', type: 'boolean', optional: true },
  { name: 'message', type: 'string', optional: true },
  { name: 'link-label', type: 'string', optional: true },
  { name: 'icon', type: 'IconName', optional: true },
]

const componentTokens: ComponentTokenItemData[] = [
  { name: 'link-text-color', default: 'var(--color-primary)' },
  { name: 'link-gap', default: 'var(--space-1)' },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Interactive - action',
    description:
      '누르면 다른 위치로 이동합니다. 상호작용 가능함은 색상·밑줄 같은 일관된 기표로 드러냅니다.',
  },
  { heading: 'TODO', description: 'TODO' },
  { heading: 'TODO', description: 'TODO' },
]

const main = html`
  <main class="page">
    <mm-page-header
      heading="Link"
      description="사용자 여정 목적지. 페이지 이동. destination that can be bookmarked."
    ></mm-page-header>

    <mm-component-aka items='["Anchor"]'></mm-component-aka>

    <mm-component-example>
      <mm-flex direction="column" gap="3">
        <mm-read-more-paragraph
          limit="120"
          content="이런 생각을 한 건 다들 식탁에 앉은 후였고, 나는 재미있는 고래잡이 이야기를 들을 기대에 부풀었다. 그런데 이거 참 놀랍게도 거의 모두가 깊은 침묵에 잠겼다. 그것도 모자라 다들 난감해하는 눈치였다. 아니, 폭풍우가 몰아치는 가운데 엄청나게 큰 고래, 그것도 생전 처음 보는 고래를 수줍은 기색 없이 잡아 올리고 눈도 깜빡하지 않은 채 사투를 벌여서 죽이는 용맹한 바닷사람들이 직업도 똑같고 취향까지 비슷한 사람들이 모여 앉은 아침 식탁에서는 그린 산맥의 목장을 한 번도 떠나 본 적 없는 양 떼마냥 부끄러워하며 서로를 힐끔거릴 뿐이었다. 이 얼마나 희한한 광경인가! 숫기 없는 곰, 소심한 전사 같은 고래잡이들이라니!"
        ></mm-read-more-paragraph>
        <mm-keyword-tag-group
          keywords='["이것은헤시태그", "해시태그는클릭할수있다?", "해시태그를통한검색"]'
        ></mm-keyword-tag-group>
      </mm-flex>
      <mm-separator></mm-separator>
      <mm-link href="#" external="true">고래잡이</mm-link>
      <mm-separator></mm-separator>
      <section>
        <mm-flex direction="column" gap="2">
          <mm-link-prompt
            icon="pipe-3d"
            message="궁금증이 해결되지 않는다면?"
            link-label="지금 문의하기"
            href="#"
          ></mm-link-prompt>
          <mm-link-prompt
            icon="pipe-3d"
            message="Something's not right?"
            link-label="Get in touch with us."
            href="#"
          ></mm-link-prompt>
        </mm-flex>
      </section>
    </mm-component-example>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .tokens=${componentTokens}></mm-component-tokens>

    <mm-component-anatomy
      style="--component-anatomy-stage-padding: 0.5rem 0"
      parts='[
      "레이블 — 이동할 목적지를 설명하는 클릭 가능한 텍스트입니다.",
      "외부 링크 아이콘 — 새 탭/외부 사이트로 이동함을 나타내는 표식(external)."
    ]'
    >
      <mm-link href="https://soojubm.github.io" external>수줍이 디자인 시스템</mm-link>

      <!-- 번호 마커 -->
      <mm-list-marker
        variant="number"
        value="1"
        style="position: absolute; left: 2.5rem; top: -1.5rem; transform: translateX(-50%)"
      ></mm-list-marker>
      <mm-list-marker
        variant="number"
        value="2"
        style="position: absolute; right: -1.75rem; top: 50%; transform: translateY(-50%)"
      ></mm-list-marker>
    </mm-component-anatomy>

    <mm-component-guide>
      <mm-component-feature-list .features=${componentFeatures}></mm-component-feature-list>
      <mm-text-list
        texts='[
          "text button과의 차이. Link는 항상 텍스트 단락과 함께 사용합니다. word, phrase, paragraph와 사용되는 케이스 정의",
          "내부 링크와 외부 링크의 구별. 형태적 구별과 코드상 구별 target=_blank rel=noopener noreferrer"
        ]'
      ></mm-text-list>
    </mm-component-guide>
    <mm-component-related .items=${relatedComponents}></mm-component-related>
  </main>
`

document.addEventListener('DOMContentLoaded', () => {
  renderDocumentLayout(main)
})
