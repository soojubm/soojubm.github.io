import { html } from 'lit'

import type { CastMember } from '@/components/domains/cast-list/cast-list'
import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import { ICON_NAMES } from '@/components/common'
import { componentPropsOf, subComponentPropsOf, rule } from '@/components/domains/component'
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
    label: 'MD3 - Lists',
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
  ...componentPropsOf('mm-list-item'),
  { name: 'slot: trailing', type: 'HTMLElement', optional: true },
  ...subComponentPropsOf('mm-list-item-group'),
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Structural',
    description:
      'leading·content·trailing의 고정된 골격으로 반복되는 행의 구조를 잡습니다. 상호작용 없이 레이아웃만 담당하는 표현 전용 행입니다.',
  },
]

const sizeCode = `<mm-list-item-group>
  <mm-list-item label="Small" avatar-shape="circle" avatar-src="/src/images/soojubm.png"></mm-list-item>
  <mm-list-item size="medium" label="Medium" description="Youtube Subscriber" avatar-shape="circle" avatar-src="/src/images/soojubm.png"></mm-list-item>
  <mm-list-item size="large" label="Large" description="Youtube Subscriber" avatar-shape="circle" avatar-src="/src/images/soojubm.png"></mm-list-item>
</mm-list-item-group>`

const leadingCode = `<mm-list-item-group>
  <mm-list-item icon="user" label="아이콘"></mm-list-item>
  <mm-list-item emoji="🦔" label="이모지"></mm-list-item>
  <mm-list-item avatar-src="/src/images/soojubm.png" avatar-shape="circle" label="아바타"></mm-list-item>
</mm-list-item-group>
<mm-list-item-group>
  <mm-list-item size="medium" label="이메일 주소" description="soojubm@gmail.com">
    <mm-button slot="trailing">변경</mm-button>
  </mm-list-item>
  <mm-list-item size="medium" label="관심분야" description="문화/예술, 인권, 경제">
    <mm-tag slot="trailing">3개</mm-tag>
  </mm-list-item>
</mm-list-item-group>`

const trailingCode = `<mm-list-item-group>
  <mm-list-item size="medium" label="수줍이" description="UI Designer" avatar-shape="circle" avatar-src="/src/images/soojubm.png">
    <mm-follow-button slot="trailing"></mm-follow-button>
  </mm-list-item>
  <mm-list-item icon="bell" label="알림">
    <mm-tag slot="trailing">신규</mm-tag>
  </mm-list-item>
</mm-list-item-group>`

const multilineCode = `<mm-list-item-group>
  <mm-list-item icon="bell" label="small 행의 라벨이 영역보다 길어져서 두 줄 이상으로 넘어가는 경우">
    <mm-tag slot="trailing">신규</mm-tag>
  </mm-list-item>
  <mm-list-item size="medium" label="medium 행의 라벨이 영역보다 길어져서 두 줄로 넘어가는 경우" description="설명도 영역을 넘치면 줄바꿈되어 행의 높이가 내용만큼 늘어납니다." avatar-shape="circle" avatar-src="/src/images/soojubm.png">
    <mm-button slot="trailing">변경</mm-button>
  </mm-list-item>
  <mm-list-item size="large" label="large 행의 긴 라벨이 두 줄로 넘어가는 경우" description="설명이 길어 여러 줄이 되면 leading과 trailing은 content 높이의 가운데에 정렬됩니다." avatar-shape="circle" avatar-src="/src/images/soojubm.png"></mm-list-item>
</mm-list-item-group>`

