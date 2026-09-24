import { html } from 'lit'

import type { FilterOption } from '@/components/common'
import type { CastMember } from '@/components/domains/cast-list/cast-list'

import { renderPage } from '@/components/layouts/base-layouts'
import './cake.css'

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

const main = html`
  <mm-main class="cake">
    <mm-thumbnail
      ratio="full"
      src="/src/images/coolhandluke.jpg"
      alt="Cool Hand Luke"
    ></mm-thumbnail>

    <mm-flex direction="column" gap="section">
      <mm-flex direction="column" gap="4">
        <mm-keyword-tag-group
          heading="개봉예정 D-12"
          .keywords=${['액션', '모험', '범죄']}
        ></mm-keyword-tag-group>

        <mm-flex direction="column">
          <mm-heading level="1">쿨 핸드 루크</mm-heading>
          <mm-paragraph size="large">Cool Hand Luke</mm-paragraph>
        </mm-flex>

        <mm-flex direction="column" gap="2">
          <mm-flex gap="2">
            <time datetime="1967"><mm-text>1967</mm-text></time>
            <mm-meta-item-group gap="2">
              <mm-meta-item
                layout="inline"
                label="Directed by"
                value="스튜어트 로젠버그"
              ></mm-meta-item>
              <mm-meta-item layout="inline" label="국가" value="미국"></mm-meta-item>
              <mm-meta-item layout="inline" label="언어" value="영어"></mm-meta-item>
              <mm-meta-item layout="inline" label="장르" value="드라마"></mm-meta-item>
              <mm-meta-item layout="inline" label="러닝타임" value="103분"></mm-meta-item>
            </mm-meta-item-group>
          </mm-flex>

          <mm-flex direction="column">
            <mm-text color="light">줄거리</mm-text>
            <mm-read-more-paragraph
              max-length="100"
              content="루크 잭슨은 술이 취한 상태에서 물건을 부수는 바람에 흉악범이 아님에도 불구하고 중노동형을 선고 받는다.죄수들의 리더는 새로 들어온 신입죄수 루크의 요령피우는 태도가 눈에 거슬려 루크에게 싸움을 건다. 모두들 리더와 도라의 압도적인 승리로 끝나리라 예상한다."
            ></mm-read-more-paragraph>
          </mm-flex>

          <mm-meta-item-group>
            <mm-meta-item
              layout="stacked"
              label="리뷰 116개"
              value="⭐ 4.8"
              value-size="large"
            ></mm-meta-item>
            <mm-meta-item
              layout="stacked"
              label="Tomatometer"
              value="🍅 97%"
              value-size="large"
            ></mm-meta-item>
            <mm-meta-item
              layout="stacked"
              label="등급"
              value="18세 이상"
              value-size="large"
            ></mm-meta-item>
          </mm-meta-item-group>
        </mm-flex>

        <mm-button-group>
          <mm-button variant="primary" size="large">에피소드 1 보기</mm-button>
          <mm-bookmark-button shape="bookmark"></mm-bookmark-button>
        </mm-button-group>
      </mm-flex>

      <mm-content-section-list>
        <mm-content-section heading-level="3" heading="출연진">
          <mm-filter-button-group
            mode="single"
            .values=${castFilterValues}
            .options=${castFilterOptions}
          ></mm-filter-button-group>
          <mm-cast-list .casts=${casts}></mm-cast-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="수상내역">
          <mm-text-list
            .texts=${[
              'Best Actor',
              'Best Supporting Actor',
              'Best Screenplay – Based on Material from Another Medium',
              'Best Original Music Score',
            ]}
          ></mm-text-list>
        </mm-content-section>

        <mm-content-section heading-level="3" heading="리뷰">
          <mm-paragraph>
            이 호텔에는 레스토랑, 사우나, 셀프 주차(요금 별도) 등이 마련되어 있습니다. 공용
            장소에서의 WiFi의 경우 무료입니다. 이 밖에 24시간 운영 프런트 데스크 및 프런트 데스크의
            귀중품 보관함도 시설 내에 마련되어 있습니다.
          </mm-paragraph>
          <mm-button variant="tertiary">Read More Reviews</mm-button>
        </mm-content-section>
      </mm-content-section-list>
    </mm-flex>
  </mm-main>
`

renderPage(main, { closeSidebar: true })
