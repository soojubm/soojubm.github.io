import { html } from 'lit'

import type { CastMember } from '@/components/domains/cast-list/cast-list'
import type {
  ComponentFeatureItem,
  ComponentPropItemData,
  ComponentReferenceItemData,
  ComponentRelatedItemData,
} from '@/components/domains/component'

import {
  AVATAR_VARIANT_TYPE_UNION,
  ICON_NAMES,
  LIST_ITEM_SIZE_TYPE_LABEL,
} from '@/components/common'
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
    external: true,
  },
  {
    href: 'https://developer.apple.com/design/human-interface-guidelines/lists-and-tables',
    label: 'Apple HIG - Lists and Tables',
    external: true,
  },
  {
    href: 'https://m3.material.io/components/lists/overview',
    label: 'MD3 - Lists',
    external: true,
  },
  {
    href: 'https://reactnativeelements.com/docs/components/listitem',
    label: 'React Native Elements - ListItem',
    external: true,
  },
  {
    href: 'https://api.flutter.dev/flutter/material/ListTile-class.html',
    label: 'Flutter - ListTile',
    external: true,
  },
]

const componentProps: ComponentPropItemData[] = [
  { name: 'size', type: LIST_ITEM_SIZE_TYPE_LABEL },
  { name: 'label', type: 'string', optional: true },
  { name: 'description', type: 'string', optional: true },
  { name: 'icon', type: 'IconName', optional: true },
  { name: 'emoji', type: 'string', optional: true },
  { name: 'avatar-src', type: 'string', optional: true },
  { name: 'avatar-variant', type: `${AVATAR_VARIANT_TYPE_UNION} = 'primary'`, optional: true },
  { name: 'avatar-shape', type: "'circle' | 'square' = 'square'", optional: true },
  { name: 'slot: trailing', type: 'HTMLElement', optional: true },
  { name: 'mm-list-item-group role', type: "'list' | 'group' = 'list'", optional: true },
  { name: 'mm-list-item-group size', type: "'small'", optional: true },
]

