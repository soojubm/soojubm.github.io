import main from './index.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
})

document.addEventListener('DOMContentLoaded', () => {
  // document.querySelector('body')!.insertBefore(navbar, );
  // renderSidemenu
  // document.querySelector('.page')!.insertAdjacentHTML('afterbegin', sidemenu)
})

const colorTokens = [
  { name: '--gray0', value: '', cases: ['--color-background'] },
  { name: '--gray100', value: '', cases: ['--color-background-subtle'] },
  { name: '--gray200', value: '', cases: ['--color-border'] },
  { name: '--gray400', value: '', cases: ['--color-foreground-light'] },
  // { name: '--gray600', value: '' },
  { name: '--gray800', value: '', cases: ['--color-foreground', '--color-background-strong'] },
  { name: '--green100', value: '', cases: ['--color-primary-subtle'] },
  { name: '--green800', value: '', cases: ['--color-primary'] },
  { name: '--red100', value: '', cases: ['--color-danger-light'] },
  { name: '--red800', value: '', cases: ['--color-danger'] },
  { name: '--yellow800', value: '', cases: ['--color-accent'] },
  { name: '--selection-indicator-color', value: 'var(--color-primary)', cases: [] },
  { name: '--selection-background', value: 'var(--color-primary-subtle)', cases: [] },
  { name: '--selection-foreground', value: 'var(--color-primary)', cases: [] },
  { name: '--color-primary', value: 'var(--green800)', cases: [] },
  { name: '--color-primary-subtle', value: 'var(--green100)', cases: [] },
  { name: '--color-accent', value: 'var(--yellow800)', cases: [] },
  {
    name: '--color-accent-border',
    value: 'color-mix(in srgb, var(--color-accent) 30%, transparent)',
    cases: [],
  },
  { name: '--color-success', value: 'var(--green800)', cases: [] },
  { name: '--color-success-foreground', value: '#117a45', cases: [] },
  {
    name: '--color-success-subtle',
    value: 'color-mix(in srgb, var(--color-success) 8%, var(--color-background))',
    cases: [],
  },
  {
    name: '--color-success-border',
    value: 'color-mix(in srgb, var(--color-success) 30%, transparent)',
    cases: [],
  },
  { name: '--color-warning', value: 'var(--orange800)', cases: [] },
  { name: '--color-warning-foreground', value: '#9a4600', cases: [] },
  {
    name: '--color-warning-subtle',
    value: 'color-mix(in srgb, var(--color-warning) 8%, var(--color-background))',
    cases: [],
  },
  {
    name: '--color-warning-border',
    value: 'color-mix(in srgb, var(--color-warning) 30%, transparent)',
    cases: [],
  },
  { name: '--color-danger', value: 'var(--red800)', cases: [] },
  { name: '--color-danger-foreground', value: '#c51635', cases: [] },
  {
    name: '--color-danger-subtle',
    value: 'color-mix(in srgb, var(--color-danger) 8%, var(--color-background))',
    cases: [],
  },
  {
    name: '--color-danger-border',
    value: 'color-mix(in srgb, var(--color-danger) 30%, transparent)',
    cases: [],
  },
  { name: '--color-background', value: 'var(--gray0)', cases: [] },
  { name: '--color-background-subtle', value: 'var(--gray100)', cases: [] },
  { name: '--color-background-strong', value: 'var(--gray800)', cases: [] },
  { name: '--color-border', value: 'var(--gray200)', cases: [] },
  { name: '--color-foreground', value: 'var(--gray900)', cases: [] },
  { name: '--color-foreground-light', value: 'var(--gray400)', cases: [] },
  { name: '--color-foreground-on-solid', value: 'var(--gray0)', cases: [] },
  { name: '--color-interaction-focus', value: '#007185', cases: [] },
  { name: '--color-interaction-active-background', value: '#f0b800', cases: [] },
  { name: '--color-interaction-active-border', value: '#008296', cases: [] },
  { name: '--color-interaction-active-ring', value: '#c8f3fa', cases: [] },
  { name: '--skeleton-sample', value: '', cases: [''] },
  { name: '--gradient-transparnet', value: '', cases: [''] },
  { name: '--radius', value: '', cases: [''] },
  { name: '--shadow', value: '0 0 .5rem rgb(0 0 0 / 7.5%)', cases: [''] },
]

const typographyTokens = [
  { name: '--font-family', value: '"Quattrocento Sans", "Gothic A1", sans-serif' },
  { name: '--font-size-32', value: '2rem' },
  { name: '--font-size-18', value: '1.125rem' },
  { name: '--font-size-14', value: '.875rem' },
  { name: '--font-weight-normal', value: '400' },
  { name: '--font-weight-bold', value: '800' },
  { name: '--font-line-height', value: '1.4' },
  { name: '--font-line-height-large', value: '1.8' },
]

const sizeTokens = [
  { name: '--size-huge', value: '5rem', cases: ['--avatar-huge'] },
  {
    name: '--size-large',
    value: '3rem / 48px',
    cases: ['--avatar-large', '--button-height', '--input-height'],
  },
  { name: '--size-medium', value: '2rem / 32px', cases: ['--avatar-medium', '--chip-height'] },
  {
    name: '--size-small',
    value: '1.5rem',
    cases: ['--avatar-small', '--tag-height', '--indicator-height'],
  },
  {
    name: '--size-tiny',
    value: '1rem',
    cases: ['checkbox-height', '--radio-height', '--switch-height'],
  },
]

