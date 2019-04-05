const util = require('./util');

// console.log(util.parseSource("Title"));
// console.log(util.parseSource("20091010-Title"));
// console.log(util.parseSource("2009-10-10-Title"));
// console.log(util.parseSource("[20091010]-Title"));
// console.log(util.parseSource("「20091010」Title"));
// console.log(util.parseSource("『20091010』Title"));
// console.log(util.parseSource("『20091010』Title"));

console.log(util.parseSource("_posts/寅花晨拾/20111027-object file not found.md"));

console.log(util.crc32("1234567890asdfghjkl"));

let tags = [];
util.parseTags("Linux, Mac, Shell, HTML", tags);
console.log(tags);