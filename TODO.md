# TODO

## 스크롤 컨테이너 안의 오버레이가 잘린다

`mm-table`처럼 `overflow-x: auto`를 가진 컨테이너 안에서는 열린 `mm-tooltip`·`mm-popover`가 컨테이너 경계에서 잘린다. 가로축이 `auto`면 `visible`로 둔 세로축도 `auto`로 계산되기 때문이다.

`position`만 `fixed`로 바꾸면 트리거 기준 `top: 100%`가 뷰포트 기준이 되어 말풍선이 트리거를 떠나고, 가로 스크롤 시 화면에 고정돼 어긋난다. `mm-sheet`가 쓰는 `#portal-root` self-portal 패턴을 tooltip·popover에도 적용하는 쪽을 검토한다.