const spacingTokens = [
  { name: '--grid-gutter', value: '' },
  { name: '--grid-column', value: '' },
  { name: '--layout-padding-inline', value: '5vw' },
]

const zindexTokens = [
  { name: '--zindex-default', value: '1' },
  { name: '--zindex-tooltip', value: '2' },
  { name: '--zindex-menu', value: '2' },
  { name: '--zindex-popover', value: '5' },
  { name: '--zindex-bottombar', value: '8' },
  { name: '--zindex-fixed-bottom', value: '100' },
  { name: '--zindex-backdrop', value: '200' },
  { name: '--zindex-sheet', value: '210' },
  { name: '--zindex-modal', value: '220' },
  { name: '--zindex-toast', value: '230' },
  { name: '--zindex-loader', value: '240' },
]

const positioningTokens = []

const animationTokens = [
  { name: '--animation-bazier', value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' },
  { name: '--animation-delay-first', value: '1' },
  { name: '--animation-delay-second', value: '1' },
  { name: '--animation-delay-third', value: '1' },
  { name: '--animation-duration', value: '6' },
  { name: '--animation-duration-instant', value: '0s' },
  { name: '--animation-duration-quick', value: '7' },
  { name: '--animation-duration-slow', value: '7' },
]

const article = [
  {
    title: 'Palette',
    kicker: 'color and surface',
    description: [
      'hierarchy. 크기와 비례해서 radius와 shadow 조정이 필요하지만 규칙을 최소화.',
      'theme. 인버트 컬러셋을 추가로 정의하지 않습니다. 하나의 컬러셋으로 다크 테마에 대응합니다. (쉽지 않음... )',
      'colour. background/border/text/status',
    ],
    tokens: [...colorTokens],
  },
  {
    title: 'Typography',
    kicker: '활자의 위계와 배치.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...typographyTokens],
  },
  {
    title: 'Sizing',
    kicker: '요소의 너비와 길이',
    description: [
      '사이즈 토큰으로 추상화하지 않는 케이스 --navbar-height: var(--size-huge)5rem, --sidenav-width: null',
      '예외 케이스 switch height: 20px',
    ],
    tokens: [...sizeTokens],
  },
  {
    title: 'Spacing',
    kicker: '요소 사이의 간격. outset과 inset.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...spacingTokens],
  },
  {
    title: 'Layout',
    kicker: '활자의 위계와 배치.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...colorTokens],
  },
  {
    title: 'Positioning',
    kicker: '활자의 위계와 배치.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...positioningTokens],
  },
  {
    title: 'Z-index',
    kicker: '활자의 위계와 배치.',
    description:
      '폰트마다 baseline이 다르기 때문에 폰트 변경 시 내부 텍스트의 상하 간격이 안 맞을 수 있다. 폰트를 변경하지 않고 대응하려면? 텍스트노드(레이블 역할)의 상단 패딩에 변수를 하나 추가해둔다.',
    tokens: [...zindexTokens],
  },
  {
    title: 'Opacity 🚧',
    kicker: '투명도',
    description: 'disabled state',
    tokens: [...colorTokens],
  },
  {
    title: 'Animation',
    kicker: '작성 중. 애니메이션을 위한 유틸리티 클래스?',
    description:
      '콘텐츠보다 액션이 강조되지 않도록 뷰포트 내에서 delay를 최대 3개로 제한합니다. inactive로 변경될 때(닫기 등) 즉시(instantly) 실행 합니다.',
    tokens: [...animationTokens],
  },
  { title: 'test', description: 'test test', tokens: [...colorTokens] },
]

// document.addEventListener('DOMContentLoaded', () => {
//   article.forEach(item => {
//     const articleSample = `
//       <article class="article js-scrollspy-section">
//         <mm-text size="32">${item.title}</mm-text>
//         <mm-paragraph size="large">
//         ${item.kicker}
//         </mm-paragraph>
//         <mm-paragraph style="margin:2rem 0">${item.description}</mm-paragraph>
//         <div class="token-group">
//           ${item.tokens.map(item => {
//             return `<article class="token-item tile-flat ${item.name}">
//               <figure class="token-item-avatar"></figure>
//               <b>${item.name}</b>
//               <div>
//                 <mm-paragraph>--color-background</mm-paragraph>
//               </div>
//               <button class="icon-indicator" style="position: absolute; right: 0.5rem; top: 0.5rem">
//                 <span class="material-symbols-outlined">content_copy</span>
//               </button>
//             </article>`
//           })}
//         </div>
//       </article>
//     `

//     document.querySelector('.tokens-body')!.innerHTML += articleSample
//   })

// })

// const temp = colorTokens.forEach(token => {
//   const tokenItem = `
//   <article class="token-item tile-flat is-gray000">
//     <figure class="token-item-avatar"></figure>
//     <b>${token.name}</b>
//     <div>
//       <mm-paragraph>--color-background</mm-paragraph>
//     </div>
//     <button class="icon-indicator" style="position: absolute; right: 0.5rem; top: 0.5rem">
//       <span class="material-symbols-outlined">content_copy</span>
//     </button>
//   </article>
//   `
//   document.querySelector('.tokens-body')!.innerHTML += tokenItem
// })

function renderComponent() {}
