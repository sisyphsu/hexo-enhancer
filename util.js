const path = require("path");
const moment = require('moment-timezone');
const crc = require('node-crc');
const md5 = require('md5');
const basex = require('base-x');

const base62 = basex("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
const base32 = basex("0123456789ABCDEFGHJKMNPQRSTVWXYZ");
const reg = /^.?(\d{4})[-_]?(\d{2})[-_]?(\d{2}).?[-_.@# ]*(.*)$/;
const postDir = '_posts/';
const draftDir = '_drafts/';

// copy from hexo
function toMoment(value) {
    if (moment.isMoment(value)) return moment(value._d);
    return moment(value);
}

/**
 * custom hash, based on md5+base62
 * @param {string} str
 * @returns {string}
 */
module.exports.hash = function (str) {
    let md5bytes = md5(str, {asBytes: true});
    let base62Str = base62.encode(Buffer.from(md5bytes));

    return base62Str.substring(0, 12);
};

/**
 * Calculate crc64 of `str`, with base32 format.
 * @param {string} str
 * @returns {string|*}
 */
module.exports.crc64 = function (str) {
    let buf = crc.crc64(Buffer.from(str));
    return base32.encode(buf);
};

/**
 * Calculate crc32 of `str`, with base32 format.
 * @param {string} str
 * @returns {string|*}
 */
module.exports.crc32 = function (str) {
    let buf = crc.crc32(Buffer.from(str));
    return base32.encode(buf);
};

/**
 * Parse post's source, pick up `title` and `date` field
 * @param {string} src
 * @return Object
 */
module.exports.parseSource = function (src) {
    let title, date;
    let categories = [];
    let parts = src.split(path.sep);
    if (parts.length > 0) {
        let filename = parts[parts.length - 1];
        if (filename.indexOf(".") >= 0) {
            filename = filename.substring(0, src.indexOf("."));
        }
        let match = src.match(reg);
        if (match) {
            date = toMoment(`${match[1]}-${match[2]}-${match[3]}`);
            title = match[4];
        } else {
            title = filename;
        }
    }
    for (let i = parts.length - 2; i > 0; i--) {
        let part = parts[i];
        if (!part || part === '~' || part === '.' || part === postDir || part === draftDir) {
            break;
        }
        if (categories.indexOf(part) < 0) {
            categories.push(part);
        }
    }
    return {title, date, categories};
};

/**
 * Find `tags` that `src` contains.
 * @param {string} src
 * @param {Array} tags
 * @return {Array}
 */
module.exports.matchTags = function (src, tags) {
    let result = [];
    tags.forEach(tag => {
        if (src.indexOf(tag) > 0) {
            result.push(tag);
        }
    });
    return result;
};

/**
 * Parse tags from `src` string.
 * @param {string} src
 * @param {Array} tgt
 */
module.exports.parseTags = function (src, tgt) {
    src.split(/,;/).forEach(tag => {
        tag = tag.trim();
        if (tag && tgt.indexOf(tag) < 0) {
            tgt.push(tag);
        }
    });
};