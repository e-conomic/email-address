var emailAddress = require('../index');

// if we have false negatives, or false positives, add them to these lists
// unit tests will be created and run for each element in the lists
var validEmailAddresses = require('./assets/valid-email-addresses.json');
var invalidEmailAddresses = require('./assets/invalid-email-addresses.json');

describe('index.spec.js', function() {
	// isValid helper function ---------------------------------------------
	describe('.isValid', function() {
		it('should return true if input is a valid email address', function(){
			expect(emailAddress.isValid('jane@example.com')).to.be.true;
		});

		it('should return true if input is a valid email address with mixed chars and casing', function(){
			expect(emailAddress.isValid('BoB+47@e-conomic.com')).to.be.true;
		});

		it('should return true if input is a valid email address with underscores and dashes', function(){
			expect(emailAddress.isValid('BoB_-@e-conomic.com')).to.be.true;
		});

		it('should return false if input is an invalid email address', function(){
			expect(emailAddress.isValid('janeexample.com')).to.be.false;
		});

		it('should return true if the host name has uppercase chars', function() {
			expect(emailAddress.isValid('bob@GMAIL.COM')).to.be.true;
		});

		it('should return true if the host name has special chars like acents and umlauts in local', function() {
			expect(emailAddress.isValid('böb@example.com')).to.be.true;
		});
		it('should return true if the host name has special chars like acents and umlauts in domain', function() {
			expect(emailAddress.isValid('bob@ëxample.com')).to.be.true;
		});

		it('should return false if input has a domain with a dash followed by a dot', function() {
			expect(emailAddress.isValid('bob@e-conomic-.com')).to.be.false;
		});

		it('should return false if input has an underscore in the host name', function() {
			expect(emailAddress.isValid('BoB_-@e-conomic_.com')).to.be.false;
		});

		it('should return false if input has a domain with two consecutive dots', function() {
			expect(emailAddress.isValid('bob@e-conomic..com')).to.be.false;
		});

		it('should return true if input has a long top-level domain', function() {
			expect(emailAddress.isValid('bob@e-conomic.comxxsjsiw')).to.be.true;
		});

		it('should return true if the top-level domain has unicode chars', function() {
			expect(emailAddress.isValid('bob@e-conomic.集团')).to.be.true;
		});

		it('should return false the top-level domain is too short', function() {
			expect(emailAddress.isValid('bob@e-conomic.c')).to.be.false;
		});

		it('should return false the local part is invalid', function() {
			expect(emailAddress.isValid('b€b@e-conomic.com')).to.be.false;
		});

		it('should return false the host name is invalid', function() {
			expect(emailAddress.isValid('bob@e-c?onomic.com')).to.be.false;
		});

		it('should return false the top-level domain is invalid', function() {
			expect(emailAddress.isValid('bob@e-conomic.c?m')).to.be.false;
		});

		it('should return false if input is empty', function() {
			expect(emailAddress.isValid('')).to.be.false;
		});

		it('should return false if input is null', function() {
			expect(emailAddress.isValid(null)).to.be.false;
		});
	});

	if (validEmailAddresses.length) {
		describe('should return true for a list of problematic, but valid, email addresses:', function() {
			validEmailAddresses.forEach(function(email) {
				it(email + ' should return true', function() {
					expect(emailAddress.single.test(email)).to.be.true;
				});
			});
		});
	}

	if (invalidEmailAddresses.length) {
		describe('should return false for a list of email addresses for previous false positives:', function() {
			invalidEmailAddresses.forEach(function(email) {
				it(email + ' should return false', function() {
					expect(emailAddress.single.test(email)).to.be.false;
				});
			});
		});
	}


	describe('isMultipleValid', function() {
		it('should return true if a string of email adresses are valid', function() {
			expect(emailAddress.isMultipleValid('jane.doe@example.com,john.doe@example.com')).to.be.true;
		});

		it('should return false if a string of email adresses has one or more invalid', function() {
			expect(emailAddress.isMultipleValid('jane.doe@example.com,john@.com,john.doe@.com')).to.be.false;
		});

		it('should return true if a string with leading whitespaces has valid email adresses', function() {
			expect(emailAddress.isMultipleValid('  jane.doe@example.com,john.doe@example.com')).to.be.true;
		});

		it('should return true if a string with trailing whitespaces has valid email adresses', function() {
			expect(emailAddress.isMultipleValid('jane.doe@example.com,john.doe@example.com  ')).to.be.true;
		});

		it('should return true if a string with both trailing and leading whitespaces has valid email adresses', function() {
			expect(emailAddress.isMultipleValid('  jane.doe@example.com,john.doe@example.com  ')).to.be.true;
		});

		it('should return true if a string with trailing whitespaces after comma has valid email adresses', function() {
			expect(emailAddress.isMultipleValid('  jane.doe@example.com,   john.doe@example.com  ')).to.be.true;
		});
	});

	describe('.single', function() {
		it('should check if a string is a valid email address', function() {
			expect(emailAddress.single.test('joe@example.com')).to.be.true;
		});

		it('should return false if a string contains an invalid email address', function() {
			expect(emailAddress.single.test('joe@example')).to.be.false;
		});
	});

	describe('.optional', function() {
		it('should return true if passed in an empty string when testing optional email address', function() {
			expect(emailAddress.optional.test('')).to.be.true;
		});

		it('should return false if optional is passed in a string containing an invalid email address', function() {
			expect(emailAddress.optional.test('joe@example')).to.be.false;
		});

		it('should return true if optional is passed in a string containing a valid email address', function() {
			expect(emailAddress.optional.test('joe@example.com')).to.be.true;
		});
	});

	describe('.multiple', function() {
		it('should return true if input is a string that contains one email addresses', function() {
			expect(emailAddress.multiple.test('joe@example.com')).to.be.true;
		});

		it('should return true if input is a string containing multiple valid email addresses', function() {
			expect(emailAddress.multiple.test('joe@example.com,doe@example.com,jane@example.com')).to.be.true;
		});

		it('should return false if input is a string containing some invalid email addresses', function() {
			expect(emailAddress.multiple.test('joe@example.com,doeexample.com,jane@example.com')).to.be.false;
		});

		it('should check if a string contain multiple email addresses with whitespaces between them', function() {
			expect(emailAddress.multiple.test('joe@example.com,   doe@example.com, jane@example.com')).to.be.true;
		});

		it('should check if a string contain multiple email addresses with leading whitespace', function() {
			expect(emailAddress.multiple.test('   joe@example.com,jane@example.com')).to.be.true;
		});
	});
});
