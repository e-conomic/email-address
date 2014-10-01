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

test('should return false if input is an invalid email address', function(t){
	t.plan(1);
	t.false(helper.isValid('janeexample.com'));
});

test('should return false if input is empty', function(t) {
	t.plan(1);
	t.false(helper.isValid(''));
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
