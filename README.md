# halfpass.js

[![npm version](https://badge.fury.io/js/halfpass.svg)](http://badge.fury.io/js/halfpass)

A halfpass is half a password. It is a 4+ char string for appending to a memorized string.  Uses sha512 as hash algorithm.  The hash salt is your ssh private key *and* the current year.  Can also display a previous year's halfpass as well, in case you need to recover an old password.

## What problem does `halfpass` solve?
Using secure passwords for various websites can be tricky.  Instead of writing down passwords, which is insecure, you could instead commit to memory a single baseword and use this module to generate a yearly suffix for every website.

* example: your password baseword is `foobarbaz`, and this year's gmail.com append is: `tU6+`.  Your gmail.com password is: `foobarbaztU6+`.  Next year, your password would use the same baseword, but have a different halfpass at the end.

## Installing 
The lazy approach to installing this requires sudo (root) access:
```
  sudo npm install -g halfpass
```

Of course, I do not recommend installing npm packages with sudo unless it's required.

This is how I install CLI tools from npm (like halfpass) without sudo:

1. perform these steps: [https://gist.github.com/gavinengel/1842179837823dc25730](https://gist.github.com/gavinengel/1842179837823dc25730)
2. $ nodebin
3. $ npm install --save halfpass

## Usage
```
$ halfpass gmail.com
copied 2015's halfpass for `gmail.com`: tU6+
```

* for extra security, to mix in extra base64 chars:

```
$ halfpass gmail.com -a=3
copied 2015's halfpass for `gmail.com`: tU6+h*a
```

* to use a previous year's halfpass:

```
$ halfpass gmail.com -y=2014
copied 2015's halfpass for `gmail.com`: H2s*
```

* to pass in a salt instead of using your private key:

```
$ halfpass gmail.com -s="this is my secret string"
copied 2015's halfpass for `gmail.com`: H2s*
```

## Credits

TODO

## Alternatives
These are alternative projects which can yield achieve a similar result:

TODO

## License

([The MIT License](http://opensource.org/licenses/MIT))
Copyright (c) 2015 Gavin Engel <<gavin@engel.com>>

