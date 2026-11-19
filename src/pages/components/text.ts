import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { componentPropsOf, rule } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'dialog.html', label: 'Dialog' },
  { href: 'result.html', label: 'Result' },
  { href: 'notice.html', label: 'Notice' },
  { href: 'list-item.html', label: 'List Item' },
  { href: 'menu-item.html', label: 'Menu Item' },
  { href: 'thumbnail.html', label: 'Thumbnail' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://design-system.service.gov.uk/components/summary-list/',
    label: 'GOV.UK Design System - Summary List',
  },
  {
    href: 'https://en.wikipedia.org/wiki/Adjacency_pairs',
    label: 'Wikipedia - Adjacency Pairs',
  },
  {
    href: 'https://design.innovaccer.com/components/keyValuePair/usage/',
    label: 'Innovaccer Design - Key Value Pair',
  },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('mm-text')]

const componentFeatures: ComponentFeatureItem[] = []

const sizeCode = `<mm-text size="32">font size 32px</mm-text>
<mm-text size="24">font size 24px</mm-text>
<mm-text size="18">font size 18px</mm-text>
<mm-text size="14">font size 14px</mm-text>
<mm-text size="12">font size 12px</mm-text>`

const weightCode = `<mm-text weight="medium">font weight medium</mm-text>
<mm-text weight="bold">font weight bold</mm-text>`

const colorCode = `<mm-text color="inherit">color inherit</mm-text>
<mm-text color="light">color light</mm-text>
<mm-text color="danger">color danger</mm-text>`

const maxLinesCode = `<mm-text as="p" max-lines="1">한 줄에서 말줄임되는 텍스트입니다.</mm-text>
<mm-text as="p" max-lines="2">두 줄까지 노출되는 텍스트입니다.</mm-text>
<mm-text as="p" max-lines="3">세 줄까지 노출되는 텍스트입니다.</mm-text>`

const headingCode = `<mm-heading level="1">페이지 레벨의 타이틀</mm-heading>
<mm-heading level="2">섹션 레벨의 타이틀</mm-heading>`

const captionCode = `<mm-thumbnail ratio="16:9" caption="이미지 하단에 배치되는 설명 텍스트"></mm-thumbnail>`

const paragraphCode = `<mm-paragraph-group>
  <mm-paragraph size="small">보조 정보를 전하는 본문입니다.</mm-paragraph>
  <mm-paragraph max-lines="3">일반적인 UI 본문입니다.</mm-paragraph>
  <mm-paragraph size="large">콘텐츠 뷰의 본문입니다.</mm-paragraph>
</mm-paragraph-group>`

const readMoreParagraphCode = `<mm-read-more-paragraph max-length="100" content="긴 문단의 전체 내용"></mm-read-more-paragraph>`

const statusMessageCode = `<mm-status-message heading="주문이 완료되었습니다." message="주문 내역은 마이페이지에서 확인할 수 있습니다."></mm-status-message>`

const metaItemGroupCode = `<mm-meta-item-group gap="2">
  <mm-meta-item layout="inline" label="국가" value="미국"></mm-meta-item>
  <mm-meta-item layout="inline" label="언어" value="영어"></mm-meta-item>
</mm-meta-item-group>`

const heroSectionCode = `<mm-hero-section
  heading="Hero Title"
  description="페이지의 목적을 설명하는 문장"
  .primaryAction=\${{ label: '콜 투 액션', onClick: () => {} }}
  .secondaryAction=\${{ label: '더 알아보기', onClick: () => {} }}
></mm-hero-section>`

