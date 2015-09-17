#!/usr/bin/env node

// REQUIRES
require('copy-paste').global()
var _argv = require('minimist')(process.argv.slice(2));
var tld = require('tldjs')
var _fs = require('fs')
var _createHash = require('sha.js')
var bases = require('bases')


// VARIABLES
var halfpass = ''
var out = console.log
var _date = new Date()
var year = _argv.y || _date.getFullYear()
var addl = _argv.a || 0
var domain = tld.getDomain(_argv._[0]) || _argv._[0];
var salt = _argv.s || getPrivateKey(_fs.readFileSync(process.env['HOME'] + '/.ssh/id_rsa','utf8')) + year
var maxes = [{"name":"lower", "max":26}, {"name":"upper", "max":26}, {"name":"digit", "max":10}] // we need to get for 'random' int, for lowercase, uppercase, digit, and special-char (shift+digit on std keyboard)  
var rands = []
var sha = _createHash('sha512')
var specials = ' !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~' // using the ordering of ascii table
maxes.push({"name":"special", "max":specials.length})


// FUNCTIONS
function getPrivateKey(rawSalt) {
  var key = ''
  rawSalt.split(/\n/).forEach(function(each) {
    if (each.indexOf('-----') === -1) {
      key = key + each
    }
  }) 
  return key
}

function complex2simple(complex) {
  simple = []
  complex.forEach(function(each) {
    if (each.name == 'lower') {
      simple.push(String.fromCharCode(97 + each.val))
    }
    else if (each.name == 'upper') {
      simple.push(String.fromCharCode(65 + each.val))

    }
    else if (each.name == 'digit') {
      simple.push(each.val)

    }
    else if (each.name == 'special') {
      simple.push(specials.slice(each.val, each.val+1))

    }
    else if (each.name == 'base64') {
      simple.push(each.base64)

    }
    else {
      out('Error: unknown type: '+each.name)
    }
  })

  return simple
}

function objSorter(a,b) {
  return parseInt(a.dec, 10) - parseInt(b.dec, 10);
}


// FLOW
// also, add additional base64 if requested
for (var i = 0; i < addl; i++) {
  newPair = {"name":"base64", "max":64}
  maxes.push(newPair)
}

// fill rands
maxes.forEach(function(pair) {
  hex = sha.update(i+salt+domain, 'utf8').digest('hex').slice(0, 5)
  dec = bases.fromBase16(hex)//parseInt(hex, 16)
  ///starts.push(i * size)
  max = pair.max
  newPair = {"val":dec % max, "name":pair.name, "dec":dec, "base64": bases.toBase64(dec)}
  rands.push(newPair)
  i++
})

// sort by the 'dec' value
rands.sort(objSorter)

// parse into single array
simple = complex2simple(rands)

// concatenate to produce final halfpass
simple.forEach(function(each) {
  halfpass = halfpass + each
})


// DONE
copy(halfpass)
out('copied ' + year + '\'s halfpass for `' + domain + '`: ' + halfpass)
process.exit()