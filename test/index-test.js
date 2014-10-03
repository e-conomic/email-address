'use strict';
var test = require('tape');
var helper = require('../index');

// if we have false negatives, or false positives, add them to these lists
// unit tests will be created and run for each element in the lists
var validEmailAddresses = require('./assets/valid-email-addresses.json');
var invalidEmailAddresses = require('./assets/invalid-email-addresses.json');


// isValid helper function ---------------------------------------------
test('should return true if input is a valid email address', function(t){
	t.plan(1);
	t.true(helper.isValid('jane@example.com'));
});

test('should return true if input is a valid email address with mixed chars and casing', function(t){
	t.plan(1);
	t.true(helper.isValid('BoB+47@e-conomic.com'));
});

test('should return true if input is a valid email address with underscores and dashes', function(t){
	t.plan(1);
	t.true(helper.isValid('BoB_-@e-conomic.com'));
});

test('should return false if input is an invalid email address', function(t){
	t.plan(1);
	t.false(helper.isValid('janeexample.com'));
});

test('should return true if the host name has uppercase chars', function(t) {
	t.plan(1);
	t.true(helper.isValid('bob@GMAIL.COM'));
});

test('should return true if the host name has special chars like acents and umlauts', function(t) {
	t.plan(2);
	t.true(helper.isValid('böb@example.com'), 'should handle umlaut in local');
	t.true(helper.isValid('bob@ëxample.com'), 'should handle umlaut in domain');
});

test('should return false if input has a domain with a dash followed by a dot', function(t) {
	t.plan(1);
	t.false(helper.isValid('bob@e-conomic-.com'));
});

test('should return false if input has an underscore in the host name', function(t) {
	t.plan(1);
	t.false(helper.isValid('BoB_-@e-conomic_.com'));
});

test('should return false if input has a domain with two consecutive dots', function(t) {
	t.plan(1);
	t.false(helper.isValid('bob@e-conomic..com'));
});

test('should return true if input has a long top-level domain', function(t) {
	t.plan(1);
	t.true(helper.isValid('bob@e-conomic.comxxsjsiw'));
});

test('should return true if the top-level domain has unicode chars', function(t) {
	t.plan(1);
	t.true(helper.isValid('bob@e-conomic.集团'));
});

test('should return false the top-level domain is too short', function(t) {
	t.plan(1);
	t.false(helper.isValid('bob@e-conomic.c'));
});

test('should return false the local part is invalid', function(t) {
	t.plan(1);
	t.false(helper.isValid('b€b@e-conomic.com'));
});

test('should return false the host name is invalid', function(t) {
	t.plan(1);
	t.false(helper.isValid('bob@e-c?onomic.com'));
});

test('should return false the top-level domain is invalid', function(t) {
	t.plan(1);
	t.false(helper.isValid('bob@e-conomic.c?m'));
});

test('should return false if input is empty', function(t) {
	t.plan(1);
	t.false(helper.isValid(''));
});

test('should return false if input is null', function(t) {
	t.plan(1);
	t.false(helper.isValid(null));
});

if (validEmailAddresses.length) {
	test('should return true for a list of problematic, but valid, email addresses', function(t) {
		t.plan(validEmailAddresses.length);
		validEmailAddresses.forEach(function(email) {
			t.true(helper.single.test(email), email + ' should be valid');
		});
	});
}

if (invalidEmailAddresses.length) {
	test('should return false for a list of email addresses for previous false positives', function(t) {
		t.plan(invalidEmailAddresses.length);
		invalidEmailAddresses.forEach(function(email) {
			t.false(helper.single.test(email), email + ' should be invalid');
		});
	});
}


// is multiple valid ---------------------------------------------------
test('isMultipleValid should return true if a string of email adresses are valid', function(t) {
	t.plan(1);
	t.true(helper.isMultipleValid('jane.doe@example.com,john.doe@example.com'));
});

test('isMultipleValid should return false if a string of email adresses has one or more invalid', function(t) {
	t.plan(1);
	t.false(helper.isMultipleValid('jane.doe@example.com,john@.com,john.doe@.com'));
});

test('isMultipleValid should return true if a string that has whitespaces has valid email adresses', function(t) {
	t.plan(4);
	t.true(helper.isMultipleValid('  jane.doe@example.com,john.doe@example.com'));
	t.true(helper.isMultipleValid('jane.doe@example.com,john.doe@example.com  '));
	t.true(helper.isMultipleValid('  jane.doe@example.com,john.doe@example.com  '));
	t.true(helper.isMultipleValid('  jane.doe@example.com,   john.doe@example.com  '));
});


// email pattern -------------------------------------------------------
test('should check if a string is a valid email address', function(t) {
	t.plan(1);
	t.true(helper.single.test('joe@example.com'));
});

test('should return false if a string contains an invalid email address', function(t) {
	t.plan(1);
	t.false(helper.single.test('joe@example'));
})


// optional email (empty string or valid email address -> true, anything else -> false)
test('should return true if passed in an empty string when testing optional email address', function(t) {
	t.plan(1);
	t.true(helper.optional.test(''));
});

test('should return false if optional is passed in a string containing an invalid email address', function(t) {
	t.plan(1);
	t.false(helper.optional.test('joe@example'));
});

test('should return true if optional is passed in a string containing a valid email address', function(t) {
	t.plan(1);
	t.true(helper.optional.test('joe@example.com'));
});


// multiple email addresses, check for a list of comma seperated email addresses
test('should return true if input is a string that contains one email addresses', function(t) {
	t.plan(1);
	t.true(helper.multiple.test('joe@example.com'));
});

test('should return true if input is a string containing multiple valid email addresses', function(t) {
	t.plan(1);
	t.true(helper.multiple.test('joe@example.com,doe@example.com,jane@example.com'));
});

test('should return false if input is a string containing some invalid email addresses', function(t) {
	t.plan(1);
	t.false(helper.multiple.test('joe@example.com,doeexample.com,jane@example.com'));
});

test('should check if a string contain multiple email addresses with whitespaces between them', function(t) {
	t.plan(1);
	t.true(helper.multiple.test('joe@example.com,   doe@example.com, jane@example.com'));
});

test('should check if a string contain multiple email addresses with leading whitespace', function(t) {
	t.plan(1);
	t.true(helper.multiple.test('   joe@example.com,jane@example.com'));
});
