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
  { name: '--gray0', value: '', cases: ['--background-color'] },
  { name: '--gray100', value: '', cases: ['--background-subtle-color'] },
  { name: '--gray200', value: '', cases: ['--border-color'] },
  { name: '--gray400', value: '', cases: ['--foreground-subtle-color'] },
  // { name: '--gray600', value: '' },
  { name: '--gray800', value: '', cases: ['--foreground-color', '--background-strong-color'] },
  { name: '--green100', value: '', cases: ['--color-primary-subtle'] },
  { name: '--green800', value: '', cases: ['--color-primary'] },
  { name: '--red100', value: '', cases: ['--color-danger-light'] },
  { name: '--red800', value: '', cases: ['--color-danger'] },
  { name: '--yellow800', value: '', cases: ['--color-accent'] },
  {
    name: '--interaction-selected-background-color',
    value: 'var(--color-primary-subtle)',
    cases: [],
  },
  { name: '--interaction-selected-foreground-color', value: 'var(--color-primary)', cases: [] },
  { name: '--interaction-selected-border-color', value: 'var(--color-primary)', cases: [] },
  { name: '--color-primary', value: 'var(--green800)', cases: [] },
  { name: '--color-primary-subtle', value: 'var(--green100)', cases: [] },
  { name: '--color-accent', value: 'var(--yellow800)', cases: [] },

  { name: '--color-success', value: 'var(--green800)', cases: [] },
  { name: '--color-success-foreground', value: '#117a45', cases: [] },

  {
    name: '--color-success-border',
    value: 'color-mix(in srgb, var(--color-success) 30%, transparent)',
    cases: [],
  },
  { name: '--color-warning', value: 'var(--orange800)', cases: [] },
  { name: '--color-warning-foreground', value: '#9a4600', cases: [] },
  { name: '--color-danger', value: 'var(--red800)', cases: [] },
  { name: '--color-danger-foreground', value: '#c51635', cases: [] },

  { name: '--background-color', value: 'var(--gray0)', cases: [] },
  { name: '--background-subtle-color', value: 'var(--gray100)', cases: [] },
  { name: '--background-strong-color', value: 'var(--gray800)', cases: [] },
  { name: '--border-color', value: 'var(--gray200)', cases: [] },
  { name: '--foreground-color', value: 'var(--gray800)', cases: [] },
  { name: '--foreground-subtle-color', value: 'var(--gray400)', cases: [] },
  { name: '--foreground-color-on-solid', value: 'var(--gray0)', cases: [] },
  { name: '--foreground-color-on-warning', value: 'var(--red800)', cases: [] },
  { name: '--foreground-color-on-primary', value: 'var(--gray0)', cases: [] },
  { name: '--interaction-focus-outline', value: '2px solid var(--gray800)', cases: [] },
  { name: '--interaction-active-background-color', value: 'var(--color-accent)', cases: [] },
  { name: '--color-interaction-active-border', value: '#008296', cases: [] },
  {
    name: '--interaction-active-shadow',
    value: '0 0 0 2px #c8f3fa, inset 0 0 0 2px var(--foreground-color-on-solid)',
    cases: [],
  },
  { name: '--skeleton-sample', value: '', cases: [''] },
  { name: '--gradient-transparnet', value: '', cases: [''] },
  { name: '--radius', value: '6px', cases: [''] },
  { name: '--radius-large', value: '1rem', cases: [''] },
  { name: '--radius-full', value: '50%', cases: [''] },
  {
    name: '--surface-base-shadow',
    value: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
    cases: [''],
  },
]

const typographyTokens = [
  { name: '--font-family', value: "'Alan Sans', 'Gothic A1', system-ui, sans-serif" },
  { name: '--font-size-32', value: '32px' },
  { name: '--font-size-24', value: '24px' },
  { name: '--font-size-18', value: '18px' },
  { name: '--font-size-14', value: '14px' },
  { name: '--font-size-12', value: '12px' },
  { name: '--font-line-height-40', value: '40px' },
  { name: '--font-line-height-32', value: '32px' },
  { name: '--font-line-height-28', value: '28px' },
  { name: '--font-line-height-24', value: '24px' },
  { name: '--font-line-height-16', value: '16px' },
  { name: '--font-weight-normal', value: '500' },
  { name: '--font-weight-bold', value: '700' },
]

const sizeTokens = [
  { name: '--size-80', value: '80px', cases: ['--avatar-size', '--list-item-size'] },
  {
    name: '--size-48',
    value: '48px',
    cases: ['--avatar-size', '--button-height', '--input-height'],
  },
  { name: '--size-40', value: '40px', cases: ['--avatar-size'] },
  { name: '--size-32', value: '32px', cases: ['--avatar-size', '--button-height'] },
  {
    name: '--size-24',
    value: '24px',
    cases: ['--tag-height', '--checkbox-size'],
  },
  {
    name: '--size-16',
    value: '16px',
    cases: ['--checkbox-size', '--radio-size', '--icon-button-size'],
  },
]

const spacingTokens = [
  { name: '--grid-gutter', value: '' },
  { name: '--grid-column', value: '' },
  { name: '--layout-padding-inline', value: '5vw' },
  { name: '--space-1', value: '4px' },
  { name: '--space-2', value: '8px' },
  { name: '--space-3', value: '12px' },
  { name: '--space-4', value: '16px' },
  { name: '--space-8', value: '32px' },
  { name: '--space-12', value: '48px' },
  { name: '--space-16', value: '64px' },
  { name: '--space-section', value: 'var(--space-16)' },
]

const layerTokens = [
  { name: '--material-zindex-base', value: '0' },
  { name: '--material-zindex-raised', value: '10' },
  { name: '--material-zindex-overlay', value: '100' },
  { name: '--material-zindex-modal', value: '1000' },
  { name: '--material-zindex-chrome', value: '1100' },
  { name: '--material-zindex-toast', value: '9000' },
]

const positioningTokens = []

const animationTokens = [
  { name: '--bazier', value: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)' },
  { name: '--animation-delay-first', value: '0.2s' },
  { name: '--animation-delay-second', value: '0.4s' },
  { name: '--animation-delay-third', value: '0.6s' },
  { name: '--animation-duration', value: '0.4s' },
  { name: '--animation-duration-instant', value: '0s' },
  { name: '--duration-quickly', value: '0.2s' },
  { name: '--duration-slowly', value: '0.6s' },
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
      '사이즈 토큰으로 추상화하지 않는 케이스 --navbar-height: var(--size-80)5rem, --sidenav-width: null',
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
    tokens: [...layerTokens],
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