const main = html`
  <mm-main>
    <mm-page-header
      heading="List Item"
      description="목록의 한 행을 이루는 표현 전용 골격입니다. 앞쪽 아바타·아이콘, 가운데 제목·설명, 뒤쪽 액션 자리를 행마다 같은 위치에 고정하므로, 사용자는 반복되는 행을 같은 리듬으로 훑으며 항목 사이의 차이에만 눈을 둘 수 있습니다."
    ></mm-page-header>

    <mm-component-aka .items=${['ListTile', 'Media Object']}></mm-component-aka>

    <mm-flex direction="column" gap="4">
      <mm-tab-list value="size" variant="pill">
        <mm-tab value="size">Size</mm-tab>
        <mm-tab value="leading">Leading</mm-tab>
        <mm-tab value="trailing">Trailing</mm-tab>
        <mm-tab value="multiline">Multiline</mm-tab>
      </mm-tab-list>
      <mm-tab-panel value="size">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-list-item-group>
              <mm-list-item
                label="Small"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></mm-list-item>
              <mm-list-item
                size="medium"
                label="Medium"
                description="Youtube Subscriber"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></mm-list-item>
              <mm-list-item
                size="large"
                label="Large"
                description="Youtube Subscriber"
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></mm-list-item>
            </mm-list-item-group>
            <mm-paragraph>
              small은 한 줄만 그리는 행이라 description을 받아도 그리지 않습니다. 설명이 필요하면
              medium 이상을 씁니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${sizeCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="leading">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
            <mm-list-item-group>
              <mm-list-item icon=${ICON_NAMES.USER} label="아이콘"></mm-list-item>
              <mm-list-item emoji="🦔" label="이모지"></mm-list-item>
              <mm-list-item
                avatar-src="/src/images/soojubm.png"
                avatar-shape="circle"
                label="아바타"
              ></mm-list-item>
            </mm-list-item-group>
            <mm-paragraph>사람·상품처럼 행이 개체를 대표할 때 씁니다.</mm-paragraph>
            <mm-list-item-group>
              <mm-list-item size="medium" label="이메일 주소" description="soojubm@gmail.com">
                <mm-button slot="trailing">변경</mm-button>
              </mm-list-item>
              <mm-list-item size="medium" label="관심분야" description="문화/예술, 인권, 경제">
                <mm-tag slot="trailing">3개</mm-tag>
              </mm-list-item>
            </mm-list-item-group>
            <mm-paragraph>
              모두 없으면 content가 왼쪽 끝에서 시작합니다. 설정처럼 항목끼리 성격이 같은 목록은
              왼쪽 그림이 구분에 보태는 것이 없어 비워 둡니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${leadingCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="trailing">
        <mm-component-example>
          <mm-list-item-group>
            <mm-list-item
              size="medium"
              label="수줍이"
              description="UI Designer"
              avatar-shape="circle"
              avatar-src="/src/images/soojubm.png"
            >
              <mm-follow-button slot="trailing"></mm-follow-button>
            </mm-list-item>
            <mm-list-item icon=${ICON_NAMES.NOTIFICATION} label="알림">
              <mm-tag slot="trailing">신규</mm-tag>
            </mm-list-item>
          </mm-list-item-group>
        </mm-component-example>
        <mm-component-code .code=${trailingCode}></mm-component-code>
      </mm-tab-panel>
      <mm-tab-panel value="multiline">
        <mm-component-example width="narrow">
          <mm-flex direction="column" gap="6">
            <mm-list-item-group>
              <mm-list-item
                icon=${ICON_NAMES.NOTIFICATION}
                label="small 행의 라벨이 영역보다 길어져서 두 줄 이상으로 넘어가는 경우"
              >
                <mm-tag slot="trailing">신규</mm-tag>
              </mm-list-item>
              <mm-list-item
                size="medium"
                label="medium 행의 라벨이 영역보다 길어져서 두 줄로 넘어가는 경우"
                description="설명도 영역을 넘치면 줄바꿈되어 행의 높이가 내용만큼 늘어납니다."
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              >
                <mm-button slot="trailing">변경</mm-button>
              </mm-list-item>
              <mm-list-item
                size="large"
                label="large 행의 긴 라벨이 두 줄로 넘어가는 경우"
                description="설명이 길어 여러 줄이 되면 leading과 trailing은 content 높이의 가운데에 정렬됩니다."
                avatar-shape="circle"
                avatar-src="/src/images/soojubm.png"
              ></mm-list-item>
            </mm-list-item-group>
            <mm-component-notice heading="여러 줄일 때의 line-height와 정렬">
              line-height는 한 줄 행 높이에 맞춘 값이라 여러 줄에서 줄 간격을 다시 정해야 합니다.
              정렬은 leading·trailing이 content 가운데에 서는 지금 방식과 첫 줄에 맞추는 방식 중
              기준을 정해야 합니다. 줄바꿈 대신 말줄임표로 자르고 전체 문구를 툴팁으로 보여 주는
              방식도 후보입니다.
            </mm-component-notice>
          </mm-flex>
        </mm-component-example>
        <mm-component-code .code=${multilineCode}></mm-component-code>
      </mm-tab-panel>
    </mm-flex>

    <mm-component-props .props=${componentProps}></mm-component-props>

    <mm-component-tokens .elements=${['mm-list-item']}></mm-component-tokens>

    <mm-component-guide .features=${componentFeatures}>
      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="menu-item과는 어떤 차이가 있나요?">
          <mm-paragraph>
            <mm-code>mm-list-item</mm-code>
            은 행의 골격만 그리고,
            <mm-code>mm-menu-item-action</mm-code>
            같은 menu-item 계열은 이 골격에 눌러서 실행하는 동작을 더합니다.
          </mm-paragraph>
          <mm-text-list
            variant="check"
            .texts=${[
              rule(
                '행을 눌러 명령을 실행하거나 값을 바꾸면 menu-item을 쓴다',
                '팝오버·시트 안이든 페이지에 붙박이로 놓이든 같다. 목록 전체에 Tab으로는 한 번만 닿고, 행 사이는 방향키로 옮긴다',
              ),
              rule(
                '다른 곳으로 이동하거나, 행 안의 버튼·스위치로 조작하면 list-item을 쓴다',
                '행 전체가 눌리더라도 다른 곳으로 이동하는 것은 명령이 아니라 목록이다. 버튼·스위치는 trailing에 두어 컨트롤마다 Tab으로 닿게 한다',
              ),
            ]}
          ></mm-text-list>
        </mm-content-section>
        <mm-content-section heading-level="3" heading="접근성">
          <mm-text-list
            variant="check"
            .texts=${[
              rule(
                '인물·게시물처럼 각 행이 다른 곳으로 이동하는 목록은 menu가 아니라 list로 둔다',
                '명령을 실행하는 menu로 알리면 보조기술 사용자는 이 목록을 명령 메뉴로 받아들인다. list로 두면 일반 목록으로 읽힌다',
              ),
              rule(
                '한 그룹에는 같은 계열의 role을 갖는 행만 둔다',
                html`
                  <mm-code>mm-menu-item-group</mm-code>
                  는 방향키로 행 사이를 옮겨 다닌다. 다른 계열의 행이 섞이면 그 행만 방향키에서 빠져
                  Tab으로만 닿게 되고, 한 목록 안에서 키보드 동선이 둘로 갈린다
                `,
              ),
            ]}
          ></mm-text-list>
        </mm-content-section>
        <mm-content-section heading-level="3" heading="시각보정이 필요해요">
          <mm-paragraph>
            label과 description이 함께 있으면 글자가 앞의 아이콘보다 아래로 치우쳐 보입니다. 글자만
            위로 조금 올려 아이콘과 가운데를 맞추고, 행의 크기는 그대로 둡니다.
          </mm-paragraph>
        </mm-content-section>
      </mm-content-section-list>
    </mm-component-guide>

    <mm-component-anatomy
      style="--component-anatomy-stage-width: 320px"
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
      <mm-list-item
        label="수줍이"
        description="바보"
        size="medium"
        avatar-variant="primary"
        avatar-shape="circle"
        avatar-src="/src/images/soojubm.png"
      >
        <mm-follow-button slot="trailing"></mm-follow-button>
      </mm-list-item>
    </mm-component-anatomy>

    <mm-component-section heading="UserItem" description="사용자 맥락">
      <mm-list-item-group>
        <mm-user-item
          size="medium"
          label="수줍이"
          description="UI Designer"
          avatar-src="/src/images/soojubm.png"
        ></mm-user-item>
        <mm-user-item
          size="medium"
          label="수줍이"
          description="바보"
          avatar-src="/src/images/soojubm.png"
        >
          <mm-follow-button slot="trailing"></mm-follow-button>
        </mm-user-item>
        <mm-user-item
          size="medium"
          label="알 수 없는 사용자"
          description="아바타 이미지가 없을 때"
          avatar-variant="secondary"
          icon=${ICON_NAMES.USER}
        >
          <mm-tag slot="trailing">테스트용 태그</mm-tag>
        </mm-user-item>
      </mm-list-item-group>
    </mm-component-section>

    <mm-component-section
      heading="SettingItem"
      description="설정 맥락. 행은 라벨과 설명만 그리고, action 자리에 놓인 스위치·버튼이 조작을 직접 받습니다."
    >
      <mm-list-item-group>
        <mm-setting-item
          icon=${ICON_NAMES.CODE}
          label="철저한 코드 리뷰"
          description="추가 발견 사항을 계속 찾도록 합니다."
        >
          <mm-switch slot="action" checked></mm-switch>
        </mm-setting-item>
        <mm-setting-item
          icon=${ICON_NAMES.DARK_MODE}
          label="다크 모드"
          description="어두운 배경 테마를 사용합니다."
        >
          <mm-switch slot="action"></mm-switch>
        </mm-setting-item>
      </mm-list-item-group>
    </mm-component-section>

    <mm-component-section
      heading="CastList"
      description="크레딧 맥락. 행 전체가 인물 상세로 가는 링크이고, 명령이 아닌 탐색이라 목록으로 다룹니다."
    >
      <mm-cast-list .casts=${casts}></mm-cast-list>
    </mm-component-section>

    <mm-component-section
      heading="OrderProductItem"
      description="커머스 맥락. 상품 이미지와 이름, 선택한 옵션, 가격을 한 줄에 같은 위계로 놓아 장바구니·주문서·주문완료가 같은 행을 공유합니다."
    >
      <mm-list-item-group>
        <mm-order-product-item
          image-src="/src/images/cake_gosum.jpg"
          name="뉴닉이 풀어 쓴 경제상식사전"
          option="평생 소장"
          price="₩ 11,900"
        ></mm-order-product-item>
        <mm-order-product-item
          image-src="/src/images/cake_gosum.jpg"
          name="가격을 따로 두는 경우"
          option="평생 소장"
        ></mm-order-product-item>
      </mm-list-item-group>
    </mm-component-section>

    <mm-component-related .items=${relatedComponents}></mm-component-related>

    <mm-component-references .items=${componentReferences}></mm-component-references>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
