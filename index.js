// NOTE: Due to the schema implementation using regex flags like i, g or s is not supported

// Email validation that does handle CJK, Cyrillic, Devangari, Hiragana,
// Arabic and require at least 2 letters in top-level domain.
var validChars = function(extra, quantifier) {
	var accents = 'ÁáÀàÂâÆæÄäÇçÉéÈèÊêËëÍíÎîÏïÑñÓóÔôŒœÖöÚúÙùÛûÜüŸÿ';
	var unicodes = '\\u4e00-\\u9eff\\u0400-\\u04ff\\u0900-\\u097f\\u3040-\\u309f\\u0600-\\u06ff';
	extra = typeof extra === 'string' ? extra : '';
	quantifier = (['*', '+', '?'].indexOf(quantifier) > -1 ? quantifier : '');

	return [
		'[','A-Za-z0-9', accents, unicodes, extra,']',
		quantifier
	].join('');
};

var local = validChars("!#$%&'*+/=?^_`{|}~-", '+')+"(?:\\."+validChars("!#$%&'*+/=?^_`{|}~-", '+')+")*";
var domain = "(?:"+validChars()+"(?:"+validChars('-', '*')+validChars()+")?\\.)+";
var topLevelDomain = validChars()+"(?:"+validChars('-', '*')+validChars()+")";

var emailPattern = new RegExp('^' + local + '@' + domain + topLevelDomain + '$', 'i');

var emailPatternSource = emailPattern.source.slice(1, -1);
var multipleEmailPattern = new RegExp('^\\s*(?:' + emailPatternSource + '\\s*,\\s*)*' + emailPatternSource + '$');

var emailPatternOrEmptyString = new RegExp('^$|' + emailPattern.source, 'i');

function isValid(email) {
	return emailPattern.test(email);
}

function isMultipleValid(emails) {
	if (typeof emails !== 'string') {
		return false;
	}
	return emails.trim().split(/\s*,\s*/).every(isValid);
}

module.exports = {
	single: emailPattern,
	multiple: multipleEmailPattern,
	optional: emailPatternOrEmptyString,
	isValid: isValid,
	isMultipleValid: isMultipleValid
};
