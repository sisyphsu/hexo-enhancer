'use strict';

const util = require("./util");

/**
 * 过滤POST, 自动处理title、date、abbrlink属性
 * @param log
 * @param data
 */
function filterPost(log, data) {
    let metadata = util.parseSource(data.source);
    // 自动分配title
    if (!data.title && metadata.title) {
        data.title = metadata.title;
    }
    // 自动分配date
    if (metadata.date) {
        data.date = metadata.date;
    }

    // 分配addrlink
    if (!data.abbrlink) {
        if (!data.title) {
            log.w("No title found for post [%s]", data.slug);
        }
        data.abbrlink = util.crc32(data.title);
        log.i("Generate link %s for post [%s]", data.abbrlink, data.title);
    }
}

hexo.extend.filter.register('before_post_render', function (data) {
    if (data.layout === 'post') {
        filterPost(this.log, data);
    }
    return data;
});
