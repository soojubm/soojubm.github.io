import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

const main = html`
  <mm-page>
    <mm-page-header
      heading="Elevation"
      description="표면이 배경에서 얼마나 떠 있는지를 명도 대비와 그림자로 나타냅니다. 카드·팝오버·툴팁 같은 표면에만 쓰고 일반 컨트롤에는 주지 않습니다."
    ></mm-page-header>

    <mm-content-section-list>
      <mm-content-section>
        <mm-feature-group columns="3" column-max-width="400px">
          <mm-feature
            heading="명도와 그림자로 층위를 만든다"
            description="배경과의 명도 대비가 먼저 층위를 만들고, 그림자는 그 위에서 떠 있는 정도를 더합니다. 이 변화는 해당 영역이 하나의 단위이며 다룰 수 있다는 감각으로도 읽힙니다."
          ></mm-feature>
          <mm-feature
            heading="표면에만 준다"
            description="독립된 배경을 가진 표면만 떠오릅니다. 배경 안에 놓이는 radio·switch 같은 컨트롤에는 그림자를 주지 않습니다."
          ></mm-feature>
          <mm-feature
            heading="테마가 표현 수단을 바꾼다"
            description="밝은 테마는 그림자로, 어두운 테마는 배경 대비로, 반투명 테마는 blur로 같은 층위를 표현합니다. 표면은 그림자 값을 스스로 선언하지 않고 테마 토큰을 참조합니다."
          ></mm-feature>
        </mm-feature-group>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="단계">
        <mm-paragraph>
          그림자 원시값은 --shadow-high 하나입니다. 표면이 이 값을 직접 참조하거나, 화면 위로 뜨는
          시스템 레벨 표면은 재질 티어 토큰을 참조합니다.
        </mm-paragraph>
        <mm-flex direction="column" gap="3">
          <mm-list-item
            size="small"
            label="base"
            description="본문 안에서 살짝 뜬 카드·패널. --surface-base-shadow."
          ></mm-list-item>
          <mm-list-item
            size="small"
            label="chrome"
            description="화면에 고정된 내비게이션·툴바. --surface-chrome-shadow."
          ></mm-list-item>
          <mm-list-item
            size="small"
            label="overlay"
            description="드롭다운·팝오버·툴팁과 다이얼로그·시트. --surface-overlay-shadow."
          ></mm-list-item>
        </mm-flex>
        <mm-flex direction="column" gap="2">
          <code>--shadow-high</code>
          <code>--surface-base-shadow</code>
          <code>--surface-chrome-shadow</code>
          <code>--surface-overlay-shadow</code>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="주의">
        <mm-text-list
          .texts=${[
            'hover에서 잠깐 떠오르는 --interaction-hover-lift는 상호작용 피드백이지 고도 단계가 아닙니다. 정적인 층위와 섞어 쓰지 않습니다.',
            '한 화면에서 그림자는 한 단계만 씁니다. 배경 대비와 그림자를 동시에 여러 단계로 겹치면 층위가 무너집니다.',
            '겹침 순서는 --material-zindex-* 그룹 토큰으로 정합니다. 자세한 규칙은 Overlay 문서에 있습니다.',
          ]}
        ></mm-text-list>
      </mm-content-section>
    </mm-content-section-list>
  </mm-page>
`

renderPage(main)
