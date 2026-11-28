import { html } from 'lit'

import { renderPage } from '@/components/layouts/base-layouts'
import './likes.css'

interface Like {
  label: string
  size: number
}

const likes: Like[] = [
  { label: '영화', size: 160 },
  { label: '책', size: 140 },
  { label: '쿨 핸드 루크', size: 180 },
  { label: '알프레드 히치콕', size: 170 },
  { label: '찰리 채플린', size: 150 },
  { label: '장 뤽 고다르', size: 140 },
  { label: '박태원', size: 130 },
  { label: '도스토옙스키', size: 150 },
  { label: '토마스 만', size: 120 },
  { label: '나쓰메 소세키', size: 150 },
  { label: '잃어버린 시간을 찾아서', size: 200 },
  { label: '메론', size: 120 },
  { label: '주식', size: 120 },
  { label: '카페', size: 120 },
  { label: '디자인 시스템', size: 190 },
]

const main = html`
  <fff-main width="large">
    <fff-flex direction="column" gap="4">
      <fff-page-header
        heading="Things I like"
        description="좋아하는 것을 모아 둡니다. 계속 떠다니며 늘어납니다."
      ></fff-page-header>

      <ul class="likes-stage">
        ${likes.map(
          like => html`
            <li class="likes-bubble" style="--bubble-size: ${like.size}px">
              <fff-text weight="bold">${like.label}</fff-text>
            </li>
          `,
        )}
      </ul>
    </fff-flex>
  </fff-main>
`

renderPage(main, { initialize: startFloating })

interface Body {
  element: HTMLElement
  radius: number
  x: number
  y: number
  vx: number
  vy: number
}

const SPEED = 0.6

// 레이아웃이 잡힌 뒤 시작해야 무대 크기를 바르게 읽는다.
function startFloating() {
  requestAnimationFrame(floatBubbles)
}

// 원들을 무대 안에서 떠다니게 한다. 벽과 서로에게 부딪히면 튕기고, 움직임 줄이기 설정이면 멈춘다.
function floatBubbles() {
  const stage = document.querySelector<HTMLElement>('.likes-stage')
  if (!stage) return

  // 스타일이 적용되기 전이면 크기가 0이라 원이 한곳에 몰리므로 다음 프레임에 다시 시도한다.
  const { width } = stage.getBoundingClientRect()
  const firstBubble = stage.querySelector<HTMLElement>('.likes-bubble')
  if (!width || !firstBubble?.offsetWidth) {
    requestAnimationFrame(floatBubbles)
    return
  }

  const bodies = createBodies(stage)
  const render = () =>
    bodies.forEach(body => {
      body.element.style.translate = `${body.x - body.radius}px ${body.y - body.radius}px`
    })
  render()

  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const tick = () => {
    const { width, height } = stage.getBoundingClientRect()
    bodies.forEach(body => moveInside(body, width, height))
    collide(bodies)
    render()
    requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

function createBodies(stage: HTMLElement): Body[] {
  const { width, height } = stage.getBoundingClientRect()
  const elements = Array.from(stage.querySelectorAll<HTMLElement>('.likes-bubble'))
  const bodies: Body[] = []

  elements.forEach(element => {
    const radius = element.offsetWidth / 2
    const angle = Math.random() * Math.PI * 2
    const body: Body = {
      element,
      radius,
      x: radius,
      y: radius,
      vx: Math.cos(angle) * SPEED,
      vy: Math.sin(angle) * SPEED,
    }
    // 이미 놓인 원과 겹치지 않는 자리를 찾는다. 못 찾으면 마지막 시도 자리에 둔다.
    for (let attempt = 0; attempt < 200; attempt++) {
      body.x = radius + Math.random() * Math.max(width - radius * 2, 0)
      body.y = radius + Math.random() * Math.max(height - radius * 2, 0)
      const overlaps = bodies.some(
        other => Math.hypot(other.x - body.x, other.y - body.y) < other.radius + radius,
      )
      if (!overlaps) break
    }
    bodies.push(body)
  })
  return bodies
}

function moveInside(body: Body, width: number, height: number) {
  body.x += body.vx
  body.y += body.vy

  if (body.x < body.radius || body.x > width - body.radius) {
    body.vx *= -1
    body.x = Math.min(Math.max(body.x, body.radius), width - body.radius)
  }
  if (body.y < body.radius || body.y > height - body.radius) {
    body.vy *= -1
    body.y = Math.min(Math.max(body.y, body.radius), height - body.radius)
  }
}

// 겹친 두 원은 겹침만큼 밀어내고 속도를 맞바꾼다.
function collide(bodies: Body[]) {
  bodies.forEach((a, index) => {
    bodies.slice(index + 1).forEach(b => {
      const dx = b.x - a.x
      const dy = b.y - a.y
      const distance = Math.hypot(dx, dy) || 1
      const overlap = a.radius + b.radius - distance
      if (overlap <= 0) return

      const nx = dx / distance
      const ny = dy / distance
      a.x -= (nx * overlap) / 2
      a.y -= (ny * overlap) / 2
      b.x += (nx * overlap) / 2
      b.y += (ny * overlap) / 2
      // 접근 중일 때만 법선 방향 속도를 맞바꿔 튕긴다.
      const approach = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny
      if (approach <= 0) return
      a.vx -= approach * nx
      a.vy -= approach * ny
      b.vx += approach * nx
      b.vy += approach * ny
    })
  })
}