const componentFeatures: ComponentFeatureItem[] = [
  {
    heading: 'Structural',
    description:
      'leading·content·trailing의 고정된 골격으로 반복되는 행의 구조를 잡습니다. 상호작용 없이 레이아웃만 담당하는 표현 전용 행입니다.',
  },
]

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
            <mm-paragraph>
              행 전체가 눌리는 목록을 촘촘히 늘어놓을 때는 그룹의
              <mm-code>size="small"</mm-code>
              로 행 사이 간격을 없앱니다. hover 채움이 행의 경계를 대신 그립니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
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
            <mm-paragraph>
              icon·emoji·avatar-src 중 하나로 leading을 채웁니다. 사람·상품처럼 행이 개체를 대표할
              때 씁니다.
            </mm-paragraph>
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
      </mm-tab-panel>
      <mm-tab-panel value="trailing">
        <mm-component-example>
          <mm-flex direction="column" gap="6">
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
            <mm-paragraph>
              trailing 슬롯에 액션 버튼·태그·메타 텍스트를 두어 행 오른쪽 끝에 정렬합니다.
            </mm-paragraph>
          </mm-flex>
        </mm-component-example>
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
            같은 menu-item 계열은 이 골격을 렌더한 뒤 role·포커스·키보드 조작·이벤트를 더합니다.
          </mm-paragraph>
          <mm-text-list
            variant="check"
            .texts=${[
              html`
                <span>
                  <mm-text weight="bold">행 전체가 하나의 클릭 영역이면 menu-item을 쓴다</mm-text>
                  눌러서 명령이 실행되거나 값이 바뀌는 행이 조건이다. 팝오버·시트 안이든 페이지에
                  붙박이로 놓이든 같다. 그룹이 방향키 이동을 맡아 목록 전체가 tab stop 하나가 되고,
                  항목은 놓이는 부모에 맞는 role(menuitem·radio·checkbox 등)을 갖는다
                </span>
              `,
              html`
                <span>
                  <mm-text weight="bold">
                    이동하거나, 조작을 행 안의 컨트롤이 받으면 list-item을 쓴다
                  </mm-text>
                  행 전체가 눌리더라도 다른 곳으로 이동하는 것은 명령이 아니라 목록이다. 링크는
                  list-item을 감싸는 도메인 컴포넌트가 소유하고, 버튼·스위치는 trailing에 두어 그
                  컨트롤마다 Tab으로 닿게 한다
                </span>
              `,
            ]}
          ></mm-text-list>
        </mm-content-section>
        <mm-content-section heading-level="3" heading="접근성">
          <mm-text-list
            variant="check"
            .texts=${[
              html`
                <span>
                  <mm-text weight="bold">이동하는 목록은 list로 읽히게 둔다</mm-text>
                  <mm-code>role="menu"</mm-code>
                  는 보조기술에 명령 메뉴로 알려진다. 인물·게시물처럼 다른 곳으로 이동하는 목록에
                  쓰면 성격이 다르게 전달되고,
                  <mm-code>role="list"</mm-code>
                  는 그대로 목록으로 읽힌다.
                  <mm-code>mm-list-item-group</mm-code>
                  이 목록의 role과 각 행의
                  <mm-code>listitem</mm-code>
                  을 채운다
                </span>
              `,
              html`
                <span>
                  <mm-text weight="bold">한 그룹에는 같은 계열의 role을 갖는 행만 담는다</mm-text>
                  <mm-code>mm-menu-item-group</mm-code>
                  의 roving focus는 자식의 shadow에서 menuitem 계열 role을 찾아 tab stop을 옮긴다.
                  다른 행이 섞이면 그 행만 방향키에서 빠져 Tab으로만 닿게 되고, 한 목록 안에서
                  키보드 동선이 둘로 갈린다
                </span>
              `,
              html`
                <span>
                  <mm-text weight="bold">description에는 행의 이름에 보탤 말만 쓴다</mm-text>
                  label과 description이 role을 가진 요소 안에 함께 들어가 한 이름으로 읽힌다. 상태나
                  label을 되풀이하는 말은 이름만 길어지게 한다
                </span>
              `,
            ]}
          ></mm-text-list>
        </mm-content-section>
        <mm-content-section heading-level="3" heading="시각보정">
          <mm-paragraph>
            content 박스는 leading과 가운데 정렬되지만, 줄마다 행간이 달라 글자 묶음은 위아래 여백이
            다르게 남습니다.
          </mm-paragraph>
          <mm-text-list
            variant="check"
            .texts=${[
              html`
                <span>
                  <mm-text weight="bold">위아래 행간 차이의 절반만큼 content를 위로 옮긴다</mm-text>
                  medium에 description이 있으면 label(14/24)의 위 행간이 description(12/16)의 아래
                  행간보다 넓어 글자가 아래로 치우쳐 보인다. 이동에는
                  <mm-code>translate</mm-code>
                  속성을 써서 레이아웃 박스와 정렬은 그대로 둔다
                </span>
              `,
            ]}
          ></mm-text-list>
        </mm-content-section>
      </mm-content-section-list>
    </mm-component-guide>

    <mm-component-anatomy
      style="--component-anatomy-stage-width: 320px"
      .parts=${[
        'leading — 아이콘 또는 아바타를 담는 선택적 영역. 없으면 content가 왼쪽 끝에서 시작합니다.',
        'content — label과 description으로 구성된 본문. flex: 1로 남은 공간을 채웁니다.',
        'trailing — 오른쪽에 배치되는 선택적 슬롯. 액션 버튼·뱃지·메타 텍스트 등을 넣습니다.',
      ]}
      .code=${`<mm-list-item label="수줍이" description="바보" size="medium" avatar-shape="circle" avatar-src="...">
    <mm-follow-button slot="trailing"></mm-follow-button>
</mm-list-item>`}
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
        style="width: 100%"
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
      description="설정 맥락. 행은 라벨과 설명만 그리고, action 슬롯에 놓인 스위치·버튼이 조작을 직접 받습니다."
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
      description="크레딧 맥락. 행 전체가 인물 상세로 가는 링크이고, 명령이 아닌 탐색이므로 list로 읽혀 행마다 Tab으로 닿습니다."
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
