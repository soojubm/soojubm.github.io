import { html } from 'lit'

import type { StepItemData } from '@/components/indicators/step/step'
import type {
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { componentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'breadcrumb.html', label: 'Breadcrumb' },
  { href: 'loading.html', label: 'Loading' },
]

const componentProps: ComponentPropItemData[] = [...componentPropsOf('fff-step')]

const horizontalItems: StepItemData[] = [
  { label: '장바구니', active: true, ariaCurrent: 'step' },
  { label: '결제' },
  { label: '주문완료' },
]

const verticalItems: StepItemData[] = [
  {
    label: "I'm an engineer",
    active: true,
    content: html`
      <fff-paragraph>
        대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 국가원로자문회의의 조직·직무범위
        기타 필요한 사항은 법률로 정한다. 국가는 대외무역을 육성하며, 이를 규제·조정할 수 있다.
      </fff-paragraph>
    `,
  },
  { label: 'I want to design from scratch', active: true, ariaCurrent: 'step' },
  {
    label: 'One last thing ㅡ how will you use your prototpe?',
    content: html`
      <fff-flex direction="column" gap="3" align-items="flex-start">
        <fff-caption>(You can pick more than one)</fff-caption>
        <fff-button-group>
          <fff-button>Share for feedback</fff-button>
          <fff-button>Present live</fff-button>
          <fff-button>Test with users</fff-button>
        </fff-button-group>
      </fff-flex>
    `,
  },
]

const horizontalCode = `<fff-step .items=\${[
  { label: '장바구니', active: true, ariaCurrent: 'step' },
  { label: '결제' },
  { label: '주문완료' },
]}></fff-step>`

const verticalCode = `<fff-step orientation="vertical" .items=\${[
  { label: "I'm an engineer", active: true, content: html\`<fff-paragraph>...</fff-paragraph>\` },
  { label: 'I want to design from scratch', active: true, ariaCurrent: 'step' },
  { label: 'One last thing', content: html\`<fff-button-group>...</fff-button-group>\` },
]}></fff-step>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="Step"
      description="여러 단계로 이루어진 작업의 진행 순서를 보여 주는 표시입니다. 단계를 순서대로 늘어놓고 현재 단계를 강조하므로, 사용자는 지금 몇 번째 단계에 있고 앞으로 얼마나 남았는지 알고 작업을 이어갈 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['Timeline', 'Stepper']}></fff-component-aka>

    <fff-flex direction="column" gap="4">
      <fff-tab-list value="horizontal" variant="pill">
        <fff-tab value="horizontal">Horizontal</fff-tab>
        <fff-tab value="vertical">Vertical</fff-tab>
      </fff-tab-list>
      <fff-tab-panel value="horizontal">
        <fff-component-example full-width>
          <fff-step .items=${horizontalItems}></fff-step>
        </fff-component-example>
        <fff-component-code .code=${horizontalCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="vertical">
        <fff-component-example full-width>
          <fff-step orientation="vertical" .items=${verticalItems}></fff-step>
        </fff-component-example>
        <fff-component-code .code=${verticalCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-section
      heading="Timeline"
      description="시점마다 쌓인 지나간 이력을 최근 순으로 보여 줍니다."
    >
      <fff-timeline>
        <fff-timeline-item label="2022. 11. 4.">
          <fff-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🐺"
            label="폰트 디자인"
            description="이도타입 / 한동훈"
          ></fff-list-item>
        </fff-timeline-item>
        <fff-timeline-item label="2020. 02. - 2021. 02">
          <fff-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🦔"
            label="뉴닉, 프로덕트 디자이너"
          ></fff-list-item>
          <fff-text-list
            .texts=${[
              'MVP / Feature 일정 산정 및 스펙 정의',
              '이슈 트래킹, 우선순위 관리를 위한 백로그 구축',
              '온라인 리서치, VOC 분석을 통한 문제 정의',
              '프로덕트 디자인 (Userflow / UI / GUI), 프론트엔드 개발',
              '데이터 트래킹 및 분석 (hotjar, google analytics, google optimize)',
            ]}
          ></fff-text-list>
        </fff-timeline-item>
        <fff-timeline-item label="2020">
          <fff-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🔢"
            label="그로스해킹 - 데이터와 실험을 통해 성장하는 서비스를 만드는 방법"
            description="인프런 양승화"
          ></fff-list-item>
        </fff-timeline-item>
        <fff-timeline-item label="2019">
          <fff-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🔢"
            label="FE CONF2020 프론트엔드 컨퍼런스"
            description="롯데타워"
          ></fff-list-item>
        </fff-timeline-item>
        <fff-timeline-item label="2018.07 ~ 2018.09">
          <fff-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🐺"
            label="자바스크립트 기본"
            description="양재동코드랩 / 서울창업허브 세미나실 3 김영보"
          ></fff-list-item>
        </fff-timeline-item>
        <fff-timeline-item label="2017.07 ~ 2017.09">
          <fff-list-item-group gap="2">
            <fff-list-item
              size="medium"
              avatar-variant="secondary"
              emoji="🔢"
              label="글자, 그리고 표현"
              description="한글타이포그래피학교 현승재"
            ></fff-list-item>
            <fff-list-item
              size="medium"
              avatar-variant="secondary"
              emoji="🐺"
              label="GUI 디자인"
              description="SK 상생협력센터 T아카데미"
            ></fff-list-item>
            <fff-list-item
              size="medium"
              avatar-variant="secondary"
              emoji="🐺"
              label="크로스브라우징 디지털 퍼블리싱 4기"
              description="경원직업전문학교"
            ></fff-list-item>
          </fff-list-item-group>
        </fff-timeline-item>
      </fff-timeline>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
