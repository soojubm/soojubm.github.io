// @ts-nocheck
// g모든전역 i대소문자구분없이 m멀티라인 u유니코드 y스틱검색 ^시작

// const hName = /^[가-힣]+$/;
// const hName2 =  /^[가-힣a-zA-Z]+$/;
// const onlyNumbers = /^[0-9]*$/;
// const password = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/; // 영숫특
// const phone = /^\d{2,3}-\d{3,4}-\d{4}$/; //  ex)123-123-1234
// const phone2 =  /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/; // 010-0000-0000
// const url = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/;

const validationMessages = [
  {
    value: 'username',
    messages: {
      isTooShort: '',
      isTooLong: '',
      isSpecialCharacter: '',
      isEmpty: '',
    },
  },
  {
    value: 'password',
    message: {},
  },
]

function getValidationMessage(valueType, pattern) {
  const result = validationMessages.find(item => {
    if (item.value === valueType) return item[pattern]

    return null
  })
}

export function validateUsername(value: string) {
  const isTooShort = value.length < 4
  const isTooLong = value.length > 16
  const isSpecialCharacter = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi.test(value)
  const isEmpty = !value || value.length === 0

  if (isEmpty) return '닉네임 필수.'
  if (isTooShort || isTooLong) return '닉네임은 4~16자.'
  if (isSpecialCharacter) return '닉네임 특수문자 포함 불가능.'

  return ''
  // getValidationMessage return null
  // username helperText는 항상 동일하기 때문에 모아둘 필요가 있을까?
}

export function validateEmail(value: string) {
  const regex = /^[가-힣a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[가-힣A-Z0-9.-]+\.[A-Z]{2,}$/i
  const isEmail = regex.test(value.toLowerCase())

  if (!isEmail) return '이메일이 아님.'

  return ''
}

export function validatePassword(value: string) {
  const isTooShort = value.length < 8

  if (isTooShort) return '8자 이상.'

  return ''
}

// 일단 함수로만.
// 자릿수가 안 맞을 때 리턴하는 값이 다르고, 특수문자가 포함되었을 때 리턴하는 값이 다름.
export function isValidEmail(value: string) {
  const regex = /^[가-힣a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[가-힣A-Z0-9.-]+\.[A-Z]{2,}$/i

  return regex.test(value.toLowerCase())
}
export function isValidPassword(value: string) {
  return value.length >= 8
}
export function isValidUsername(value: string) {
  // 특수문자 제외, 스페이스 허용 /^[a-zA-Zㄱ-힣0-9|s]*$/;
  const regex = /^[a-zA-Zㄱ-힣0-9]*$/
  const isValidLength = value.length >= 4 && value.length <= 16

  return regex.test(value) && isValidLength
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

// 오류 메시지 사전을 만든다
// const validityMessage = {
//   badInput: "[커스텀 메시지] 잘못된 입력입니다.",
//   patternMismatch: "[커스텀 메시지] 패턴에 맞게 입력하세요",
//   rangeOverflow: "[커스텀 메시지] 범위를 초과하였습니다",
//   rangeUnderflow: "[커스텀 메시지] 범위에 미달하였습니다",
//   stepMismatch: "[커스텀 메시지] 간격에 맞게 입력하세요",
//   tooLong: "[커스텀 메시지] 최대 글자 미만으로 입력하세요",
//   tooShort: "[커스텀 메시지] 최소 글자 미만으로 입력하세요",
//   typeMismatch: "[커스텀 메시지] 형식에 맞게 입력하세요",
//   valueMissing: "[커스텀 메시지] 이 필드를 반드시 입력하세요",
// }

// // validity 객체를 받아 메시지 맵에서 오류 메시지를 찾는다
// function getMessage(validity) {
//   for (const key in validityMessage) {
//     if (validity[key]) {
//       return validityMessage[key]
//     }
//   }
// }

// function showError(input) {
//   /**
//    * 커스텀 메시지: setCustomValidity()
//    * https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement/setCustomValidity
//    * - 오류가 있으면 문자열 전달
//    * - 오류가 없으면 빈 문자열 전달
//    */
//   input.setCustomValidity(getMessage(input.validity) || '')
// }

// input.addEventListener('invalid', () => {
//   // 커스텀 에러메시지 설정
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

const inputs = document.querySelectorAll('input')
const labels = document.querySelectorAll('label')
const form = document.querySelector('form')

let formItems = []

const errorField = document.querySelector('.errors')
const errorList = document.querySelector('.errors ul')

for (let i = 0; i < inputs.length - 1; i++) {
  let obj = {}
  obj.label = labels[i]
  obj.input = inputs[i]
  formItems.push(obj)
}

errorField.style.left = '-100%'

form.onsubmit = validate

function validate(e) {
  errorList.innerHTML = ''
  for (let i = 0; i < formItems.length; i++) {
    let testItem = formItems[i]
    if (testItem.input.value === '') {
      errorField.style.left = '360px'
      createLink(testItem)
    }
  }

  if (errorList.innerHTML !== '') {
    e.preventDefault()
  }
}

function createLink(testItem) {
  const listItem = document.createElement('li')
  const anchor = document.createElement('a')
  anchor.textContent = testItem.input.name + ' field is empty: fill in your ' + testItem.input.name + '.'
  anchor.href = '#' + testItem.input.name
  anchor.onclick = function() {
    testItem.input.focus()
  }
  listItem.appendChild(anchor)
  errorList.appendChild(listItem)
}
