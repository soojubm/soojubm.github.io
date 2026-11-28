import { html } from 'lit'

import type { Sheet } from '@/components/overlay/sheet/sheet'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'
import { findSitemapItem } from '@/sitemap'

const closeProfileSheet = () => {
  document.querySelector<Sheet>('#sheet-profile')?.close()
}

const main = html`
  <fff-fixed-top style="background: var(--background-subtle-color)">
    <fff-top-bar
      id="setting-top-bar"
      heading="설정"
      style="padding-inline: var(--layout-padding-inline)"
    ></fff-top-bar>
  </fff-fixed-top>
  <fff-main width="small" background="subtle">
    <fff-flex
      direction="column"
      align-items="center"
      gap="2"
      style="padding: 0 var(--space-8) var(--space-8)"
    >
      <fff-avatar
        size="80"
        variant="secondary"
        shape="circle"
        src="/src/images/soojubm.png"
      ></fff-avatar>
      <fff-paragraph size="large">수줍이님, 어서와요!</fff-paragraph>
    </fff-flex>

    <fff-flex direction="column" gap="8">
      <fff-flex direction="column" gap="2">
        <fff-list-item
          avatar-variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.USER}
          label="계정 정보"
          description="로그인에 사용하는 이메일과 비밀번호"
        ></fff-list-item>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-menu-item-group>
            <fff-menu-item-link
              icon=${ICON_NAMES.MAIL}
              label="soojubm@gmail.com"
              href="#"
              target="_self"
            ></fff-menu-item-link>
            <fff-menu-item-link
              icon=${ICON_NAMES.LOCK}
              label="비밀번호 변경"
              href="#"
              target="_self"
            ></fff-menu-item-link>
          </fff-menu-item-group>
        </fff-surface>
      </fff-flex>

      <fff-flex direction="column" gap="2">
        <fff-list-item
          avatar-variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.USER}
          label="프로필 정보"
          description="닉네임, 성별"
        ></fff-list-item>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-menu-item-group>
            <fff-menu-item-action
              icon=${ICON_NAMES.USER}
              label="닉네임 변경"
              trailing-icon=${ICON_NAMES.FORWARD}
              aria-controls="sheet-profile"
              aria-haspopup="dialog"
            ></fff-menu-item-action>
            <fff-menu-item-action
              icon=${ICON_NAMES.USER}
              label="성별 변경"
              trailing-icon=${ICON_NAMES.FORWARD}
              aria-controls="sheet-profile"
              aria-haspopup="dialog"
            ></fff-menu-item-action>
          </fff-menu-item-group>
        </fff-surface>
      </fff-flex>

      <fff-flex direction="column" gap="2">
        <fff-list-item
          avatar-variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.DELIVERY}
          label="서비스 설정"
          description="배송지, 관심분야, 뉴스레터"
        ></fff-list-item>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-setting-item
            label="배송지"
            description="배송지를 관리하고 기본 배송지를 설정하세요."
          >
            <fff-button slot="action">배송지 관리</fff-button>
          </fff-setting-item>
        </fff-surface>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-flex direction="column" gap="2">
            <fff-menu-item-group size="large">
              <fff-menu-item-link
                size="medium"
                label="관심분야"
                description="문화/예술, 인권, 경제"
              ></fff-menu-item-link>
              <fff-menu-item-switch
                icon=${ICON_NAMES.MAIL}
                label="시사 뉴스레터"
                value="newsletter"
              ></fff-menu-item-switch>
            </fff-menu-item-group>
            <fff-caption>
              관심 있는 분야의 콘텐츠를 추천받으세요. 매주 월요일, 수요일, 금요일 아침에 받아볼 수
              있어요.
            </fff-caption>
          </fff-flex>
        </fff-surface>
      </fff-flex>

      <fff-flex direction="column" gap="2">
        <fff-list-item
          avatar-variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.NOTIFICATION}
          label="알림"
          description="소식을 받는 방법"
        ></fff-list-item>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-menu-item-group>
            <fff-menu-item-switch
              icon=${ICON_NAMES.COMMENT}
              label="활동 알림"
              value="activity"
              checked
            ></fff-menu-item-switch>
            <fff-menu-item-switch
              icon=${ICON_NAMES.MAIL}
              label="마케팅 정보 수신"
              value="marketing"
            ></fff-menu-item-switch>
            <fff-menu-item-switch
              icon=${ICON_NAMES.TIMER}
              label="방해 금지 시간"
              value="quiet-hours"
              checked
            ></fff-menu-item-switch>
          </fff-menu-item-group>
        </fff-surface>
      </fff-flex>

      <fff-flex direction="column" gap="2">
        <fff-list-item
          avatar-variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.PALETTE}
          label="화면"
          description="테마, 언어"
        ></fff-list-item>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-setting-item avatar-variant="tertiary" icon=${ICON_NAMES.PALETTE} label="테마">
            <fff-theme-selector slot="action"></fff-theme-selector>
          </fff-setting-item>
        </fff-surface>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-setting-item avatar-variant="tertiary" icon=${ICON_NAMES.WINDOW} label="언어">
            <fff-select
              slot="action"
              aria-label="언어"
              value="ko"
              .options=${[
                { value: 'ko', label: '한국어' },
                { value: 'en', label: 'English' },
              ]}
            ></fff-select>
          </fff-setting-item>
        </fff-surface>
      </fff-flex>

      <fff-flex direction="column" gap="2">
        <fff-list-item
          avatar-variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.EXTERNAL_LINK}
          label="소셜 네트워크로 로그인"
          description="연동한 소셜 계정으로 간편하게 로그인"
        ></fff-list-item>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-setting-item
            avatar-variant="tertiary"
            icon=${ICON_NAMES.GOOGLE}
            label="구글 계정으로 로그인"
          >
            <fff-toggle-button slot="action" pressed disabled pressed-label="연동 해제">
              연동
            </fff-toggle-button>
          </fff-setting-item>
        </fff-surface>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-setting-item
            avatar-variant="tertiary"
            icon=${ICON_NAMES.APPLE}
            label="애플 계정으로 로그인"
          >
            <fff-toggle-button slot="action" pressed-label="연동 해제">연동</fff-toggle-button>
          </fff-setting-item>
        </fff-surface>
        <fff-caption>
          로그인 수단이 하나뿐이면 연동을 해제할 수 없어요. 비밀번호를 설정한 후 소셜 계정 연결을
          해제하세요.
        </fff-caption>
      </fff-flex>

      <fff-flex direction="column" gap="2">
        <fff-list-item
          avatar-variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.CREDIT_CARD}
          label="구독 정보"
          description="멤버십, 결제수단, 청구서 등"
        ></fff-list-item>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-flex direction="column">
            <fff-setting-item icon=${ICON_NAMES.CREDIT_CARD} label="Premium 개인">
              <fff-button slot="action">구독 관리</fff-button>
            </fff-setting-item>
            <fff-separator></fff-separator>
            <fff-meta-item-group
              direction="column"
              gap="2"
              .items=${[
                { label: '다음 결제 예정일', value: '2024.04.02.' },
                { label: '결제금액', value: '매달 46,800원' },
                { label: '결제수단', value: '현대카드 ****-****-****-7922' },
              ]}
            ></fff-meta-item-group>
          </fff-flex>
        </fff-surface>
      </fff-flex>

      <fff-flex direction="column" gap="2">
        <fff-list-item
          avatar-variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.INFO}
          label="정보·지원"
          description="약관과 도움말"
        ></fff-list-item>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-flex direction="column">
            <fff-menu-item-group>
              <fff-menu-item-link label="이용약관" href="#" target="_self"></fff-menu-item-link>
              <fff-menu-item-link
                label="개인정보 처리방침"
                href="#"
                target="_self"
              ></fff-menu-item-link>
              <fff-menu-item-link label="문의하기" href="#" target="_self"></fff-menu-item-link>
            </fff-menu-item-group>
            <fff-separator></fff-separator>
            <fff-meta-item label="앱 버전" value="1.4.2"></fff-meta-item>
          </fff-flex>
        </fff-surface>
      </fff-flex>

      <fff-flex direction="column" gap="2">
        <fff-list-item
          avatar-variant="tertiary"
          size="medium"
          icon=${ICON_NAMES.LOCK}
          label="계정 관리"
          description="로그아웃, 계정 비활성화"
        ></fff-list-item>
        <fff-surface variant="paper" radius="large" bleed>
          <fff-setting-item
            label="계정 비활성화"
            description="계정을 영구 비활성화하는 페이지로 이동합니다."
          >
            <fff-button slot="action" destructive variant="primary">비활성화</fff-button>
          </fff-setting-item>
        </fff-surface>
        <fff-link-prompt
          message="이 기기에서 계정을 사용하지 않으려면"
          link-label="로그아웃"
          href="#"
        ></fff-link-prompt>
      </fff-flex>
    </fff-flex>
  </fff-main>

  <fff-sheet id="sheet-profile" placement="bottom">
    <fff-sheet-header heading="프로필 정보 수정"></fff-sheet-header>
    <fff-sheet-body>
      <form>
        <fff-flex direction="column" gap="3">
          <fff-paragraph size="large">
            어떻게
            <br />
            불러 드릴까요?
          </fff-paragraph>

          <fff-link-prompt
            message="닉네임은 프로필 페이지와 내가 쓴 글에 표시되는 필수 항목입니다."
            link-label="더 알아보기"
            href="#"
          ></fff-link-prompt>
          <fff-textfield label="닉네임" placeholder="이름이요."></fff-textfield>
          <fff-form-field label="성별">
            <fff-gender-selector stretch></fff-gender-selector>
          </fff-form-field>
          <fff-caption>
            성별 정보는 Google이 사용자를 지칭하는 방식을 포함해 Google 서비스에서 맞춤설정된 환경을
            제공하는 데 사용될 수 있습니다.
          </fff-caption>
        </fff-flex>
      </form>
    </fff-sheet-body>
    <fff-sheet-footer
      .primaryAction=${{ label: '완료', onClick: closeProfileSheet }}
    ></fff-sheet-footer>
  </fff-sheet>
`

const settingPage = findSitemapItem('setting')

renderPage(main, {
  closeSidebar: true,
  navbar: !settingPage?.hideNavbar,
  initialize: () => {
    document.getElementById('setting-top-bar')?.addEventListener('nav-click', () => {
      history.back()
    })

    // 시트는 aria-controls로 찾은 첫 트리거에만 클릭을 연결하므로, 같은 시트를 여는 나머지 행은 직접 연다.
    const [, ...otherTriggers] = document.querySelectorAll('[aria-controls="sheet-profile"]')
    otherTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        document.querySelector<Sheet>('#sheet-profile')?.show()
      })
    })
  },
})
