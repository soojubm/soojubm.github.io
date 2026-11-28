import { html } from 'lit'

import type { CastMember } from '@/components/domains/cast-list/cast-list'
import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { componentPropsOf, subComponentPropsOf } from '@/components/domains/component'
import { renderPage } from '@/components/layouts/base-layouts'

const relatedComponents: ComponentRelatedItemData[] = [
  { href: 'avatar.html', label: 'Avatar' },
  { href: 'menu-item.html', label: 'Menu Item' },
]

const casts: CastMember[] = [
  { name: '스튜어트 로젠버그', credit: '감독', href: '#', imageSrc: '/src/images/soojubm.png' },
  { name: '폴 뉴먼', credit: '주연', href: '#', imageSrc: '/src/images/soojubm.png' },
]

const componentReferences: ComponentReferenceItemData[] = [
  {
    href: 'https://developer.apple.com/documentation/SwiftUI/List',
    label: 'SwiftUI - List',
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/lists-and-tables',
    label: 'Apple HIG - Lists and Tables',
  },
  {
    href: 'https://m3.material.io/components/lists/overview',
    label: 'Material Design 3 - Lists',
  },
  {
    href: 'https://reactnativeelements.com/docs/components/listitem',
    label: 'React Native Elements - ListItem',
  },
  {
    href: 'https://api.flutter.dev/flutter/material/ListTile-class.html',
    label: 'Flutter - ListTile',
  },
]

const componentProps: ComponentPropItemData[] = [
  ...componentPropsOf('fff-list-item'),
  { name: 'slot: description', type: 'HTMLElement', optional: true },
  { name: 'slot: trailing', type: 'HTMLElement', optional: true },
  ...subComponentPropsOf('fff-list-item-group'),
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Structural',
    description:
      'leading·content·trailing의 고정된 골격으로 반복되는 행의 구조를 잡습니다. 상호작용 없이 레이아웃만 담당하는 표현 전용 행입니다.',
  },
]

const sizeCode = `<fff-list-item-group>
  <fff-list-item label="Small" avatar-shape="circle" avatar-src="/src/images/soojubm.png"></fff-list-item>
  <fff-list-item size="medium" label="Medium" description="Youtube Subscriber" avatar-shape="circle" avatar-src="/src/images/soojubm.png"></fff-list-item>
  <fff-list-item size="large" label="Large" description="Youtube Subscriber" avatar-shape="circle" avatar-src="/src/images/soojubm.png"></fff-list-item>
</fff-list-item-group>`

const leadingCode = `<fff-list-item-group>
  <fff-list-item icon="user" label="아이콘"></fff-list-item>
  <fff-list-item emoji="🦔" label="이모지"></fff-list-item>
  <fff-list-item avatar-src="/src/images/soojubm.png" avatar-shape="circle" label="아바타"></fff-list-item>
</fff-list-item-group>
<fff-list-item-group>
  <fff-list-item size="medium" label="이메일 주소" description="soojubm@gmail.com">
    <fff-button slot="trailing">변경</fff-button>
  </fff-list-item>
  <fff-list-item size="medium" label="관심분야" description="문화/예술, 인권, 경제">
    <fff-tag slot="trailing">3개</fff-tag>
  </fff-list-item>
</fff-list-item-group>`

const trailingCode = `<fff-list-item-group>
  <fff-list-item size="medium" label="수줍이" description="UI Designer" avatar-shape="circle" avatar-src="/src/images/soojubm.png">
    <fff-follow-button slot="trailing"></fff-follow-button>
  </fff-list-item>
  <fff-list-item icon="bell" label="알림">
    <fff-tag slot="trailing">신규</fff-tag>
  </fff-list-item>
</fff-list-item-group>`

