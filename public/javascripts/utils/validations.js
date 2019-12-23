// g모든전역 i대소문자구분없이 m멀티라인 u유니코드 y스틱검색
// var hName = /^[가-힣]+$/;
// var hName2 =  /^[가-힣a-zA-Z]+$/;
// var onlyNumbers = /^[0-9]*$/;

// var password = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{6,20}$/; // 영숫특

// var email = /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/;
// var phone = /^\d{2,3}-\d{3,4}-\d{4}$/; //  ex)123-123-1234
// var phone2 =  /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/; // 010-0000-0000

// var url = /^(file|gopher|news|nntp|telnet|https?|ftps?|sftp):\/\/([a-z0-9-]+\.)+[a-z0-9]{2,4}.*$/;

// var isNumber = /[0-9]/gi;
// var isAlphabet = /[a-z]/gi;

export const regExr = {};
// 정규표현식
/**
 * validations.isEmail(loginEmail);
 */
export const validations = {
	isRequired(value) {
		return value == '' || value == null || value == undefined || ( value != null && typeof value == 'object' && !Object.keys(value).length);
	},
	isEmail(value){
		// toLowerCase()
		return /^[가-힣a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[가-힣A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
	},
	// add min & max
	isLength(value, length) {
		return value.length < length;
	},
	// isBtyeLength(value, length) {
	// },
	isNumeric(value) {
		return /[^0-9]/g.test(value);
	},
	isLowerCase(value) {
		return value === value.toLowerCase();
	},
	isNull(value) {
		return value === null || value.length === 0;
	},
	// isUrl(value) {
	// }
};

export const inputHelper = {
	isShort: '',
};

// bool isURL(String str,
// 	{List<String> protocols = const ['http', 'https', 'ftp'],
// 		bool requireTld = true,
// 		bool requireProtocol = false,
// 		bool allowUnderscore = false,
// 		List<String> hostWhitelist = const [],
// 		List<String> hostBlacklist = const []}) {
// if (str == null || str.length == 0 || str.length > 2083 || str.startsWith('mailto:')) {
// 	return false;
// }

// var protocol, user, auth, host, hostname, port, port_str, path, query, hash, split;

// // check protocol
// split = str.split('://');
// if (split.length > 1) {
// 	protocol = shift(split);
// 	if (protocols.indexOf(protocol) == -1) {
// 		return false;
// 	}
// } else if (requireProtocol == true) {
// 	return false;
// }
// str = split.join('://');

// // check hash
// split = str.split('#');
// str = shift(split);
// hash = split.join('#');
// if (hash != null && hash != "" && new RegExp(r'\s').hasMatch(hash)) {
// 	return false;
// }

// // check query params
// split = str.split('?');
// str = shift(split);
// query = split.join('?');
// if (query != null && query != "" && new RegExp(r'\s').hasMatch(query)) {
// 	return false;
// }

// // check path
// split = str.split('/');
// str = shift(split);
// path = split.join('/');
// if (path != null && path != "" && new RegExp(r'\s').hasMatch(path)) {
// 	return false;
// }

// // check auth type urls
// split = str.split('@');
// if (split.length > 1) {
// 	auth = shift(split);
// 	if (auth.indexOf(':') >= 0) {
// 		auth = auth.split(':');
// 		user = shift(auth);
// 		if (!new RegExp(r'^\S+$').hasMatch(user)) {
// 			return false;
// 		}
// 		if (!new RegExp(r'^\S*$').hasMatch(user)) {
// 			return false;
// 		}
// 	}
// }

// // check hostname
// hostname = split.join('@');
// split = hostname.split(':');
// host = shift(split);
// if (split.length > 0) {
// 	port_str = split.join(':');
// 	try {
// 		port = int.parse(port_str, radix: 10);
// 	} catch (e) {
// 		return false;
// 	}
// 	if (!new RegExp(r'^[0-9]+$').hasMatch(port_str) || port <= 0 || port > 65535) {
// 		return false;
// 	}
// }

// if (!isIP(host) && !isFQDN(host, requireTld: requireTld, allowUnderscores: allowUnderscore) && host != 'localhost') {
// 	return false;
// }

// if (hostWhitelist.isNotEmpty && hostWhitelist.contains(host)) {
// 	return false;
// }

// if (hostBlacklist.isNotEmpty && !hostBlacklist.contains(host)) {
// 	return false;
// }

// return true;
// }