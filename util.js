const moment = require('moment-timezone');
const crc = require('node-crc');
const md5 = require('md5');
const basex = require('base-x');
const base62 = basex("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
const base32 = basex("0123456789ABCDEFGHJKMNPQRSTVWXYZ");
const reg = /^(\d{4})-?(\d{2})-?(\d{2})-(.*)$/;

// copy from hexo
function toMoment(value) {
    if (moment.isMoment(value)) return moment(value._d);
    return moment(value);
}

/**
 * custom hash, based on md5+base62
 * @param str
 * @returns {string}
 */
module.exports.hash = function (str) {
    let md5bytes = md5(str, {asBytes: true});
    let base62Str = base62.encode(Buffer.from(md5bytes));

    return base62Str.substring(0, 12);
};

/**
 * Calculate crc64 of `str`, with base32 format.
 * @param str
 * @returns {string|*}
 */
module.exports.crc64 = function (str) {
    let buf = crc.crc64(Buffer.from(str));
    return base32.encode(buf);
};

/**
 * Calculate crc32 of `str`, with base32 format.
 * @param str
 * @returns {string|*}
 */
module.exports.crc32 = function (str) {
    let buf = crc.crc32(Buffer.from(str));
    return base32.encode(buf);
};

/**
 * Parse post's source, pick up `title` and `date` field
 * @param src
 * @return Object
 */
module.exports.parseSource = function (src) {
    // TODO seperator
    if (src.lastIndexOf("/") >= 0) {
        src = src.substring(src.lastIndexOf("/") + 1);
    }
    if (src.lastIndexOf(".") >= 0) {
        src = src.substring(0, src.lastIndexOf("."));
    }
    let match = src.match(reg);
    if (match) {
        return {
            date: toMoment(`${match[1]}-${match[2]}-${match[3]}`),
            title: match[4]
        };
    } else {
        return {title: src};
    }
};

