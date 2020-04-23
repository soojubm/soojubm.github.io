// g모든전역 i대소문자구분없이 m멀티라인 u유니코드 y스틱검색 ^시작

// const hName = /^[가-힣]+$/;
// const hName2 =  /^[가-힣a-zA-Z]+$/;
// const onlyNumbers = /^[0-9]*$/;
// const password = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/; // 영숫특
// const email = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
// const phone = /^\d{2,3}-\d{3,4}-\d{4}$/; //  ex)123-123-1234
// const phone2 =  /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/; // 010-0000-0000
// const url = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/;

export const validity = {
  isRequired(value) {
  	return value === '' || value === null || value === undefined || ( value !== null && typeof value === 'object' && !Object.keys(value).length);
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
  // add min & max
  isLength(value, length) {
    return value.length < length
  },
  // isBtyeLength(value, length) {
  // },
  isLowerCase(value) {
    return value === value.toLowerCase()
  },
  isNull(value) {
    return value === null || value.length === 0
  },
  // isUrl(value) {
  // }
}

// export const inputHelper = {
// 	isShort: '',
// };
