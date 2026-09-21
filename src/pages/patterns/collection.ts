import { html } from 'lit'

import type { OptionItem } from '@/types'
import type { TemplateResult } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'

// 목록 항목은 해야 할 일을 굵은 한 줄로 먼저 두고 설명을 잇는다.
const rule = (title: string | TemplateResult, description: string | TemplateResult) => html`
  <span>
    <mm-text weight="bold">${title}</mm-text>
    ${description}
  </span>
`

const visibilityOptions: OptionItem[] = [
  { label: '공개', value: 'public' },
  { label: '비공개', value: 'private' },
]

const main = html`
  <mm-main>
    <mm-flex justify-content="between" align-items="start" gap="3">
      <mm-page-header
        heading="Collection"
        description="사용자가 만든 묶음에 항목을 담고, 묶음을 만들고 함께 관리하는 흐름입니다."
      ></mm-page-header>
      <mm-copy-page-button></mm-copy-page-button>
    </mm-flex>

    <mm-content-section-list>
      <mm-content-section heading-level="3" heading="컬렉션에 추가">
        <mm-text-list
          variant="check"
          .texts=${[
            rule(
              '한 항목을 여러 컬렉션에 동시에 담게 한다',
              '컬렉션 목록은 체크박스 메뉴 항목으로 두고, 이미 담긴 컬렉션은 선택된 상태로 연다',
            ),
            rule(
              '담는 흐름 안에서 새 컬렉션을 바로 만들게 한다',
              '새 컬렉션을 만든 뒤에는 방금 담으려던 항목을 그 컬렉션에 담은 상태로 돌아온다',
            ),
          ]}
        ></mm-text-list>
        <mm-flex direction="column" gap="3" style="max-width: 400px">
          <mm-top-bar nav="close" heading="컬렉션에 추가">
            <mm-button slot="action" variant="ghost">완료</mm-button>
          </mm-top-bar>
          <mm-menu-item-checkbox-group aria-label="컬렉션 선택">
            <mm-menu-item-checkbox
              size="medium"
              value="euljiro"
              label="을지로 맛집"
              description="장소 12개"
              emoji="🍜"
              checked
            ></mm-menu-item-checkbox>
            <mm-menu-item-checkbox
              size="medium"
              value="seongsu"
              label="성수 카페"
              description="장소 8개"
              emoji="☕"
            ></mm-menu-item-checkbox>
          </mm-menu-item-checkbox-group>
          <mm-add-button>새 컬렉션 만들기</mm-add-button>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="새 컬렉션">
        <mm-flex direction="column" gap="3" style="max-width: 400px">
          <mm-top-bar heading="새 컬렉션">
            <mm-button slot="action" variant="ghost">완료</mm-button>
          </mm-top-bar>
          <mm-textfield label="컬렉션 이름" placeholder="컬렉션 이름"></mm-textfield>
          <mm-toggle-button-group
            .options=${visibilityOptions}
            value="public"
          ></mm-toggle-button-group>
          <mm-add-button>이 컬렉션에 멤버 추가</mm-add-button>
        </mm-flex>
      </mm-content-section>

      <mm-content-section heading-level="3" heading="멤버 추가">
        <mm-flex direction="column" gap="3" style="max-width: 400px">
          <mm-top-bar heading="멤버 추가">
            <mm-button slot="action" variant="ghost">완료</mm-button>
          </mm-top-bar>
          <mm-textfield label="TODO 멤버 검색" placeholder="멤버 이름"></mm-textfield>
        </mm-flex>
      </mm-content-section>
    </mm-content-section-list>

    <mm-component-pager></mm-component-pager>
  </mm-main>
`

renderPage(main)
