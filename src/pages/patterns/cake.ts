import { html } from 'lit'

import type { FilterOption } from '@/components/common'
import type { CastMember } from '@/components/domains/cast-list/cast-list'

import { ICON_NAMES } from '@/components/common'
import { renderPage } from '@/components/layouts/base-layouts'

const casts: CastMember[] = [
  {
    name: '스튜어트 로젠버그',
    credit: '감독',
    href: '#',
    imageSrc: '/src/images/soojubm.png',
  },
  { name: '폴 뉴먼', credit: '주연', href: '#', imageSrc: '/src/images/soojubm.png' },
]
const castFilterValues = ['all']
const castFilterOptions: FilterOption[] = [
  { value: 'all', label: '모두' },
  { value: 'actor', label: '배우' },
  { value: 'staff', label: '스탭' },
]

const awards = [
  'Best Actor',
  'Best Supporting Actor',
  'Best Screenplay – Based on Material from Another Medium',
  'Best Original Music Score',
]

const main = html`
  <fff-main width="large" layout="split">
    <fff-thumbnail
      ratio="full"
      src="/src/images/coolhandluke.jpg"
      alt="Cool Hand Luke"
    ></fff-thumbnail>

    <fff-content-section-list>
      <fff-flex direction="column" gap="4">
        <fff-keyword-tag-group
          heading="개봉예정 D-12"
          .keywords=${['액션', '모험', '범죄']}
        ></fff-keyword-tag-group>

        <fff-flex direction="column">
          <fff-heading level="1">쿨 핸드 루크</fff-heading>
          <fff-paragraph size="large">Cool Hand Luke</fff-paragraph>
        </fff-flex>

        <fff-flex direction="column" gap="2">
          <fff-flex gap="2">
            <time datetime="1967"><fff-text>1967</fff-text></time>
            <fff-meta-item-group
              gap="2"
              .items=${[
                { label: 'Directed by', value: '스튜어트 로젠버그', layout: 'inline' },
                { label: '국가', value: '미국', layout: 'inline' },
                { label: '언어', value: '영어', layout: 'inline' },
                { label: '장르', value: '드라마', layout: 'inline' },
                { label: '러닝타임', value: '103분', layout: 'inline' },
              ]}
            ></fff-meta-item-group>
          </fff-flex>

          <fff-flex direction="column">
            <fff-text color="light">줄거리</fff-text>
            <fff-read-more-paragraph
              max-length="100"
              content="루크 잭슨은 술이 취한 상태에서 물건을 부수는 바람에 흉악범이 아님에도 불구하고 중노동형을 선고 받는다.죄수들의 리더는 새로 들어온 신입죄수 루크의 요령피우는 태도가 눈에 거슬려 루크에게 싸움을 건다. 모두들 리더와 도라의 압도적인 승리로 끝나리라 예상한다."
            ></fff-read-more-paragraph>
          </fff-flex>

          <fff-surface>
            <fff-meta-item-group
              gap="8"
              justify-content="center"
              .items=${[
                {
                  label: '리뷰 116개',
                  value: '⭐ 4.8',
                  layout: 'stacked',
                  align: 'center',
                  valueSize: 'large',
                },
                {
                  label: 'Tomatometer',
                  value: '🍅 97%',
                  layout: 'stacked',
                  align: 'center',
                  valueSize: 'large',
                },
                {
                  label: '등급',
                  value: '18세 이상',
                  layout: 'stacked',
                  align: 'center',
                  valueSize: 'large',
                },
              ]}
            ></fff-meta-item-group>
          </fff-surface>
        </fff-flex>

        <fff-button-group>
          <fff-button variant="primary" size="large">예고편 보기</fff-button>
        </fff-button-group>
      </fff-flex>

      <fff-content-section-list>
        <fff-content-section heading-level="3" heading="출연진">
          <fff-flex direction="column" gap="4">
            <fff-filter-button-group
              mode="single"
              .values=${castFilterValues}
              .options=${castFilterOptions}
            ></fff-filter-button-group>
            <fff-cast-list .casts=${casts}></fff-cast-list>
          </fff-flex>
        </fff-content-section>

        <fff-content-section heading-level="3" heading="수상내역">
          <fff-grid columns="2" gap="4" role="list">
            ${awards.map(
              award => html`
                <fff-surface role="listitem">
                  <fff-flex direction="column" align-items="center" gap="2">
                    <fff-icon name=${ICON_NAMES.AWARD} size="large" aria-hidden="true"></fff-icon>
                    <fff-text size="12" centered>${award}</fff-text>
                  </fff-flex>
                </fff-surface>
              `,
            )}
          </fff-grid>
        </fff-content-section>

        <fff-content-section
          heading-level="3"
          heading="리뷰"
          description="이 호텔에는 레스토랑, 사우나, 셀프 주차(요금 별도) 등이 마련되어 있습니다. 공용 장소에서의 WiFi의 경우 무료입니다. 이 밖에 24시간 운영 프런트 데스크 및 프런트 데스크의 귀중품 보관함도 시설 내에 마련되어 있습니다."
        >
          <fff-button variant="secondary">Read More Reviews</fff-button>
        </fff-content-section>
      </fff-content-section-list>
    </fff-content-section-list>
  </fff-main>
`

renderPage(main, { closeSidebar: true })
