---
name: sync-component-docs
description: 컴포넌트 문서 페이지(src/pages/components/*.ts)의 props·tokens·예제 코드를 실제 컴포넌트 구현(src/components/**)과 대조해 어긋난 곳을 찾고 동기화한다. "문서랑 코드 맞는지 확인", "props/tokens/code 동기화", "문서 드리프트 점검", 컴포넌트 prop·token을 바꾼 뒤 문서 정합성을 볼 때 사용한다. 인자로 컴포넌트명(예 icon-button)을 주면 그 컴포넌트만, 없으면 전체를 점검한다.
---

# 컴포넌트 문서 ↔ 구현 동기화

문서 페이지가 소개하는 **props · tokens · code(예제)** 가 구현과 어긋나지 않는지 대조하고 고친다.
시작 전에 `doc-pages.md`와 `CLAUDE.md`를 읽는다. 답변·보고는 한국어로 한다.

## 원천 (무엇이 진실인가)

| 대상 | 진실의 원천 | 문서 쪽 |
| --- | --- | --- |
| props | 컴포넌트의 `@property` 선언 → `npm run manifest`가 `src/generated/component-manifest.ts` 생성 | `componentPropsOf('mm-x')`로 가져오므로 표는 자동. 손으로 쓴 이벤트·slot·메서드 항목만 수동 |
| tokens | 컴포넌트 `*.styles.ts`·`static styles`에 선언된 `--x-*` | `<mm-component-tokens .elements=${[...]}>`가 자동. 손으로 쓴 `componentTokens` 배열이 있으면 수동 |
| code | 컴포넌트 API(prop 이름·허용 값·slot·이벤트) | 페이지의 `*Code` 문자열, 라이브 예제 마크업, 본문·anatomy·features 속 prop/token 언급 |

구현이 진실이다. 문서를 구현에 맞춘다. 문서가 옳아 보이면(구현이 잘못) 고치지 말고 사용자에게 보고한다.

## 절차

1. **범위 정하기.** 인자가 있으면 `src/pages/components/<name>.ts` 하나, 없으면 전체. 컴포넌트 구현 폴더는 `src/components/common/<name>/`(sub-component는 `semantics/`), 도메인 컴포넌트는 `src/components/domains/`.
2. **기계 검사부터.**
   ```bash
   npm run manifest && npm run check:docs && npm run typecheck
   ```
   `check:docs`는 문서에만 있는 토큰을 잡는다. `typecheck`는 manifest에서 사라진 prop을 참조하는 코드를 잡는다. 실패는 그대로 보고 항목에 넣는다.
3. **페이지별 대조** (기계가 못 잡는 부분). 컴포넌트마다 아래를 확인한다.
   - **code**: 각 `*Code` 문자열과 라이브 예제의 `<mm-x ...>` 마크업에서 쓰는 attribute를 모은다. 각각 manifest에 있는 prop이거나 표준 네이티브·ARIA attribute여야 한다. 값은 prop 타입의 union 안에 있어야 한다. 이름이 바뀐 prop(별칭 포함), 지워진 값, 폐지된 slot을 찾는다. 코드 문자열과 라이브 예제가 서로 같은 API를 쓰는지도 본다(예: 한쪽만 `size="medium"`).
   - **props**: 페이지가 수동으로 덧붙인 이벤트·slot·메서드가 구현의 `dispatchEvent`·`<slot>`·public 메서드와 맞는지 본다. 부모가 채우는 prop은 선언에 `/** @internal */`가 있어야 표에서 빠진다.
   - **tokens**: 수동 `componentTokens`가 있으면 구현에 선언된 토큰과 이름·설명·기본값을 대조한다. 자동 표(`mm-component-tokens`)면 `elements` 배열이 실제 렌더되는 호스트(sub-component 포함)를 가리키는지만 본다.
   - **서술**: 본문·`mm-component-anatomy`의 `parts`·`mm-component-guide`의 features가 prop/token 이름을 말하면 그 이름이 실존하는지 본다.
   - **관련 링크**: `relatedComponents`의 `href`가 실제 페이지 파일인지 본다.
4. **수정.** 불일치마다 문서를 구현에 맞춘다. 컴포넌트 API를 바꾸는 작업은 이 스킬의 범위가 아니다. 구조·예제 구성·문안 개편도 범위 밖이다(어긋난 이름·값만 고친다). 한 곳이 바뀌면 같은 페이지의 코드 문자열과 라이브 예제를 함께 맞춘다.
5. **마무리.** Prettier를 돌리고 `npm run check:docs && npm run typecheck`를 다시 통과시킨다. attribute 값만 바뀐 정도면 CLAUDE.md의 "토큰 절감"에 따라 브라우저 검증은 생략하고, 마크업 구조가 바뀌었거나 사용자가 요청했을 때만 개발 서버로 해당 페이지를 확인한다. 커밋은 사용자가 요청할 때만 한다.

## 보고 형식

컴포넌트별로 표 하나로 정리한다.

| 컴포넌트 | 구분(props/tokens/code) | 문서 | 구현 | 조치 |
| --- | --- | --- | --- | --- |

고친 것, 사용자 판단이 필요해 남긴 것(구현이 틀렸을 가능성·의도 불명), 점검하지 못한 것을 나눠서 적는다. 불일치가 없으면 없다고 짧게 말한다.

## 주의

- manifest(`src/generated/`)는 커밋 대상이 아니다. 직접 편집하지 않는다.
- 작업 트리에 사용자의 미커밋 변경이 있을 수 있다. 점검 대상이 아닌 파일은 건드리지 않는다.
- 이름을 추측해 고치지 말고 구현에서 실제 선언을 확인한 뒤 고친다.
