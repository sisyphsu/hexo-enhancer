const util = require('./util');

console.log(util.parseSource("fasdfsfsa"));
console.log(util.parseSource("20091010-Title"));
console.log(util.parseSource("2009-10-10-Title"));

console.log(util.hash("1234567890asdfghjkl"));

console.log(util.crc64("1234567890asdfghjkl"));