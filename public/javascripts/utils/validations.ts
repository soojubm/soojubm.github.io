// @ts-nocheck

// g모든전역 i대소문자구분없이 m멀티라인 u유니코드 y스틱검색 ^시작

// const hName = /^[가-힣]+$/;
// const hName2 =  /^[가-힣a-zA-Z]+$/;
// const onlyNumbers = /^[0-9]*$/;
// const password = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/; // 영숫특
// const email = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
// const phone = /^\d{2,3}-\d{3,4}-\d{4}$/; //  ex)123-123-1234
// const phone2 =  /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/; // 010-0000-0000
// const url = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/;

function checkValidity() {
  validityState.isRequired(values.email)
}

const validationMessage = {
  email: '이메일 형식이 아닙니다.',
}

export const validityState = {
  isRequired(value) {
    return value === '' || value === null || value === undefined || (value !== null && typeof value === 'object' && !Object.keys(value).length)
  },
  isNumeric(value) {
    return /[0-9]/g.test(value)
  },
  isAlphabet(value) {
    return /[a-z]/gi.test(value)
  },
  isEmail(value) {
    return /^[가-힣a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[가-힣A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.toLowerCase())
  },
  isLowerCase(value) {
    return value === value.toLowerCase()
  },
  isNull(value) {
    return value === null || value.length === 0
  },
  // isUrl(value) {}
  // isBtyeLength(value, length) {},
  isTooLong() {},
  isTooShort() {},
}

// Function receives an input with its properties
function validateForm(inputProps) {
  const inputName = inputProps.name
  const verifyInputName = {
    username: validationRules().username,
    password: validationRules().password,
  }

  return verifyInputName[inputName](inputProps)
}

document.querySelectorAll('input').forEach(input => {
  input.addEventListener('invalid', () => {
    document.forms[0].classList.add('was-validated')
  })
  // form.was-validated input:invalid {
  //   border-color: red;
  // }
})

// input.addEventListener("invalid", () => {
//   /**
//    * ValidityState {
//    *   badInput: false,  // 잘못된 입력
//    *   customError: false, // 커스텀 오류
//    *   patternMismatch: false, // 패턴 오류
//    *   rangeOverflow: false, // 범위 초과 오류
//    *   rangeUnderflow: false, // 범위 미달 오류
//    *   stepMismatch: false, // 간격 오류
//    *   tooLong: false, // 길이 오류
//    *   tooShort: false, // 길이 오류
//    *   typeMismatch: false, // 타입 오류
//    *   valid: false, // 검증 결과
//    *   valueMissing: true // 필수값 오류
//    * }
//    */
//   console.log(input.validity)
// })

// 오류 메세지 사전을 만든다
// const validityMessage = {
//   badInput: "[커스텀 메세지] 잘못된 입력입니다.",
//   patternMismatch: "[커스텀 메세지] 패턴에 맞게 입력하세요",
//   rangeOverflow: "[커스텀 메세지] 범위를 초과하였습니다",
//   rangeUnderflow: "[커스텀 메세지] 범위에 미달하였습니다",
//   stepMismatch: "[커스텀 메세지] 간격에 맞게 입력하세요",
//   tooLong: "[커스텀 메세지] 최대 글자 미만으로 입력하세요",
//   tooShort: "[커스텀 메세지] 최소 글자 미만으로 입력하세요",
//   typeMismatch: "[커스텀 메세지] 형식에 맞게 입력하세요",
//   valueMissing: "[커스텀 메세지] 이 필드를 반드시 입력하세요",
// }

// // validity 객체를 받아 메세지 맵에서 오류 메세지를 찾는다
// function getMessage(validity) {
//   for (const key in validityMessage) {
//     if (validity[key]) {
//       return validityMessage[key]
//     }
//   }
// }

// function showError(input) {
//   /**
//    * 커스텀 메세지: setCustomValidity()
//    * https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/setCustomValidity
//    * - 오류가 있으면 문자열 전달
//    * - 오류가 없으면 빈 문자열 전달
//    */
//   input.setCustomValidity(getMessage(input.validity) || '')
// }

// input.addEventListener('invalid', () => {
//   // 커스텀 에러메세지 설정
//   showError(input)
// })

// function showError(input) {
//   // 커스텀 오류 메시지 UI
//   document.querySelector("#error").textContent = getMessage(input.validity)
// }
// input.addEventListener('invalid', e => {
//   // 브라우져 툴팁 숨김
//   e.preventDefault()
// })