const multilineCode = `<fff-list-item-group>
  <fff-list-item icon="bell" label="small 행의 라벨이 영역보다 길어져서 두 줄 이상으로 넘어가는 경우">
    <fff-tag slot="trailing">신규</fff-tag>
  </fff-list-item>
  <fff-list-item size="medium" label="medium 행의 라벨이 영역보다 길어져서 두 줄로 넘어가는 경우" description="설명도 영역을 넘치면 줄바꿈되어 행의 높이가 내용만큼 늘어납니다." avatar-shape="circle" avatar-src="/src/images/soojubm.png">
    <fff-button slot="trailing">변경</fff-button>
  </fff-list-item>
  <fff-list-item size="large" label="large 행의 긴 라벨이 두 줄로 넘어가는 경우" description="설명이 길어 여러 줄이 되면 leading과 trailing은 content 높이의 가운데에 정렬됩니다." avatar-shape="circle" avatar-src="/src/images/soojubm.png"></fff-list-item>
</fff-list-item-group>`

const main = html`
  <fff-main>
    <fff-page-header
      heading="List Item"
      description="목록의 한 행을 이루는 표현 전용 골격입니다. 앞쪽 아바타·아이콘, 가운데 제목·설명, 뒤쪽 액션 자리를 행마다 같은 위치에 고정하므로, 사용자는 반복되는 행을 같은 리듬으로 훑으며 항목 사이의 차이에만 눈을 둘 수 있습니다."
    ></fff-page-header>

    <fff-component-aka .items=${['ListTile', 'Media Object']}></fff-component-aka>

    <fff-flex direction="column" gap="4">
      <fff-tab-list value="size" variant="pill">
        <fff-tab value="size">Size</fff-tab>
        <fff-tab value="leading">Leading</fff-tab>
        <fff-tab value="trailing">Trailing</fff-tab>
        <fff-tab value="multiline">Multiline</fff-tab>
      </fff-tab-list>
      <fff-tab-panel value="size">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-list-item-group>
              <fff-list-item
                label="Small"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></fff-list-item>
              <fff-list-item
                size="medium"
                label="Medium"
                description="Youtube Subscriber"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></fff-list-item>
              <fff-list-item
                size="large"
                label="Large"
                description="Youtube Subscriber"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></fff-list-item>
            </fff-list-item-group>
            <fff-paragraph>
              small은 한 줄만 그리는 행이라 description을 받아도 그리지 않습니다. 설명이 필요하면
              medium 이상을 씁니다.
            </fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${sizeCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="leading">
        <fff-component-example>
          <fff-flex direction="column" gap="6">
            <fff-list-item-group>
              <fff-list-item icon=${ICON_NAMES.USER} label="아이콘"></fff-list-item>
              <fff-list-item emoji="🦔" label="이모지"></fff-list-item>
              <fff-list-item
                avatar-src="/src/images/soojubm.png"
                avatar-shape="circle"
                label="아바타"
              ></fff-list-item>
            </fff-list-item-group>
            <fff-paragraph>사람·상품처럼 행이 개체를 대표할 때 씁니다.</fff-paragraph>
            <fff-list-item-group>
              <fff-list-item size="medium" label="이메일 주소" description="soojubm@gmail.com">
                <fff-button slot="trailing">변경</fff-button>
              </fff-list-item>
              <fff-list-item size="medium" label="관심분야" description="문화/예술, 인권, 경제">
                <fff-tag slot="trailing">3개</fff-tag>
              </fff-list-item>
            </fff-list-item-group>
            <fff-paragraph>
              모두 없으면 content가 왼쪽 끝에서 시작합니다. 설정처럼 항목끼리 성격이 같은 목록은
              왼쪽 그림이 구분에 보태는 것이 없어 비워 둡니다.
            </fff-paragraph>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${leadingCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="trailing">
        <fff-component-example>
          <fff-list-item-group>
            <fff-list-item
              size="medium"
              label="수줍이"
              description="UI Designer"
              avatar-shape="circle"
              avatar-src="/src/images/soojubm.png"
            >
              <fff-follow-button slot="trailing"></fff-follow-button>
            </fff-list-item>
            <fff-list-item icon=${ICON_NAMES.NOTIFICATION} label="알림">
              <fff-tag slot="trailing">신규</fff-tag>
            </fff-list-item>
          </fff-list-item-group>
        </fff-component-example>
        <fff-component-code .code=${trailingCode}></fff-component-code>
      </fff-tab-panel>
      <fff-tab-panel value="multiline">
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="6">
            <fff-list-item-group>
              <fff-list-item
                icon=${ICON_NAMES.NOTIFICATION}
                label="small 행의 라벨이 영역보다 길어져서 두 줄 이상으로 넘어가는 경우"
              >
                <fff-tag slot="trailing">신규</fff-tag>
              </fff-list-item>
              <fff-list-item
                size="medium"
                label="medium 행의 라벨이 영역보다 길어져서 두 줄로 넘어가는 경우"
                description="설명도 영역을 넘치면 줄바꿈되어 행의 높이가 내용만큼 늘어납니다."
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              >
                <fff-button slot="trailing">변경</fff-button>
              </fff-list-item>
              <fff-list-item
                size="large"
                label="large 행의 긴 라벨이 두 줄로 넘어가는 경우"
                description="설명이 길어 여러 줄이 되면 leading과 trailing은 content 높이의 가운데에 정렬됩니다."
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></fff-list-item>
            </fff-list-item-group>
            <fff-component-notice heading="여러 줄일 때의 line-height와 정렬">
              line-height는 한 줄 행 높이에 맞춘 값이라 여러 줄에서 줄 간격을 다시 정해야 합니다.
              정렬은 leading·trailing이 content 가운데에 서는 지금 방식과 첫 줄에 맞추는 방식 중
              기준을 정해야 합니다. 줄바꿈 대신 말줄임표로 자르고 전체 문구를 툴팁으로 보여 주는
              방식도 후보입니다.
            </fff-component-notice>
          </fff-flex>
        </fff-component-example>
        <fff-component-code .code=${multilineCode}></fff-component-code>
      </fff-tab-panel>
    </fff-flex>

    <fff-component-props .props=${componentProps}></fff-component-props>

    <fff-component-tokens .elements=${['fff-list-item']}></fff-component-tokens>

    <fff-component-guide .features=${componentFeatures}>
      <fff-content-section-list>
        <fff-content-section heading-level="3" heading="menu-item과는 어떤 차이가 있나요?">
          <fff-paragraph>
            <fff-code>fff-list-item</fff-code>
            은 행의 골격만 그리고,
            <fff-code>fff-menu-item-action</fff-code>
            같은 menu-item 계열은 이 골격에 눌러서 실행하는 동작을 더합니다.
          </fff-paragraph>
          <fff-text-list
            variant="check"
            .texts=${[
              '행을 눌러 명령을 실행하거나 값을 바꾸면 menu-item을 쓴다. 팝오버·시트 안이든 페이지에 붙박이로 놓이든 같다. 목록 전체에 Tab으로는 한 번만 닿고, 행 사이는 방향키로 옮긴다',
              '다른 곳으로 이동하거나, 행 안의 버튼·스위치로 조작하면 list-item을 쓴다. 행 전체가 눌리더라도 다른 곳으로 이동하는 것은 명령이 아니라 목록이다. 버튼·스위치는 trailing에 두어 컨트롤마다 Tab으로 닿게 한다',
            ]}
          ></fff-text-list>
        </fff-content-section>
        <fff-content-section
          heading-level="3"
          heading="접근성"
          .texts=${[
            '인물·게시물처럼 각 행이 다른 곳으로 이동하는 목록은 menu가 아니라 list로 둔다. 명령을 실행하는 menu로 알리면 보조기술 사용자는 이 목록을 명령 메뉴로 받아들인다. list로 두면 일반 목록으로 읽힌다',
            html`
              한 그룹에는 같은 계열의 role을 갖는 행만 둔다.
              <fff-code>fff-menu-item-group</fff-code>
              는 방향키로 행 사이를 옮겨 다닌다. 다른 계열의 행이 섞이면 그 행만 방향키에서 빠져
              Tab으로만 닿게 되고, 한 목록 안에서 키보드 동선이 둘로 갈린다
            `,
          ]}
        ></fff-content-section>
        <fff-content-section
          heading-level="3"
          heading="시각보정이 필요해요"
          description="label과 description이 함께 있으면 글자가 앞의 아이콘보다 아래로 치우쳐 보입니다. 글자만 위로 조금 올려 아이콘과 가운데를 맞추고, 행의 크기는 그대로 둡니다."
        ></fff-content-section>
      </fff-content-section-list>
    </fff-component-guide>

    <fff-component-anatomy
      .parts=${[
        'leading — 아이콘 또는 아바타를 넣는 선택적 영역. 없으면 content가 왼쪽 끝에서 시작합니다.',
        'content — label과 description으로 구성된 본문. 남은 공간을 채웁니다.',
        'trailing — 오른쪽에 배치되는 선택적 영역. 액션 버튼·뱃지·메타 텍스트 등을 넣습니다.',
      ]}
      .markers=${[
        { placement: 'block-end', offset: '1.5rem' },
        { placement: 'block-end', offset: '9.41rem' },
        { placement: 'block-end', offset: 'calc(100% - 2.09rem)' },
      ]}
    >
      <fff-list-item
        label="수줍이"
        description="바보"
        size="medium"
        avatar-variant="primary"
        avatar-shape="circle"
        avatar-src="/src/images/soojubm.png"
      >
        <fff-follow-button slot="trailing"></fff-follow-button>
      </fff-list-item>
    </fff-component-anatomy>

    <fff-component-section heading="UserItem" description="사용자 맥락">
      <fff-list-item-group>
        <fff-user-item
          size="medium"
          label="수줍이"
          description="UI Designer"
          avatar-src="/src/images/soojubm.png"
        ></fff-user-item>
        <fff-user-item
          size="medium"
          label="수줍이"
          description="바보"
          avatar-src="/src/images/soojubm.png"
        >
          <fff-follow-button slot="trailing"></fff-follow-button>
        </fff-user-item>
        <fff-user-item
          size="medium"
          label="알 수 없는 사용자"
          description="아바타 이미지가 없을 때"
          avatar-variant="secondary"
          icon=${ICON_NAMES.USER}
        >
          <fff-tag slot="trailing">테스트용 태그</fff-tag>
        </fff-user-item>
      </fff-list-item-group>
    </fff-component-section>

    <fff-component-section
      heading="SettingItem"
      description="설정 맥락. 행은 라벨과 설명만 그리고, action 자리에 놓인 스위치·버튼이 조작을 직접 받습니다."
    >
      <fff-list-item-group>
        <fff-setting-item
          icon=${ICON_NAMES.CODE}
          label="철저한 코드 리뷰"
          description="추가 발견 사항을 계속 찾도록 합니다."
        >
          <fff-switch slot="action" checked></fff-switch>
        </fff-setting-item>
        <fff-setting-item
          icon=${ICON_NAMES.DARK_MODE}
          label="다크 모드"
          description="어두운 배경 테마를 사용합니다."
        >
          <fff-switch slot="action"></fff-switch>
        </fff-setting-item>
      </fff-list-item-group>
    </fff-component-section>

    <fff-component-section
      heading="CastList"
      description="크레딧 맥락. 행 전체가 인물 상세로 가는 링크이고, 명령이 아닌 탐색이라 목록으로 다룹니다."
    >
      <fff-cast-list .casts=${casts}></fff-cast-list>
    </fff-component-section>

    <fff-component-section
      heading="OrderProductItem"
      description="커머스 맥락. 상품 이미지와 이름, 선택한 옵션, 가격을 한 줄에 같은 위계로 놓아 장바구니·주문서·주문완료가 같은 행을 공유합니다."
    >
      <fff-list-item-group>
        <fff-order-product-item
          image-src="/src/images/cake_gosum.jpg"
          name="뉴닉이 풀어 쓴 경제상식사전"
          option="평생 소장"
          price="₩ 11,900"
        ></fff-order-product-item>
        <fff-order-product-item
          image-src="/src/images/cake_gosum.jpg"
          name="가격을 따로 두는 경우"
          option="평생 소장"
        ></fff-order-product-item>
      </fff-list-item-group>
    </fff-component-section>

    <fff-component-related .items=${relatedComponents}></fff-component-related>

    <fff-component-references .items=${componentReferences}></fff-component-references>

    <fff-component-pager></fff-component-pager>
  </fff-main>
`

renderPage(main)
