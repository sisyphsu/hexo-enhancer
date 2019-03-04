const moment = require('moment-timezone');
const crc = require('node-crc');
const md5 = require('md5');
const basex = require('base-x');
const base62 = basex("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");
const base32 = basex("0123456789ABCDEFGHJKMNPQRSTVWXYZ");
const reg = /^(\d{4})-?(\d{2})-?(\d{2})-(.*)$/;

function toMoment(value) {
    if (moment.isMoment(value)) return moment(value._d);
    return moment(value);
}

/**
 * 自定义哈希函数, 将MD5进行base62编码然后返回前10个字符
 * @param str
 * @returns {string}
 */
module.exports.hash = function (str) {
    let md5bytes = md5(str, {asBytes: true});
    let base62Str = base62.encode(Buffer.from(md5bytes));

    return base62Str.substring(0, 12);
};

/**
 * 计算字符串的crc64签名
 * @param str
 * @returns {string|*}
 */
module.exports.crc64 = function (str) {
    let buf = crc.crc64(Buffer.from(str));
    return base32.encode(buf);
};

/**
 * 计算字符串的crc32签名
 * @param str
 * @returns {string|*}
 */
module.exports.crc32 = function (str) {
    let buf = crc.crc32(Buffer.from(str));
    return base32.encode(buf);
};

/**
 * 解析source, 提取可能存在的日期
 * @param src
 */
module.exports.parseSource = function (src) {
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

