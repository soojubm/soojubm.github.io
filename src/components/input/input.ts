import Textfield from './semantics/textfield'

// Input은 Textfield의 모든 기능(라벨/헬퍼/검증/슬롯 처리/이벤트)을 그대로 활용한다.
// 중복 구현 대신 Textfield를 상속해 단일 소스로 유지한다.
class Input extends Textfield {}

export default Input
