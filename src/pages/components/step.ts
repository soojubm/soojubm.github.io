import { html } from 'lit'

import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'
import type { TemplateResult } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'
import './step.css'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'breadcrumb.html', label: 'Breadcrumb' },
  { href: 'loading.html', label: 'Loading' },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'orientation', type: "'horizontal' | 'vertical' = 'horizontal'" },
  { name: 'label', type: "string = ''" },
  { name: 'active', type: 'boolean = false', optional: true },
  { name: 'aria-current', type: "'step'", optional: true },
]

const componentFeatures: ComponentFeatureItem[] = []

// 앞뒤 공백이 문장 안 여백으로 렌더되지 않도록 한 줄로 둔다.
// prettier-ignore
const code = (name: string) => html`<mm-code>${name}</mm-code>`

// 목록 항목은 해야 할 일을 굵은 한 줄로 먼저 두고 설명을 잇는다.
const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
`

const stepCode = `<mm-step>
  <mm-step-item active aria-current="step" label="장바구니"></mm-step-item>
  <mm-step-item label="결제"></mm-step-item>
  <mm-step-item label="주문완료"></mm-step-item>
</mm-step>`

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Step"
        description="여러 단계로 이루어진 작업의 진행 순서를 보여 주는 표시입니다. 단계를 순서대로 늘어놓고 현재 단계를 강조하므로, 사용자는 지금 몇 번째 단계에 있고 앞으로 얼마나 남았는지 알고 작업을 이어갈 수 있습니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-component-aka .items=${['Timeline', 'Stepper']}></mm-component-aka>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="horizontal" variant="pill">
        <mm-tab value="horizontal">Horizontal</mm-tab>
        <mm-tab value="vertical">Vertical</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="horizontal">
        <mm-component-example full-width>
          <mm-step>
            <mm-step-item active aria-current="step" label="장바구니"></mm-step-item>
            <mm-step-item label="결제"></mm-step-item>
            <mm-step-item label="주문완료"></mm-step-item>
          </mm-step>
        </mm-component-example>
      </mm-tab-panel>
      <mm-tab-panel value="vertical">
        <mm-component-example full-width>
          <mm-step orientation="vertical">
            <mm-step-item active label="I'm an engineer">
              <mm-paragraph>
                대통령은 국가의 원수이며, 외국에 대하여 국가를 대표한다. 국가원로자문회의의
                조직·직무범위 기타 필요한 사항은 법률로 정한다. 국가는 대외무역을 육성하며, 이를
                규제·조정할 수 있다.
              </mm-paragraph>
            </mm-step-item>
            <mm-step-item
              active
              aria-current="step"
              label="I want to design from scratch"
            ></mm-step-item>
            <mm-step-item label="One last thing ㅡ how will you use your prototpe?">
              <mm-flex direction="column" gap="3" align-items="flex-start">
                <mm-caption>(You can pick more than one)</mm-caption>
                <mm-button-group>
                  <mm-button>Share for feedback</mm-button>
                  <mm-button>Present live</mm-button>
                  <mm-button>Test with users</mm-button>
                </mm-button-group>
              </mm-flex>
            </mm-step-item>
          </mm-step>
        </mm-component-example>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-guide .features=${componentFeatures}>
      <mm-text-list
        variant="check"
        .texts=${[
          rule(
            html`
              지나온 단계는 ${code('active')}로, 지금 단계는 ${code('aria-current="step"')}로
              표시한다
            `,
            html`
              ${code('active')}는 채움과 글자 색으로 어디까지 왔는지 보이고,
              ${code('aria-current')}는 그중 지금 밟고 있는 한 단계를 보조기술에 알립니다. 번호와
              ${code('orientation')}은 순서에서 나오므로 ${code('mm-step')}이 채웁니다
            `,
          ),
          rule(
            '지나간 이력은 timeline으로 둔다',
            'step은 앞으로 밟을 순서를 같은 무게로 늘어놓고 끝을 예고합니다. 시점마다 내용이 다르고 최근 것이 먼저 오는 기록은 순서가 아니라 역순 이력이라 timeline이 맡습니다',
          ),
        ]}
      ></mm-text-list>
    </mm-component-guide>

    <mm-component-section
      heading="Timeline"
      description="같은 선 위에 항목을 세우지만 방향이 반대입니다. 시점을 태그로 앞세우고 그 아래 기록을 쌓으며, 항목마다 담기는 내용의 양이 다릅니다."
    >
      <section class="timeline">
        <div class="timeline-item">
          <mm-tag>2022. 11. 4.</mm-tag>
          <mm-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🐺"
            label="폰트 디자인"
            description="이도타입 / 한동훈"
          ></mm-list-item>
        </div>
        <div class="timeline-item">
          <mm-tag>2020. 02. - 2021. 02</mm-tag>
          <mm-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🦔"
            label="뉴닉, 프로덕트 디자이너"
          ></mm-list-item>
          <mm-text-list
            .texts=${[
              'MVP / Feature 일정 산정 및 스펙 정의',
              '이슈 트래킹, 우선순위 관리를 위한 백로그 구축',
              '온라인 리서치, VOC 분석을 통한 문제 정의',
              '프로덕트 디자인 (Userflow / UI / GUI), 프론트엔드 개발',
              '데이터 트래킹 및 분석 (hotjar, google analytics, google optimize)',
            ]}
          ></mm-text-list>
        </div>
        <div class="timeline-item">
          <mm-tag>2020</mm-tag>
          <mm-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🔢"
            label="그로스해킹 - 데이터와 실험을 통해 성장하는 서비스를 만드는 방법"
            description="인프런 양승화"
          ></mm-list-item>
        </div>
        <div class="timeline-item">
          <mm-tag>2019</mm-tag>
          <mm-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🔢"
            label="FE CONF2020 프론트엔드 컨퍼런스"
            description="롯데타워"
          ></mm-list-item>
        </div>
        <div class="timeline-item">
          <mm-tag>2018.07 ~ 2018.09</mm-tag>
          <mm-list-item
            size="medium"
            avatar-variant="secondary"
            emoji="🐺"
            label="자바스크립트 기본"
            description="양재동코드랩 / 서울창업허브 세미나실 3 김영보"
          ></mm-list-item>
        </div>
        <div class="timeline-item">
          <mm-tag>2017.07 ~ 2017.09</mm-tag>
          <mm-list-item-group>
            <mm-list-item
              size="medium"
              avatar-variant="secondary"
              emoji="🔢"
              label="글자, 그리고 표현"
              description="한글타이포그래피학교 현승재"
            ></mm-list-item>
            <mm-list-item
              size="medium"
              avatar-variant="secondary"
              emoji="🐺"
              label="GUI 디자인"
              description="SK 상생협력센터 T아카데미"
            ></mm-list-item>
            <mm-list-item
              size="medium"
              avatar-variant="secondary"
              emoji="🐺"
              label="크로스브라우징 디지털 퍼블리싱 4기"
              description="경원직업전문학교"
            ></mm-list-item>
          </mm-list-item-group>
        </div>
      </section>
    </mm-component-section>

    <mm-component-anatomy .code=${stepCode}></mm-component-anatomy>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
