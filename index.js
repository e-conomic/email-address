// NOTE: Due to the schema implementation using regex flags like i, g or s is not supported

// Email validation that does handle CJK, Cyrillic, Devangari, Hiragana,
// Arabic and require at least 2 letters in top-level domain.

// Derived from:
// [a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])
// this should handle 99.99% of all email addresses in use today.
var emailPattern = /^[A-Za-z0-9\u4e00-\u9eff\u0400-\u04ff\u0900-\u097f\u3040-\u309f\u0600-\u06ff!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9\u4e00-\u9eff\u0400-\u04ff\u0900-\u097f\u3040-\u309f\u0600-\u06ff!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9\u4e00-\u9eff\u0400-\u04ff\u0900-\u097f\u3040-\u309f\u0600-\u06ff](?:[A-Za-z0-9\u4e00-\u9eff\u0400-\u04ff\u0900-\u097f\u3040-\u309f\u0600-\u06ff-]*[A-Za-z0-9\u4e00-\u9eff\u0400-\u04ff\u0900-\u097f\u3040-\u309f\u0600-\u06ff])?\.)+[A-Za-z0-9\u4e00-\u9eff\u0400-\u04ff\u0900-\u097f\u3040-\u309f\u0600-\u06ff](?:[A-Za-z0-9\u4e00-\u9eff\u0400-\u04ff\u0900-\u097f\u3040-\u309f\u0600-\u06ff-]*[A-Za-z0-9\u4e00-\u9eff\u0400-\u04ff\u0900-\u097f\u3040-\u309f\u0600-\u06ff])$/i;

var emailPatternSource = emailPattern.source.slice(1, -1);
var multipleEmailPattern = new RegExp('^\\s*(?:' + emailPatternSource + '\\s*,\\s*)*' + emailPatternSource + '$');

var emailPatternOrEmptyString = new RegExp('^$|' + emailPattern.source, 'i');

module.exports = {
	single: emailPattern,
	multiple: multipleEmailPattern,
	optional: emailPatternOrEmptyString,
	isValid: function (email) {
		return emailPattern.test(email);
	}
}