const textListCode = `<mm-text-list variant="check" .texts=\${['첫 번째 항목', '두 번째 항목']}></mm-text-list>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="Text"
      description="정보의 위계를 세우고 핵심 내용을 전달합니다. 크기, 굵기, 행간의 조화를 통해 설계된 타이포그래피는 사용자가 방대한 콘텐츠 속에서도 길을 잃지 않고, 서비스가 의도한 우선순위에 따라 정보를 자연스럽게 습득하도록 돕습니다."
    ></mm-page-header>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="size" variant="pill">
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="weight">Weight</mm-tab>
        <mm-tab value="color">Color</mm-tab>
        <mm-tab value="max-lines">Max Lines</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex direction="column" gap="1">
            <mm-text size="32">font size 32px</mm-text>
            <mm-text size="24">font size 24px</mm-text>
            <mm-text size="18">font size 18px</mm-text>
            <mm-text size="14">font size 14px</mm-text>
            <mm-text size="12">font size 12px</mm-text>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${sizeCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="weight">
        <mm-component-example>
          <mm-flex direction="column" gap="1">
            <mm-text weight="medium">font weight medium</mm-text>
            <mm-text weight="bold">font weight bold</mm-text>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${weightCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="color">
        <mm-component-example>
          <mm-flex direction="column" gap="1">
            <mm-text color="inherit">color inherit</mm-text>
            <mm-text color="light">color light</mm-text>
            <mm-text color="danger">color danger</mm-text>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${colorCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="max-lines">
        <mm-component-example>
          <mm-flex direction="column" gap="3">
            <mm-text as="p" max-lines="1">
              한 줄에서 말줄임되는 텍스트입니다. 목록의 제목이나 카드의 이름처럼 한 줄 높이를
              유지해야 하는 자리에 사용하며, 영역을 넘치는 나머지 내용은 말줄임으로 생략됩니다.
            </mm-text>
            <mm-text as="p" max-lines="2">
              두 줄까지 노출되는 텍스트입니다. 사용자는 핵심 내용을 빠르게 훑을 수 있고, 세부 내용은
              상세 화면에서 확인할 수 있습니다. 반복되는 목록 안에서 설명 길이가 제각각일 때 높이를
              맞추는 데 유용합니다. 사용자는 핵심 내용을 빠르게 훑을 수 있고, 세부 내용은 상세
              화면에서 확인할 수 있습니다. 넘치는 내용은 말줄임으로 생략됩니다.
            </mm-text>
            <mm-text as="p" max-lines="3">
              세 줄까지 노출되는 텍스트입니다. 너무 짧게 자르면 맥락이 사라지는 소개글이나 요약문에
              적합합니다. 화면 안의 리듬은 유지하면서도 충분한 정보를 제공해야 할 때 사용합니다.
              너무 짧게 자르면 맥락이 사라지는 소개글이나 요약문에 적합합니다. 화면 안의 리듬은
              유지하면서도 충분한 정보를 제공해야 할 때 사용합니다.
            </mm-text>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${maxLinesCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide .features=${componentFeatures}></mm-component-guide>

    <mm-component-section
      heading="Headings"
      description="level 5는 그룹 라벨용으로 보조 색을 갖습니다."
      .code=${headingCode}
    >
      <mm-flex direction="column" gap="3">
        <mm-heading level="1">페이지 레벨의 타이틀</mm-heading>
        <mm-heading level="2">섹션 레벨의 타이틀</mm-heading>
        <mm-heading level="3">소제목</mm-heading>
        <mm-heading level="4">더소제목</mm-heading>
        <mm-heading level="5">가장 낮은 소제목</mm-heading>
      </mm-flex>
    </mm-component-section>

    <mm-component-section
      heading="Caption"
      description="보조 설명, 메타 정보, 이미지 캡션처럼 낮은 위계의 텍스트입니다."
      .code=${captionCode}
    >
      <mm-thumbnail ratio="16:9" caption="이미지 하단에 배치되는 설명 텍스트"></mm-thumbnail>
    </mm-component-section>

    <mm-component-section
      heading="Paragraph / ParagraphGroup"
      description="본문(Body). label, help text, caption / kicker/overline/eyebrow"
      .code=${paragraphCode}
    >
      <mm-paragraph-group>
        <mm-paragraph size="small">
          카드의 부제나 출처 설명처럼 본문보다 한 단계 낮은 보조 정보를 전달합니다.
        </mm-paragraph>
        <mm-paragraph max-lines="3">
          이런 생각을 한 건 다들 식탁에 앉은 후였고, 나는 재미있는 고래잡이 이야기를 들을 기대에
          부풀었다. 그런데 이거 참 놀랍게도 거의 모두가 깊은 침묵에 잠겼다. 그것도 모자라 다들
          난감해하는 눈치였다. 아니, 폭풍우가 몰아치는 가운데 엄청나게 큰 고래를 잡아 올리고 눈도
          깜빡하지 않은 채 사투를 벌여서 죽이는 용맹한 바닷사람들이 아침 식탁에서는 양 떼마냥
          부끄러워하며 서로를 힐끔거릴 뿐이었다.
        </mm-paragraph>
        <mm-paragraph size="large">
          포스트나 게시판 같은 콘텐츠 뷰에서는 글이 화면의 주인공이므로 본문을 크고 여유 있게
          읽히도록 합니다.
        </mm-paragraph>
      </mm-paragraph-group>
    </mm-component-section>

    <mm-component-section heading="Read More Paragraph" .code=${readMoreParagraphCode}>
      <mm-read-more-paragraph
        max-length="100"
        content="이런 생각을 한 건 다들 식탁에 앉은 후였고, 나는 재미있는 고래잡이 이야기를 들을 기대에 부풀었다. 그런데 이거 참 놀랍게도 거의 모두가 깊은 침묵에 잠겼다. 그것도 모자라 다들 난감해하는 눈치였다. 아니, 폭풍우가 몰아치는 가운데 엄청나게 큰 고래, 그것도 생전 처음 보는 고래를 수줍은 기색 없이 잡아 올리고 눈도 깜빡하지 않은 채 사투를 벌여서 죽이는 용맹한 바닷사람들이 직업도 똑같고 취향까지 비슷한 사람들이 모여 앉은 아침 식탁에서는 그린 산맥의 목장을 한 번도 떠나 본 적 없는 양 떼마냥 부끄러워하며 서로를 힐끔거릴 뿐이었다."
      ></mm-read-more-paragraph>
    </mm-component-section>

    <mm-component-section
      heading="Status Message"
      description="시스템 상태를 사용자에게 전달하는 가운데 정렬 메시지 모듈입니다. message는 사용자의 관점에서, description은 시스템을 주어로 서술합니다. Dialog, Result에서 사용합니다."
      .code=${statusMessageCode}
    >
      <mm-status-message
        heading="주문이 완료되었습니다."
        message="주문 내역은 마이페이지에서 확인할 수 있습니다."
      ></mm-status-message>
    </mm-component-section>

    <mm-component-section heading="Meta Item Group" .code=${metaItemGroupCode}>
      <mm-meta-item-group direction="column" gap="2">
        <mm-meta-item label="상품 금액" value="₩ 16,000"></mm-meta-item>
        <mm-meta-item label="배송비" value="무료"></mm-meta-item>
        <mm-meta-item label="총 결제 금액" value="₩ 16,000"></mm-meta-item>
      </mm-meta-item-group>
      <mm-separator></mm-separator>
      <mm-meta-item-group gap="2">
        <mm-meta-item layout="inline" label="국가" value="미국"></mm-meta-item>
        <mm-meta-item layout="inline" label="언어" value="영어"></mm-meta-item>
        <mm-meta-item layout="inline" label="장르" value="드라마"></mm-meta-item>
        <mm-meta-item layout="inline" label="러닝타임" value="103분"></mm-meta-item>
      </mm-meta-item-group>
      <mm-separator></mm-separator>
      <mm-meta-item-group gap="2">
        <mm-meta-item layout="stacked" label="사이즈" value="보통"></mm-meta-item>
        <mm-meta-item layout="stacked" label="한글" value="작은 거 필요하나"></mm-meta-item>
        <mm-meta-item layout="stacked" label="Move" value="562 kcal"></mm-meta-item>
      </mm-meta-item-group>
      <mm-separator></mm-separator>
      <mm-meta-item-group gap="2">
        <mm-meta-item
          layout="stacked"
          label="리뷰 116개"
          value="⭐ 4.8"
          value-size="large"
        ></mm-meta-item>
        <mm-meta-item
          layout="stacked"
          label="토마토미터"
          value="🍅 97%"
          value-size="large"
        ></mm-meta-item>
        <mm-meta-item
          layout="stacked"
          label="등급"
          value="18세 이상"
          value-size="large"
        ></mm-meta-item>
      </mm-meta-item-group>
    </mm-component-section>

    <mm-component-section
      heading="Hero Section"
      description="페이지 최상단에서 가장 먼저 읽히는 제목과 설명을 세웁니다. 그 아래에 버튼 그룹이나 목록을 두어 다음 행동을 이어 줍니다. 사용자는 페이지의 목적과 시작점을 한눈에 알 수 있습니다."
      .code=${heroSectionCode}
    >
      <mm-hero-section
        heading="Hero Title"
        description="이런 생각을 한 건 다들 식탁에 앉은 후였고, 나는 재미있는 고래잡이 이야기를 들을 기대에 부풀었다. 그런데 이거 참 놀랍게도 거의 모두가 깊은 침묵에 잠겼다. 이야기를 들을 기대에 부풀었다. 그런데 이거 참 놀랍게도 거의 모두가 깊은 침묵에 잠겼다."
        .primaryAction=${{ label: '콜 투 액션' }}
        .secondaryAction=${{ label: '더 알아보기' }}
      ></mm-hero-section>
    </mm-component-section>

    <mm-component-section
      heading="Text List"
      description="TODO 텍스트 목록을 2 댑스(nested)로 제공하지 마세요. 중첩된 목록은 콘텐츠를 읽기 어렵게 하며 작은
  화면에 적합하지 않다. 약관에서는 사용해야 할 수도."
      .code=${textListCode}
    >
      <div>
        <mm-text-list
          variant="number"
          .texts=${[
            '순서가 있는 리스트의 첫 번째 항목',
            '절차나 우선순위처럼 순서가 의미를 갖는 콘텐츠에 사용합니다.',
            '마커는 number 변형을 사용합니다.',
          ]}
        ></mm-text-list>
        <mm-separator variant="section"></mm-separator>
        <mm-text-list
          variant="check"
          .texts=${[
            '체크리스트 항목',
            '완료, 충족, 포함 같은 긍정적인 상태를 나타낼 때 사용합니다.',
            '마커는 check 변형을 사용합니다.',
          ]}
        ></mm-text-list>
        <mm-separator variant="section"></mm-separator>
        <mm-product-price
          size="large"
          original-price="₩ 30,000"
          price="₩ 20,000"
          discount="30%"
        ></mm-product-price>
      </div>
    </mm-component-section>

    <mm-component-section
      heading="Code"
      description="본문 속 컴포넌트 이름·속성·토큰처럼 코드로 읽어야 하는 짧은 조각입니다. 여러 줄 스니펫은 Code Block으로 보여줍니다."
    >
      <mm-flex direction="column" gap="3">
        <mm-paragraph>
          열림 상태는
          <mm-code>open</mm-code>
          속성에 반영하고, 겹침 순서는
          <mm-code>--material-zindex-popover</mm-code>
          토큰으로 정합니다.
        </mm-paragraph>
        <mm-code-block
          .code=${'<mm-paragraph>\n  <mm-code>open</mm-code> 속성에 반영합니다.\n</mm-paragraph>'}
        ></mm-code-block>
      </mm-flex>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
