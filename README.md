# Email address helpers [![Build Status](https://travis-ci.org/e-conomic/email-address.svg?branch=master)](https://travis-ci.org/e-conomic/email-address)

Regular expressions ensuring the given input is a valid address.

This module ensure that we use the same approach for validating a given email address across all our services. It was originally lifted from the debitoor-app *source/util*-folder into its own module.


## Overview

### Helper functions
Two helper functions, `isValid` and `isMultipleValid`, are exposed. `isValid` is basically a wrapper calling `.single.test` from the regex section on the input, and `isMultipleValid` splits a string on commas (,), and verify that every item is a valid email address.

Usage:
```js
var email = require('email-address');
email.isValid('joe@example.com'); // true
email.isValid('foo bar'); // false
email.isMultipleValid('john.doe@example.com,jane.doe@example.com'); // true
email.isMultipleValid('john.doe@example.com,jane.doe@example..com'); // false
```

### Regexes
The following regexes are exposed:

  * `.single` the string is a valid email address.
  * `.multiple` the string is a comma seperated list of valid email addresses. Whitespace are allowed between the email addresses.
  * `.optional` the string is a valid email address or an empty string.

Usage:
```js
var email = require('email-address');

// input is a vaild email address
email.single.test('joe@example.com'); // true

// input is a comma seperated list of valid email addresses
email.multiple.test('joe@example.com, jane@example.com'); // true

// input is a valid email address, or an empty string
email.optional.test('jane@example.com'); // true
email.optional.test(''); // true
```
