import '@/components/common'
import { html } from 'lit'

import type { MenuOptionItem, OptionItem } from '@/types'
import '@/components/domains/component/component-notice'

const collectionOptions: MenuOptionItem[] = [
  { value: 'euljiro', label: '을지로 맛집', description: '장소 12개', emoji: '🍜' },
  { value: 'seongsu', label: '성수 카페', description: '장소 8개', emoji: '☕' },
]

const visibilityOptions: OptionItem[] = [
  { label: '공개', value: 'public' },
  { label: '비공개', value: 'private' },
]

export const collectionPanel = html`
  <fff-tab-panel value="collection">
    <fff-content-section-list>
      <fff-paragraph>
        사용자가 만든 컬렉션에 항목을 담고, 컬렉션을 만들고 함께 관리하는 흐름입니다. 담는 흐름
        안에서 새 컬렉션을 바로 만들 수 있으므로, 사용자는 화면을 벗어나지 않고 항목을 모아 둘 수
        있습니다.
      </fff-paragraph>

      <fff-content-section
        heading-level="3"
        heading="컬렉션에 추가"
        description="항목을 담을 컬렉션을 고르는 화면입니다."
        .texts=${[
          '한 항목을 여러 컬렉션에 동시에 담게 한다. 이미 담긴 컬렉션은 선택된 채로 열려, 이 항목이 어디에 있는지 바로 보인다',
          '담는 흐름 안에서 새 컬렉션을 바로 만들게 한다. 새 컬렉션을 만든 뒤에는 방금 담으려던 항목이 그 컬렉션에 담긴 채로 돌아온다',
        ]}
      >
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="3">
            <fff-top-bar nav="close" heading="컬렉션에 추가">
              <fff-button slot="action" variant="tertiary">완료</fff-button>
            </fff-top-bar>
            <fff-menu-item-checkbox-group
              aria-label="컬렉션 선택"
              gap="1"
              .options=${collectionOptions}
              .values=${['euljiro']}
            ></fff-menu-item-checkbox-group>
            <fff-add-button label="새 컬렉션 만들기"></fff-add-button>
          </fff-flex>
        </fff-component-example>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="새 컬렉션"
        description="컬렉션의 이름과 공개 범위를 받는 화면입니다."
      >
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="3">
            <fff-top-bar heading="새 컬렉션">
              <fff-button slot="action" variant="tertiary">완료</fff-button>
            </fff-top-bar>
            <fff-textfield label="컬렉션 이름" placeholder="컬렉션 이름"></fff-textfield>
            <fff-toggle-button-group
              .options=${visibilityOptions}
              value="public"
            ></fff-toggle-button-group>
            <fff-add-button label="이 컬렉션에 멤버 추가"></fff-add-button>
          </fff-flex>
        </fff-component-example>
        <fff-component-notice heading="새 컬렉션 화면의 규칙을 정한다">
          이름과 공개 범위를 받는 기준, 멤버 추가로 이어지는 흐름의 규칙은 아직 정하지 않았다
        </fff-component-notice>
      </fff-content-section>

      <fff-content-section
        heading-level="3"
        heading="멤버 추가"
        description="컬렉션을 함께 관리할 멤버를 찾는 화면입니다."
      >
        <fff-component-example width="narrow">
          <fff-flex direction="column" gap="3">
            <fff-top-bar heading="멤버 추가">
              <fff-button slot="action" variant="tertiary">완료</fff-button>
            </fff-top-bar>
            <fff-textfield label="멤버 검색" placeholder="멤버 이름"></fff-textfield>
          </fff-flex>
        </fff-component-example>
        <fff-component-notice heading="멤버 검색 결과와 선택 방식을 정한다">
          검색 결과를 보여 주고 멤버를 고르는 단계는 아직 정하지 않았다
        </fff-component-notice>
      </fff-content-section>
    </fff-content-section-list>
  </fff-tab-panel>
`
